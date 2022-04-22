import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ConfigService, TokenStorage, LanguageService } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: LoadingComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient, HttpBackend, ConfigService, TokenStorage],
        useClass: LanguageService
      }
    })
  ]
})
export class LoadingModule { }
