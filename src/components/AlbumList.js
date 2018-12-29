import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import helpers from '../helpers'
import './AlbumList.css'
import AlbumItem from './AlbumItem'
import Pagination from "./Pagination"
import AlbumData from "./AlbumData"

class AlbumList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: [],
      currentPage: null,
      currentAlbum: {},
      limit: 6,
      albumTotal: 0
    }
  }

  componentDidMount() {
    this.setState({currentPage: helpers.getPageParam()}, this.loadAlbums)
    this.getAllAlbums().then((json) => {
      this.setState({albumTotal: json.length})
    })
  }

  changePage = (pageNumber) => {
    this.setState({currentPage: pageNumber}, this.loadAlbums)
  }

  selectAlbum = (album) => {
    this.props.history.push({
      pathname: '/albums/' + album.id,
      search: '?page=' + parseInt(this.state.currentPage),
    })
    // trigger le componentWillReceiveProps dans AlbumData
    this.setState({currentAlbum: album})
  }

  loadAlbums() {
    this.getAlbums().then((json) => {
      this.setState({albums: json})
    })
  }

  async getAlbums() {
    let url = 'https://jsonplaceholder.typicode.com/albums?_limit=' + this.state.limit + '&_page=' + this.state.currentPage
    return helpers.sendRequest(url)
  }

  async getAllAlbums() {
    let url = 'https://jsonplaceholder.typicode.com/albums'
    return helpers.sendRequest(url)
  }

  render() {
    return (
      <div className="main">
        <ul className="albums">{
          this.state.albums.map((album, i) => (
            <AlbumItem key={album.id}
                       id={album.id}
                       title={album.title}
                       onClick={this.selectAlbum.bind(this, album)}/>
          ))
        }
        </ul>
        <Pagination limit={this.state.limit}
                    onPageChange={this.changePage}
                    itemNumber={this.state.albumTotal}
                    currentPage={this.state.currentPage}/>

        <Route path="/albums/:id" render={() => <AlbumData album={this.state.currentAlbum}/>}/>
      </div>
    )
  }

}

export default AlbumList