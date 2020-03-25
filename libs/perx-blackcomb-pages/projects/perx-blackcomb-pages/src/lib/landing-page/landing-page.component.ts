import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ITheme, ThemesService } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  theme: ITheme;
  banner: string = 'assets/dojo.png';
  content: string = `<h1>Lucky draw information</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec 
  tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Ornare lectus sit amet est placerat in egestas erat imperdiet. Eu 
  lobortis elementum nibh tellus molestie nunc non blandit massa. Tempus urna et pharetra pharetra massa massa. Enim praesent elementum 
  facilisis leo vel. Imperdiet massa tincidunt nunc pulvinar sapien. Amet nisl purus in mollis nunc sed id semper risus. Fringilla ut morbi 
  tincidunt augue. Blandit massa enim nec dui nunc mattis enim ut tellus. Tristique senectus et netus et malesuada fames ac turpis egestas. 
  In eu mi bibendum neque egestas congue quisque. Sapien nec sagittis aliquam malesuada. Ut morbi tincidunt augue interdum velit euismod in
   pellentesque massa. Cras sed felis eget velit aliquet sagittis id </p>`;

  constructor(private themeService: ThemesService, private titleService: Title) { }

  public ngOnInit(): void {
    this.themeService.getThemeSetting()
      .subscribe(theme => {
        this.theme = theme;
        const title = (theme.properties ? theme.properties['--title'] : undefined) || 'Blackcomb';
        this.titleService.setTitle(title);
      });
  }
}
