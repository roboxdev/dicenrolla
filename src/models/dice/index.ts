import {
  createEffect,
  createEvent,
  createStore,
  combine,
  attach, restore
} from 'effector';
import { debounce } from 'patronum';

export const LOCAL_STORAGE_KEY = 'dice';

export const DICE_NAMES = [
  'd4',
  'd6',
  'd8',
  'd10',
  'd12',
  'd20',
]

export type DiceName = typeof DICE_NAMES[number];

export interface RollI {
  dice: DiceName[];
  datetime: string;
  diceResult: number[];
  sum: number;
}

interface DiceParams {
  key: string;
  max: number;
  valueShift: number;
  onClick: () => void;
}

export const DICE: {[k: DiceName]: DiceParams} = {
  d4: {
    key: 'd4',
    max: 4,
    valueShift: 1,
    onClick: () => {
      dieClicked('d4');
    },
  },
  d6: {
    key: 'd6',
    max: 6,
    valueShift: 1,
    onClick: () => {
      dieClicked('d6');
    },
  },
  d8: {
    key: 'd8',
    max: 8,
    valueShift: 1,
    onClick: () => {
      dieClicked('d8');
    },
  },
  d10: {
    key: 'd10',
    max: 10,
    valueShift: 0,
    onClick: () => {
      dieClicked('d10');
    },
  },
  d12: {
    key: 'd12',
    max: 12,
    valueShift: 1,
    onClick: () => {
      dieClicked('d12');
    },
  },
  d20: {
    key: 'd20',
    max: 20,
    valueShift: 1,
    onClick: () => {
      dieClicked('d20');
    },
  },
}

const DEBOUNCE_TIMEOUT_IN_MS = 1500;

export const dieClicked = createEvent<DiceName>();

export const flush = debounce({
  source: dieClicked,
  timeout: DEBOUNCE_TIMEOUT_IN_MS,
});

export const rollAddedFx = createEffect((dice: DiceName[]) => {
  const now = new Date().toISOString();
  const diceResult = dice.map(
    k => Math.floor(Math.random() * DICE[k].max) + DICE[k].valueShift
  );
  const d100roll = dice.length === 2
    && dice.filter(v => v === 'd10').length === 2;
  if (d100roll) {
    diceResult[0] *= 10
  }
  let sum = diceResult.reduce((a, b) => a + b, 0);
  if (d100roll && sum === 0) {
    sum = 100
  }
  const result: RollI = {
    dice,
    datetime: now,
    diceResult,
    sum,
  }
  return result;
});

export const $rolls = createStore<RollI[]>([])
$rolls
  .on(rollAddedFx.doneData, (state, payload) => [...state, payload]);

export const $rollingDice = createStore<DiceName[]>([])
$rollingDice
  .on(dieClicked, (state, payload) => [...state, payload])
  .reset(rollAddedFx.done);

export const $dice = combine(
  $rollingDice,
  (rollingDice) => Object.values(DICE).map(d => {
    const rolling = rollingDice.includes(d.key);
    const animationKey = rolling ? `${d.key}-${rollingDice.join('')}` : d.key;
    return ({
      ...d,
      animationKey,
      rolling,
    });
  })
);

export const setScrollHelperEl = createEvent<HTMLLIElement | null>();
export const $scrollHelperEl = restore(setScrollHelperEl, null);

export const scrollFx = attach({
  source: {
    el: $scrollHelperEl,
  },
  effect: ({ el }) => {
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: "smooth" })
  }
});

export const $diceModel = combine({
  rolls: $rolls,
});