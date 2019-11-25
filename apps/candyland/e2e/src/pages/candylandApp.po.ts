import {
  browser,
  by,
  element,
  ElementFinder,
  ElementArrayFinder,
} from 'protractor';

export class DashboardAppPage {
  public navigateToDashboard(): Promise<string> {
    return browser.get('dashboard') as Promise<string>;
  }
}

export class EngagementAppPage {

  public static engagementItemArray(): ElementArrayFinder {
    return element.all(by.css('div.engagement-item'));
  }

  public static engagementItemTypeArray(): ElementArrayFinder {
    return element.all(by.css('p.engagement-item-type'));
  }

  public navigateToEngagement(): Promise<string> {
    return browser.get('engagements') as Promise<string>;
  }

  public engagementTabOption(): ElementFinder {
    return element.all(by.css('h3')).get(2);
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

  public gamePinataOptions(): ElementFinder {
    return element.all('img[alt="game-icon"]').get(1);
  }

  public confirmModal(): ElementFinder {
    return element(by.css('cl-confirm-modal'));
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

  public confirmModal(): ElementFinder {
    return element(by.css('cl-confirm-modal'));
  }

}

export class CreateHitThePinataAppPage {

  public navigateToHitThePinata(): Promise<string> {
    return browser.get('engagements/games/new-pinata') as Promise<string>;
  }
  public uploadedBackgroundImageObj(): ElementFinder {
    return element(by.css('div.image-wrap.ng-star-inserted>img.image'));
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

  public static instantRewardBtn(): ElementFinder {
    return element.all(by.css('button.engagement-selector')).get(3);
  }

  public navigateToCreateInstantReward(): Promise<string> {
    return browser.get('engagements/new-instant-reward') as Promise<string> ;
  }

  public mobileHeadline(): ElementFinder {
    return element(by.css('p.mobile-preview-headline'));
  }
  public mobileSubHeadline(): ElementFinder {
    return element(by.css('p.mobile-preview-sub-headline'));
  }

  public cardPreview(): ElementFinder {
    return element(by.css('div.mobile-preview-card'));
  }

  public backgroundPreview(): ElementFinder {
    return element(by.css('div.mobile-preview-background'));
  }

  public mobileButtonPreview(): ElementFinder {
    return element(by.css('button.mobile-preview-btn'));
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
  public dropDownMenu(): ElementArrayFinder {
    return element.all(by.className('mat-select-arrow-wrapper'));
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
    return element.all(by.css('p.engagement-item-name.linkable')).get(0);
  }

}
