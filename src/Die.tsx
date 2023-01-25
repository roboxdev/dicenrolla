import styled, { css, keyframes } from "styled-components";

import { ReactComponent as D4Component } from './assets/dice-d4.svg'
import { ReactComponent as D6Component } from './assets/dice-d6.svg'
import { ReactComponent as D8Component } from './assets/dice-d8.svg'
import { ReactComponent as D10Component } from './assets/dice-d10.svg'
import { ReactComponent as D12Component } from './assets/dice-d12.svg'
import { ReactComponent as D20Component } from './assets/dice-d20.svg'
import { ReactComponent as D100Component } from './assets/dice-d100.svg'

import type { DiceName } from "./models/dice";

const DIE_SHAPES: {[k: DiceName]: any} = {
  d4: D4Component,
  d6: D6Component,
  d8: D8Component,
  d10: D10Component,
  d12: D12Component,
  d20: D20Component,
  d100: D100Component,
}

interface Props {
  rolling: boolean;
  name: DiceName;
  label: string;
}

export const Die = styled.div.attrs<Props>(({
  label,
  name,
}) => {
  const Shape = DIE_SHAPES[name];
  return ({
    "data-die-name": name,
    children: <>
      <span>{label}</span>
      <Shape data-die-shape-name={name}/>
    </>
  });
})<Props>`
  position: relative;
  padding: 0;
  width: 48px;
  height: 48px;
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    ${p => p.rolling ? rolling : 'animation: none'};
  }

  > span {
    z-index: 100;
    color: white;
    text-shadow: 
     -1px -1px 0 hsl(0, 0%, 25%),
      1px -1px 0 hsl(0, 0%, 25%),
      -1px 1px 0 hsl(0, 0%, 25%),
       1px 1px 0 hsl(0, 0%, 25%);
  }

  &[data-die-name="d4"] span {
    translate: 0 4px;
  }

  [data-die-shape-name="d4"] {
    color: hsl(39, 85%, 41%);
    translate: 0 5px;
  }

  [data-die-shape-name="d6"] {
    color: hsl(120, 50%, 46%);
  }

  [data-die-shape-name="d8"] {
    color: hsl(338, 63%, 64%);
  }

  [data-die-shape-name="d10"] {
    color: hsl(207, 70%, 50%);
  }

  [data-die-shape-name="d12"] {
    color: hsl(268, 64%, 60%);
  }

  [data-die-shape-name="d20"] {
    color: hsl(0, 72%, 57%);
  }

  [data-die-shape-name="d100"] {
    color: hsl(176, 41%, 52%);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0turn);
  }
  75% {
    transform: rotate(5turn);
  }
  100% {
    transform: rotate(6turn);
  }
`;

const rolling = css`
  animation: ${spin} 1500ms linear;
`;
