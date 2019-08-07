import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ITokenResponse } from './token';

@Controller('token')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':id')
  getToken(@Param('id') id: string): ITokenResponse {
    return { token: this.appService.getToken(Number.parseInt(id)) };
  }
}
