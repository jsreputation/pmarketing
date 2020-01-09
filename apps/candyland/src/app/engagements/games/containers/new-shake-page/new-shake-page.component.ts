import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ControlsName } from '../../../../models/controls-name';
import {
  AvailableNewEngagementService, RoutingStateService, ShakeTreeService
} from '@cl-core/services';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import { IWEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
import { TenantService } from '@cl-core/services/tenant.service';

@Component({
  selector: 'cl-new-shake-page',
  templateUrl: './new-shake-page.component.html',
  styleUrls: ['./new-shake-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewShakePageComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, { static: false }) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();

  public id: string;
  public form: FormGroup;
  public shakeTreeData: IGameDefaultData;
  public tenantSettings: ITenantsProperties;

  public selectGiftBox: IGraphic;
  public gameGift: AbstractControl;

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

  public get background(): AbstractControl {
    return this.form.get(ControlsName.background);
  }

  public get treeType(): AbstractControl {
    return this.form.get(ControlsName.treeType);
  }

  public get giftBox(): AbstractControl {
    return this.form.get(ControlsName.giftBox);
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public get gameGiftView(): AbstractControl {
    return this.form.get(ControlsName.gameGift);
  }

  constructor(
    private fb: FormBuilder,
    private shakeTreeService: ShakeTreeService,
    private routingState: RoutingStateService,
    private route: ActivatedRoute,
    private router: Router,
    private availableNewEngagementService: AvailableNewEngagementService,
    private cd: ChangeDetectorRef,
    private tenantService: TenantService
  ) {
  }

  public ngOnInit(): void {
    this.initTenantSettings();
    this.initShakeTreeForm();
    this.initGameGiftField();
    combineLatest([this.getData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, shake]) => {
          this.shakeTreeData = previewData;
          const patchData = shake || this.getDefaultValue(previewData);
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
            return this.shakeTreeService.updateShakeTree(this.id, {
              ...this.form.value as IShakeTreeForm,
              image_url: imageUrl.url
            });
          }
          return this.shakeTreeService
            .createShakeTree({ ...this.form.value as IShakeTreeForm, image_url: imageUrl.url })
            .pipe(
              tap(
                (engagement: IJsonApiItemPayload<IWEngagementAttributes>) =>
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

  public setSelectGiftBox(giftBox: IGraphic): void {
    this.selectGiftBox = giftBox;
  }

  private initGameGiftField(): void {
    this.gameGift = this.fb.control(null, [Validators.required]);
  }

  private initShakeTreeForm(): void {
    this.form = this.fb.group({
      name: ['Shake the Tree Template', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(60)]
      ],
      headlineMessage: ['Tap the Tree and Win!', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)]
      ],
      subHeadlineMessage: ['Tap the tree until you get a reward!', [
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      gameGift: [null, [Validators.required]],
      treeType: [null, [Validators.required]],
      giftBox: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['Start Playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getData(): Observable<IGameDefaultData> {
    return this.shakeTreeService.getData();
  }

  private getDefaultValue(data: IGameDefaultData): IShakeTreeForm {
    return {
      name: 'Shake the Tree Template',
      headlineMessage: 'Tap the Tree and Win!',
      subHeadlineMessage: 'Tap the tree until you get a reward!',
      buttonText: 'Start Playing',
      [ControlsName.background]: data.background[0],
      [ControlsName.giftBox]: data.giftBox[0],
      [ControlsName.treeType]: data.gamesTree[0],
      [ControlsName.gameGift]: data.gameNumberGift[0].value,
      image_url: null
    };
  }

  private initTenantSettings(): void {
    this.tenantService.getSettings()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ITenantsProperties) => {
        this.tenantSettings = res;
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<IShakeTree | null> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.shakeTreeService.getShakeTree(id);
        }
        return of(null);
      }),
      tap(shakeTree => this.checkGameType(shakeTree)),
      takeUntil(this.destroy$)
    );
  }

  private checkGameType(shakeTree: IShakeTree): void {
    if (shakeTree && shakeTree.gameType !== 'shake') {
      console.warn('Wrong type of game!');
      this.router.navigateByUrl('/engagements');
    }
  }
}
