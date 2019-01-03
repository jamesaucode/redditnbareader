import React, { Component } from 'react'
import { turnEpoch, turnEpochToTime, makeDateAndYear } from '../Helper';
import leftArrowIcon from '../image/left.png';
import rightArrowIcon from '../image/right.png';
// import atlanta from '../image/atlanta.png';
// import boston from '../image/boston.png';
// import brooklyn from '../image/brooklyn.png';
// import charlotte from '../image/charlotte.png';
// import chicago from '../image/chicago.png';
// import cleveland from '../image/cleveland.png';
// import dallas from '../image/dallas.png';
// import denver from '../image/denver.png';
// import detroit from '../image/detroit.png';
// import goldenstate from '../image/goldenstate.png';
// import houston from '../image/houston.png'
// import indiana from '../image/indiana.png';
// import LA from '../image/LA.png';
// import losangeles from '../image/losangeles.png';
// import memphis from '../image/memphis.png';

export default class Schedule extends Component {
    state = {
        data: this.props.data,
        schedule: [],
        dateNow: 0
    }

    onDateDecrementClick = e => {
        this.setState(prevState => ({
            dateNow: prevState.dateNow - 86400000
        }))
    }
    onDateIncrementClick = e => {
        this.setState(prevState => ({
            dateNow: prevState.dateNow + 86400000
        }))
    }
    onDateResetClick = e => {
        this.setState({
            dateNow: Date.now()
        })
    }

    componentDidMount = () => {
        let json = require('../nbaschedule.json')
        json = json.lscd
        json.forEach(data => {
            var newObj = {
                month: data.mscd.mon,
                games: data.mscd.g
            }
            var prevStateSchedule = this.state.schedule;
            prevStateSchedule.push(newObj)
            this.setState({
                schedule: prevStateSchedule
            })
        });
        this.setState({
            dateNow: Date.now()
        })
    }

    render() {
        const { schedule } = this.state;
        return (
            <div className="schedule">
                <div className="wrapper-btn">
                    <button onClick={this.onDateDecrementClick}><img alt="left arrow" src={leftArrowIcon}></img></button>
                    <p className="date--schedule date--schedule--big">{makeDateAndYear(this.state.dateNow)}</p>
                    <button onClick={this.onDateIncrementClick}><img alt="right arrow" src={rightArrowIcon}></img></button>
                </div>
                <div className="game">
                    {schedule.map(data => data.games.map(game => (
                        (makeDateAndYear(turnEpoch(game.htm)) === makeDateAndYear(this.state.dateNow)) &&
                        <div className="wrapper--column">
                            <div className="wrapper--team-logo">
                                <img alt="team logo" className="team-logo" src={require(`../image/${game.h.tc.toLowerCase().replace(/ /g, '')}.png`)}></img>
                                <p className="team-name">{game.h.tn}</p>
                            </div>
                            <div className="wrapper--team-logo">
                                <img alt="team logo" className="team-logo" src={require(`../image/${game.v.tc.toLowerCase().replace(/ /g, '')}.png`)}></img>
                                <p className="team-name">{game.v.tn}</p>
                            </div>
                            <p className="date--schedule">{turnEpochToTime(game.htm)}</p>
                            {this.props.data.map(e => {
                                if (e.data.link_flair_text === "Game Thread" && e.data.title.toLowerCase().includes(game.h.tn.toLowerCase()) && e.data.title.toLowerCase().replace(/ /g, '').includes(game.v.tn.toLowerCase().replace(/ /g, ''))) {
                                    return (
                                        <a className="link--schedule" rel="noopener noreferrer" target="_blank" href={"https://www.reddit.com" +
                                            e.data.permalink}>Game Thread</a>
                                    );
                                }
                                if (e.data.link_flair_text === "Post Game Thread" && e.data.title.toLowerCase().includes(game.h.tn.toLowerCase()) && e.data.title.toLowerCase().replace(/ /g, '').includes(game.v.tn.toLowerCase().replace(/ /g, ''))) {
                                    return (
                                        <a className="link--schedule" rel="noopener noreferrer" target="_blank" href={"https://www.reddit.com" + e.data.permalink}>Post Game Thread</a>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    )))}
                </div>
            </div>
        )
    }
}
