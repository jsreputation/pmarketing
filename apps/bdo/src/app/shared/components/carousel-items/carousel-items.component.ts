import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { CarouselComponent } from 'angular-responsive-carousel';
import { IListItemModel } from '../../models/list-item.model';

@Component({
  selector: 'bdo-carousel-items',
  templateUrl: './carousel-items.component.html',
  styleUrls: ['./carousel-items.component.scss']
})
export class CarouselItemsComponent implements AfterViewInit, OnChanges {

  @Input() deals: IListItemModel[] = [];
  @Input() isFeatured = false;
  @Output() eventItemClick: EventEmitter<IListItemModel> = new EventEmitter<IListItemModel>();
  @ViewChild("carouselElement") public carouselElement: CarouselComponent;
  urlImageDefault  = "assets/images/light-gray-color-default-image.png"
  public showCarouselArrows = true;
  public itemWidth: number;
  public carouselHeight: number;
  public isDragEvent = false;
  public isClickEvent = false;
  @ViewChild("carouselContainer") public carouselContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  public onResize(event): void  {
    this.updateCarouselSettings(event.target.innerWidth);
  }

  public ngAfterViewInit(): void {
    if(this.carouselContainer) {
      this.carouselContainer.nativeElement?.addEventListener('mousedown', () => { this.isDragEvent = false});
      this.carouselContainer.nativeElement?.addEventListener('mousemove', () => this.isDragEvent = true);
      this.carouselContainer.nativeElement?.addEventListener('mouseup', () => this.isDragEvent ? (this.isDragEvent = true) : (this.isClickEvent = true));
    }
  }

  public ngOnChanges() {
    const innerWidth = window.innerWidth;
    this.updateCarouselSettings(innerWidth);
  }

  public selectedItem(item:IListItemModel) {
    if(this.isClickEvent) {
      this.eventItemClick.emit(item);
    }
  }

  private updateCarouselSettings(innerWidth: number): void {
    this.itemWidth = this.isFeatured ? (innerWidth < 1024 ? 288 : 344) : 245;
    console.log(' this.isFeatured: ', this.isFeatured);
    // this.carouselHeight = this.isFeatured ? 170 : 310;
    this.carouselHeight = this.isFeatured ? 170 : 248;
    if (innerWidth < 1024 || (this.carouselElement?.carousel?.visibleWidth > this.deals?.length * this.itemWidth)) {
      this.showCarouselArrows = false;
    } else {
      this.showCarouselArrows = true;
    }
  }
}
