import React, {Component} from 'react'
import {Card, Image} from 'semantic-ui-react'
import './AlbumItem.css'


class AlbumItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title
    }
  }

  render() {
    return (
      <li className="album" onClick={this.props.onClick}>
        <Card>
          <Card.Content>
            <Image size='small' src='/image.png'/>
            <Card.Header><p>{this.state.title}</p></Card.Header>
          </Card.Content>
        </Card>
      </li>
    )
  }

}

export default AlbumItem