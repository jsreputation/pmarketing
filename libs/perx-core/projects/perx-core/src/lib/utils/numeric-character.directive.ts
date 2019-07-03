import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[perxCoreNumericCharacter]'
})
export class NumericCharacterDirective {
  onlyNumbersRegExp: RegExp = new RegExp('^\\d+$');

  @HostListener('paste', ['$event']) pasteClipboard(e: ClipboardEvent): boolean {
    // debugger;
    const data = e.clipboardData.getData('text');
    return this.onlyNumbersRegExp.test(data) ? true : false;
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent): boolean {
    // debugger;
    return (e.ctrlKey ||
      e.metaKey ||
      e.code === 'Backspace' || // backspace
      e.code === 'Tab' || // tab
      e.code === 'ArrowLeft' || // left
      e.code === 'ArrowRight' || // right
      e.code === 'Delete' || // delete
      e.metaKey) ? // meta
      true : this.onlyNumbersRegExp.test(e.key);
  }
}
