import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GameService, NotificationService } from '@perx/core';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private gameService: GameService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.gameId),
        map((params: Params) => Number.parseInt(params.gameId, 10)),
        switchMap((gameId: number) => this.gameService.play(gameId))
      )
      .subscribe(
        (game: any) => console.log(game),
        () => this.notificationService.addPopup({
          title: 'Oooops!',
          text: 'There is no more reward for you!'
        })
      );
  }

  public viewReward(id: number): void {
    this.router.navigate(['/reward'], { queryParams: { id } });
  }
}
