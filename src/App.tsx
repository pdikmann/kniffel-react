import React from 'react';
import './App.css';
import Dice from './Components/Dice'
import DiceContainer from './Components/DiceContainer'
import RollButton from './Components/RollButton'
import ScoreBoard from './Components/ScoreBoard'
import {Score, TurnState} from './Types/Common'
import Config from './Components/Config'

interface IAppProps {
}

interface IDice {
  value: number
  keep: boolean
}

enum BonusState {
  Undecided,
  Fail,
  Success
}

interface IAppState {
  turnState: TurnState
  hidden: boolean
  playerCount: number
  currentPlayer: number
  dice: IDice[]
  rolling: boolean
  gameOver: boolean
  score: Score                // score, indexed by [player-index][match-index]
  bonus: number[]             // bonus score, indexed by [player-index]
  bonusState: BonusState[]    // bonus state, indexed by [player-index]
  lastSelectedMatch: number[] // indexed by [player-index]
}

let animationDuration = 450

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.advanceTurn = this.advanceTurn.bind(this)
    this.state = {
      turnState: TurnState.FirstThrow,
      hidden: false,
      playerCount: 1,
      currentPlayer: 0,
      dice: this.rollDice([]),
      rolling: false,
      gameOver: false,
      ...this.perPlayerState(1)
    }
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

  rollDice(dices: IDice[] | []): IDice[] {
    let newDices = []
    for (let i = 0; i < 5; i++) {
      if (dices[i] && dices[i].keep) continue
      newDices[i] = {
        value: Math.ceil(Math.random() * 6),
        keep: false
      }
    }
    return newDices
  }

  advanceTurn() {
    if (this.state.rolling
      || this.state.turnState === TurnState.Selection)
      return
    this.setState(() => ({
      rolling: true
    }))
    setTimeout(() => {
      this.setState((state: IAppState) => ({
        rolling: false,
        turnState: (state.turnState + 1) % TurnState.MAX
      }))
    }, animationDuration)
  }

  perPlayerState(playerCount: number) {
    return {
      score: new Array(playerCount).fill([]),
      bonus: new Array(playerCount).fill(0),
      bonusState: new Array(playerCount).fill(BonusState.Undecided),
      lastSelectedMatch: new Array(playerCount).fill(null)
    }
  }

  componentDidMount() {
    this.setCssVariables()
    setTimeout(() => this.setState({hidden: false}), 1000)
  }

  render() {
    return (
      <div id="wrapper" className={this.state.hidden ? "hidden" : ""}>
        <DiceContainer>
          {this.state.dice.map((d: IDice, i: number) =>
            <Dice
              key={i}
              value={d.value}
              keep={d.keep}
              rolling={this.state.rolling}/>
          )}
        </DiceContainer>
        <RollButton
          turnState={this.state.turnState}
          onClick={this.advanceTurn}/>
        <div id="bottom-wrapper">
          <ScoreBoard
            playerCount={this.state.playerCount}
            currentPlayer={this.state.currentPlayer}
            score={this.state.score}
            diceValues={this.state.dice.map((d: IDice) => d.value)}
            turnState={this.state.turnState}
            rolling={this.state.rolling}>
          </ScoreBoard>
        </div>
        <Config/>
      </div>
    )
  }
}

export default App;
