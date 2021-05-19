import { IBadge } from '@perxtech/core';

export const MockBadges: IBadge[] = [
  {
    id: 1,
    active: true,
    title: 'Mock Title 1 with extra text to test ellipsis',
    description: 'Mock Description',
    image: {
      type: '',
      value: {
        file: '',
        filename: '',
        image_id: 1,
        image_url: `https://i.pravatar.cc/200?${radomnum()}`
      }
    }
  },
  {
    id: 1,
    active: false,
    title: 'Mock Title 2',
    description: 'Mock Description 1',
    image: {
      type: '',
      value: {
        file: '',
        filename: '',
        image_id: 1,
        image_url: `https://i.pravatar.cc/200?${radomnum()}`
      }
    }
  },
  {
    id: 1,
    active: true,
    title: 'Mock Title 3',
    description: 'Mock Description 3',
    image: {
      type: '',
      value: {
        file: '',
        filename: '',
        image_id: 1,
        image_url: `https://i.pravatar.cc/200?${radomnum()}`
      }
    }
  },
  {
    id: 1,
    active: true,
    title: 'Mock Title 4',
    description: 'Mock Description 4',
    image: {
      type: '',
      value: {
        file: '',
        filename: '',
        image_id: 1,
        image_url: `https://i.pravatar.cc/200?${radomnum()}`
      }
    }
  },
  {
    id: 1,
    active: false,
    title: 'Mock Title 5',
    description: 'Mock Description 5',
    image: {
      type: '',
      value: {
        file: '',
        filename: '',
        image_id: 1,
        image_url: `https://i.pravatar.cc/200?${radomnum()}`
      }
    }
  }
];


function radomnum(): number {
  return Math.floor(Math.random() * (25 - 0 + 1)) + 0;
}
