import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public param$: Observable<string>;
  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.param$ = this.route.params.pipe(map((params: Params) => params.type));
  }

}
