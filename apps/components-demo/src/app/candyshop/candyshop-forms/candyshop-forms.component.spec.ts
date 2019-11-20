// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { CandyshopFormsComponent } from './candyshop-forms.component';
// import {
//   DatePickerModule,
//   RangeDatePickerModule,
//   SeparateRangeDatePickerModule,
//   TimePickerModule,
//   TagListModule,
//   SmsEditorModule,
//   SelectGraphicModule,
//   UploadGraphicModule,
//   UploadFileModule,
//   SelectGraphicWrapModule,
//   IUploadImageService,
//   IUploadFileService
// } from '@perx/candyshop';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { of } from 'rxjs';

// describe('CandyshopFormsComponent', () => {
//   // let component: CandyshopFormsComponent;
//   let fixture: ComponentFixture<CandyshopFormsComponent>;
//   const uploadImageServiceStub: IUploadImageService = {
//     uploadImage: () => of()
//   };
//   const uploadFileServiceStub: IUploadFileService = {
//     uploadFile: () => of()
//   };

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [CandyshopFormsComponent],
//       imports: [
//         DatePickerModule,
//         RangeDatePickerModule,
//         SeparateRangeDatePickerModule,
//         TimePickerModule,
//         TagListModule,
//         SmsEditorModule,
//         SelectGraphicModule,
//         SelectGraphicWrapModule,
//         UploadGraphicModule.forRoot({
//           url: '',
//           service: uploadImageServiceStub
//         }),
//         UploadFileModule.forRoot({
//           url: '',
//           service: uploadFileServiceStub
//         }),
//         NoopAnimationsModule
//       ],
//       providers: [

//       ]
//     })
//       .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CandyshopFormsComponent);
//     // component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     // expect(component).toBeTruthy();
//   });
// });
