export const FILTER_DATA = {
  accountTypes: [
    { name: 'Credit Card', value: true },
    { name: 'Debit Card', value: false }
  ],
  categories: [
    {
      name: 'Card Exclusives',
      value: true,
      children: [
        { name: 'Mastercard', value: true },
        { name: 'Visa', value: false }
      ],
    },
    {
      name: 'Essentials',
      value: true
    },
    {
      name: 'Dine',
      value: true
    }
  ],
  tags: [
    {
      name: 'nearby',
      value: true
    },
    {
      name: 'deals',
      value: false
    },
    {
      name: 'new',
      value: false
    },
    {
      name: 'popular',
      value: false
    }
  ],
  locations: [
    {
      name: 'Travel & Entertainment',
      value: true
    },
    {
      name: 'Health & Wellness',
      value: true
    },
  ]
}
