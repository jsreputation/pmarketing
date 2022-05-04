import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ITheme, ThemesService } from '@perxtech/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public showBackButton: boolean = false;
  public theme: ITheme;

  constructor(
    private location: Location,
    private themesService: ThemesService,
  ) {}

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
    });
  }

  public onLeftActionClick(): void {
    this.location.back();
  }
}
