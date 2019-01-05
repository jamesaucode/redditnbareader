import React, { Component } from 'react'
import { turnEpoch, turnEpochToTime, turnRegex } from '../Helper';
import { findHighlight } from '../ReactHelper';

export default class Score extends Component {
    render() {
        const { home, homeLogo, visitor, visitorLogo, time, data, highlights } = this.props;
        var score = [null, null];
        // console.log(home.toLowerCase());
        return (
            <div className="wrapper--column">
                <div className="wrapper--team-logo">

                    <img alt="team logo" className="team-logo" src={require("../image/" + homeLogo + ".png")}></img>
                    {data.map(e => {
                        if (e.data.link_flair_text === "Post Game Thread" && e.data.title.toLowerCase().includes(home.toLowerCase()) && e.data.title.toLowerCase().replace(/ /g, '').includes(visitor.toLowerCase().replace(/ /g, '')) && e.data.created * 1000 > turnEpoch(time) && e.data.created * 1000 < turnEpoch(time) + 86400000) {
                            var testScore = turnRegex(e.data.title, home, visitor);
                            if (testScore) {
                                score = testScore;
                            }
                        }
                    })}
                    <p className="team-name">{home}</p>
                </div>
                {/* if home team wins, home team's score is bolded, vice versa */}
                {(score[0] > score[1]) ? <p className="team-score">{score[0]}</p> : <p className="team-score team-score--faded">{score[0]}</p>}

                <div className="wrapper--team-logo">
                    <img alt="team logo" className="team-logo" src={require(`../image/${visitorLogo}.png`)}></img>
                    <p className="team-name">{visitor}</p>

                </div>
                {/* If away team wins, away team's score is bolded, vice versa*/}
                {(score[1] > score[0]) ? <p className="team-score">{score[1]}</p> : <p className="team-score team-score--faded">{score[1]}</p>}

                {/* Resets the score in case the games are not finished yet */}
                {score = [null, null]}
                {/* End of reset */}

                <p className="date--schedule">{turnEpochToTime(time)}</p>
                {this.props.data.map(e => {

                    if (e.data.link_flair_text === "Post Game Thread" && e.data.title.toLowerCase().includes(home.toLowerCase()) && e.data.title.toLowerCase().includes(visitor.toLowerCase()) && e.data.created * 1000 > turnEpoch(time) && e.data.created * 1000 < turnEpoch(time) + 86400000) {
                        // console.log("Post title: " + e.data.title)
                        // console.log("Home team name: " + home)
                        // console.log("Away team name: " + visitor)
                        return (
                            <a className="link--schedule" rel="noopener noreferrer" target="_blank" href={"https://www.reddit.com" + e.data.permalink}>Post Game Thread</a>
                        );
                    }

                    if (e.data.link_flair_text === "Game Thread" && e.data.title.toLowerCase().replace(/ /g, '').includes(home.toLowerCase().replace(/ /g, '')) && e.data.title.toLowerCase().replace(/ /g, '').includes(visitor.toLowerCase().replace(/ /g, '')) && e.data.created * 1000 > turnEpoch(time) && e.data.created * 1000 < turnEpoch(time) + 86400000) {
                        return (
                            <a className="link--schedule" rel="noopener noreferrer" target="_blank" href={"https://www.reddit.com" +
                                e.data.permalink}>Game Thread</a>
                        );
                    }

                    // if (e.data.link_flair_text === "Highlights") {
                    //     return (
                    //         findHighlight(e.data.url, e.data.title, home.toLowerCase())
                    //     )
                    // }
                })}
            </div>
        )
    }
}
