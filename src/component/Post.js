import React, { Component } from 'react'
import { turnEpochToTime } from '../Helper';

export default class Post extends Component {
    getHighlightedText = (text, higlight) => {
        // Split text on higlight term, include term itself into parts, ignore case
        var parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return <span>{parts.map(part => part.toLowerCase() === higlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
      }
  render() {
      const { created, score, num_comments, permalink, title, searchTerm, id } = this.props; 
    return (
        <div className="list-item" key={id}>
        <p className="date">{turnEpochToTime(created)}</p>
        <div className="title-score">
          <p className="score">{score}</p>
          <p className="score">{num_comments}</p>
          <a
            href={"https://www.reddit.com" + permalink}
            rel="noopener noreferrer"
            target="_blank"
            className="link no-text-decoration">{this.getHighlightedText(title, searchTerm)}</a>
        </div>
      </div>
    )
  }
}
