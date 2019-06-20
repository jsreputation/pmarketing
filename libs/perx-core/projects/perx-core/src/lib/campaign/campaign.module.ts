import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from './campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvConfig } from './env-config';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CampaignService,
  ],
  exports: [
  ]
})
export class CampaignModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: CampaignModule,
      providers: [
        CampaignService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
