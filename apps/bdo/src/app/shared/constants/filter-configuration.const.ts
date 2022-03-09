import { IFilterModel } from '../models/filter.model';

export const FILTER_DATA: IFilterModel = {
  type: '',
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
        { name: 'Travel & Entertainment',type:'travel-entertaiment'},
        { name: 'Explore',type:'explore'}
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
        { name: 'Travel & Entertainment',type:'travel-entertaiment' },
        { name: 'Explore',type:'explore'}
      ],
    },
    {
      name: 'BDO Rewards',
      type:'bdo-rewards',
      children: [
        { name: 'Sapphire',type:'sapphire' },
        { name: 'Emerald',type:'emerald' },
        { name: 'Diamond',type:'diamond' }
      ],
    },
    {
      name: 'Spend Anywhere',
      type:'spend-anywhere',
      children: [
      ],
    },
    {
      name: 'Shop. Choose. Redeem',
      type: 'shop-choose-redeem',
      children: [
      ],
    },
    {
      name: 'Online Exclusives',
      type: 'online-exclusives',
      children: [
      ],
    }
  ],
  tags: [
    {
      name: 'featured',
      type: 'featured',
      selected: false
    },
    {
      name: 'nearby',
      type: 'nearby',
      selected: false
    },
    {
      name: 'new',
      type: 'new',
      selected: false
    },
    {
      name: 'popular',
      type: 'popular',
      selected: false
    }
  ],
  locations: [
    {
      name: 'NCR',
      type: 'ncr',
    },
    {
      name: 'Mindanao',
      type: 'mindanao',
    },
    {
      name: 'Luzon',
      type: 'luzon',
    },
    {
      name: 'Overseas',
      type: 'overseas',
    },
    {
      name: 'Visayas',
      type: 'visayas',
    }
  ],
  // These one section does not display on filter dialog
  cardType: [
    {
      name: 'Mastercard',
      type: 'mastercard'
    },
    {
      name: 'Visa',
      type: 'visa',
    },
    {
      name: 'American Express',
      type: 'amex'
    },
    {
      name: 'JCB',
      type: 'jcb'
    },
    {
      name: 'Union Pay',
      type: 'unionpay'
    },
    {
      name: 'Diners Club',
      type: 'diners'
    }
  ],
  rewardType: [
    {
      name: 'Points Promos',
      type: 'pointspromos'
    },
    {
      name: 'Bank Perks',
      type: 'bankperks'
    },
    {
      name: 'Member Exclusives',
      type: 'memberexclusives'
    }
  ]
}
