import { browser, by, element, ElementFinder } from 'protractor';

export class DashboardAppPage {
  public navigateToDashboard(): Promise<string> {
    return browser.get('dashboard') as Promise<string>;
  }

  public getH1Text(): Promise<string> {
    return element(by.css('h1')).getText() as Promise<string>;
  }
  public getTitleText(): Promise<string> {
    return browser.getTitle() as Promise<string>;
}
  public getSubHeaderText(): Promise<string> {
    return element(by.css('p')).getText() as Promise<string>;
  }

  public getStartGameButton(): ElementFinder  {
    return element(by.css('button'));
  }
}

export class EngagementAppPage {

   public navigateToEngagement(): Promise<string> {
    return browser.get('engagements') as Promise<string> ;
  }

}

export class CreateShakeTheTreeAppPage {

  public navigateToShakeTheTree(): Promise<string> {
    return browser.get('engagements/games/new-shake') as Promise<string> ;
 }

}
