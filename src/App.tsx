import { useStore } from 'effector-react';

import styled from 'styled-components';

import {
  $dice,
  $rollingDice,
  $rolls,
  setScrollHelperEl,
} from './models/dice';

import { Die } from './Die';
import { Roll } from './Roll';

export const App = () => {
  const dice = useStore($dice);
  const rolls = useStore($rolls);
  const rollingDice = useStore($rollingDice);
  return (
    <AppStyled>
      <Header>Dice'n'rolla</Header>
      <Rolls>
        {rolls.map((r) => (
          <Roll
            key={r.datetime}
            dice={r.dice}
            diceResult={r.diceResult}
            sum={r.sum}
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
               onClick,
               animationKey,
             }) => (
              <DieButton
                key={animationKey}
                onClick={onClick}>
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