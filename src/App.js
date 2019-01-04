import React, { Component } from 'react'
import RNbaReader from './component/RNbaReader';
import Schedule from './component/Schedule';
import './style/main.scss'

export default class App extends Component {

  state = {
    data: [],
    read: {}
  }

  componentDidMount = () => {
    // fetch('https://apiv2.pushshift.io/reddit/submission/search/?subreddit=nba&limit=100000').then(response => {
    //   return response.json();
    // }).then(json => {
    //   var realData = json.data.filter(d => d.selftext !== "[removed]").filter(d=> 'link_flair_text' in d )
    //   this.setState({
    //     data: realData
    //   })
    //   var after = json.data[999].created_utc;
    //   return fetch(`https://apiv2.pushshift.io/reddit/submission/search/?subreddit=nba&limit=100000&before=${after}`)
    // })
    //   .then(response => response.json())
    //   .then(json => {
    //     var realData = json.data.filter(d => d.selftext !== "[removed]").filter(d=> 'link_flair_text' in d )
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(realData)
    //     }))
    //     var after = json.data[999].created_utc;
    //     return fetch(`https://apiv2.pushshift.io/reddit/submission/search/?subreddit=nba&limit=100000&before=${after}`)
    //   })
    // for (let i = 0; i < 5; i++) {
    //   console.log(`https://www.reddit.com/r/nba.json?limit=100&after=${after}`);
    //   fetch(`https://www.reddit.com/r/nba.json?limit=100&after=${after}`)
    //   .then(res => res.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState({
    //       data: filteredData
    //     })
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?limit=100&after=${after}`)
    //   })
    // }


    fetch('https://www.reddit.com/r/nba/search.json?q=flair:%22Game%20Thread%22&limit=100&sort=new&restrict_sr=on')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          data: json.data.children
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Game%20Thread%22&limit=100&sort=new&restrict_sr=on&after=${after}`)
      })
      .then(response => response.json())
      .then(json => {
        var filteredData = json.data.children.filter(d => (d.data.selftext !== "[removed]" && !(d.data.id in this.state.read)))
        this.setState(prevState => ({
          data: prevState.data.concat(filteredData)
        }))
        var newRead = this.state.read;
        this.state.data.map(d => {
          newRead[d.data.id] = 1;
        })
        this.setState({
          read: newRead
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Game%20Thread%22&limit=100&sort=new&restrict_sr=on&after=${after}`)
      })
      .then(response => response.json())
      .then(json => {
        var filteredData = json.data.children.filter(d => (d.data.selftext !== "[removed]" && !(d.data.id in this.state.read)))
        this.setState(prevState => ({
          data: prevState.data.concat(filteredData)
        }))
        var newRead = this.state.read;
        this.state.data.map(d => {
          newRead[d.data.id] = 1;
        })
        this.setState({
          read: newRead
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Game%20Thread%22&limit=100&sort=new&restrict_sr=on&after=${after}`)
      })
      .then(response => response.json())
      .then(json => {
        var filteredData = json.data.children.filter(d => (d.data.selftext !== "[removed]" && !(d.data.id in this.state.read)))
        this.setState(prevState => ({
          data: prevState.data.concat(filteredData)
        }))
        var newRead = this.state.read;
        this.state.data.map(d => {
          newRead[d.data.id] = 1;
        })
        this.setState({
          read: newRead
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Game%20Thread%22&limit=100&sort=new&restrict_sr=on&after=${after}`)
      })
      .then(response => response.json())
      .then(json => {
        var filteredData = json.data.children.filter(d => (d.data.selftext !== "[removed]" && !(d.data.id in this.state.read)))
        this.setState(prevState => ({
          data: prevState.data.concat(filteredData)
        }))
        var newRead = this.state.read;
        this.state.data.map(d => {
          newRead[d.data.id] = 1;
        })
        this.setState({
          read: newRead
        })
        var after = json.data.after;
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Game%20Thread%22&limit=100&sort=new&restrict_sr=on&after=${after}`)
      })

    // fetch('https://www.reddit.com/r/nba.json?sort=hot&limit=100').then(response => {
    //   return response.json();
    // }).then(json => {
    //   this.setState({
    //     data: json.data.children
    //   })
    //   var newRead = this.state.read;
    //   this.state.data.map(d => {
    //     newRead[d.data.id] = 1;
    //   })
    //   var after = json.data.after;
    //   // console.log(after)
    //   // console.log(this.state.read)
    //   return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    // })
    //   .then(response => response.json())
    //   .then(json => {
        
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })

    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })

    //   .then(response => response.json())
    //   .then(json => {
    //     var filteredData = json.data.children.filter(d => (d.data.link_flair_text === "Post Game Thread" || d.data.link_flair_text === "Game Thread" || d.data.link_flair_text === "Highlights") && d.data.selftext !== "[removed]" && !(d.data.id in this.state.read))
    //     this.setState(prevState => ({
    //       data: prevState.data.concat(filteredData)
    //     }))
    //     var newRead = this.state.read;
    //     this.state.data.map(d => {
    //       newRead[d.data.id] = 1;
    //     })
    //     this.setState({
    //       read: newRead
    //     })
    //     var after = json.data.after;
    //     return fetch(`https://www.reddit.com/r/nba.json?after=${after}&limit=100`);
    //   })
  };

  render() {
    return (
      <div className="main-layout">
        <RNbaReader
          data={this.state.data}
        />
        <Schedule
          data={this.state.data} />
      </div>
    )
  }
}
