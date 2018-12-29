import React, {Component} from 'react'
import './Pagination.css'
import {Link} from "react-router-dom"

class Pagination extends Component {

  constructor(props) {
    super(props)
    this.state = {
      itemNumber: this.props.itemNumber,
      limit: this.props.limit,
      currentPage: this.props.currentPage
    }
  }

  changePage = (pageNumber) => {
    this.setState({currentPage: pageNumber})
    this.props.onPageChange(pageNumber)
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      itemNumber: newProps.itemNumber,
      currentPage: newProps.currentPage
    })
  }

  renderPagination() {
    let totalPages = Math.ceil(this.state.itemNumber / this.state.limit)
    let links = []
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <Link to={{ pathname: "/albums", search: "?page=" + i }}
              key={i}
              className={(i === this.state.currentPage) ? 'active' : ''}
              onClick={this.changePage.bind(this, i)}>
          {i}
        </Link>)
    }
    return links
  }

  render() {
    return (
      <div className="pagination">
        {this.renderPagination()}
      </div>
    )
  }
}

export default Pagination
