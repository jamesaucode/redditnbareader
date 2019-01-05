import React, { Component } from 'react'
import RNbaReader from './component/RNbaReader';
import Schedule from './component/Schedule';
import './style/main.scss'

export default class App extends Component {

  state = {
    data: [],
    read: {},
    highlights: []
  }

  componentDidMount = () => {
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
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Highlights%22&limit=100&sort=new&restrict_sr=on`)
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
        return fetch(`https://www.reddit.com/r/nba/search.json?q=flair:%22Highlights%22&limit=100&sort=new&restrict_sr=on&after=${after}`)
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
      })
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
