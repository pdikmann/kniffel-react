import React from "react";
import {IAppState, TurnState} from "../Types/Common";

const defaultState: IAppState = {
  turnState: TurnState.FirstThrow,
  hidden: false,
  playerCount: 1,
  currentPlayer: 0,
  dice: [],
  diceValues: [],
  rolling: false,
  gameOver: false,
  score: [[]],
  bonus: [],
  bonusState: [],
  lastSelectedMatch: [],
}

export const StateContext = React.createContext(defaultState)