import { Controller, Get, Post, Patch, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EngagementDto, EngagementType, UpdateEngagementDto } from './engagement.dto';
import { Observable, OperatorFunction, merge } from 'rxjs';
import { IListResponse, ISingleResponse } from '../services/response.model';
import { GameService, IGame } from '../services/game/game.service';
import { map, scan } from 'rxjs/operators';
import { IEntity } from 'src/services/entity.model';
import { IEngagementService } from 'src/services/iengagement.service';
import { IPostRequest, IPatchRequest } from 'src/services/request.model';
import { IEngagement } from 'src/services/engagement.model';

@Controller('engagements')
export class EngagementController {
    constructor(private gameService: GameService) { }

    @Get()
    public getAll(): Observable<IListResponse<EngagementDto>> {
        // list of queries (one per underlying service)
        const queries: Observable<IListResponse<EngagementDto>>[] = [];

        // build a list of query to all underlying services
        // tslint:disable-next-line: forin
        for (const t in this.services) {
            const service: IEngagementService = this.services[t];
            queries.push(service.getEngagements()
                .pipe(
                    // update each engagement with its type
                    map((res: IListResponse<IEngagement>): IListResponse<EngagementDto> => {
                        return {
                            ...res,
                            data: res.data.map((eng: IEntity<IEngagement>): IEntity<EngagementDto> => {
                                const dto: EngagementDto = { ...eng.attributes, type: t as EngagementType };
                                return { ...eng, attributes: dto };
                            }),
                        };
                    }),
                ));
        }
        return merge<IListResponse<EngagementDto>>(...queries)
            .pipe(
                // merge the result of each quey into a single response
                scan((acc: IListResponse<EngagementDto> | null, v: IListResponse<EngagementDto>): IListResponse<EngagementDto> => {
                    if (acc === null) {
                        return v;
                    }
                    acc.data = [
                        ...acc.data,
                        ...v.data
                    ];
                    return acc;
                }, null)
            );
    }

    @Post()
    public postOne(@Body() request: IPostRequest<UpdateEngagementDto>): Observable<ISingleResponse<EngagementDto>> {
        const type: EngagementType = request.data.attributes.type;
        const service = this.getService(type);
        request.data.attributes.type = undefined;
        return service.postEngagement(request)
            .pipe(this.mappingFn(type));
    }

    @Get(':type/:id')
    public getOne(@Param('type') type: string, @Param('id') id: number): Observable<ISingleResponse<EngagementDto>> {
        const typ: EngagementType = type as EngagementType;
        const service: IEngagementService = this.getService(typ);
        return service.getEngagement(id)
            .pipe(this.mappingFn(typ));
    }

    @Patch(':type/:id')
    public patchOne(
        @Param('type') type: string,
        @Param('id') id: number,
        @Body() request: IPatchRequest<UpdateEngagementDto>,
    ): Observable<ISingleResponse<EngagementDto>> {
        const typ: EngagementType = type as EngagementType;
        const service: IEngagementService = this.getService(typ);
        request.data.attributes.type = undefined;
        return service.patchEngagement(id, request).pipe(this.mappingFn(typ));
    }

    @Delete(':type/:id')
    public deleteOne(@Param('type') type: string, @Param('id') id: number): Observable<void> {
        const typ: EngagementType = type as EngagementType;
        const service: IEngagementService = this.getService(typ);
        return service.deleteEngagement(id);
    }

    private getService(type: EngagementType): IEngagementService {
        const service = this.services[type];
        if (!service) {
            throw new HttpException(`Invalid type: '${type}'`, HttpStatus.BAD_REQUEST);
        }
        return service;
    }

    private get services(): { [key in EngagementType]: IEngagementService } {
        return {
            game: this.gameService
        };
    }

    private mappingFn(type: EngagementType): OperatorFunction<ISingleResponse<IEngagement>, ISingleResponse<EngagementDto>> {
        return map((res: ISingleResponse<IEngagement>) => {
            const dto: EngagementDto = { ...res.data.attributes, type: EngagementType.game };
            return {
                ...res,
                data: { ...res.data, attributes: dto },
            };
        });
    }
}
