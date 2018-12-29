import React, {Component} from 'react'
import helpers from '../helpers'
import PhotoItem from "./PhotoItem"
import PhotoModal from './PhotoModal'
import './PhotoList.css'
import {Route, withRouter} from 'react-router-dom'

class PhotoList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      albumId: this.props.albumId,
      photos: [],
      currentPhoto: {}
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({albumId: newProps.albumId}, this.loadPhotos)
  }

  componentDidMount() {
    this.loadPhotos()
  }

  selectPhoto = (photo) => {
    this.setState({currentPhoto: photo})

    this.props.history.push({
      pathname: '/albums/' + this.state.albumId + '/photos/' + photo.id,
      search: '?page=' + helpers.getPageParam(),
    })
  }

  loadPhotos() {
    this.getAlbumPhotos().then((json) => {
      this.setState({photos: json})
    })
  }

  getAlbumPhotos() {
    let url = 'https://jsonplaceholder.typicode.com/photos?albumId=' + this.state.albumId
    return helpers.sendRequest(url)
  }

  handleCloseModal() {
    this.props.history.push({
      pathname: '/albums/' + this.state.albumId,
      search: '?page=' + helpers.getPageParam(),
    })
  }

  render() {
    return (
      <div>
        <div className="photos">
          {this.state.photos.map((photo, i) => (
            <PhotoItem key={photo.id}
                       className="photo"
                       id={photo.id}
                       title={photo.title}
                       url={photo.thumbnailUrl}
                       onClick={this.selectPhoto.bind(this, photo)}/>
          ))
          }
        </div>

        <Route path="/albums/:id/photos/:id"
               render={() => <PhotoModal url={this.state.currentPhoto.url}
                                         handleCloseModal={this.handleCloseModal.bind(this)}/>}
        />
      </div>
    )
  }

}

export default withRouter(PhotoList)