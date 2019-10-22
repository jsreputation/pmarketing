export const LoyaltyJoinMethodMap = {
  inviteOnly: {apiName: 'invite_only', titleTemplate: `Invite Only`},
  signUp: {apiName: 'sign_up', titleTemplate: `Sign Up`},
  amount: {apiName: 'amount', titleTemplate: (value) => `Transaction Amount (${value}SGD)`},
  transactionAmount: {apiName: 'transaction_amount', titleTemplate: null},
  pointsThreshold: {apiName: 'points_threshold', titleTemplate: null},
  points: {apiName: 'points', titleTemplate: (value) => `${value} Points`},
};
