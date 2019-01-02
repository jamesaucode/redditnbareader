import React, { Component } from 'react';
import '../style/main.scss';
import SearchBar from './SearchBar';
import filterIcon from '../image/funnel.png';
import sortIcon from '../image/sort.png';
import tickIcon from '../image/tick.png'; 
import { chainFetch } from '../Helper';

class App extends Component {
  state = {
    data: [],
    linkOpened: false,
    searchTerm: '',
    filter: 'Post Game Thread',
    sortBy: 'date',
    filterOpen: false,
    sortByOpen: false,
  }

  test = e => {
    console.log(this.state.data[0].data.title)
    this.state.data.forEach(d => {
      if (d.data.title.toLowerCase().includes('golden state')) {
        console.log(d.data.title)
      }
    })
  }

  makeDate = (seconds) => {
    var date = new Date(seconds * 1000);
    var dateString = date.toLocaleString();
    return dateString;
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

  componentDidMount = () => {
    fetch('https://www.reddit.com/r/nba.json?limit=100').then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        data: json.data.children
      })
      var after = json.data.after;
      return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: this.state.data.concat(json.data.children)
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: this.state.data.concat(json.data.children)
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`)
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: this.state.data.concat(json.data.children)
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: this.state.data.concat(json.data.children)
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
      })
      .catch(err => console.log('Request failed' + err))

    console.log('Date now is :' + Date.now())
  };

  // To do:
  // 1. Search bar (DONE)
  // 2. Different filter (DONE)

  render() {
    const searchTerm = this.state.searchTerm;
    const filter = this.state.filter;
    var showFilter = '';
    if (this.state.filterOpen) {
      showFilter = 'dropdown-content--show'
    } else {
      showFilter = 'dropdown-content'
    }
    var showSortBy = '';
    if (this.state.sortByOpen) {
      showSortBy = 'dropdown-content--show'
    } else {
      showSortBy = 'dropdown-content'
    }
    var filteredData = this.state.data.filter(post => post.data.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (this.state.sortBy === "date") {
      filteredData = filteredData.sort((a, b) => { return b.data.created - a.data.created })
    } else if (this.state.sortBy === "score") {
      filteredData = filteredData.sort((a, b) => { return b.data.score - a.data.score })
    }
    return (
      <div className="app">
        <div className="wrapper-nav">
        <button onClick={this.test}>TEST</button>
          <nav className="nav-bar">
            <div className="heading">
              <span className="linear-gradient-orange">r/nba</span> Reader
            </div>
            <SearchBar
              onSearchTermChange={this.onSearchTermChange}
              searchTerm={this.state.searchTerm}
            />
            <div className="select">
              <div className="dropdown">
                <button onClick={this.onFilterClick} className="btn-icon">
                  <img alt="filter icon" className="icon" src={filterIcon}></img>
                </button>
                <div className={showFilter}>
                  <div onClick={this.onFilterPostGameThreadClick} className="option">
                    {this.state.filter === "Post Game Thread" ? <img alt="tick icon" className="icon--wide" src={tickIcon}></img>
                      :
                      <div className="icon--wide"></div>}
                    <span>Post Game Thread</span>
                  </div>
                  <div onClick={this.onFilterGameThreadClick} className="option">
                    {this.state.filter === "Game Thread" ?
                      <img className="icon--wide" alt="tick icon" src={tickIcon}></img> :
                      <div className="icon--wide"></div>}
                    <span>Live Game Thread</span>
                  </div>
                  <div onClick={this.onFilterHighlightsClick} className="option">
                    {this.state.filter === "Highlights" ?
                      <img className="icon--wide" alt="tick icon" src={tickIcon}></img> :
                      <div className="icon--wide"></div>}
                    <span>Highlights</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="select">
              <div className="dropdown">
                <button onClick={this.onSortByClick} className="btn-icon">
                  <img className="icon" alt="tick icon" src={sortIcon}></img>
                </button>
                <div className={showSortBy}>
                  <div onClick={this.onSortByDateClick} className="option">
                    {this.state.sortBy === "date" ?
                      <img className="icon--wide" alt="tick icon" src={tickIcon}></img> :
                      <div className="icon--wide"></div>}
                    <span>Date</span>
                  </div>
                  <div onClick={this.onSortByScoreClick} className="option">
                    {this.state.sortBy === "score" ?
                      <img className="icon--wide" alt="tick icon" src={tickIcon}></img> :
                      <div className="icon--wide"></div>}
                    <span>Score</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {this.state.filterOpen && <div onClick={this.onFilterClick} className="clickable-back"></div>}

        <div className="wrapper--list">
          <div className="list-item">
            <div className="title-score">
              <p className="label">Score</p>
              <p className="label--big">Post Title</p>
            </div>
          </div>
          {filteredData.map(d => {
            if (d.data.link_flair_text === filter) {
              return (
                <div className="list-item" key={d.data.id}>
                  <p className="date">{this.makeDate(d.data.created)}</p>
                  <div className="title-score">
                    <p className="score">{d.data.score}</p>
                    <a
                      href={"https://www.reddit.com" + d.data.permalink}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="link">{d.data.title}</a>
                  </div>
                </div>
              )
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;
