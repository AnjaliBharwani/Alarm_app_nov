// to get all the required elements access
const setButton = document.getElementById("set-btn");
const activeTimersContainer = document.getElementById(
    "active-timers-container"
);
const noTimerDisplayMessage = document.getElementById("no-timers-display-msg");
const audio = document.getElementById("audio-file");
let numberOfActiveTimers = 0;

// Function to reset input fields to default values
function resetInputFields() {
    document.getElementById("hour").value = ""; // Set default values here
    document.getElementById("minute").value = "";
    document.getElementById("seconds").value = "";
}

// onclick event listener for setButton
function addNewTimer() {
    const hours = Number(document.getElementById("hour").value);
    const minutes = Number(document.getElementById("minute").value);
    const seconds = Number(document.getElementById("seconds").value);

    // total time calculation in seconds
    const totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime > 0) {
        const newTimerCard = document.createElement("div");
        newTimerCard.classList.add("timer-card");
        newTimerCard.innerHTML = `
          <span>Time Left :</span>
          <span id="timer-container">
              <input id="hour" type="number" min="0" max="24" placeholder="${hours}"><span>:</span>
              <input id="minute" type="number" min="0" max="60" placeholder="${minutes}"><span>:</span>
              <input id="seconds" type="number" min="0" max="60" placeholder="${seconds}">
          </span>
          <button class="btn" onclick="deleteTimer(this)">Delete</button>
          `;
        activeTimersContainer.appendChild(newTimerCard);
        numberOfActiveTimers++;
        noTimerDisplayMessage.style.display = "none";
        runtimer(totalTime, newTimerCard);
        resetInputFields();
    }
}
// function to run the timer which is added
function runtimer(totalTime, newTimerCard) {
    let timerContainer = newTimerCard.querySelector("#timer-container");
    let hour = timerContainer.querySelector("#hour");
    let minute = timerContainer.querySelector("#minute");
    let seconds = timerContainer.querySelector("#seconds");

    // now set time interval for each second to update the values in DOM
    const myTimerUpdate = setInterval(() => {
        if (totalTime == 0) {
            newTimerCard.classList.toggle("time-up");
            newTimerCard.innerHTML = `
                      <span></span>
                      <span>Timer Is Up !</span>
                      <button class="btn delete-btn" onclick="deleteTimer(this)">Stop</button>
                  `;
            audio.play();
            clearInterval(myTimerUpdate);
        } else {
            --totalTime;

            let formattedHour = String(Math.floor(totalTime / 3600)).padStart(2, '0');
            let formattedMinute = String(Math.floor((totalTime % 3600) / 60)).padStart(2, '0');
            let formattedSeconds = String(totalTime % 60).padStart(2, '0');

            hour.value = formattedHour;
            minute.value = formattedMinute;
            seconds.value = formattedSeconds;
        }
    }, 1000);
}

// delete timer function
function deleteTimer(deleteButton) {
    audio.pause();
    let currentTimerCard = deleteButton.parentNode;
    currentTimerCard.remove();
    --numberOfActiveTimers;
    if (numberOfActiveTimers == 0) {
        noTimerDisplayMessage.style.display = "block";
    }
}
// event listeners
setButton.addEventListener("click", addNewTimer);

