import { sample } from 'effector';
import { appStarted } from '../app';
import { loadLocalStorageFx } from '.';

sample({
  source: appStarted,
  target: loadLocalStorageFx,
});
