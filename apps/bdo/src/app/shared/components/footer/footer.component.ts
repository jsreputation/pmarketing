import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BannerModel } from '../../../models/banner.model';

@Component({
  selector: 'bdo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() isShowCarousel = true;
  public activeNumber = 0;
  public selectedItem:BannerModel;
  @ViewChild('itemsContainer') public itemsContainer: ElementRef;
  public banners:BannerModel[]= [
    // {
    //   id:1,
    //   header:"Refer a friend to get treats",
    //   description:"Already a card holder? Refer friends now and get rewarded with treats!",
    //   buttonName:"Refer Now",
    //   image:"assets/images/img-ad-gift.png"
    // },
    {
      id: 2,
      header: 'Apply for a BDO Credit Card',
      description: 'Already a card holder? Refer your friends now and get rewarded!',
      buttonName: 'Apply Now',
      image: 'assets/images/img-creditcard.png',
      link: 'https://www.bdo.com.ph/personal/credit-cards/right-card-for-you'
    },
    {
      id: 3,
      header: 'Open a BDO account',
      description: 'Open an account and enjoy awesome deals and treats.',
      buttonName: 'Apply Now',
      image: 'assets/images/img-debitcard.png',
      link: 'https://www.bdo.com.ph/personal/accounts'
    }
  ]
  ngOnInit(): void {
    this.selectedItem = this.banners[this.activeNumber];
  }

  public onCircleClick(isActive: boolean) {
    if(!isActive) {
      if(this.itemsContainer.nativeElement.scrollLeft == 0) {
        this.itemsContainer.nativeElement.scrollLeft += this.itemsContainer.nativeElement.offsetWidth;
      } else {
        this.itemsContainer.nativeElement.scrollLeft -= this.itemsContainer.nativeElement.offsetWidth;
      } 
    }
    // this.activeNumber = index;
    // this.selectedItem = this.banners[this.activeNumber];
  }

  public onScroll() {
    this.activeNumber = this.itemsContainer.nativeElement.scrollLeft < this.itemsContainer.nativeElement.offsetWidth ? 0 : 1;
  }
}
