import { ActivatedRoute, ParamMap } from '@angular/router';
import { StampService, IStampCard } from '@perx/core';
import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public title: string = 'Scratch & Win!';
  public subTitle: string = 'Collect all 10 stickers and win a reward!';
  public isEnabled: boolean = false;
  public stampCard$: Observable<IStampCard>;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.stampCard$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string | null = params.get('id');
          if(!id) {
            return throwError({message: 'stampCard id is required'})
          }
          const idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(idN);
        }),
      );
  }
}
