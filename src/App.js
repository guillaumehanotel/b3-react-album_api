import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css'
import AlbumList from './components/AlbumList'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={() => <Redirect to={{ pathname:"/albums", search: "?page=1" }}/>} />
          <Route path="/albums" component={AlbumList}/>
        </div>
      </Router>
    )
  }
}

export default App
