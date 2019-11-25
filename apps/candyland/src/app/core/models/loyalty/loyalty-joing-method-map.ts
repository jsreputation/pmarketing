export const LoyaltyJoinMethodMap = {
  inviteOnly: {apiName: 'invite_only', titleTemplate: `INVITE_ONLY`},
  signUp: {apiName: 'sign_up', titleTemplate: `SIGN_UP`},
  amount: {apiName: 'amount', titleTemplate: (value, text) => `${text} (${value}SGD)`},
  transactionAmount: {apiName: 'transaction_amount', titleTemplate: null},
  pointsThreshold: {apiName: 'points_threshold', titleTemplate: null},
  points: {apiName: 'points', titleTemplate: (value, text) => `${value} ${text}`},
};
