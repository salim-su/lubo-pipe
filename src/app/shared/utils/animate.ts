import { animate, animation, keyframes, state, style, transition, trigger } from '@angular/animations';

export const salimAnimation = [
    /*抖动动画特效*/
    trigger('main-router-l-shake', [
        state(
            'true',
            style({
                // opacity: 1,
                transform: 'translateX(0%)',
            }),
        ),
        state(
            'false',
            style({
                // opacity: 0,
                transform: 'translateX(-200%)',
            }),
        ),
        transition('true=>false', animate('0.5s ease-in')),
        transition(
            'false=>true',
            animate(
                '0.8s ease-out',
                keyframes([
                    // style({transform: 'translateX(-300px)', offset: 0}),
                    // style({transform: 'translateX(-100px)', offset: 0.3}),
                    style({ transform: 'translateX(0%)', offset: 0.5 }),
                    style({ transform: 'translateX(-15%)', offset: 0.7 }),
                    style({ transform: 'translateX(0%)', offset: 1 }),
                ]),
            ),
        ),
    ]),
    trigger('main-router-l', [
        state(
            'true',
            style({
                opacity: 1,
                transform: 'translateX(0)',
            }),
        ),
        state(
            'false',
            style({
                opacity: 0,
                transform: 'translateX(-800px)',
            }),
        ),
        transition('true=>false', animate('300ms ease-in')),
        transition('false=>true', animate('300ms ease-out')),
    ]),
    trigger('main-router-r', [
        state(
            'true',
            style({
                opacity: 1,
                transform: 'translateX(0)',
            }),
        ),
        state(
            'false',
            style({
                opacity: 1,
                transform: 'translateX(800px)',
            }),
        ),
        transition('true=>false', animate('0.5s 100ms ease-in')),
        transition('false=>true', animate('0.5s 100ms ease-out')),
    ]),
    trigger('main-router-b', [
        state(
            'true',
            style({
                opacity: 1,
                // transform: 'translateY(0)',
                height: '133px',
            }),
        ),
        state(
            'false',
            style({
                opacity: 0,
                // transform: 'translateY(800px)',
                height: '0px',
            }),
        ),
        transition('true=>false', animate('0.3s 50ms ease-in')),
        transition('false=>true', animate('0.3s 50ms ease-out')),
    ]),
    trigger('main-router-t', [
        state(
            'true',
            style({
                opacity: 1,
                transform: 'translateY(0)',
            }),
        ),
        state(
            'false',
            style({
                opacity: 0,
                transform: 'translateY(-800px)',
            }),
        ),
        transition('true=>false', animate('0.5s 100ms ease-in')),
        transition('false=>true', animate('0.5s 100ms ease-out')),
    ]),
    trigger('main-router-r-tool', [
        state(
            'close',
            style({
                // opacity: 1,
                transform: 'translateX(0%)',
            }),
        ),
        state(
            'open',
            style({
                // opacity: 0,
                transform: 'translateX(-340px)',
            }),
        ),
        transition('close=>open', animate('0.3s ease-in')),
        transition(
            'open=>close',
            animate(
                '0.8s ease-out',
                keyframes([
                    // style({transform: 'translateX(-300px)', offset: 0}),
                    // style({transform: 'translateX(-100px)', offset: 0.3}),
                    style({ transform: 'translateX(0%)', offset: 0.5 }),
                    style({ transform: 'translateX(-15%)', offset: 0.7 }),
                    style({ transform: 'translateX(0%)', offset: 1 }),
                ]),
            ),
        ),
    ]),
];
