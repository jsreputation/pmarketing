import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GameService } from '@perx/core';

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
  ) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      ((params: Params) => {
      if (params.gameId) {
        const id = Number.parseInt(params.gameId, 10);
        this.fetchRewards(id);
      }
    }));
  }

  private fetchRewards(gameId: number): void {
    this.gameService.play(gameId).subscribe(res => console.log(res));
  }

  public viewReward(id: number): void {
    this.router.navigate(['/reward'], { queryParams: { id } });
  }
}
