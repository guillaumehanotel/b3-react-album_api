import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'

class PhotoItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      title: this.props.title,
      url: this.props.url
    }
  }

  render() {
    return (
      <Image onClick={this.props.onClick}
             src={this.state.url}
             size='small'/>
    )
  }

}

export default PhotoItem