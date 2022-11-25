import { sample, forward } from 'effector';
import { loadLocalStorageFx, saveLocalStorageFx } from '../localStorage';

import { $diceModel, $rolls, LOCAL_STORAGE_KEY } from './index';
import {
  $rollingDice,
  dieClicked,
  flush,
  rollAddedFx,
  scrollFx,
} from './index';
import { vibrateFx } from '../app';

sample({
  source: $rollingDice,
  clock: flush,
  target: rollAddedFx,
});

sample({
  clock: dieClicked,
  target: scrollFx,
});

sample({
  clock: dieClicked,
  target: vibrateFx,
});

sample({
  clock: loadLocalStorageFx.done,
  target: scrollFx,
});

$rolls.on(
  loadLocalStorageFx.doneData,
  (_, { [LOCAL_STORAGE_KEY]: value }) => value?.rolls,
);

forward({
  from: $diceModel,
  to: saveLocalStorageFx.prepend((value) => ({
    value,
    localStorageKey: LOCAL_STORAGE_KEY,
  })),
});
