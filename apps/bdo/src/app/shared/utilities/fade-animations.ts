import { animate, AnimationMetadata, query, stagger, style, transition } from '@angular/animations';

export function fadeIn(selector = ':enter', duration= '400ms ease-out'): AnimationMetadata[] {
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

export function fadeOut(selector= ':leave', duration = '200ms'): AnimationMetadata[] {
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
