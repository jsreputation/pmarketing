import { ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ApplicationRef, ComponentRef, EmbeddedViewRef, Injector, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


export class DinamicCreateService {
  public opendComponent: ComponentRef<any>[] = []
  constructor(
    private resolve: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document : Document
  ) { }
  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }
  public createComponent<T>(type): ComponentRef<T>{
    const factory = this.resolve.resolveComponentFactory<T>(type);
    const component = factory.create(this.injector)
    const rootNode = this.getComponentRootNode(component);
    this.appRef.attachView(component.hostView);
    this.document.body.appendChild(rootNode);
    this.opendComponent.push(component);
    return component;
  }

  public removeComponent<T>(component:ComponentRef<T>) {
    const position = this.opendComponent.indexOf(component);
    if(position > -1 ) {
      this.opendComponent.splice(position, 1);
    }
    this.appRef.detachView(component.hostView);
    component.destroy();
  }

  public clearAllComponent() {
    this.opendComponent.forEach((component)=>{
      this.removeComponent(component);
    })
  }
}
