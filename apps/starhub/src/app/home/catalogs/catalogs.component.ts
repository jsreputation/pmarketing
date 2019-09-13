import { Component, Output, EventEmitter } from '@angular/core';
import { ICatalog, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent {
  public catalogs$: Observable<ICatalog[]>;

  @Output()
  public tapped: EventEmitter<ICatalog> = new EventEmitter<ICatalog>();

  constructor( private rewardsService: RewardsService ) {
    this.catalogs$ = this.rewardsService.getAllCatalogs();
  }

  public selected(catalog: ICatalog): void {
    this.tapped.emit(catalog);
  }
}
