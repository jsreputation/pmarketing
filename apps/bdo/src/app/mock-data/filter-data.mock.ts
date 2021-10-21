export const FILTER_DATA = {
  accountTypes: [
    { name: 'Credit Card', value: true },
    { name: 'Debit Card', value: true }
  ],
  categories: [
    {
      name: 'Card Exclusives',
      value: true,
      children: [
        { name: 'Mastercard', value: true },
        { name: 'Visa', value: true }
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
      value: true
    },
    {
      name: 'new',
      value: true
    },
    {
      name: 'popular',
      value: true
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
