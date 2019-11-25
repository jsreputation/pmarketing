import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  ParamMap,
  Router
} from '@angular/router';

import {
  tap,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import {
  combineLatest,
  Observable,
  of,
  Subject
} from 'rxjs';

import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import {
  AvailableNewEngagementService,
  ScratchService,
  RoutingStateService,
  SettingsService
} from '@cl-core/services';

import { ControlsName } from '../../../../models/controls-name';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import { IWScratchGameEngagementAttributes } from '@perx/whistler';

@Component({
  selector: 'cl-new-scratch-page',
  templateUrl: './new-scratch-page.component.html',
  styleUrls: ['./new-scratch-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewScratchPageComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, {static: false}) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();

  public id: string;
  public form: FormGroup;
  public scratchData: IGameDefaultData;
  public tenantSettings: ITenantsProperties;
  public currentPostScratchImageUrl: string = null;

  public get name(): AbstractControl {
    return this.form.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.form.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.form.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.form.get(ControlsName.buttonText);
  }

  public get preScratchImage(): AbstractControl {
    return this.form.get(ControlsName.preScratchImage);
  }

  public get postScratchSuccessImage(): AbstractControl {
    return this.form.get(ControlsName.postScratchSuccessImage);
  }

  public get postScratchFailImage(): AbstractControl {
    return this.form.get(ControlsName.postScratchFailImage);
  }

  public get background(): AbstractControl {
    return this.form.get(ControlsName.background);
  }

  public get postScratchImage(): string {
    return this.currentPostScratchImageUrl ||
      this.getImgLink(this.postScratchSuccessImage as FormControl, 'assets/images/background/background1.png');
  }

  constructor(
    private fb: FormBuilder,
    private scratchService: ScratchService,
    private routingState: RoutingStateService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.getTenants();
    this.initScratchForm();
    combineLatest([this.getScratchData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, scratch]) => {
          this.scratchData = previewData;
          const patchData = scratch || this.getDefaultValue(previewData);
          this.form.patchValue(patchData);
          this.cd.detectChanges();
        },
        (error: Error) => {
          console.warn(error.message);
          this.router.navigateByUrl('/engagements');
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.simpleMobileViewComponent.createPreview()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.scratchService.updateScratch(this.id, {...this.form.value, image_url: imageUrl.url});
          }
          return this.scratchService.createScratch({...this.form.value, image_url: imageUrl.url})
            .pipe(
              tap(
                (engagement: IJsonApiPayload<IWScratchGameEngagementAttributes>) =>
                  this.availableNewEngagementService.transformAndSetNewEngagement(engagement)
              )
            );
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/engagements'));
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public selectPostGraphic(graphic: IGraphic): void {
    if (graphic.fullImg) {
      this.currentPostScratchImageUrl = ImageControlValue.prepareImage(graphic.fullImg);
    } else {
      this.currentPostScratchImageUrl = ImageControlValue.prepareImage(graphic.img);
    }
  }

  private initScratchForm(): void {
    this.form = this.fb.group({
      name: ['Scratch the Card Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: ['Scratch the Card and Win!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: ['Scratch the Card until you get a reward!', [
        Validators.minLength(5),
        Validators.maxLength(250)
      ]],
      buttonText: ['Start Playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      preScratchImage: [null, [Validators.required]],
      postScratchSuccessImage: [null, [Validators.required]],
      postScratchFailImage: [null, [Validators.required]],
      background: [null, []]
    });
  }

  private getDefaultValue(data: IGameDefaultData): IScratchForm {
    return {
      name: 'Scratch the Card Template',
      headlineMessage: 'Scratch it!',
      subHeadlineMessage: 'Scratch it to get a reward!',
      buttonText: 'Start Playing',
      [ControlsName.preScratchImage]: data.preScratchImage[0],
      [ControlsName.postScratchSuccessImage]: data.postScratchSuccessImage[0],
      [ControlsName.postScratchFailImage]: data.postScratchFailImage[0],
      [ControlsName.background]: data.background[0],
      image_url: null
    };
  }

  private getScratchData(): Observable<IGameDefaultData> {
    return this.scratchService.getScratchData();
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<null | IScratchForm> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.scratchService.getScratch(id);
        }
        return of(null);
      }),
      tap(scratch => this.checkGameType(scratch)),
      takeUntil(this.destroy$)
    );
  }

  private checkGameType(scratch: IScratchForm): void {
    if (scratch && scratch.gameType !== 'scratch') {
      console.warn('Wrong type of game!');
      this.router.navigateByUrl('/engagements');
    }
  }
}
