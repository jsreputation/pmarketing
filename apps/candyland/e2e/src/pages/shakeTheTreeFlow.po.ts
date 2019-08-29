import { browser, by, element } from 'protractor';

export class DashboardAppPage {
  public navigateToDashboard(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  public getH1Text(): Promise<string> {
    return element(by.css('h1')).getText() as Promise<string>;
  }
  public getTitleText(): any {
    return browser.getTitle() as Promise<string>;
}
  public getSubHeaderText(): Promise<string> {
    return element(by.css('p')).getText() as Promise<string>;
  }

  public getStartGameButton(): any  {
    return element(by.css('button'));
  }
}

export class EngagementAppPage {

   public navigateToEngagement(): Promise<any> {
    return browser.get('engagements') as Promise<any> ;
  }

}

export class CreateShakeTheTreeAppPage {

  public navigateToShakeTheTree(): Promise<any> {
    return browser.get('engagements/games/new-shake') as Promise<any> ;
 }

}
