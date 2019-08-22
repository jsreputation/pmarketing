import { AppService } from './app.service';
import { ITokenResponse } from './token';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getToken(id: string): ITokenResponse;
}
