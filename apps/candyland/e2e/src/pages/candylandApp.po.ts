import {
  browser,
  by,
  element,
  ElementFinder,
  ElementArrayFinder,
} from 'protractor';

export class DashboardAppPage {
  public static navigateToDashboard(): Promise<string> {
    return browser.get('dashboard') as Promise<string>;
  }
}

export class EngagementAppPage {

  public static navigateToEngagement(): Promise<string> {
    return browser.get('engagements') as Promise<string>;
  }

  public static engagementItemArray(): ElementArrayFinder {
    return element.all(by.css('div.engagement-item'));
  }

  public static engagementItemTypeArray(): ElementArrayFinder {
    return element.all(by.css('p.engagement-item-type'));
  }

  public static selectEngagementTypeDialog(): ElementFinder {
    return element(by.css('mat-dialog-content'));
  }

  public static engagementTypeOptions(): ElementArrayFinder {
    return element.all(by.css('cl-type-item'));
  }

  public static activeEngagementTypeOption(): ElementFinder {
    return element(by.css('button.engagement-selector.active'));
  }

  public static itemName(): ElementFinder {
    return element.all(by.css('p.engagement-item-name')).first();
  }

  public  static itemInfo(): ElementFinder {
    return element.all(by.css('div.engagement-item-info>p.engagement-item-name')).first();
  }

  public static gamePinataOptions(): ElementFinder {
    return element.all(by.css('img[alt="game-icon"]')).get(1);
  }

  public static gamePinataName(): ElementFinder {
    return element.all(by.css('.engagement-selector-game>.engagement-selector-name')).get(1);
  }

  public confirmModal(): ElementFinder {
    return element(by.css('cl-confirm-modal'));
  }
}

export class CreateShakeTheTreeAppPage {
  public static navigateToShakeTheTree(): Promise<string> {
    return browser.get('engagements/games/new-shake') as Promise<string> ;
  }

  public static shakeTreeGamesButton(): ElementFinder {
    return element(by.className('btn mat-flat-button primary'));
  }

  public static shakeTreeTypeOptions(): ElementFinder {
    return element.all(by.tagName('cl-type-item')).get(1);
  }

  public static firstPresentOption(): ElementArrayFinder {
    return element.all(by.css('img[alt=game-icon]'));
  }

  public static secondPresentOption(): ElementFinder {
    return element(by.css('h2.dialog-title'));
  }

  public static mobilePreviewCheck(): ElementFinder {
    return element(by.className('mobile-preview mobile-content-multiple'));
  }

  public static shakeTreePreviewSubHeadline(): ElementFinder {
    return element(by.className('mobile-preview-sub-headline'));
  }

  public static shakeTreePreviewButton(): ElementFinder {
    return element(by.className('mobile-preview-btn'));
  }

  public static treeDesignPreview(): ElementFinder {
    return element(by.className('tree__img ng-star-inserted'));
  }

  public static shakeTreePreviewBackground(): ElementFinder {
    return element(by.className('mobile-preview-background'));
  }

  public static dropdownList(): ElementFinder {
    return element(by.css('div.mat-select-arrow'));
  }

  public static selectOption(): ElementFinder {
    return element.all(by.className('mat-option ng-star-inserted')).get(1);
  }

  public static selectedAmountPreview(): ElementArrayFinder {
    return element.all(by.css('img.gift-img'));
  }

  public static giftDesign(): ElementFinder {
    return element.all(by.className('image-wrap')).get(4);
  }

  public static previewMyChoice(): ElementFinder {
    return element(by.className('gift-img gift-img__1 ng-star-inserted'));
  }

  public static uploadedImageObj(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
  }

  public static errorUploadMessage(): ElementFinder {
    return element.all(by.css('p.upload-error.ng-star-inserted')).get(1);
  }

  public static giftPreview(): ElementFinder {
    return element(by.css('div.gift-wrapper.gift-wrapper__1.hang.ng-star-inserted>img'));
  }

  public static shakeTreeSaveButton(): ElementFinder {
    return element(by.css('button.btn.mat-flat-button.primary'));
  }

  public static launchNowButton(): ElementFinder {
    return element.all(by.css('button.btn.mat-flat-button.primary')).last();
  }

  public static transactionDate(): ElementFinder {
    return element.all(by.css('p.engagement-item-date')).first();
  }

  public static launchLaterBtn(): ElementFinder {
    return element(by.css('button.btn.mat-flat-button.secondary'));
  }
}
export class LoginAppPage {

  public static navigateToLogin(): Promise<string> {
    return browser.get('login') as Promise<string> ;
  }

  public static accountIDField(): ElementFinder {
    return element.all(by.css('input')).first();
  }

  public static userAccountField(): ElementFinder {
    return element.all(by.css('input')).get(1);
  }

  public static pwField(): ElementFinder {
    return element.all(by.css('input')).get(2);
  }

  public static getAccountId(): string {
    return 'generic';
  }

  public static getUserAccount(): string {
    return 'Admin';
  }

  public static getPassword(): string {
    return 'asdfjkl;';
  }

}

export class CreateSurveyAppPage {

  public static navigateToSurvey(): Promise<string> {
    return browser.get('engagements/new-survey') as Promise<string>;
  }

  public static headerByIdField(): ElementFinder {
    return element(by.id('mat-input-0'));
  }

  public static headlineByIdField(): ElementFinder {
    return element(by.id('mat-input-1'));
  }

  public static subHeadlineByIdField(): ElementFinder {
    return element(by.id('mat-input-2'));
  }

  public static previewElement(): ElementFinder {
    return element(by.className('mobile-preview'));
  }

  public static errorMessageByIdField(): ElementFinder {
    return element(by.id('mat-error-0'));
  }

  public static subHeadlineField(): ElementFinder {
    return element(by.css('input#mat-input-2'));
  }

  public static loadQuestionButton(): ElementFinder {
    return element.all(by.css('cl-button>button')).last();
  }

  public static surveyOptions(): ElementArrayFinder {
    return element.all(by.css('mat-option.mat-option.ng-star-inserted'));
  }

  public static optionWrap(): ElementFinder {
    return element.all(by.css('div.view-wrap')).get(1);
  }

  public static questionForm(): ElementFinder {
    return element.all(by.css('div.question-form-header')).last();
  }

  public static pictureChoiceOption(): ElementFinder {
    return element.all(by.css('div.view-text')).get(1);
  }

  public static textField(): ElementFinder {
    return element(by.css('input#mat-input-3'));
  }

  public static headerTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).first();
  }

  public static headlineTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).get(1);
  }

  public static subHeadlineTextField(): ElementFinder {
    return element.all(by.css('div.mat-form-field-infix>input')).get(2);
  }
}

export class CreateHitThePinataAppPage {

  public static navigateToHitThePinata(): Promise<string> {
    return browser.get('engagements/games/new-pinata') as Promise<string>;
  }

  public static headlinePreview(): ElementArrayFinder {
    return element.all(by.className('mobile-preview-headline'));
  }

  public static subHeadlinePreview(): ElementArrayFinder {
    return element.all(by.className('mobile-preview-sub-headline'));
  }

  public static pinataImage(): ElementFinder {
    return element(by.css('img.img'));
  }

  public uploadedBackgroundImageObj(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
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
}
export class CreateInstantRewardAppPage {

  public static instantRewardBtn(): ElementFinder {
    return element.all(by.css('button.engagement-selector')).get(3);
  }

  public static navigateToCreateInstantReward(): Promise<string> {
    return browser.get('engagements/new-instant-reward') as Promise<string> ;
  }

  public static mobileHeadline(): ElementFinder {
    return element(by.css('p.mobile-preview-headline'));
  }
  public static mobileSubHeadline(): ElementFinder {
    return element(by.css('p.mobile-preview-sub-headline'));
  }

  public static cardPreview(): ElementFinder {
    return element(by.css('div.mobile-preview-card'));
  }

  public static backgroundPreview(): ElementFinder {
    return element(by.css('div.mobile-preview-background'));
  }

  public static mobileButtonPreview(): ElementFinder {
    return element(by.css('button.mobile-preview-btn'));
  }

}

export class RewardAppPage {

  public static navigateToReward(): Promise<string> {
    return browser.get('rewards') as Promise<string>;
  }

  public static searchBar(): ElementFinder {
    return element(by.css('input'));
  }

  public static rewardList(): ElementFinder {
    return element(by.css('table'));
  }

  public static filterItems(): ElementFinder {
    return element(by.className('name-cell__link'));
  }
}

export class CreateRewardAppPage {

  public static navigateToRewardCreate(): Promise<string> {
    return browser.get('rewards/new-reward') as Promise<string>;
  }

  public static headerField(): ElementFinder {
    return element.all(by.css('input[ng-reflect-type="text"]')).get(0);
  }

  public static textField(): ElementArrayFinder {
    return element.all(by.css('textarea'));
  }

  public static loadRadioButton(): ElementFinder {
    return element.all(by.className('mat-radio-ripple mat-ripple')).get(4);
  }

  public static radioButton(): ElementFinder {
    return element.all(by.css('div.mat-radio-outer-circle')).get(4);
  }

  public static checkboxField(): ElementArrayFinder {
    return element.all(by.css('input[type=checkbox]'));
  }

  public static slider(): ElementArrayFinder {
    return element.all(by.className('mat-slide-toggle-thumb-container'));
  }

  public static imageClear(): ElementFinder {
    return element(by.css('.image-clear'));
  }

  public static radioPrimaryButton(): ElementFinder {
    return element.all(by.className('mat-radio-button mat-primary ng-star-inserted')).get(2);
  }

  public static uploadSection(): ElementFinder {
    return element(by.css('input.upload-file-input.ng-star-inserted'));
  }

  public static errorMessage(): ElementFinder {
    return element(by.className('error upload-file-error ng-star-inserted'));
  }

  public static merchantButtonArray(): ElementArrayFinder {
    return element.all(by.css('.merchant-btn.mat-stroked-button.mat-primary'));
  }

  public static dropDownMenu(): ElementArrayFinder {
    return element.all(by.className('mat-select-arrow-wrapper'));
  }

  public selectField(): ElementArrayFinder {
    return element.all(by.css('div.mat-select-trigger'));
  }
  public rewardOptions(): ElementArrayFinder {
    return element.all(by.css('span.mat-option-text'));
  }
  public fileUploadField(): ElementFinder {
    return element.all(by.css('input[type=file]')).get(1);
  }
  public numberField(): ElementArrayFinder {
    return element.all(by.css('input[type=number]'));
  }
  public inputFileField(): ElementFinder {
    return element(by.css('input[type=file]'));
  }
  public fileUploaded(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
  }
  public fileName(): ElementFinder {
    return element(by.css('span.upload-file-file-name'));
  }
  public firstMerchantsRow(): ElementFinder {
    return element.all(by.css('tr.mat-row.ng-star-inserted')).get(0);
  }

}

export class CampaignAppPage {

  public static navigateToCampaign(): Promise<string> {
    return browser.get('campaigns') as Promise<string> ;
  }

}

export class CreateCampaignAppPage {

  public static navigateToCreateCampaign(): Promise<string> {
    return browser.get('campaigns/new-campaign') as Promise<string> ;
  }

  public static campaignDialogTitle(): ElementFinder {
    return element(by.id('dialogTitle-selectRewards'));
  }

  public static campaignMatRadioAudience(): ElementFinder {
    return element(by.xpath('//*[@id="mat-radio-5"]/label/div[1]/div[1]'));
  }

  public static campaignMatRadioSms(): ElementFinder {
    return element(by.xpath('//*[@id="mat-radio-8"]/label/div[1]/div[1]'));
  }

}

export class GeneralSettingsAppPage {

  public static navigateToGeneralSettings(): Promise<string> {
    return browser.get('settings/general') as Promise<string> ;
  }

}

export class BrandingSettingsAppPage {

  public static navigateToBrandingSettings(): Promise<string> {
    return browser.get('settings/branding') as Promise<string> ;
  }

}

export class AudienceAppPage {

  public static navigateToAudience(): Promise<string> {
    return browser.get('audience') as Promise<string> ;
  }

  public static audienceList(): ElementFinder {
    return element(by.css('mat-select[formcontrolname=audienceList]'));
  }

  public static audienceSpan(): ElementFinder {
    return element(by.xpath('(//*[@href="/audience/1"][1]/span)[2]'));
  }

  public static audienceColumnList(): ElementArrayFinder {
    return element.all(by.css('td.column-audiencelist'));
  }

}

export class BlackcombWalletAppPage {
  public navigateBlackcombWalletApp(): Promise<string> {
    return browser.get('https://generic-blackcomb-dev1.uat.whistler.perxtech.io/wallet') as Promise<string> ;
  }
}

export class BlackcombHomeAppPage {
  public static navigateToBlackcombHomeApp(): Promise<string> {
    return browser.get('https://generic-blackcomb-dev1.uat.whistler.perxtech.io/home') as Promise<string> ;
  }
}

export class BlackcombHistoryAppPage {
  public static navigateToBlackcombHistoryApp(): Promise<string> {
    return browser.get('https://generic-blackcomb-dev1.uat.whistler.perxtech.io/loading?cid=86') as Promise<string> ;
  }
}

export class ElementApp {
  public static h3Array(): ElementArrayFinder {
    return element.all(by.css('h3'));
  }

  public static h1(): ElementFinder {
    return element(by.css('h1'));
  }

  public static h4(): ElementFinder {
    return element(by.css('h4'));
  }

  public static inputText(): ElementFinder {
    return element(by.css('input[type=text]'));
  }

  public static inputTextArray(): ElementArrayFinder {
    return element.all(by.css('input[type=text]'));
  }

  public static inputEmail(): ElementFinder {
    return element(by.css('input[type=email]'));
  }

  public static inputTel(): ElementFinder {
    return element(by.css('input[type=tel]'));
  }

  public static inputFile(): ElementFinder {
    return element(by.css('input[type=file]'));
  }

  public static inputFileArray(): ElementArrayFinder {
    return element.all(by.css('input[type=file]'));
  }

  public static inputNumberArray(): ElementArrayFinder {
    return element.all(by.css('input[type=number]'));
  }

  public static clButton(): ElementFinder {
    return element(by.css('cl-button'));
  }

  public static clButtonArray(): ElementArrayFinder {
    return element.all(by.css('cl-button'));
  }

  public static matSelectCountry(): ElementFinder {
    return element(by.css('mat-select[formcontrolname=country]'));
  }

  public static matPseudoCheckbox(): ElementArrayFinder {
    return element.all(by.css('mat-pseudo-checkbox'));
  }

  public static spanMatOptionText(): ElementArrayFinder {
    return element.all(by.css('span.mat-option-text'));
  }

  public static matRowInserted(): ElementArrayFinder {
    return element.all(by.css('tr.mat-row.ng-star-inserted'));
  }

  public static matIconButton(): ElementArrayFinder {
    return element.all(by.css('button.mat-icon-button'));
  }

  public static menuItemButton(): ElementFinder {
    return element(by.css('button[role=menuitem]'));
  }

  public static matCheckboxArray(): ElementArrayFinder {
    return element.all(by.css('mat-checkbox'));
  }

  public static matTabBody(): ElementFinder {
    return element(by.css('mat-tab-body'));
  }

  public static matError(): ElementFinder {
    return element(by.css('mat-error'));
  }

  public static matTabLinkArray(): ElementArrayFinder {
    return element.all(by.css('a.mat-tab-link'));
  }

  public static matSelectValueArray(): ElementArrayFinder {
    return element.all(by.css('div.mat-select-value'));
  }

  public static matTabGroup(): ElementFinder {
    return element(by.css('mat-tab-group'));
  }

  public static matToolbar(): ElementFinder {
    return element.all(by.css('mat-toolbar')).get(1);
  }

  public static matToolbarLinkArray(): ElementArrayFinder {
    return element.all(by.css('mat-toolbar>a'));
  }

  public static matCardArray(): ElementArrayFinder {
    return element.all(by.css('mat-card'));
  }

  public static clSimpleMobileView(): ElementFinder {
    return element(by.css('cl-simple-mobile-view'));
  }

  public static pickerButton(): ElementArrayFinder {
    return element.all(by.css('button.picker-btn'));
  }

  public static matRadioInnerCircle(): ElementArrayFinder {
    return element.all(by.css('div.mat-radio-inner-circle'));
  }

  public static spanUploadError(): ElementFinder {
    return element(by.css('span.upload-error'));
  }

  public static matFormFieldFlex(): ElementArrayFinder {
    return element.all(by.css('div.mat-form-field-flex'));
  }

  public static matSelectArrowWrapper(): ElementArrayFinder {
    return element.all(by.css('div.mat-select-arrow-wrapper'));
  }

  public static matFlatButtonArray(): ElementArrayFinder {
    return element.all(by.css('button.btn.mat-flat-button'));
  }

  public static matTable(): ElementFinder {
    return element(by.className('table mat-table'));
  }

  public static tdGridCell(): ElementArrayFinder {
    return element.all(by.css('td[role=gridcell]'));
  }

  public static pRewardItem(): ElementArrayFinder {
    return element.all(by.css('p.reward-item-name'));
  }

  public static matCheckboxFrame(): ElementArrayFinder {
    return element.all(by.css('div.mat-checkbox-frame'));
  }

  public static matCheckboxInnerContainer(): ElementArrayFinder {
    return element.all(by.css('div.mat-checkbox-inner-container'));
  }

  public static matExpansionPanel(): ElementArrayFinder {
    return element.all(by.css('mat-expansion-panel'));
  }

  public static matExpansionPanelHeader(): ElementArrayFinder {
    return element.all(by.css('mat-expansion-panel-header'));
  }

  public static matSelectTrigger(): ElementArrayFinder {
    return element.all(by.css('div.mat-select-trigger'));
  }

  public static matRadioGroup(): ElementArrayFinder {
    return element.all(by.css('mat-radio-group'));
  }

  public static matSelect(): ElementArrayFinder {
    return element.all(by.css('mat-select'));
  }

  public static spanUploadFile(): ElementFinder {
    return element(by.css('span.upload-file-file-name'));
  }

  public static matRadioButton(): ElementArrayFinder {
    return element.all(by.css('mat-radio-button'));
  }

  public static matCard(): ElementFinder {
    return element(by.css('mat-card'));
  }

  public static divQuestion(): ElementArrayFinder {
    return element.all(by.css('div.question'));
  }

  public static divWelcomeText(): ElementFinder {
    return element(by.css('div.welcome-text.ng-star-inserted'));
  }

  public static divTitle(): ElementArrayFinder {
    return element.all(by.css('div[class=title]'));
  }

  public static matButtonRipple(): ElementFinder {
    return element(by.css('div.mat-button-ripple'));
  }

  public static matTabList(): ElementFinder {
    return element(by.css('div.mat-tab-list'));
  }

  public static spanMatButtonWrapper(): ElementFinder {
    return element(by.css('span.mat-button-wrapper'));
  }

  public static imgArray(): ElementArrayFinder {
    return element.all(by.css('img'));
  }

  public static button(): ElementFinder {
    return element(by.css('button'));
  }

  public static matTabLabelContent(): ElementArrayFinder {
    return element.all(by.css('div.mat-tab-label-content'));
  }
  public static inputArray(): ElementArrayFinder {
    return element.all(by.css('input'));
  }

  public static designImageArray(): ElementArrayFinder {
    return element.all(by.css('cl-images-preview'));
  }

  public static engagementCreated(): ElementFinder {
    return element.all(by.css('p.engagement-item-name')).get(0);
  }

  public static mobilePreviewHeadline(): ElementFinder {
    return element(by.className('mobile-preview-headline'));
  }

  public static pMobilePreviewHeadline(): ElementFinder {
    return element(by.css('p.mobile-preview-headline'));
  }

  public static clImagesPreview(): ElementArrayFinder {
    return element.all(by.tagName('cl-images-preview'));
  }

  public static mobilePreviewBackground(): ElementFinder {
    return element(by.css('div.mobile-preview-background'));
  }

  public static matFlatButtonPrimaryArray(): ElementArrayFinder {
    return element.all(by.className('btn mat-flat-button primary'));
  }

  public static clConfirmDialog(): ElementFinder {
    return element(by.css('cl-confirm-modal'));
  }

  public static matFlatButtonPrimary(): ElementFinder {
    return element(by.className('btn mat-flat-button primary'));
  }

  public static imageWrap(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img'));
  }

  public static errorUploadMessage(): ElementFinder {
    return element.all(by.css('p.upload-error.ng-star-inserted')).get(1);
  }

  public static mobileButtonPreview(): ElementFinder {
    return element(by.css('button.mobile-preview-btn'));
  }
}
