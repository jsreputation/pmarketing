import { ComponentFactoryResolver, ApplicationRef, ComponentRef, EmbeddedViewRef, Injector, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class DynamicCreateService {
  public opendComponent: ComponentRef<any>[] = [];
  constructor(
    private resolve: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) { }
  public getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
  public createComponent<T>(type: any): ComponentRef<T> {
    const factory = this.resolve.resolveComponentFactory<T>(type);
    const component = factory.create(this.injector);
    const rootNode = this.getComponentRootNode(component);
    this.appRef.attachView(component.hostView);
    this.document.body.appendChild(rootNode);
    this.opendComponent.push(component);
    return component;
  }

  public removeComponent<T>(component: ComponentRef<T>): void {
    const position = this.opendComponent.indexOf(component);
    if (position > -1) {
      this.opendComponent.splice(position, 1);
    }
    this.appRef.detachView(component.hostView);
    component.destroy();
  }

  public clearAllComponent(): void {
    this.opendComponent.forEach((component) => {
      this.removeComponent(component);
    });
  }
}
