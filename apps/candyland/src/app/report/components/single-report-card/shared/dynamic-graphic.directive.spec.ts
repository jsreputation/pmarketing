import { DynamicGraphicDirective } from './dynamic-graphic.directive';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

describe('DynamicGraphicDirective', () => {
  it('should create an instance', () => {
    const test = ({} as ComponentFactoryResolver);
    const container  = ({} as ViewContainerRef);
    const directive = new DynamicGraphicDirective(test, container);
    expect(directive).toBeTruthy();
  });
});
