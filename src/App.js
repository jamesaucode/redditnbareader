import React, { Component } from 'react';
import './style/main.scss';
import SearchBar from './component/SearchBar';

class App extends Component {
  state = {
    data: [],
    linkOpened: false,
    searchTerm: ''
  }
  componentDidMount = () => {
    fetch('https://www.reddit.com/r/nba.json?limit=1000')
      .then(res => res.json())
      .then(json => this.setState({
        data: json.data.children
      }))
  }

  test = e => {
    console.log(this.state.data)
    this.state.data.forEach(e => {
      console.log(e.data.link_flair_text)
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

  // To do:
  // 1. Search bar
  // 2. Different filter

  render() {
    const searchTerm = this.state.searchTerm;
    const filteredData = this.state.data.filter(post => post.data.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="app">
        <div className="heading">
          All <span className="linear-gradient-orange">r/nba</span> post game thread
        </div>
        <SearchBar
          onSearchTermChange={this.onSearchTermChange}
          searchTerm={this.state.searchTerm}
        />
        <div className="wrapper--list">
          <div className="list-item">
            <div className="title-score">
              <p className="label">Score</p>
              <p className="label--big">Post Title</p>
            </div>
          </div>
          {filteredData.sort((a, b) => { return a.data.created - b.data.created }).map(d => {
            if (d.data.link_flair_text === "Post Game Thread") {
              return (
                <div className="list-item" key={d.data.id}>
                  <p className="date">{this.makeDate(d.data.created)}</p>
                  <div className="title-score">
                    <p className="score">{d.data.score}</p>
                    <a
                      href={d.data.url}
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
        {/* {this.state.linkOpened &&
        <iframe title="popout" className="popout" width="80vw" height="80vh" src="https://www.example.com/show?data...">
        </iframe>
        }
        {this.state.linkOpened &&
          <div onClick={this.onLinkClick} className="black-background">
          </div>
        } */}


        {/* <iframe
          title="Example"
          width="300"
          height="200"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
        </iframe> */}
      </div>
    );
  }
}

export default App;
