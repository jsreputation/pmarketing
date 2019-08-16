declare interface Engagement {
  id: number;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    urn: string;
    created_at: string;
    updated_at: string;
    game_type: string;
    title: string;
    description: string;
    image_url: string;
    properties: {},
    display_properties: {
      fontName: string;
      fontColor: string;
      headerColor: string;
      headerTitle: string;
      headlineText: string;
      mainShapeType: string;
      backgroundColor: string;
      headerLogoImage: string;
      subHeadlineText: string;
      callToActionText: string;
      loadingHeadlineText: string;
      loadingSubHeadlineText: string;
      background: string;
      cardBackground: string;
      buttonText?: string;
    },
    type: string;
  };
  relationships: {
    campaigns: {
      links: {
        self: string;
        related: string;
      }
    }
  };
}
//
// export const data = {
//   id: '1',
//   type: 'engagements',
//   links: {self: 'http://api.whistler.perxtech.org/engagements/1'},
//   attributes: {
//     urn: 'urn:perx:game::222222222:engagement/1',
//     created_at: '2019-08-13T05:57:45.583Z',
//     updated_at: '2019-08-13T05:57:45.583Z',
//     game_type: 'spin',
//     title: 'Spin The Wheel',
//     description: '',
//     image_url: 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-256.png',
//     properties: {},
//     display_properties: {
//       fontName: 'Arial',
//       fontColor: '#333333',
//       headerColor: '#E11101',
//       headerTitle: 'BPI',
//       headlineText: 'Spin and win!',
//       mainShapeType: 'shape_1',
//       backgroundColor: '#f8f8f8',
//       headerLogoImage: 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-256.png',
//       subHeadlineText: 'Play and win up to S$100',
//       callToActionText: 'START PLAYING',
//       loadingHeadlineText: 'Loading...',
//       loadingSubHeadlineText: 'Nothing to see yet'
//     },
//     type: 'game'
//   },
//   relationships: {
//     campaigns: {
//       links: {
//         self: 'http://api.whistler.perxtech.org/engagements/1/relationships/campaigns',
//         related: 'http://api.whistler.perxtech.org/engagements/1/campaigns'
//       }
//     }
//   }
// };
