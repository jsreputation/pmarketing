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
export class LoginAppPage {

  public navigateToLogin(): Promise<string> {
    return browser.get('login') as Promise<string> ;
 }
  public accountIDField(): ElementFinder {
    return element.all(by.css('input')).first();

  }
  public userAccountField(): ElementFinder {
    return element.all(by.css('input')).get(1);
  }

  public pwField(): ElementFinder {
    return element.all(by.css('input')).get(2);
  }

  public getPassword(): string {
    return 'asdfjkl;';
  }

  public getAccountId(): number {
   return 222222222;
  }

  public getUserAccount(): string {
    return 'Admin';
  }

}

export class CreateSurveyAppPage {

  public navigateToSurvey(): Promise<string> {
    return browser.get('engagements/new-survey/questions') as Promise<string> ;
 }

}

export class RewardAppPage {

  public navigateToReward(): Promise<string> {
    return browser.get('rewards') as Promise<string> ;
 }

}

export class CreateRewardAppPage {

  public navigateToRewardCreate(): Promise<string> {
    return browser.get('rewards/new-reward') as Promise<string> ;
 }

}

export class CampaignAppPage {

  public navigateToCampaign(): Promise<string> {
    return browser.get('campaigns') as Promise<string> ;
 }

}

export class CreateCampaignAppPage {

  public navigateToCreateCampaign(): Promise<string> {
    return browser.get('campaigns/new-campaign') as Promise<string> ;
 }

}

export class GeneralSettingsAppPage {

  public navigateToGeneralSettings(): Promise<string> {
    return browser.get('settings/general') as Promise<string> ;
 }

}

export class BrandingSettingsAppPage {

  public navigateToBrandingSettings(): Promise<string> {
    return browser.get('settings/branding') as Promise<string> ;
 }

}

export class AudienceAppPage {

  public navigateToAudience(): Promise<string> {
    return browser.get('audience') as Promise<string> ;
 }

}
