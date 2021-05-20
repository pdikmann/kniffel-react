import { MouseEventHandler } from 'react'
import './Button.css'

function Button(props: {
  children: string,
  id?: string
  inactive?: boolean
  onClick?: MouseEventHandler
}) {
  return (
    <button className={"button" + (props.inactive ? " inactive" : "")}
            id={props.id ? props.id : ""}
            onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
