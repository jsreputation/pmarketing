import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICatalog,
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  public catalogsPageId: number = 1;

  @Input('catalogs')
  public catalogs$: Observable<ICatalog[]>;

  @Input()
  public catalogsEnded: boolean;

  @Output()
  public tapped: EventEmitter<ICatalog> = new EventEmitter<ICatalog>();

  @Output()
  public loadCatalogs: EventEmitter<number> = new EventEmitter<number>(); // next into loadCatalogs in parent with id

  public ngOnInit(): void {
    this.loadCatalogs.emit(this.catalogsPageId);
  }

  public selected(catalog: ICatalog): void {
    this.tapped.emit(catalog);
  }

  public onScroll(): void {
    if (this.catalogsEnded) {
      return;
    }
    this.catalogsPageId++;
    this.loadCatalogs.emit(this.catalogsPageId);
  }
}
