import { IFilterModel } from '../models/filter.model';

export const FILTER_DATA: IFilterModel = {
  categories: [
    {
      name: 'Credit Card',
      type:'credit-card',
      children: [
        { name: 'Card Exclusives', type:'card-exclusives' },
        { name: 'Essentials',type:'essentials' },
        { name: 'Installment',type:'installment' },
        { name: 'Shop',type:'shop' },
        { name: 'Dine',type:'dine' },
        { name: 'Pay Bills',type:'pay-bills' },
        { name: 'Health & Wellness',type:'health-wellness' },
        { name: 'Travel & Entertainment',type:'travel-entertaiment'}
      ],
    },
    {
      name: 'Debit Card',
      type:'debit-card',
      children: [
        { name: 'Card Exclusives',type:'card-exclusives' },
        { name: 'Essentials',type:'essentials' },
        { name: 'Shop',type:'shop' },
        { name: 'Dine',type:'dine' },
        { name: 'Pay Bills',type:'pay-bills' },
        { name: 'Health & Wellness',type:'health-wellness' },
        { name: 'Travel & Entertainment',type:'travel-entertaiment' }
      ],
    },
    {
      name: 'BDO Rewards',
      type:'bdo-rewards',
      children: [
        { name: 'Sapphire',type:'emerald' },
        { name: 'Emerald',type:'sapphire' },
        { name: 'Diamond',type:'diamond' }
      ],
    }
  ],
  tags: [
    {
      name: 'nearby',
      type: 'nearby'
    },
    {
      name: 'deals',
      type: 'deals',
    },
    {
      name: 'new',
      type: 'new',
    },
    {
      name: 'popular',
      type: 'popular',
    }
  ],
  locations: [
    {
      name: 'Travel & Entertainment',
      type: 'travel-n-entertainment',
    },
    {
      name: 'Health & Wellness',
      type: 'heath-n-wellness',
    },
  ]
}
