import React, { Component } from 'react';
import SearchBar from './SearchBar';
import DropDownOption from './DropDownOption';
import filterIcon from '../image/funnel.png';
import sortIcon from '../image/sort.png';
import dropDownIcon from '../image/dropdown.png';
import dropUpIcon from '../image/dropup.png';
import { makeDate, turnEpochToTime } from '../Helper';

export default class RNbaReader extends Component {
  state = {
    data: [],
    forumOpened: false,
    linkOpened: false,
    searchTerm: '',
    filter: 'Post Game Thread',
    sortBy: 'date',
    filterOpen: false,
    sortByOpen: false,
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
      filterOpen: false
    })
  }
  onFilterHighlightsClick = e => {
    this.setState({
      filter: 'Highlights',
      filterOpen: false
    })
  }
  onFilterGameThreadClick = e => {
    this.setState({
      filter: 'Game Thread',
      filterOpen: false
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

  getHighlightedText = (text, higlight) => {
    // Split text on higlight term, include term itself into parts, ignore case
    var parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === higlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
  }

  componentDidMount = () => {
  };

  // To do:
  // 1. Search bar (DONE)
  // 2. Different filter (DONE)

  render() {
    const { searchTerm, filter, filterOpen, forumOpened, sortBy, sortByOpen } = this.state;
    const { data } = this.props;
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
    var filteredData = data.filter(post => post.data.title.toLowerCase().includes(searchTerm.toLowerCase()));
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

        <div onClick={this.onForumToggleClick} className="list-item list-item--margin-top">
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
            <div className="list-item">
              <div className="title-score">
                <p className="label">Score</p>
                <p className="label">Comments</p>
                <p className="label--big">Post Title</p>
              </div>
            </div>
            {filteredData.map(d => {
              if (d.data.link_flair_text === filter) {
                return (
                  <div className="list-item" key={d.data.id}>
                    {/* <p className="date">{makeDate(d.data.created)}</p> */}
                    <p className="date">{turnEpochToTime(d.data.created_utc*1000)}</p>
                    <div className="title-score">
                      <p className="score">{d.data.score}</p>
                      <p className="score">{d.data.num_comments}</p>
                      <a
                        href={"https://www.reddit.com" + d.data.permalink}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="link no-text-decoration">{this.getHighlightedText(d.data.title, searchTerm)}</a>
                    </div>
                  </div>
                )
              } else {
                return null;
              }
            })}
          </div>
        }
      </div>
    );
  }
}
