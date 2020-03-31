import { ISurvey, SurveyQuestionType } from '@perxtech/core';

export const survey: ISurvey = {
  id: '1',
  title: 'What all women should know about cancers',
  backgroundImgUrl: 'https://cdn.perxtech.io/content/prudential/BreastCancer_Banner.jpg',
  subTitle: 'A private event hosted by Prudential & Parkway Cancer Centre in conjunction with Breast Cancer month. Join us at our event to hear from Medical Oncologist sharing with you important insight to the condition.',
  results: {},
  questions: [
    {
      question: 'Details',
      description: `<b>Date:</b> 19 Oct 2019 (Saturday)<br>
            <b>Time:</b> 1pm - 3pm (Registration starts at 12.30pm)<br>
            <b>Venue:</b> 30 Cecil Street, Prudential Tower, S’049712<br>
            <br>
            <a href="/reward-detail?id=1">See Dr Wong Chiung Ing’s bio</a><br>
            <a href="/reward-detail?id=2">See speaker’s bio</a><br>
            <br>
            <i>Light refreshment will be provided after the talk.
            You are also entitled for an optional Financial Review with our Consultant and received $30 NTUC/Grab vouchers when you’ve completed the review. T&Cs apply.</i>
            `,
      id: '1',
      required: true,
      payload: {
        type: SurveyQuestionType.pictureChoice,
        multiple: false,
        choices: [
          {
            img_url: 'https://cdn.perxtech.io/content/prudential/single.png',
            text: 'I\'m attending alone'
          },
          {
            img_url: 'https://cdn.perxtech.io/content/prudential/multiple.png',
            text: 'I\'m attending with a guest'
          }
        ]
      }
    },
    // {
    //     question: 'Details',
    //     description: `<b>Date:</b> 19 Oct 2019 (Saturday)<br>
    //     <b>Time:</b> 1pm - 3pm (Registration starts at 12.30pm)<br>
    //     <b>Venue:</b> 30 Cecil Street, Prudential Tower, S’049712<br>
    //     <br>
    //     <a href="/reward-detail?id=1">See Dr Wong Chiung Ing’s bio</a><br>
    //     <a href="/reward-detail?id=2">See speaker’s bio</a><br>
    //     <br>
    //     <i>Light refreshment will be provided after the talk.
    // tslint:disable-next-line:max-line-length
    //     You are also entitled for an optional Financial Review with our Consultant and received $30 NTUC/Grab vouchers when you’ve completed the review. T&Cs apply.</i>
    //     `,
    //     id: '1',
    //     required: true,
    //     payload: {
    //         type: 'select',
    //         multiple: false,
    //         choices: ['I\'m attending alone', 'I\'m attending with a guest']
    //     }
    // },
    // {
    //     question: 'When were you born?',
    //     description: 'It\'s between us',
    //     id: '2',
    //     required: true,
    //     payload: {
    //         duration: true,
    //         type: 'date'
    //     }
    // },
    // {
    //     question: 'How can we reach you?',
    //     description: 'No offence taken',
    //     id: '8',
    //     required: false,
    //     payload: {
    //         type: 'phone',
    //         default_country_code: 'SG'
    //     }
    // },
    // {
    //     question: 'How likely are you to recommend our service?',
    //     description: 'Please rate us',
    //     id: '11',
    //     required: false,
    //     payload: {
    //         type: 'rating',
    //         color: 'primary',
    //         left_label: 'not much',
    //         right_label: 'a lot',
    //         scale: 6,
    //         shape: 'circle'
    //     }
    // },
    // {
    //     question: 'Tell us more about us',
    //     description: 'No offence taken',
    //     id: '7',
    //     required: true,
    //     payload: {
    //         type: 'group',
    //         questions: [
    //             {
    //                 question: 'What\'s your favorite color 1',
    //                 description: 'We love blue',
    //                 id: '7.1',
    //                 required: false,
    //                 payload: {
    //                     type: 'select',
    //                     choices: [
    //                         'blue',
    //                         'white',
    //                         'red'
    //                     ]
    //                 }
    //             },
    //             {
    //                 question: 'What\'s your favorite color 2',
    //                 description: 'We love blue',
    //                 id: '7.2',
    //                 required: true,
    //                 payload: {
    //                     type: 'select',
    //                     choices: [
    //                         'blue',
    //                         'white',
    //                         'red'
    //                     ]
    //                 }
    //             }
    //         ]
    //     }
    // },
    // {
    //     question: 'From when to when was your first job?',
    //     description: 'Compliance',
    //     id: '3',
    //     required: false,
    //     payload: {
    //         type: 'date',
    //         period: true
    //     }
    // },
    // {
    //     question: 'From when to when was your first job?',
    //     description: 'Compliance',
    //     id: '4',
    //     required: false,
    //     payload: {
    //         type: 'date',
    //         period: true
    //     }
    // },
    // {
    //     question: 'Tell us more about you',
    //     description: 'Be frank',
    //     id: '5',
    //     required: false,
    //     payload: {
    //         type: 'long-text',
    //         'max-length': 20
    //     }
    // },
    // {
    //     question: 'Tell us more about us',
    //     description: 'No offence taken',
    //     id: '6',
    //     required: false,
    //     payload: {
    //         type: 'long-text'
    //     }
    // }
  ]
};
