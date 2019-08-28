import { browser, by, element } from 'protractor';

export class DashboardAppPage {
  navigateToDashboard() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getH1Text() {
    return element(by.css('h1')).getText() as Promise<string>;
  }
  getTitleText() {
    return browser.getTitle() as Promise<string>;
}
  getSubHeaderText() {
    return element(by.css('p')).getText() as Promise<string>;
  }

  getStartGameButton()  {
    return element(by.css('button'));
  }
}

export class EngagementAppPage {

   navigateToEngagement() {
     // const engagementURL = browser.baseURL + 'engagements';
     return browser.get('engagements') as Promise<any> ;
  }

}
