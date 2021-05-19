import React from 'react';
import './App.css';
import './DiceContainer.css'
import './Dice.css'
import './Button.css'
import './RollButton.css'
import './ScoreBoard.css'
import './ScoreRow.css'
import './Match.css'
import matches, {Match} from './matches'


interface IDiceProps {
  value: number
  shake?: boolean
  keep?: boolean
  onClick?: Function
}

function Dice(props: IDiceProps) {
  let keep = props.keep ? " keep" : "",
    pips = props.value ? ` d${props.value}` : " blank",
    shake = props.shake ? " animate" : ""
  return (
    <button className={"dice" + pips + keep + shake}>
      <div className="dice-inside">
        <div className="pip-row top-pips">
          <div className="pip"></div>
          <div className="pip"></div>
        </div>
        <div className="pip-row middle-pips">
          <div className="pip"></div>
          <div className="pip"></div>
        </div>
        <div className="pip-row bottom-pips">
          <div className="pip"></div>
          <div className="pip"></div>
        </div>
      </div>
    </button>
  )
}

function DiceContainer(props: { children: JSX.Element[] }) {
  return (
    <div id="dice-container">
      {props.children}
    </div>
  )
}

function Button(props: {
  children: string,
  id?: string
  inactive?: boolean
}) {
  return (
    <button className={"button" + (props.inactive ? " inactive" : "")}
      id={props.id ? props.id : ""}>
      {props.children}
    </button>
  )
}

function RollButton(props: { label: string }) {
  return (
    <Button id="reroll">
      {props.label}
    </Button>
  )
}

interface IScoreRowProps {
  label: string,
  children: JSX.Element | JSX.Element[]
}

function ScoreRow(props: IScoreRowProps) {
  return (
    <tr>
      <td className="row-label">{props.label}</td>
      {props.children}
    </tr>
  )
}

interface IMatchRowProps {
  match: Match
  scores: number[]
  currentPlayer: number
  diceValues: number[]
}

function MatchRow(props: IMatchRowProps) {
  return (
    <ScoreRow label={props.match.label}>
      {props.scores.map((playerScore, i) => {
        let active = (i === props.currentPlayer),
          score = (active && playerScore === undefined) ? props.match.fn(props.diceValues) : playerScore,
          className = "match"
            + (active ? (score === 0 ? " zero" : " ok") : "")
            + (!active && playerScore !== undefined ? " done" : ""),
          content = active ? (score > 0 ? score : "—") : ""
        return (
          <td className={className}>{content}</td>
        )
      })}
    </ScoreRow>
  )
}

interface IScoreBoardProps {
  playerCount: number
  currentPlayer: number
  score: Score
  diceValues: number[]
  children: JSX.Element[]
}

function ScoreBoard(props: IScoreBoardProps) {
  let headers = [(<td></td>)] // init with empty cell (sits on top of label column)
  for (let i = 0; i < props.playerCount; i++) {
    let label = `~ ${i + 1} ~`,
        className = (i === props.currentPlayer) ? "active" : ""
    headers.push(<th className={className}>{label}</th>)
  }
  return (
    <div id="scoreboard">
      <table>
        <tr>
          {headers}
        </tr>
        {matches.map((match: Match, matchIndex: number) => {
          let scores = []
          for (let playerIndex = 0; playerIndex < props.playerCount; playerIndex++) {
            scores.push(props.score[playerIndex][matchIndex])
          }
          return (<MatchRow match={match}
                            scores={scores}
                            currentPlayer={props.currentPlayer}
                            diceValues={props.diceValues}/>)
        })}
        {props.children}
      </table>
    </div>
  )
}

interface IAppProps { }

type Score = number[][]

interface IDice {
  value: number
  keep: boolean
}

interface IAppState {
  hidden: boolean
  playerCount: number
  currentPlayer: number
  score: Score
  dice: IDice[]
}

class App extends React.Component<IAppProps, IAppState> {
  setCssVariables(): void {
    let animationDuration = 450,
      fullheight = window.innerHeight,
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
  emptyScore(playerCount: number) {
    let score = []
    for (let i = 0; i < playerCount; i++) score.push([])
    return score
  }
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      hidden: false,
      playerCount: 3,
      currentPlayer: 0,
      score: this.emptyScore(3),
      dice: this.rollDice([])
    }
  }
  componentDidMount() {
    this.setCssVariables()
    setTimeout(() => this.setState({ hidden: false }), 1000)
  }
  render() {
    return (
      <div id="wrapper" className={this.state.hidden ? "hidden" : ""}>
        <DiceContainer>
          {this.state.dice.map((d: IDice) =>
            <Dice value={d.value} keep={d.keep} />
          )}
        </DiceContainer>
        <RollButton label="Würfeln" />
        <div id="bottom-wrapper">
          <ScoreBoard playerCount={this.state.playerCount}
            currentPlayer={this.state.currentPlayer}
            score={this.state.score}
            diceValues={this.state.dice.map((d: IDice) => d.value)}>
          </ScoreBoard>
        </div>
      </div>
    )
  }
}

export default App;
