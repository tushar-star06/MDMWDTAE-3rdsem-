// ===============================
// TEAM DATA
// ===============================

let teams = [
    {
        id: 1,
        name: "Team A",
        score: 0,
        roundScore: 0
    },
    {
        id: 2,
        name: "Team B",
        score: 0,
        roundScore: 0
    }
];


// ===============================
// ROUND
// ===============================

let currentRound = 1;


// ===============================
// TIMER
// ===============================

let time = 60;
let timerInterval = null;
let timerRunning = false;


// ===============================
// DISPLAY TEAMS
// ===============================

function displayTeams() {

    const container = document.getElementById("teamsContainer");

    container.innerHTML = "";

    // Find highest score
    let highestScore = 0;

    for (let team of teams) {

        if (team.score > highestScore) {
            highestScore = team.score;
        }

    }


    // Create cards for every team
    for (let team of teams) {

        const card = document.createElement("div");

        card.classList.add("team-card");


        // Highlight team with highest score
        if (
            teams.length > 1 &&
            team.score === highestScore
        ) {
            card.classList.add("leader");
        }


        card.innerHTML = `

            <h3>${team.name}</h3>

            <div class="score">
                ${team.score}
            </div>

            <div class="round-score">
                Round ${currentRound}:
                ${team.roundScore} points
            </div>

            <div class="score-buttons">

                <button onclick="addPoints(${team.id}, 1)">
                    +1
                </button>

                <button onclick="addPoints(${team.id}, 5)">
                    +5
                </button>

                <button onclick="addPoints(${team.id}, 10)">
                    +10
                </button>

                <button onclick="removePoint(${team.id})">
                    -1
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeTeam(${team.id})"
            >
                Remove Team
            </button>

        `;

        container.appendChild(card);
    }
}


// ===============================
// ADD TEAM
// ===============================

function addTeam() {

    const input = document.getElementById("teamName");

    const name = input.value.trim();


    if (name === "") {

        alert("Please enter a team name.");

        return;
    }


    if (teams.length >= 8) {

        alert("Maximum 8 teams allowed.");

        return;
    }


    // Check whether team already exists
    const exists = teams.some(
        team =>
            team.name.toLowerCase() ===
            name.toLowerCase()
    );


    if (exists) {

        alert("This team already exists.");

        return;
    }


    const newTeam = {

        id: Date.now(),

        name: name,

        score: 0,

        roundScore: 0

    };


    teams.push(newTeam);

    input.value = "";

    displayTeams();
}


// ===============================
// ADD POINTS
// ===============================

function addPoints(teamId, points) {

    const team =
        teams.find(team => team.id === teamId);


    if (!team) {
        return;
    }


    team.score += points;

    team.roundScore += points;


    displayTeams();
}


// ===============================
// REMOVE ONE POINT
// ===============================

function removePoint(teamId) {

    const team =
        teams.find(team => team.id === teamId);


    if (!team) {
        return;
    }


    if (team.score > 0) {

        team.score--;

        if (team.roundScore > 0) {
            team.roundScore--;
        }

    }


    displayTeams();
}


// ===============================
// REMOVE TEAM
// ===============================

function removeTeam(teamId) {

    // Keep at least 2 teams
    if (teams.length <= 2) {

        alert("At least 2 teams are required.");

        return;
    }


    teams = teams.filter(
        team => team.id !== teamId
    );


    displayTeams();
}


// ===============================
// NEXT ROUND
// ===============================

function nextRound() {

    currentRound++;


    // Reset only the current-round scores
    for (let team of teams) {

        team.roundScore = 0;

    }


    resetTimer();


    document.getElementById("roundNumber")
        .textContent = currentRound;


    displayTeams();
}


// ===============================
// UPDATE TIMER DISPLAY
// ===============================

function updateTimer() {

    let minutes =
        Math.floor(time / 60);

    let seconds =
        time % 60;


    minutes =
        String(minutes).padStart(2, "0");

    seconds =
        String(seconds).padStart(2, "0");


    document.getElementById("timer")
        .textContent =
        `${minutes}:${seconds}`;
}


// ===============================
// START TIMER
// ===============================

function startTimer() {

    if (timerRunning) {
        return;
    }


    timerRunning = true;


    timerInterval = setInterval(function () {

        if (time > 0) {

            time--;

            updateTimer();

        }
        else {

            pauseTimer();

            alert("Time is up!");

        }

    }, 1000);
}


// ===============================
// PAUSE TIMER
// ===============================

function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerRunning = false;
}


// ===============================
// RESET TIMER
// ===============================

function resetTimer() {

    pauseTimer();

    time = 60;

    updateTimer();
}


// ===============================
// RESET ENTIRE GAME
// ===============================

function resetGame() {

    pauseTimer();


    currentRound = 1;

    time = 60;


    teams = [

        {
            id: 1,
            name: "Team A",
            score: 0,
            roundScore: 0
        },

        {
            id: 2,
            name: "Team B",
            score: 0,
            roundScore: 0
        }

    ];


    document.getElementById("roundNumber")
        .textContent = currentRound;


    updateTimer();

    displayTeams();
}


// ===============================
// INITIALIZE APP
// ===============================

updateTimer();

displayTeams();