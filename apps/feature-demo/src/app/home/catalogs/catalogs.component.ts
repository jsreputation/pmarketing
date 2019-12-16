import {
  Component,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { scan } from 'rxjs/operators';

import {
  ICatalog,
  RewardsService,
} from '@perx/core';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  public catalogs$: Observable<ICatalog[]>;
  private catalogs: BehaviorSubject<ICatalog[]> = new BehaviorSubject<ICatalog[]>([]);
  public catalogsLoaded: boolean = false;
  public catalogsEnded: boolean = false;
  private catalogsPageId: number = 1;

  @Output()
  public tapped: EventEmitter<ICatalog> = new EventEmitter<ICatalog>();

  private loadCatalogs(): void {
    this.catalogsLoaded = false;

    this.rewardsService.getCatalogs(this.catalogsPageId, REQ_PAGE_SIZE)
      .subscribe((catalogs: ICatalog[]) => {
        if (!catalogs) {
          return;
        }

        this.catalogs.next(catalogs);
        this.catalogsLoaded = true;
        if (catalogs.length < REQ_PAGE_SIZE) {
          this.catalogsEnded = true;
        }
      });
  }

  private initCatalogsScan(): void {
    this.catalogs$ = this.catalogs.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  constructor( private rewardsService: RewardsService ) {
    this.initCatalogsScan();
  }

  public ngOnInit(): void {
    this.loadCatalogs();
  }

  public selected(catalog: ICatalog): void {
    this.tapped.emit(catalog);
  }

  public onScroll(): void {
    if (this.catalogsEnded) {
      return null;
    }

    this.catalogsPageId++;
    this.loadCatalogs();
  }
}
