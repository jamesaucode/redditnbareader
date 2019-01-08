import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Post from './Post';
import DropDownOption from './DropDownOption';
import filterIcon from '../image/funnel.png';
import sortIcon from '../image/sort.png';
import dropDownIcon from '../image/dropdown.png';
import dropUpIcon from '../image/dropup.png';
// import { turnEpochToTime } from '../Helper';
// import { findHighlight } from '../ReactHelper';

export default class RNbaReader extends Component {
  state = {
    forumOpened: true,
    linkOpened: false,
    searchTerm: '',
    filter: 'Post Game Thread',
    currentFilterLength: this.props.postgames.length,
    sortBy: 'date',
    filterOpen: false,
    sortByOpen: false,
    read: {},
    pageAdjust: 10
  }

  onLinkClick = e => {
    this.setState(prevState => ({
      linkOpened: !prevState.linkOpened
    }))
  }

  onSearchTermChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }
  onFilterChange = e => {
    this.setState({
      filter: e.target.value
    })
  }
  onSortByChange = e => {
    this.setState({
      sortBy: e.target.value
    })
  }

  onForumToggleClick = e => {
    this.setState(prevState => ({
      forumOpened: !prevState.forumOpened
    }))
  }

  onFilterClick = e => {
    this.setState(prevState => ({
      filterOpen: !prevState.filterOpen,
      sortByOpen: false
    }))
  }
  onSortByClick = e => {
    this.setState(prevState => ({
      sortByOpen: !prevState.sortByOpen,
      filterOpen: false
    }))
  }
  onFilterPostGameThreadClick = e => {
    this.setState({
      filter: 'Post Game Thread',
      filterOpen: false,
      currentFilterLength: this.props.postgames.length,
      pageAdjust: 10
    })
  }
  onFilterHighlightsClick = e => {
    this.setState({
      filter: 'Highlights',
      filterOpen: false,
      currentFilterLength: this.props.highlights.length,
      pageAdjust: 10
    })
  }
  onFilterGameThreadClick = e => {
    this.setState({
      filter: 'Game Thread',
      filterOpen: false,
      currentFilterLength: this.props.games.length,
      pageAdjust: 10
    })
  }
  onSortByDateClick = e => {
    this.setState({
      sortBy: 'date',
      sortByOpen: false
    })
  }
  onSortByScoreClick = e => {
    this.setState({
      sortBy: 'score',
      sortByOpen: false
    })
  }
  onSortByCommentsClick = e => {
    this.setState({
      sortBy: 'comments',
      sortByOpen: false
    })
  }

  onPreviousPageClick = e => {
    var newPageAdjust = this.state.pageAdjust + 10;
    if (newPageAdjust > this.state.currentFilterLength) {
      this.setState({
        pageAdjust: this.state.currentFilterLength
      })
    } else {
      this.setState({
        pageAdjust: newPageAdjust
      })
    }
  }
  onNextPageClick = e => {
    var newPageAdjust = this.state.pageAdjust - 10;
    if (newPageAdjust > 0) {
      this.setState(prevState=> ({
        pageAdjust: newPageAdjust
      }))
    } 
  }

  componentDidMount = () => {
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.currentFilterLength === 0) {
      this.setState({
        currentFilterLength: this.props.postgames.length
      })
    }
  }
  


  // To do:
  // 1. Search bar (DONE)
  // 2. Different filter (DONE)

  render() {
    const { searchTerm, filter, filterOpen, forumOpened, sortBy, sortByOpen } = this.state;
    const { postgames, games, highlights } = this.props;
    var i = 0;
    var showFilter = '';
    if (filterOpen) {
      showFilter = 'dropdown-content--show'
    } else {
      showFilter = 'dropdown-content'
    }
    var showSortBy = '';
    if (sortByOpen) {
      showSortBy = 'dropdown-content--show'
    } else {
      showSortBy = 'dropdown-content'
    }
    var filteredData = postgames;
    if (this.state.filter === "Post Game Thread") {
      filteredData = postgames;
      console.log(filteredData.length)
    } else if (this.state.filter === "Game Thread") {
      filteredData = games;
    } else {
      filteredData = highlights;
    }
    filteredData = filteredData.filter(post => post.data.title.toLowerCase().includes(searchTerm.toLowerCase()));
    switch (sortBy) {
      case 'score':
        filteredData = filteredData.sort((a, b) => { return b.data.score - a.data.score })
        break;
      case 'comments':
        filteredData = filteredData.sort((a, b) => { return b.data.num_comments - a.data.num_comments })
        break;
      default:
        filteredData = filteredData.sort((a, b) => { return b.data.created - a.data.created })
    }
    return (
      <div className="app">
        <div className="wrapper-nav">
          <nav className="nav-bar">
            <div className="heading">
              r/nba Reader
            </div>
            <SearchBar
              onSearchTermChange={this.onSearchTermChange}
              searchTerm={searchTerm}
            />
            <div className="wrapper--select">
              <div className="select">
                <div className="dropdown">
                  <button onClick={this.onFilterClick} className="btn-icon">
                    <img alt="filter icon" className="icon" src={filterIcon}></img>
                  </button>
                  <div className={showFilter}>
                    <DropDownOption
                      currentFilter={filter}
                      filter="Post Game Thread"
                      onChangeFilterClick={this.onFilterPostGameThreadClick}
                    />
                    <DropDownOption
                      currentFilter={filter}
                      filter="Game Thread"
                      onChangeFilterClick={this.onFilterGameThreadClick}
                    />
                    <DropDownOption
                      currentFilter={filter}
                      filter="Highlights"
                      onChangeFilterClick={this.onFilterHighlightsClick}
                    />
                  </div>
                </div>
              </div>
              <div className="select">
                <div className="dropdown">
                  <button onClick={this.onSortByClick} className="btn-icon">
                    <img className="icon" alt="sort icon" src={sortIcon}></img>
                  </button>
                  <div className={showSortBy}>
                    <DropDownOption
                      currentFilter={sortBy}
                      filter="date"
                      onChangeFilterClick={this.onSortByDateClick}
                    />
                    <DropDownOption
                      currentFilter={sortBy}
                      filter="score"
                      onChangeFilterClick={this.onSortByScoreClick}
                    />
                    <DropDownOption
                      currentFilter={sortBy}
                      filter="comments"
                      onChangeFilterClick={this.onSortByCommentsClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {filterOpen && <div onClick={this.onFilterClick} className="clickable-back"></div>}

        <div onClick={this.onForumToggleClick} className="list-item list-item--margin-top list-item--small">
          {forumOpened
            ?
            <img
              className="icon margin-centered"
              alt="drop up icon"
              src={dropUpIcon}></img>
            :
            <img
              className="icon margin-centered"
              alt="drop down icon"
              src={dropDownIcon}></img>
          }
        </div>

        {forumOpened &&
          <div className="wrapper--list">
            <div className="list-item list-item--small">
              <div className="title-score">
                <p className="label">Score</p>
                <p className="label">Comments</p>
                <p className="label--big">Post Title</p>
              </div>
            </div>
            {filteredData.map(d => {
              if (d.data.link_flair_text === filter && i < 10 + this.state.pageAdjust) {
                i++;
                if (i > this.state.pageAdjust)
                  return (
                    <Post
                    created={d.data.created_utc * 1000}
                    score={d.data.score}
                    num_comments={d.data.num_comments}
                    id={d.id}
                    permalink={d.data.permalink}
                    title={d.data.title}
                    searchTerm={searchTerm}
                    />
                  )
              }
            })}
            <div className="wrapper--btns">
              <button className="btn--medium" onClick={this.onPreviousPageClick}>←</button>
              <button className="btn--medium" onClick={this.onNextPageClick}>→</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
