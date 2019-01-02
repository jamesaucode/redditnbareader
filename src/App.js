import React, { Component } from 'react'
import RNbaReader from './component/RNbaReader';
import Schedule from './component/Schedule';

export default class App extends Component {
  render() {
    return (
      <div>
        <RNbaReader />
        <Schedule />
      </div>
    )
  }
}
