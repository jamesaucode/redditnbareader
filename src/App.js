import React, { Component } from 'react'
import RNbaReader from './component/RNbaReader';
import Schedule from './component/Schedule';
import './style/main.scss'

export default class App extends Component {

  state = {
    data: []
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

  render() {
    return (
      <div className="main-layout">
        <RNbaReader 
        data={this.state.data} 
        />
        <Schedule 
        data={this.state.data}/>
      </div>
    )
  }
}
