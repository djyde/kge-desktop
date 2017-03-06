import * as React from 'react'

export interface ProgressbarProps extends React.Props<HTMLInputElement> {

}

class Progressbar extends React.Component<ProgressbarProps, {}> {
  render () {
    return (
      <div>
        <input type="range" {...this.props}/>
      </div>
    )
  }
}

export default Progressbar