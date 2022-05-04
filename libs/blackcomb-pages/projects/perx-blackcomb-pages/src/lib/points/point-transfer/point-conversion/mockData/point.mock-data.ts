export const mockLoyalty = [
  {
    id: 270,
    name: 'test tier reset',
    description: 'dasadads',
    beginDate: '2021-07-01T04:21:53.112Z',
    endDate: null,
    membershipTierName: 'Gold',
    membershipIdentifier: '34096277531-1622715521',
    pointsBalance: 26,
    currencyBalance: null,
    pointsToCurrencyRate: null,
    currency: null,
    nextTierPoints: 10,
    nextTierPointsDiff: 10,
    nextTierName: 'Green',
    tierPoints: 0,
    highestTier: 'Gold',
    expiringPoints: [
      {
        expireDate: null,
        points: null
      }
    ],
    membershipExpiry: null,
    tiers: [
      {
        id: 346,
        name: 'Base Tier',
        attained: false,
        pointsRequirement: 0,
        pointsDifference: 0,
        images: []
      },
      {
        id: 347,
        name: 'Green',
        attained: false,
        pointsRequirement: 10,
        pointsDifference: 10,
        images: []
      },
      {
        id: 348,
        name: 'Gold',
        attained: true,
        pointsRequirement: 20,
        pointsDifference: 20,
        images: []
      }
    ],
    membershipState: 'active',
    images: {}
  },
  {
    id: 203,
    name: 'VIP Loyalty program',
    description: 'Subscription based loyalty program',
    beginDate: '2021-05-12T07:45:58.473Z',
    endDate: null,
    membershipTierName: 'Base Tier',
    membershipIdentifier: '8701102578116934',
    pointsBalance: 0,
    currencyBalance: null,
    pointsToCurrencyRate: null,
    currency: null,
    nextTierPoints: 10,
    nextTierPointsDiff: 10,
    nextTierName: 'Silver Tier',
    tierPoints: 0,
    highestTier: 'Silver Tier',
    expiringPoints: [
      {
        expireDate: null,
        points: null
      }
    ],
    membershipExpiry: null,
    tiers: [
      {
        id: 278,
        name: 'Base Tier',
        attained: true,
        pointsRequirement: 0,
        pointsDifference: 0,
        images: []
      },
      {
        id: 279,
        name: 'Silver Tier',
        attained: false,
        pointsRequirement: 10,
        pointsDifference: 10,
        images: []
      }
    ],
    membershipState: 'active',
    images: {
      thumbnailUrl: 'https://cdn.perxtech.io/stored_value/campaign/images/203/alfred-quartey-exaigxml9wm-unsplash-7e968506-8acb-4199-83d0-26d4ffe0b4d5.jpg'
    }
  },
];

export const mockExchangeRate = [
  {
    id: 116,
    destinationAmount: 1,
    destinationCampaignId: 1,
    destinationCampaignName: 'Loyalty Program',
    sourceAmount: 1,
    sourceCampaignId: 203,
    sourceCampaignName: 'VIP Loyalty program'
  },
  {
    id: 117,
    destinationAmount: 0,
    destinationCampaignId: 102,
    destinationCampaignName: 'Loyalty Program 01',
    sourceAmount: 1,
    sourceCampaignId: 203,
    sourceCampaignName: 'VIP Loyalty program'
  },
  {
    id: 118,
    destinationAmount: 5,
    destinationCampaignId: 204,
    destinationCampaignName: 'Free Loyalty program',
    sourceAmount: 1,
    sourceCampaignId: 203,
    sourceCampaignName: 'VIP Loyalty program'
  },
  {
    id: 115,
    destinationAmount: 1,
    destinationCampaignId: 270,
    destinationCampaignName: 'test tier reset',
    sourceAmount: 1,
    sourceCampaignId: 203,
    sourceCampaignName: 'VIP Loyalty program'
  },
  {
    id: 119,
    destinationAmount: 10,
    destinationCampaignId: 169,
    destinationCampaignName: 'Mos\'s translatable loyalty program (EN)',
    sourceAmount: 1,
    sourceCampaignId: 203,
    sourceCampaignName: 'VIP Loyalty program'
  }
];
