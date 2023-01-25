import { useStore } from 'effector-react';
import { useHotkeys } from 'react-hotkeys-hook';

import styled from 'styled-components';

import {
  $dice,
  $rollingDice,
  $rolls,
  dieClicked,
  setScrollHelperEl,
} from './models/dice';

import type { DiceName } from './models/dice';

import { Die } from './Die';
import { Roll } from './Roll';
import { DiceCounter } from './DiceCounter';

export const App = () => {
  const dice = useStore($dice);
  const rolls = useStore($rolls);
  const rollingDice = useStore($rollingDice);

  const createDieRollHandler = (diceName: DiceName) => () => {
    dieClicked(diceName);
  }
  useHotkeys('1, q', createDieRollHandler('d4'));
  useHotkeys('2, w', createDieRollHandler('d6'));
  useHotkeys('3, e', createDieRollHandler('d8'));
  useHotkeys('4, r', createDieRollHandler('d10'));
  useHotkeys('5, t', createDieRollHandler('d12'));
  useHotkeys('6, y', createDieRollHandler('d20'));

  return (
    <AppStyled>
      <Header></Header>
      <DiceCounter />
      <Rolls>
        {rolls.map((r) => (
          <Roll
            key={r.datetime}
            dice={r.dice}
            diceResult={r.diceResult}
            sum={r.sum}
            d100sum={r.d100sum}
            datetime={r.datetime}
          />
        ))}
        <Roll dice={rollingDice} />
        <ScrollHelper ref={setScrollHelperEl} />
      </Rolls>
      <Footer>
        <Dice>
          {Object.values(dice).map(
            ({
               rolling,
               key,
               max,
               animationKey,
               hint,
             }) => (
              <DieButton
                key={animationKey}
                onClick={createDieRollHandler(key)}
                title={hint}
              >
                 <Die
                   rolling={rolling}
                   name={key}
                   label={String(max)}
                 />
               </DieButton>
            ))}
        </Dice>
      </Footer>
    </AppStyled>
  )
};

const AppStyled = styled.div`
  max-width: 1280px;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.header`
  padding: 8px 0;
  font-size: 24px;
  font-weight: bold;
`;

const Rolls = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  flex: 1;
`;


const ScrollHelper = styled.li``;

const Footer = styled.footer`
  position: sticky;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  padding: 16px 0;
`;


const Dice = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-evenly;
`;

const DieButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  outline: 0;
  :focus {
    outline: 0;
  }
`;