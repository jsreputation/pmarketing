export const LoyaltyJoinMethodMap = {
  inviteOnly: {apiName: '', titleTemplate: `Invite Only`},
  signUp: {apiName: 'sign_up', titleTemplate: `Sing Up`},
  amount: {apiName: 'amount', titleTemplate: `Amount`},
  transactionAmount: {apiName: 'transaction_amount', titleTemplate: `Transaction Amount`},
  pointsThreshold: {apiName: 'points_threshold', titleTemplate: null},
  points: {apiName: 'points', titleTemplate: (value) => `${value} Points`},
};
