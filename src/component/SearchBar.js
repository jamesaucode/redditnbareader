import React, { Component } from 'react'

export default class SearchBar extends Component {
    handleChange = e => {
        this.props.onSearchTermChange(e);
    }
  render() {
      const { searchTerm } = this.props; 
    return (
      <div className="flex-centered margin-top-bottom--small max-width">
        <input 
        placeholder="Search Post"
        className="search-bar"
        onChange={this.handleChange}
        value={searchTerm}>
        </input>
      </div>
    )
  }
}
