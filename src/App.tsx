import React from 'react';
import './App.css';
import Dice from './Components/Dice'
import DiceContainer from './Components/DiceContainer'
import RollButton from './Components/RollButton'
import ScoreBoard from './Components/ScoreBoard'
import {BonusState, IAppInteractions, IAppState, IDice, TurnState} from './Types/Common'
import Config from './Components/Config'
import {StateContext} from "./Components/StateContext";
import {InteractionContext} from "./Components/InteractionContext";
import matches from "./Logic/matches";


interface IAppProps {
}

let animationDuration = 450

class App extends React.Component<IAppProps, IAppState> {
  interactions: IAppInteractions

  constructor(props: IAppProps) {
    super(props)
    this.nextPlayer = this.nextPlayer.bind(this)
    this.resetDice = this.resetDice.bind(this)
    this.updateBonus = this.updateBonus.bind(this)
    this.state = this.initialState(2)
    this.interactions = {
      advanceTurn: this.advanceTurn.bind(this),
      keepDice: this.keepDice.bind(this),
      selectMatch: this.selectMatch.bind(this)
    }
  }

  initialState(playerCount: number) {
    return {
      turnState: TurnState.FirstThrow,
      hidden: false,
      playerCount: playerCount,
      currentPlayer: 0,
      rolling: false,
      gameOver: false,
      ...this.perPlayerInitialState(playerCount),
      ...this.rollDice([])
    }
  }

  perPlayerInitialState(playerCount: number) {
    return {
      score: new Array(playerCount).fill([]),
      bonus: new Array(playerCount).fill(0),
      bonusState: new Array(playerCount).fill(BonusState.Undecided),
      lastSelectedMatch: new Array(playerCount).fill(null)
    }
  }

  selectMatch(matchIndex: number, playerIndex: number) {
    this.setState((state) => {
      if (state.rolling
        || state.turnState === TurnState.FirstThrow
        || state.currentPlayer !== playerIndex
        || state.score[playerIndex][matchIndex] !== undefined)
        return {...state}
      let lastSelectedMatch = state.lastSelectedMatch.slice()
      lastSelectedMatch[playerIndex] = matchIndex
      let score = state.score.slice()
      let playerScore = state.score[playerIndex].slice()
      playerScore[matchIndex] = matches[matchIndex].fn(this.state.diceValues)
      score[playerIndex] = playerScore
      return {
        lastSelectedMatch,
        score
      }
    })
    this.updateBonus(playerIndex)
    this.resetDice()
    this.nextPlayer()
  }

  updateBonus(playerIndex: number) {
    this.setState(s => {
      let bonusState = s.bonusState.slice(), bonus = s.bonus.slice();
      if (s.score[playerIndex].slice(0, 6).filter(x => x === 0).length > 0) {
        bonusState[playerIndex] = BonusState.Fail
        bonus[playerIndex] = 0
      } else if (s.score[playerIndex].slice(0, 6).filter(x => x > 0).length === 6) {
        bonusState[playerIndex] = BonusState.Success
        bonus[playerIndex] = 35
      }
      return {bonusState, bonus}
    })
  }

  resetDice() {
    this.setState(s => ({
      dice: s.dice.map(d => ({...d, keep: false}))
    }))
  }

  nextPlayer() {
    this.setState(s => ({
      turnState: TurnState.FirstThrow,
      currentPlayer: (s.currentPlayer + 1) % s.playerCount
    }))
  }

  keepDice(n: number) {
    if (this.state.turnState === TurnState.FirstThrow
      || this.state.rolling) return
    this.setState((s) => {
      let dice = s.dice.slice(), // shallow copy!
        d = {...dice[n]}
      d.keep = !d.keep
      dice[n] = d
      return {dice}
    })
  }

  rollDice(oldDices: IDice[] | []): { dice: IDice[], diceValues: number[] } {
    let dice = []
    for (let i = 0; i < 5; i++) {
      if (oldDices[i] && oldDices[i].keep) {
        dice[i] = oldDices[i]
      } else {
        dice[i] = {
          value: Math.ceil(Math.random() * 6),
          keep: false
        }
      }
    }
    let diceValues = dice.map(d => d.value).sort()
    return {dice, diceValues}
  }

  advanceTurn() {
    if (this.state.rolling
      || this.state.turnState === TurnState.Selection)
      return
    if (this.state.gameOver){
      this.setState(() => this.initialState(this.state.playerCount))
      return
    }
    this.setState(() => ({
      rolling: true
    }))
    setTimeout(() => {
      this.setState((state: IAppState) => ({
          rolling: false,
          turnState: (state.turnState + 1) % TurnState.MAX,
          ...this.rollDice(state.dice)
        })
      )
    }, animationDuration)
  }

  setCssVariables(): void {
    let fullheight = window.innerHeight,
      fullwidth = Math.min(window.innerWidth, 375),
      unit = Math.min(fullheight, fullwidth) / 13,
      tableMargin = 2 * (unit / 2),
      trMargin = unit / 8,
      rowHead = unit,
      rowHeight = unit * 1.5,
      tableContentHeight = tableMargin + rowHead + 17 * (rowHeight + trMargin), //unit * 29.625,
      topContentHeight = unit * 4.5,
      bottomWrapperHeight = Math.min(fullheight - topContentHeight, tableContentHeight)
    document.documentElement.style.setProperty('--bottom-wrapper-height', `${bottomWrapperHeight}px`)
    document.documentElement.style.setProperty('--animation-duration', `${animationDuration}ms`)
  }

  componentDidMount() {
    this.setCssVariables()
    setTimeout(() => this.setState({hidden: false}), 1000)
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        <InteractionContext.Provider value={this.interactions}>
          <div id="wrapper" className={this.state.hidden ? "hidden" : ""}>
            {/*<WrappedExample/>*/}
            <DiceContainer>
              {this.state.dice.map((d: IDice, i: number) =>
                <Dice
                  key={i}
                  n={i}
                  value={d.value}
                  keep={d.keep}/>
              )}
            </DiceContainer>
            <RollButton/>
            <div id="bottom-wrapper">
              <ScoreBoard
                playerCount={this.state.playerCount}
                currentPlayer={this.state.currentPlayer}
                score={this.state.score}
                turnState={this.state.turnState}
                rolling={this.state.rolling}>
              </ScoreBoard>
            </div>
            <Config/>
          </div>
        </InteractionContext.Provider>
      </StateContext.Provider>
    )
  }
}

export default App;
