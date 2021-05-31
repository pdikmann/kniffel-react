import React from "react";
import {IAppInteractions} from "../Types/Common";

const defaultInteractions : IAppInteractions = {
  advanceTurn: () => undefined,
  keepDice: () => undefined,
  selectMatch: () => undefined
}

export const InteractionContext = React.createContext(defaultInteractions)