import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[clDynamicFormGroup]'
})
export class DynamicFormGroupDirective implements OnInit, OnChanges {
  @Input() public group: FormGroup;
  @Input() public type: string;
  @Input() public config: any = null;
  @Input() public componentMap: {[type: string]: any};
  public componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this.createComponentFactory();
  }

  private createComponentFactory(): void {
    if (!this.type || !this.group || !this.componentMap) {
      return;
    }
    this.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentMap[this.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.config = this.config;
  }

  private clear(): void {
    this.container.clear();
  }

  public ngOnChanges(): void {
    this.createComponentFactory();
  }
}
