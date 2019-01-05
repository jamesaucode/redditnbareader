import React from 'react'

const players = {
    "warriors": ["klay", "thompson", "draymond", "green", "damian", "jones", "jordan", "bell", "stephen", "curry",
        "andre", "iguodala", "shaun", "livingston", "quinn", "cook", "jacob", "evans", "demarcus", "cousins", "kevin",
        "durant", "kevon", "looney", "jonas", "jerebko", "damion", "lee", "marcus", "derrickson", "alfonzo", "mckinnie"],

}

const findHighlight = (videourl, videoTitle, homeTeam) => {
    if (homeTeam in players) {
        var found = false;
        players[homeTeam].map(player => {
            if (videoTitle.includes(player)) {
                found = true;
            }
        })
    }
    if (found) {
        console.log('Making highlights');
        return (

            <a className="link--schedule" href={videourl}>{videoTitle}</a>

        )
    }

    return null;
}

const test = () => {
    return (
        <div>
            <h1>TESTING!!!</h1>
        </div>
    )
}

export { findHighlight, test };