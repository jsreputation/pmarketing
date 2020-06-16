import { style, animate, transition, query, stagger } from '@angular/animations';

export function fadeIn(selector: string = ':enter', duration: string = '400ms ease-out'): AnimationMetadata {
  return [
    transition('* => *', [
      query(selector, [
        style({ opacity: 0, transform: 'translateY(-5px)' }),
        stagger('50ms', [
          animate(duration, style({
            opacity: 1,
            transform: 'translateY(0px)'
          }))
        ])
      ], { optional: true })
    ])
  ];
}

export function fadeOut(selector: string = ':leave', duration: string = '200ms'): AnimationMetadata {
  return [
    transition('* => *', [
      query(selector, [
        style({ opacity: 1 }),
        stagger('50ms', [
          animate(duration, style({
            opacity: 0
          }))
        ])
      ], { optional: true })
    ])
  ];
}
