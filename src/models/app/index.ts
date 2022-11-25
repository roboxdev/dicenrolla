import { createEvent, createEffect } from 'effector';

export const appStarted = createEvent();

export const vibrateFx = createEffect(() => {
  navigator.vibrate(10);
});