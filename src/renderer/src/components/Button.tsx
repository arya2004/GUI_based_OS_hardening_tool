import Conditional from "./Conditional"
import { cloneElement } from "react"
import { ClassNameProp } from "@renderer/main"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>,ClassNameProp {
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
  iconPosition?: 'left' | 'right',
  children: any
}

export default function Button (props: ButtonProps): JSX.Element {

  // Setup some defaults for the props which control button appearance
  // otherProps may contain eventListeners, etc.
  let {
    className = '',
    iconPosition = 'left',
    style = {},
    children = [],
    ...otherProps
  } = props

  if (!Array.isArray(children)) children = [children]

  let icon = children.filter((child: any) => child.props.slot == 'icon')[0]
  let text = children.filter((child: any) => child.props.slot != 'icon')[0]

  // Classnames specified on the Button component override the default classnames
  return (
    <button
      {...otherProps}
      style={style}
      className={`text-md px-4 py-2 border-solid border-2 transition duration-200 bg-primary text-white hover:text-primary border-primary hover:bg-white rounded-md flex items-center justify-between active:scale-95 ${className}`}
    >
      <Conditional>
        <div
          slot="if"
          condition={icon && iconPosition == 'right'}
          className={`button-icon ${text ? 'mr-2' : ''}`}
        >
          {icon}
        </div>
        <div className="button-text">{text}</div>
        <div
          slot="if"
          condition={icon && iconPosition == 'left'}
          className={`button-icon ${text ? 'ml-2' : ''}`}
        >
          {icon}
        </div>
      </Conditional>
    </button>
  )
}