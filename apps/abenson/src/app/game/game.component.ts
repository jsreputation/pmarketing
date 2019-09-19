import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGameService, IGame } from '@perx/core';
import { flatMap, take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameData$: Observable<IGame>;
  constructor(
    private route: ActivatedRoute,
    private gameService: IGameService,
    private router: Router
  ) { }

  ngOnInit() {
    this.gameData$ = this.route.params.pipe(
      flatMap((params) => this.gameService.getGamesFromCampaign(+params.id)),
      take(1),
      tap((games)=>!games || !games.length && this.router.navigate(['/wallet'])),
      map((games)=>games[0]),
    );
  }

}
