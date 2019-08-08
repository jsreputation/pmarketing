import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[perxCoreNumericCharacter]'
})
export class NumericCharacterDirective {
  public onlyNumbersRegExp: RegExp = new RegExp('^\\d+$');

  @HostListener('paste', ['$event']) public pasteClipboard(e: ClipboardEvent): boolean {
    // debugger;
    const data = e.clipboardData.getData('text');
    return this.onlyNumbersRegExp.test(data) ? true : false;
  }

  @HostListener('keydown', ['$event']) public onKeyDown(e: KeyboardEvent): boolean {
    // debugger;
    return (e.ctrlKey ||
      e.metaKey ||
      e.code === 'Backspace' ||
      e.code === 'Tab' ||
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight' ||
      e.code === 'Delete' ||
      e.code === 'Enter') ?
      true : this.onlyNumbersRegExp.test(e.key);
  }
}
