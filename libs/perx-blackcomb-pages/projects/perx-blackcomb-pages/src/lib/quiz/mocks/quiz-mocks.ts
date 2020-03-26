import {QuizQuestionType} from '@perxtech/core';
import {of} from 'rxjs';

const mockQuiz = ({
  id: '1',
  title: 'mocked quiz',
  subTitle: 'subtitle',
  questions: [{
    id: '0',
    question: 'why are you gay?',
    required: true,
    payload: {
      type: QuizQuestionType.swipeDelete
    }}
  ],
  results: {}
});

const mockData$ = of({
  id: '1',
  title: 'mocked quiz',
  subTitle: 'subtitle',
  questions: [{
    id: '0',
    question: 'why are you gay?',
    required: true,
    payload: {
      type: QuizQuestionType.swipeDelete,
      choices: [
        {
          title: 'Iron Man',
          icon: `pan_tool`,
          img: `/assets/ironman.jpg`,
          description: `Iron Man is a fictional superhero.`,
          data: {
            name: 'Tony Stark',
            abilities: [
              'Flying', 'Shooting', 'billionaire'
            ]
          }
        },
        {
          title: 'Capton America',
          icon: `view_stream`,
          img: `/assets/captainamerica.jpg`,
          description: `Captain America is the alter ego of Steve Rogers.`,
          data: {
            name: 'Steve Rogers',
            abilities: [
              'Strong', 'Very Strong'
            ]
          }
        },
        {
          title: 'Dr Strange',
          icon: `offline_bolt`,
          img: `/assets/drstange.jpg`,
          description: `He is a master of Mystic Art`,
          data: {
            name: 'Steven Strange',
            abilities: [
              'Mystic Art'
            ]
          }
        },
        {
          title: 'Shaktiman',
          icon: `flash_on`,
          img: `/assets/shatiman.jpg`,
          description: `Shaktimaan is an Indian fictional superhero.`,
          data: {
            name: 'Pandit Gangadhar',
            abilities: [
              'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
            ]
          }
        },
        {
          title: 'The Winter Soldier',
          icon: `trending_up`,
          img: `/assets/wintersoldier.jpg`,
          description: `Barnes grew up as an Army brat. `,
          data: {
            name: 'James Buchanan "Bucky" Barnes',
            abilities: [
              'Hand to hand combat and Martial arts', 'Strong Arm'
            ]
          }
        },
        {
          title: 'The Batman',
          icon: `attach_money`,
          img: `/assets/batman.jpg`,
          description: `Batman does not possess any superpowers.`,
          data: {
            name: 'Bruce wayne',
            abilities: [
              'Rich', 'Strong'
            ]
          }
        },
        {
          title: 'The Superman',
          icon: `send`,
          img: `/assets/superman.jpg`,
          description: `He is from krypton.`,
          data: {
            name: 'Clark Kent',
            abilities: [
              'Attractive male', 'Healing', 'Will power-based constructs', 'Flying'
            ]
          }
        }
      ]
    }}
  ],
  results: {}
});
