import { ComponentFactoryResolver, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransactionConditionGroupComponent } from './components/transaction-condition-group/transaction-condition-group.component';
import { AmountConditionGroupComponent } from './components/amount-condition-group/amount-condition-group.component';
import { DateConditionGroupComponent } from './components/date-condition-group/date-condition-group.component';

const componentMapper = {
  transaction: TransactionConditionGroupComponent,
  amount: AmountConditionGroupComponent,
  date: DateConditionGroupComponent,
};

@Directive({
  selector: '[clDynamicFormGroup]'
})
export class DynamicFormGroupDirective implements OnInit, OnChanges {
  @Input() public group: FormGroup;
  @Input() public type: string;
  public componentRef: any;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this.createComponentFactory();
  }

  private createComponentFactory(): void {
    if (!this.type) {
      return;
    }
    this.clear();
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.group = this.group;
  }

  private clear(): void {
    this.container.clear();
  }

  public ngOnChanges(): void {
    this.createComponentFactory();
  }
}
