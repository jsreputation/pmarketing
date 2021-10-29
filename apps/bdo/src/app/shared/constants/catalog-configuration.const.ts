export const CATALOG_CONFIGURATION = {
  bdo: {
    type: 'bdo-rewards',
    name: 'BDO Rewards',
    tags: ['new','popular']
  },
  deals: {
    type: 'deals',
    name: 'Deals',
    tags: []
  },
  debit: {
    type: 'debit-card',
    name: 'Debit Card',
    category: {
      cardEclusive: {
        type: 'card',
        name: 'Card Exclusive'
      }
    }
  },
  credit: {
    type: 'credit-card',
    name: 'Credit Card',
    category: {
      cardEclusive: {
        type: 'card',
        name: 'Card Exclusive'
      }
    }
  }
};
