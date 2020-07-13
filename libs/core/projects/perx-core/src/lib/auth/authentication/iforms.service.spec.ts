import { TestBed } from '@angular/core/testing';
import { IFormsService } from './iforms.service';
import { Type } from '@angular/core';

describe('IFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [IFormsService]
  }));

  it('should be created', () => {
    const service: IFormsService = TestBed.get(IFormsService as Type<IFormsService>);
    expect(service).toBeTruthy();
  });
});
