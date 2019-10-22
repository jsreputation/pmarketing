import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

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
  public engagementTabOption(): ElementFinder {
   return element.all(by.css('h3')).get(2);
  }
  public engagementCreateNewButton(): ElementFinder {
    return element(by.css('cl-button'));
   }
  public selectEngagementTypeDialog(): ElementFinder {
    return element(by.css('mat-dialog-content'));
   }
  public engagementTypeOptions(): ElementArrayFinder {
    return element.all(by.css('cl-type-item'));
   }
   public activeEngagementTypeOption(): ElementFinder {
    return element(by.css('button.engagement-selector.active'));
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

  public getAccountId(): string {
   return 'generic';
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

export class CreateHitThePinataAppPage {

  public navigateToHitThePinata(): Promise<string> {
    return browser.get('engagements/games/new-pinata') as Promise<string> ;
 }

}
export class CreateInstantRewardAppPage {

  public navigateToCreateInstantReward(): Promise<string> {
    return browser.get('engagements/new-instant-reward') as Promise<string> ;
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
