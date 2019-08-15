declare interface Reward {
  id: number;
  image: string;
  name: string;
  type: string;
  current: number;
  total: number;
  prprobability?: number;
  category: string;
}
