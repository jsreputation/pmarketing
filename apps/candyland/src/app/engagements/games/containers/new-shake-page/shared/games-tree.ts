import { IGameTree } from './models/game-tree.model';

export const GamesTree: IGameTree[] = [
  {
    id: 1,
    type: 'simple-tree',
    active: false,
    format: '.png',
    title: 'tree'
  },
  {
    id: 2,
    type: 'fir-tree',
    active: false,
    format: '.png',
    title: 'fir tree'
  },
  {
    id: 3,
    type: 'tree-pot',
    active: false,
    format: '.png',
    title: 'tree in a pot'
  }
];
