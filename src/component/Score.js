import React, { Component } from 'react'
import { turnEpoch, turnEpochToTime, turnRegex } from '../Helper';
import { findHighlight } from '../ReactHelper';

export default class Score extends Component {
    render() {
        const { home, homeLogo, visitor, visitorLogo, time, postgames, games, highlights } = this.props;
        var score = [null, null];
        return (
            <div className="wrapper--column">
                <div className="wrapper--team-logo">

                    <img alt="team logo" className="team-logo" src={require("../image/" + homeLogo + ".png")}></img>
                    {postgames.map(e => {
                        if (e.data.title.toLowerCase().includes(home.toLowerCase()) && e.data.title.toLowerCase().replace(/ /g, '').includes(visitor.toLowerCase().replace(/ /g, '')) && e.data.created * 1000 > turnEpoch(time) && e.data.created * 1000 < turnEpoch(time) + 86400000) {
                            var testScore = turnRegex(e.data.title, home, visitor);
                            if (testScore) {
                                score = testScore;
                            }
                        }
                    })}
                    <p className="team-name">{home}</p>
                </div>
                {/* if home team wins, home team's score is bolded, vice versa */}
                {/* {(score[0] > score[1]) ? <p className="team-score">{score[0]}</p> : <p className="team-score team-score--faded">{score[0]}</p>} */}
                {(score[0] !== null && (score[0] > score[1])) && <p className="team-score">{score[0]}</p>}
                {(score[0] !== null && (score[1] > score[0])) && <p className="team-score team-score--faded">{score[0]}</p>}

                <div className="wrapper--team-logo">
                    <img alt="team logo" className="team-logo" src={require(`../image/${visitorLogo}.png`)}></img>
                    <p className="team-name">{visitor}</p>

                </div>
                {/* If away team wins, away team's score is bolded, vice versa*/}
                {(score[1] !== null && (score[1] > score[0])) && <p className="team-score">{score[1]}</p>}
                {(score[1] !== null && (score[0] > score[1])) && <p className="team-score team-score--faded">{score[1]}</p>}

                {/* Resets the score in case the games are not finished yet */}
                {score = [null, null]}
                {/* End of reset */}

                <p className="date--schedule">{turnEpochToTime(time)}</p>
                {postgames.map(e => {

                    if (e.data.title.toLowerCase().includes(home.toLowerCase()) && e.data.title.toLowerCase().includes(visitor.toLowerCase()) && e.data.created * 1000 > turnEpoch(time) && e.data.created * 1000 < turnEpoch(time) + 86400000) {
                        return (
                            <a className="link--schedule" rel="noopener noreferrer" target="_blank" href={"https://www.reddit.com" + e.data.permalink}>Post Game Thread</a>
                        );
                    }
                    
                })}
                {games.map(e => {
                    if (e.data.title.toLowerCase().replace(/ /g, '').includes(home.toLowerCase().replace(/ /g, '')) && e.data.title.toLowerCase().replace(/ /g, '').includes(visitor.toLowerCase().replace(/ /g, '')) && e.data.created * 1000 > turnEpoch(time) && e.data.created * 1000 < turnEpoch(time) + 86400000) {
                        return (
                            <a className="link--schedule" rel="noopener noreferrer" target="_blank" href={"https://www.reddit.com" +
                            e.data.permalink}>Game Thread</a>
                        );
                    }
                })}
                
            </div>
        )
    }
}
