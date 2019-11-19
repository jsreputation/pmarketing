import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class DashboardAppPage {
  public navigateToDashboard(): Promise<string> {
    return browser.get('dashboard') as Promise<string>;
  }

}

export class EngagementAppPage {

  public navigateToEngagement(): Promise<string> {
    return browser.get('engagements') as Promise<string>;
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
  public engagementNextButton(): ElementFinder {
    return element.all(by.className('btn mat-flat-button primary')).get(1);
  }
  public itemName(): ElementFinder {
    return element.all(by.css('p.engagement-item-name')).first();
  }
  public itemInfo(): ElementFinder {
    return element.all(by.css('div.engagement-item-info>p.engagement-item-name')).first();
  }

}

export class CreateShakeTheTreeAppPage {

  public navigateToShakeTheTree(): Promise<string> {
    return browser.get('engagements/games/new-shake') as Promise<string> ;
 }
  public shakeTreeCreateNewButton(): ElementFinder {
    return element.all(by.css('button')).get(2);
  }
  public shakeTreeTypeOptions(): ElementFinder {
    return element.all(by.tagName('cl-type-item')).get(1);
  }
  public shakeTreeSaveButton(): ElementFinder {
    return element(by.css('button.btn.mat-flat-button.primary'));
  }
  public shakeTreeLaunchButton(): ElementFinder {
    return element.all(by.css('button.btn.mat-flat-button.primary')).last();
  }
  public shakeTreeGamesButton(): ElementFinder {
    return element(by.className('btn mat-flat-button primary'));
  }
  public mobilePreviewCheck(): ElementFinder {
    return element(by.className('mobile-preview mobile-content-multiple'));
  }
  public shakeTreePreviewButton(): ElementFinder {
    return element(by.className('mobile-preview-btn'));
  }
  public shakeTreePreviewHeadline(): ElementFinder {
    return element(by.className('mobile-preview-headline'));
  }
  public shakeTreePreviewEmptyHeadline(): ElementFinder {
    return element(by.css('p.mobile-preview-headline'));
  }
  public shakeTreePreviewSubHeadline(): ElementFinder {
    return element(by.className('mobile-preview-sub-headline'));
  }
  public shakeTreePreviewBackground(): ElementFinder {
    return element(by.className('mobile-preview-background'));
  }
  public shakeTreeDesign(): ElementFinder {
    return element.all(by.tagName('cl-images-preview')).get(1);
  }
  public shakeTreeBackgroundDesign(): ElementFinder {
    return element.all(by.tagName('cl-images-preview')).last();
  }
  public treeDesignPreview(): ElementFinder {
    return element(by.className('tree__img ng-star-inserted'));
  }
  public engagementTitleField(): ElementFinder {
    return element.all(by.css('input[type=text]')).first();
  }
  public headlineField(): ElementFinder {
    return element.all(by.css('input[type=text]')).get(1);
  }
  public subHeadlineField(): ElementFinder {
    return element.all(by.css('input[type=text]')).get(2);
  }
  public buttonTextField(): ElementFinder {
    return element.all(by.css('input[type=text]')).last();
  }
  public giftDesign(): ElementFinder {
    return element.all(by.className('image-wrap')).get(4);
  }
  public firstPresentOption(): ElementArrayFinder {
    return element.all(by.css('img[alt=game-icon]'));
  }
  public secondPresentOption(): ElementFinder {
    return element(by.css('h2.dialog-title'));
  }
  public dropdownList(): ElementFinder {
     return element(by.css('div.mat-select-arrow'));
  }
  public selectOption(): ElementFinder {
    return element.all(by.className('mat-option ng-star-inserted')).get(1);
  }
  public selectedAmountPreview(): ElementArrayFinder {
    return element.all(by.css('img.gift-img'));
  }
  public previewMyChoice(): ElementFinder {
    return element(by.className('gift-img gift-img__1 ng-star-inserted'));
  }
  public uploadGiftImage(): ElementFinder {
    return element.all(by.css('input[type="file"]')).get(0);
  }
  public uploadBackgroundImage(): ElementFinder {
    return element.all(by.css('input[type="file"]')).get(1);
  }
  public uploadedImageObj(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img.image'));
  }
  public errorUploadMessage(): ElementFinder {
    return element(by.css('div.upload-error-wrap.ng-star-inserted>span'));
  }
  public emptyInputFields(): ElementArrayFinder {
    return element.all(by.css('input[type="file"]'));
  }
  public uploadField(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
  }
  public giftPreview(): ElementFinder {
    return element(by.css('div.gift-wrapper.gift-wrapper__1.hang.ng-star-inserted>img'));
  }
  public backgroundPreview(): ElementFinder {
    return element(by.css('div.mobile-preview-background'));
  }
  public mainHeadlineField(): ElementFinder {
    return element.all(by.css('input[type=text]')).get(0);
  }
  public launchLaterBtn(): ElementFinder {
    return element(by.css('cl-button.actions-close'));
  }
  public fileDialog(): ElementFinder {
    return element(by.css('cl-confirm-modal'));
  }
  public transactionDate(): ElementFinder {
    return element.all(by.css('p.engagement-item-date')).first();
  }
  public firstDialogEl(): ElementFinder {
    return element.all(by.css('cl-button')).get(1);
  }
  public secondDialogEl(): ElementFinder {
    return element.all(by.css('cl-button')).get(2);
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
    return browser.get('engagements/new-survey/questions') as Promise<string>;
  }
  public surveyCreateNewButton(): ElementFinder {
    return element.all(by.css('button')).get(2);
  }
  public questionButton(): ElementFinder {
    return element.all(by.css('cl-button')).last();
  }
  public loadQuestionButton(): ElementFinder {
    return element.all(by.css('cl-button>button')).last();
  }
  public headerByIdField(): ElementFinder {
    return element(by.id('mat-input-0'));
  }
  public headlineByIdField(): ElementFinder {
    return element(by.id('mat-input-1'));
  }
  public subHeadlineByIdField(): ElementFinder {
    return element(by.id('mat-input-2'));
  }
  public errorMessageByIdField(): ElementFinder {
    return element(by.id('mat-error-0'));
  }
  public surveyOptions(): ElementArrayFinder {
    return element.all(by.css('mat-option.mat-option.ng-star-inserted'));
  }
  public previewElement(): ElementFinder {
    return element(by.className('mobile-preview-mobile'));
  }
  public questionForm(): ElementFinder {
    return element.all(by.css('div.question-form-header')).last();
  }
  public headerField(): ElementFinder {
    return element.all(by.css('input[type=text]')).get(0);
  }
  public headlineField(): ElementFinder {
    return element(by.css('input#mat-input-1'));
  }
  public subHeadlineField(): ElementFinder {
    return element(by.css('input#mat-input-2'));
  }
  public errorMessageField(): ElementFinder {
    return element(by.css('mat-error'));
  }
  public textField(): ElementFinder {
    return element(by.css('input#mat-input-3'));
  }
  public pictureOption(): ElementFinder {
    return element.all(by.css('span.mat-option-text')).get(1);
  }
  public optionWrap(): ElementFinder {
    return element.all(by.css('div.view-wrap')).get(1);
  }
  public pictureChoiceOption(): ElementFinder {
    return element.all(by.css('div.view-text')).get(1);
  }
  public uploadField(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
  }
  public uploadFileChoiceOption(): ElementFinder {
    return element.all(by.css('input[type="file"]')).get(0);
  }
  public headerTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).first();
  }
  public headlineTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).get(1);
  }
  public subHeadlineTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).get(2);
  }
  public questionTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).get(3);
  }

}

export class CreateHitThePinataAppPage {

  public navigateToHitThePinata(): Promise<string> {
    return browser.get('engagements/games/new-pinata') as Promise<string>;
  }
  public uploadedBackgroundImageObj(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img.image'));
  }
  public pinataDesign(): ElementFinder {
    return element.all(by.css('cl-images-preview')).get(1);
  }
  public pinataBackgroundDesign(): ElementFinder {
    return element.all(by.css('cl-images-preview')).get(4);
  }
  public pinataImage(): ElementFinder {
    return element(by.css('img.img'));
  }
  public backgroundElement(): ElementFinder {
    return element(by.css('div.mobile-preview-background'));
  }
  public buttonTextPreview(): ElementFinder {
    return element(by.css('button.mobile-preview-btn'));
  }
  public loadPreviewElement(): ElementFinder {
    return element(by.className('mobile-preview-headline'));
  }
  public headlinePreview(): ElementArrayFinder {
    return element.all(by.className('mobile-preview-headline'));
  }
  public subHeadlinePreview(): ElementArrayFinder {
    return element.all(by.className('mobile-preview-sub-headline'));
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
 public rewardTab(): ElementFinder {
    return element.all(by.css('h3')).get(1);
 }
 public searchBar(): ElementFinder {
    return element(by.css('input'));
 }
 public rewardList(): ElementFinder {
    return element(by.css('table'));
 }
 public createNewButton(): ElementFinder {
    return element(by.css('cl-button'));
 }
 public filterItems(): ElementFinder {
    return element(by.className('name-cell__link'));
 }

}

export class CreateRewardAppPage {

  public navigateToRewardCreate(): Promise<string> {
    return browser.get('rewards/new-reward') as Promise<string>;
  }
  public headerField(): ElementFinder {
    return element.all(by.css('input[ng-reflect-type="text"]')).get(0);
  }
  public voucherCodeField(): ElementFinder {
    return element.all(by.css('input[ng-reflect-type="text"]')).get(1);
  }
  public textField(): ElementArrayFinder {
    return element.all(by.css('textarea'));
  }
  public selectField(): ElementArrayFinder {
    return element.all(by.css('div.mat-select-trigger'));
  }
  public rewardOptions(): ElementArrayFinder {
    return element.all(by.css('span.mat-option-text'));
  }
  public loadRadioButton(): ElementFinder {
    return element.all(by.className('mat-radio-ripple mat-ripple')).get(4);
  }
  public radioButton(): ElementFinder {
    return element.all(by.css('div.mat-radio-outer-circle')).get(4);
  }
  public radioPrimaryButton(): ElementFinder {
    return element.all(by.className('mat-radio-button mat-primary ng-star-inserted')).get(2);
  }
  public fileUploadField(): ElementFinder {
    return element.all(by.css('input[type=file]')).get(1);
  }
  public checkboxField(): ElementArrayFinder {
    return element.all(by.css('input[type=checkbox]'));
  }
  public numberField(): ElementArrayFinder {
    return element.all(by.css('input[type=number]'));
  }
  public slider(): ElementArrayFinder {
    return element.all(by.className('mat-slide-toggle-thumb-container'));
  }
  public inputFileField(): ElementFinder {
    return element(by.css('input[type=file]'));
  }
  public fileUploaded(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
  }
  public errorUploadFile(): ElementFinder {
    return element(by.css('span.upload-error'));
  }
  public fileName(): ElementFinder {
    return element(by.css('span.upload-file-file-name'));
  }
  public errorMessage(): ElementFinder {
    return element(by.className('error upload-file-error ng-star-inserted'));
  }
  public uploadSection(): ElementFinder {
    return element(by.css('input.upload-file-input.ng-star-inserted'));
  }
  public merchantButton(): ElementFinder {
    return element.all(by.css('mat-radio-button')).get(0);
  }
  public firstMerchantsRow(): ElementFinder {
    return element.all(by.css('tr.merchant-row.mat-row.ng-star-inserted')).get(0);
  }
  public addMerchantButton(): ElementFinder {
    return element.all(by.css('cl-button')).last();
  }
  public dropDownMenu(): ElementArrayFinder {
    return element.all(by.className('mat-select-arrow-wrapper'));
  }
  public saveButton(): ElementFinder {
    return element.all(by.css('cl-button')).get(1);
  }
  public closeButton(): ElementFinder {
    return element.all(by.css('cl-button')).get(0);
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

export class BlackcombWalletAppPage {

  public navigateBlackcombWalletApp(): Promise<string> {
    return browser.get('https://generic-blackcomb-dev1.uat.whistler.perxtech.io/wallet') as Promise<string> ;
 }

}

export class BlackcombHomeAppPage {

  public navigateToBlackcombHomeApp(): Promise<string> {
    return browser.get('https://generic-blackcomb-dev1.uat.whistler.perxtech.io/home') as Promise<string> ;
 }

}
