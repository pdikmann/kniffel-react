import { MouseEventHandler } from 'react'
import './Button.css'

function Button(props: {
  children: string
  accent?: boolean
  id?: string
  inactive?: boolean
  onClick?: MouseEventHandler
}) {
  return (
    <button className={"button" + (props.inactive ? " inactive" : "") + (props.accent ? " accent" : "")}
            id={props.id ? props.id : ""}
            onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
