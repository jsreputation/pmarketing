import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ControlsName } from '../../../../models/controls-name';
import { IGameGifts } from './shared/models/game-gifts.model';
import {
  AvailableNewEngagementService, RoutingStateService, SettingsService, ShakeTreeService
} from '@cl-core/services';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';

@Component({
  selector: 'cl-new-shake-page',
  templateUrl: './new-shake-page.component.html',
  styleUrls: ['./new-shake-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewShakePageComponent implements OnInit, OnDestroy {
  public shakeTree: FormGroup;
  public shakeTreeData$: Observable<{
    gameNumberGift: IGameGifts[],
    gamesTree: IGraphic[],
    giftBox: IGraphic[],
    background: IGraphic[]
  }>;
  public tenantSettings: ITenantsProperties;

  public selectGiftBox: IGraphic;
  public gameGift: AbstractControl;
  private destroy$ = new Subject();
  constructor(private fb: FormBuilder,
              private shakeDataService: ShakeTreeService,
              private routingState: RoutingStateService,
              private router: Router,
              private availableNewEngagementService: AvailableNewEngagementService,
              private cdr: ChangeDetectorRef,
              private settingsService: SettingsService) {
  }
  public get name(): AbstractControl {
    return this.shakeTree.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.shakeTree.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.shakeTree.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.shakeTree.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.shakeTree.get(ControlsName.background);
  }

  public get treeType(): AbstractControl {
    return this.shakeTree.get(ControlsName.treeType);
  }

  public get giftBox(): AbstractControl {
    return this.shakeTree.get(ControlsName.giftBox);
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public get gameGiftView(): AbstractControl {
    return this.shakeTree.get(ControlsName.gameGift);
  }

  public ngOnInit(): void {
    this.getTenants();
    this.createShakeTreeForm();
    this.createGameGiftField();
    this.getData();
  }

  public save(): void {
    this.shakeDataService.createShakeTree(this.shakeTree.value)
      .pipe(untilDestroyed(this))
      .subscribe((data: IResponseApi<IEngagementApi>) => {
        this.availableNewEngagementService.setNewEngagement(data);
        this.router.navigateByUrl('/engagements');
      });
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public setSelectGiftBox(giftBox: IGraphic): void {
    this.selectGiftBox = giftBox;
  }

  private createGameGiftField(): void {
    this.gameGift = this.fb.control(null, [Validators.required]);
  }

  private createShakeTreeForm(): void {
    this.shakeTree = this.fb.group({
      name: ['Shake the Tree Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: ['Tap the tree and Win!', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)]
      ],
      subHeadlineMessage: ['Tap the tree until you get a reward!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      gameGift: [null, [Validators.required]],
      treeType: [null, [Validators.required]],
      giftBox: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['start playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getData(): void {
    this.shakeTreeData$ = this.shakeDataService.getData()
      .pipe(
        tap((res: any) => {
          this.shakeTree.patchValue({
            [ControlsName.background]: res.background[0],
            [ControlsName.giftBox]: res.giftBox[0],
            [ControlsName.treeType]: res.gamesTree[0],
            [ControlsName.gameGift]: res.gameNumberGift[0].value
          });
        })
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cdr.detectChanges();
      });
  }
}
