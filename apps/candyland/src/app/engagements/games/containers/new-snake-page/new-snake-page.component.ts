import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ControlsName } from '../../../../models/controls-name';
import {
  AvailableNewEngagementService, SnakeService, RoutingStateService, TenantStoreService
} from '@cl-core/services';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import { IWEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
import { ISnakeForm } from '@cl-core/models/games/snake/snake-form';

@Component({
  selector: 'cl-new-snake-page',
  templateUrl: './new-snake-page.component.html',
  styleUrls: ['./new-snake-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSnakePageComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, { static: false }) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();

  public id: string;
  public form: FormGroup;
  public snakeData: IGameDefaultData;
  public tenantSettings: ITenantsProperties;

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

  public get snakeType(): AbstractControl {
    return this.form.get(ControlsName.snakeType);
  }

  constructor(
    private fb: FormBuilder,
    private snakeService: SnakeService,
    private routingState: RoutingStateService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tenantStoreService: TenantStoreService
  ) {
  }

  public ngOnInit(): void {
    this.initTenantSettings();
    this.createSnakeForm();
    combineLatest([this.getSnakeData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, snake]) => {
          this.snakeData = previewData;
          const patchData = snake || this.getDefaultValue(previewData);
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
            return this.snakeService.updateSnake(this.id, { ...this.form.value, image_url: imageUrl.url });
          }
          return this.snakeService.createSnake({ ...this.form.value, image_url: imageUrl.url }).pipe(
            tap(
              (engagement: IJsonApiItemPayload<IWEngagementAttributes>) =>
                this.availableNewEngagementService.transformAndSetNewEngagement(engagement)
            )
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.router.navigateByUrl('/engagements'));
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  private createSnakeForm(): void {
    this.form = this.fb.group({
      name: ['Hit the Snake Template', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(60)]
      ],
      headlineMessage: ['Play Snake and Win!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: ['classic snake game!', [
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      snake: [null, [Validators.required]],
      background: [null, []],
      buttonText: ['start playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getDefaultValue(data: IGameDefaultData): Partial<ISnakeForm> {
    return {
      name: 'Snake Template',
      headlineMessage: 'Play Snake and Win!',
      subHeadlineMessage: 'classic snake game!',
      buttonText: 'Start Playing',
      [ControlsName.snakeType]: data.snakeType[0],
      [ControlsName.targetIcon]: data.targetIcon[0],
      [ControlsName.background]: data.background[0],
      [ControlsName.gameArea]: data.gameArea[0],
      image_url: null
    };
  }

  private getSnakeData(): Observable<IGameDefaultData> {
    return this.snakeService.getSnakeData();
  }

  private initTenantSettings(): void {
    this.tenantStoreService.tenant$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ITenantsProperties) => {
        this.tenantSettings = res;
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<null | ISnakeForm> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.snakeService.getSnake(id);
        }
        return of(null);
      }),
      tap(snake => this.checkGameType(snake)),
      takeUntil(this.destroy$)
    );
  }

  private checkGameType(snake: ISnakeForm): void {
    if (snake && snake.gameType !== 'snake') {
      console.warn('Wrong type of game!');
      this.router.navigateByUrl('/engagements');
    }
  }
}
