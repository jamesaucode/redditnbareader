import React, { Component } from 'react'
import { makeMatchString, turnEpoch } from '../Helper';
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
        schedule: []
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
    }

    render() {
        return (
            <div className="schedule">
                <h1 className="heading max-width margin-top-bottom--small">Schedule for Today</h1>
                {this.state.schedule.map(data => data.games.map(game => (
                    (turnEpoch(game.htm) > Date.now() && turnEpoch(game.htm) < Date.now() + 86400000) &&
                    <div key={game.gid} className="game">
                        <div className="wrapper--team-logo">
                            <p className="team-name">{game.h.tn}</p>
                            <img alt="team logo" className="team-logo" src={require(`../image/${game.h.tc.toLowerCase().replace(/ /g, '')}.png`)}></img>
                        </div>
                        <div className="game-detail">
                            <h2>VS</h2>
                            {/* <p className="date--schedule">{Date(turnEpoch(game.htm))}</p> */}
                            <p className="date--schedule">{game.etm.replace("T"," ")}</p>
                        </div>
                        <div className="wrapper--team-logo">
                            <p className="team-name">{game.v.tn}</p>
                            <img alt="team logo" className="team-logo" src={require(`../image/${game.v.tc.toLowerCase().replace(/ /g, '')}.png`)}></img>
                        </div>
                    </div>
                )))}
            </div>
            // {makeMatchString(game.h.tn, game.v.tn)}
        )
    }
}
