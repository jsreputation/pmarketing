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
import {scan} from 'rxjs/operators';

import {
  ICatalog,
  RewardsService,
  ConfigService
} from '@perxtech/core';
import {
  trigger
} from '@angular/animations';
import {
  fadeIn,
  fadeOut
} from '../../utils/fade-animations';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-catalogs',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {
  public catalogs$: Observable<ICatalog[]>;
  public catalogsLoaded: boolean = false;
  public catalogsEnded: boolean = false;
  public catalogsPageId: number = 1;
  private catalogs: BehaviorSubject<ICatalog[]> = new BehaviorSubject<ICatalog[]>([]);
  public ghostCatalogs: any[] = new Array(3); // 3 to cover screen width while loading

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
        this.ghostCatalogs = [];
        this.catalogsLoaded = true;
        if (catalogs.length < REQ_PAGE_SIZE) {
          this.catalogsEnded = true;
        }
      },
      () => this.ghostCatalogs = []);
  }

  private initCatalogsScan(): void {
    this.catalogs$ = this.catalogs.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []], [])
    );
  }

  constructor(private rewardsService: RewardsService,
              private configService: ConfigService) {
    this.initCatalogsScan();
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.loadCatalogs();
    });
  }

  public selected(catalog: ICatalog): void {
    this.tapped.emit(catalog);
  }

  public onScroll(): void {
    if (this.catalogsEnded) {
      return;
    }

    this.catalogsPageId++;
    this.loadCatalogs();
  }
}
