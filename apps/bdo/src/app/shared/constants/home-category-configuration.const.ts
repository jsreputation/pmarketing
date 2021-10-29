import { ItemModel } from '../models/item.model';

export const HOME_LIST_CATEGORY_CONFIGURATIONS: ItemModel[] = [
  {
    imageLink: 'assets/images/img-bdorewards.svg',
    name: 'BDO Rewards',
    key: 'bdo-rewards',
    children: [
      {
        name: 'Emerald ',
        key: 'emerald'
      },
      {
        name: 'Sapphire',
        key: 'sapphire'
      },
      {
        url: '/catalog-page',
        name: 'Diamond',
        key: 'diamond'
      }
    ]
  },
  {
    imageLink: 'assets/images/img-creditcard.svg',
    name: 'Credit Card',
    key: 'credit-card',
    children: [
      {
        url: '#',
        name: 'Card Exclusives',
        key: 'card-exclusives'
      },
      {
        url: '#',
        name: 'Essentials',
        key: 'essentials'
      },
      {
        url: '#',
        name: 'Installment',
        key: 'installment'
      },
      {
        url: '#',
        name: 'Shop',
        key: 'shop'
      },
      {
        url: '#',
        name: 'More',
        key: 'more'
      }
    ]
  },
  {
    imageLink: 'assets/images/img-debitcard.svg',
    name: 'Debit Card',
    key: 'debit-card',
    children: [
      {
        url: '#',
        name: 'Card Exclusives',
        key: 'card-exclusives'
      },
      {
        url: '#',
        name: 'Essentials',
        key: 'essentials'
      },
      {
        url: '#',
        name: 'Shop',
        key: 'shop'
      },
      {
        url: '#',
        name: 'Dine',
        key: 'dine'
      },
      {
        url: '#',
        name: 'More',
        key: 'more'
      }
    ]
  }
];
