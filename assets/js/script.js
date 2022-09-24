const $dateDisplay = document.querySelector("#currentDay");
const $schedule = document.querySelector(".container");
const date = moment();
const events = [];
let eventCount = 0;
let hour = 7;

$dateDisplay.textContent = date.format("dddd, MMMM Do");

for(let x = 0; x < 14; x++) {
    const $timeDiv = document.createElement("div");
    const $scheduleEvent = document.createElement("form");
    const $timeDisplay = document.createElement("p");
    const $timeTxtArea = document.createElement("textarea");
    const $timeBtn = document.createElement("button")

    $scheduleEvent.setAttribute("class", "row");
    $timeDisplay.setAttribute("class", "time-block hour col-1");
    $timeDisplay.setAttribute("id", `${hour}`);
    $timeTxtArea.setAttribute("class", "description col-10");
    $timeTxtArea.setAttribute("id", `${hour}`);
    $timeBtn.setAttribute("type", "submit");
    $timeBtn.setAttribute("value", "Submit");
    $timeBtn.setAttribute("class", "saveBtn col-1");

    if(hour < 12) {
        $timeDisplay.textContent = `${hour} am`;
    } else if(hour >= 12) {
        if(hour === 12){
            $timeDisplay.textContent = `${hour} pm`;
        } else {
            $timeDisplay.textContent = `${hour-12} pm`;
        }
    }

    hour++;

    $scheduleEvent.appendChild($timeDisplay);
    $scheduleEvent.appendChild($timeTxtArea)
    $scheduleEvent.appendChild($timeBtn);
    $timeDiv.appendChild($scheduleEvent);
    $schedule.appendChild($timeDiv);
}

function txtAreaColor() {
    const timeArray = document.querySelectorAll(".time-block");
    const txtArray = document.querySelectorAll(".description");

    for(let i = 0; i < timeArray.length; i++) {
        let currentHour = parseInt(date.format("H"));
        let listedHour = parseInt(timeArray[i].getAttribute('id'));
        
        if(listedHour > currentHour) {
            txtArray[i].setAttribute("class", "description col-10 future");
        } else if (listedHour == currentHour) {
            txtArray[i].setAttribute("class", "description col-10 present");
        } else if (listedHour < currentHour) {
            txtArray[i].setAttribute("class", "description col-10 past");
        }
    }

}

function displayEvents() {
    if(localStorage.getItem("eventsArray") !== null) {
        const tempArr = JSON.parse(localStorage.getItem("eventsArray"));
        const txtArr = document.querySelectorAll(".description");

        for(let x = 0; x < tempArr.length; x++) {
            let hourNum = tempArr[x].eventHour;
            let eventVal = tempArr[x].event;

            for(let i = 0; i < txtArr.length; i++) {
                if (hourNum == txtArr[i].getAttribute('id')){
                    txtArr[i].textContent = eventVal;
                }
            }
        }

    }
}

txtAreaColor();
displayEvents();

function submitHandler(event) {
    event.preventDefault();

    const $submitTxt = event.target.querySelector('.description');
    let eventName = $submitTxt.value.trim();
    let submitNum = $submitTxt.getAttribute('id')

    events[eventCount] = {
        event: eventName,
        eventHour: submitNum, 
    }

    localStorage.setItem("eventsArray", JSON.stringify(events));
}

$schedule.addEventListener('submit', submitHandler);