import React from 'react'

const players = {
    "warriors": ["klay", "thompson", "draymond", "green", "damian", "jones", "jordan", "bell", "stephen", "curry",
        "andre", "iguodala", "shaun", "livingston", "quinn", "cook", "jacob", "evans", "demarcus", "cousins", "kevin",
        "durant", "kevon", "looney", "jonas", "jerebko", "damion", "lee", "marcus", "derrickson", "alfonzo", "mckinnie"],
    "nuggets": ["Will", "Barton", "Malik","Beasley", "Torrey", "Craig", "Brandon", "Goodwin", "Gary", "Harris", "Juan", "Hernangomez", "Nikola Jokic", "Tyler", "Lydon", "Trey Lyles", "Paul", "Millsap", "Monte", "Morris", "Jamal", "Murray", "Mason", "Plumlee", "Michael", "Porter", "Isaiah", "Thomas", "Jarred", "Vanderbiit", "Thomas", "Welsh"],
    "lakers": ["Lonzo", "Ball", "Lebron", "James"]

}

const findHighlight = (videourl, videoTitle, homeTeam, visitor, gameTime, postTime) => {
    var found = false;
    homeTeam = homeTeam.toLowerCase();
    visitor = visitor.toLowerCase();
    videoTitle = videoTitle.toLowerCase();
    console.log(videourl, videoTitle, homeTeam, visitor, gameTime, postTime);
    if (gameTime < postTime && (gameTime + 86400000) > postTime) {
        if (videoTitle.includes(homeTeam) || videoTitle.includes(visitor)) {
            console.log('Making highlights');
            return <a className="link--schedule" href={videourl}>{videoTitle}</a>
        } else if (homeTeam in players) {
            players[homeTeam.toLowerCase()].map(player => {
                if (videoTitle.includes(player)) {
                    console.log('Making highlights');
                    return <a className="link--schedule" href={videourl}>{videoTitle}</a>
                }
            })
        } else if (visitor in players) {
            players[visitor.toLowerCase()].map(player => {
                if (videoTitle.includes(player)) {
                    console.log('Making highlights');
                    return <a className="link--schedule" href={videourl}>{videoTitle}</a>
                }
            })
        }
    }

    return null;
}

export { findHighlight };