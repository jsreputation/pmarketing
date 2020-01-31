# PerxCandyshop

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Code scaffolding

Run `ng generate component component-name --project perx-candyshop` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project perx-candyshop`.
> Note: Don't forget to add `--project perx-candyshop` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build perx-candyshop` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build perx-candyshop`, go to the dist folder `cd dist/perx-candyshop` and run `npm publish`.

## Running unit tests

Run `ng test perx-candyshop` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


##Requirements for the custom form fields components:
- must implement the ControlValueAccessor interface
- must implement the MatFormFieldControl interface (for a faster implementation, you can extends from the CsFormFieldControl class)
- the component should accept all content from outside (via @Input, ng-content)
- the pickers in the default configuration should behave like mat-select (clicking on a component - the appearance of a dialog - set value).
