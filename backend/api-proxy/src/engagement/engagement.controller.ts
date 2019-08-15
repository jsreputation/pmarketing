import { Controller, Get, Post, Patch, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EngagementDto, EngagementType, UpdateEngagementDto } from './engagement.dto';
import { Observable, OperatorFunction } from 'rxjs';
import { IListResponse, ISingleResponse } from '../services/response.model';
import { GameService, IGame } from '../services/game/game.service';
import { map } from 'rxjs/operators';
import { IEntity } from 'src/services/entity.model';
import { IEngagementService } from 'src/services/iengagement.service';
import { IPostRequest, IPatchRequest } from 'src/services/request.model';
import { IEngagement } from 'src/services/engagement.model';

@Controller('engagements')
export class EngagementController {
    constructor(private gameService: GameService) { }

    private get services(): { [key: string]: IEngagementService } {
        return {
            game: this.gameService,
        };
    }

    private mappingFn: OperatorFunction<ISingleResponse<IEngagement>, ISingleResponse<EngagementDto>> =
        map((res: ISingleResponse<IEngagement>) => {
            const dto: EngagementDto = { ...res.data.attributes, type: EngagementType.game };
            return {
                ...res,
                data: { ...res.data, attributes: dto },
            };
        });

    @Get()
    public getAll(): Observable<IListResponse<EngagementDto>> {
        return this.gameService.getEngagements()
            .pipe(
                map((res: IListResponse<IGame>): IListResponse<EngagementDto> => {
                    return {
                        ...res,
                        data: res.data.map((game: IEntity<IGame>): IEntity<EngagementDto> => {
                            const dto: EngagementDto = { ...game.attributes, type: EngagementType.game };
                            return { ...game, attributes: dto };
                        }),
                    };
                }),
            );
    }

    @Post()
    public postOne(@Body() request: IPostRequest<UpdateEngagementDto>): Observable<ISingleResponse<EngagementDto>> {
        const service = this.getService(request.data.attributes.type);
        request.data.attributes.type = undefined;
        return service.postEngagement(request)
            .pipe(this.mappingFn);
    }

    @Get(':type/:id')
    public getOne(@Param('type') type: string, @Param('id') id: number): Observable<ISingleResponse<EngagementDto>> {
        const service: IEngagementService = this.getService(type);
        return service.getEngagement(id)
            .pipe(this.mappingFn);
    }

    @Patch(':type/:id')
    public patchOne(
        @Param('type') type: string,
        @Param('id') id: number,
        @Body() request: IPatchRequest<UpdateEngagementDto>,
    ): Observable<ISingleResponse<EngagementDto>> {
        const service: IEngagementService = this.getService(type);
        request.data.attributes.type = undefined;
        return service.patchEngagement(id, request).pipe(this.mappingFn);
    }

    @Delete(':type/:id')
    public deleteOne(@Param('type') type: string, @Param('id') id: number): Observable<void> {
        const service: IEngagementService = this.getService(type);
        return service.deleteEngagement(id);
    }

    private getService(type: string): IEngagementService {
        const service = this.services[type];
        if (!service) {
            throw new HttpException(`Invalid type: '${type}'`, HttpStatus.BAD_REQUEST);
        }
        return service;
    }
}
