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
      <About>
        <Header>Dice′n′rolla</Header>
        <Content></Content>
        <Footer>
          with 🤍 from <a href="https://robox.dev" target="_blank">robox</a>
        </Footer>
      </About>
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
      <FloatingBar>
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
      </FloatingBar>
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

const About = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 80px;
`;

const Header = styled.header``;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  font-size: 12px;
  color: hsl(0, 0%, 55%);
  
  a {
    color: hsl(0, 0%, 55%);
    text-decoration: underline;
  }
  
`;

const Rolls = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  
  flex: 1 0 calc(100vh - 80px);
`;


const ScrollHelper = styled.li``;

const FloatingBar = styled.div`
  position: sticky;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-height: 80px;
  
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