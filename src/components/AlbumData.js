import React, {Component} from 'react'
import helpers from '../helpers'
import _ from 'lodash'
import { Card, Image } from 'semantic-ui-react'
import PhotoList from "./PhotoList"



class AlbumData extends Component {

  constructor(props) {
    super(props)
    this.state = {
      album: this.props.album,
      user: null
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({album: newProps.album}, this.loadAlbumData)
  }

  async loadAlbumData() {
    if (!_.isEmpty(this.state.album)) {
      this.getAlbumUser().then((json) => {
        this.setState({user: json})
      })
    }
  }

  getAlbumUser() {
    let url = 'https://jsonplaceholder.typicode.com/users/' + this.state.album.userId
    return helpers.sendRequest(url)
  }

  renderAlbumUser() {
    if (this.state.user !== null) {
      return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
            <Card.Header>{this.state.user.name}</Card.Header>
            <Card.Meta>{this.state.user.username}</Card.Meta>
            <Card.Description>
              <p><strong>Email : </strong>{this.state.user.email}</p>
              <p><strong>Phone : </strong>{this.state.user.phone}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      )
    }
  }

  renderAlbumData() {
    if (!_.isEmpty(this.state.album)) {
      return (
        <div>
          <h2>Album : {this.state.album.title}</h2>
          {this.renderAlbumUser()}
          <PhotoList albumId={this.state.album.id}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="album-data">
        {this.renderAlbumData()}
      </div>
    )
  }

}

export default AlbumData