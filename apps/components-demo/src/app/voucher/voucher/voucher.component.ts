import { Component } from '@angular/core';
import { INavLink } from 'src/app/navlink.model';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent {
  public navLinks: INavLink[] = [
    { path: 'list', label: 'List' },
    { path: 'detail', label: 'Detail' }
  ];
}
