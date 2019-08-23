import { Controller, Get, Post, Patch, Delete, Param, Body, HttpException, HttpStatus, Headers, HttpCode } from '@nestjs/common';
import { EngagementDto, EngagementType, UpdateEngagementDto } from './engagement.dto';
import { Observable, OperatorFunction, merge, of } from 'rxjs';
import { IListResponse, ISingleResponse } from '../services/response.model';
import { GameService } from '../services/game/game.service';
import { map, scan, catchError, last } from 'rxjs/operators';
import { IEntity } from '../services/entity.model';
import { IEngagementService } from '../services/iengagement.service';
import { IPostRequest, IPatchRequest } from '../services/request.model';
import { IEngagement } from '../services/engagement.model';
import { SurveyService } from '../services/survey/survey.service';
import { LoyaltyService } from '../services/loyalty/loyalty.service';
import { InstantOutcomeService } from '../services/instant-outcome/instant-outcome.service';
import { IncomingHttpHeaders } from 'http';
import { AxiosError } from 'axios';

class EngagementControllerImplem {
    protected gameService: GameService;
    protected surveyService: SurveyService;
    protected loyaltyService: LoyaltyService;
    protected irService: InstantOutcomeService;

    @Get('healthz')
    @HttpCode(200)
    public healthCheck(): void {}

    @Get()
    public getAll(@Headers() headers: IncomingHttpHeaders): Observable<IListResponse<EngagementDto>> {
        // list of queries (one per underlying service)
        const queries: Observable<IListResponse<EngagementDto>>[] = [];

        let lastError: AxiosError;
        // build a list of query to all underlying services
        // tslint:disable-next-line: forin
        for (const t in this.services) {
            const service: IEngagementService = this.services[t];
            queries.push(service.getEngagements(headers)
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
                    catchError((err: AxiosError) => {
                        lastError = err;
                        return of(null);
                    })
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
                }, null),
                last(),
                map((res: IListResponse<EngagementDto> | null): IListResponse<EngagementDto> => {
                    // if res is null, it means that all queries failed. We therefore get one of the errors
                    if (res === null) {
                        console.error('everything failed 😰');
                        this.handleError(lastError);
                    }
                    return res;
                })
            );
    }

    @Post()
    public postOne(
        @Body() request: IPostRequest<UpdateEngagementDto>,
        @Headers() headers: IncomingHttpHeaders
    ): Observable<ISingleResponse<EngagementDto>> {
        const type: EngagementType = request.data.attributes.type;
        const service = this.getService(type);
        request.data.attributes.type = undefined;
        return service.postEngagement(request, headers)
            .pipe(
                this.mappingFn(type),
                catchError(this.handleError)
            );
    }

    @Get(':type/:id')
    public getOne(
        @Param('type') type: string,
        @Param('id') id: number,
        @Headers() headers: IncomingHttpHeaders
    ): Observable<ISingleResponse<EngagementDto>> {
        const typ: EngagementType = type as EngagementType;
        const service: IEngagementService = this.getService(typ);
        return service.getEngagement(id, headers)
            .pipe(
                this.mappingFn(typ),
                catchError(this.handleError)
            );
    }

    @Patch(':type/:id')
    public patchOne(
        @Param('type') type: string,
        @Param('id') id: number,
        @Body() request: IPatchRequest<UpdateEngagementDto>,
        @Headers() headers: IncomingHttpHeaders
    ): Observable<ISingleResponse<EngagementDto>> {
        const typ: EngagementType = type as EngagementType;
        const service: IEngagementService = this.getService(typ);
        request.data.attributes.type = undefined;
        return service.patchEngagement(id, request, headers)
            .pipe(
                this.mappingFn(typ),
                catchError(this.handleError)
            );
    }

    @Delete(':type/:id')
    public deleteOne(
        @Param('type') type: string,
        @Param('id') id: number,
        @Headers() headers: IncomingHttpHeaders
    ): Observable<void> {
        const typ: EngagementType = type as EngagementType;
        const service: IEngagementService = this.getService(typ);
        return service.deleteEngagement(id, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(err: AxiosError): Observable<any> {
        throw new HttpException(err.response.data, err.response.status);
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
            game: this.gameService,
            survey: this.surveyService,
            stamps: this.loyaltyService,
            instant_reward: this.irService
        };
    }

    private mappingFn(type: EngagementType): OperatorFunction<ISingleResponse<IEngagement>, ISingleResponse<EngagementDto>> {
        return map((res: ISingleResponse<IEngagement>) => {
            const dto: EngagementDto = { ...res.data.attributes, type };
            return {
                ...res,
                data: { ...res.data, attributes: dto },
            };
        });
    }
}

// declaration which presents the controllers on the root
@Controller('')
export class EngagementRootController extends EngagementControllerImplem {
    constructor(
        protected gameService: GameService,
        protected surveyService: SurveyService,
        protected loyaltyService: LoyaltyService,
        protected irService: InstantOutcomeService
    ) {
        super();
    }
}

// declaration which presents the controllers on engagements
@Controller('engagements')
export class EngagementController extends EngagementControllerImplem {
    constructor(
        protected gameService: GameService,
        protected surveyService: SurveyService,
        protected loyaltyService: LoyaltyService,
        protected irService: InstantOutcomeService
    ) {
        super();
    }
}
