export type Score = number[][]

export enum TurnState {
  FirstThrow,
  SecondThrow,
  ThirdThrow,
  Selection,
  MAX
}

export interface IDice {
  value: number
  keep: boolean
}

export enum BonusState {
  Undecided,
  Fail,
  Success
}

export interface IAppState {
  turnState: TurnState
  hidden: boolean
  playerCount: number
  currentPlayer: number
  dice: IDice[]
  diceValues: number[]
  rolling: boolean
  gameOver: boolean
  score: Score                // score, indexed by [player-index][match-index]
  bonus: number[]             // bonus score, indexed by [player-index]
  bonusState: BonusState[]    // bonus state, indexed by [player-index]
  lastSelectedMatch: number[] // indexed by [player-index]
}

export interface IAppInteractions {
  advanceTurn: () => void
  keepDice: (n : number) => void
  selectMatch: (matchIndex: number, playerIndex: number) => void
}

export interface IMergedContexts extends IAppState, IAppInteractions {
}

// export type IMergedContexts = IAppState & IAppInteractions