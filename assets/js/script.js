const $dateDisplay = document.querySelector("#currentDay");
const $schedule = document.querySelector(".container");
const date = moment();
let events = [];
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
        const tempEventsArr = JSON.parse(localStorage.getItem("eventsArray"));
        const txtArr = document.querySelectorAll(".description");
        events = JSON.parse(localStorage.getItem("eventsArray"));

        for(let x = 0; x < tempEventsArr.length; x++) {
            let hourNum = tempEventsArr[x].eventHour;
            let eventVal = tempEventsArr[x].event;

            for(let i = 0; i < txtArr.length; i++) {
                if (hourNum == txtArr[i].getAttribute('id')){
                    txtArr[i].textContent = eventVal;
                }
            }
        }

    }
}

function removeItem(hour) {
    if(localStorage.getItem("eventsArray") !== null) {
        const tempEventsArr = JSON.parse(localStorage.getItem("eventsArray"));

        for (let i = 0; i < tempEventsArr.length; i++) {
            if(tempEventsArr[i].eventHour == (hour)){
                if(i === 0) {
                    tempEventsArr.splice(i,i+1);
                    events.splice(i,i+1);

                } else {
                    tempEventsArr.splice(i,i);
                    events.splice(i,i);
                }
                localStorage.setItem("eventsArray", JSON.stringify(tempEventsArr));
            }
        }

    }

}

function submitHandler(event) {
    event.preventDefault();

    const $submitEvent = event.target.querySelector('.description');
    let eventName = $submitEvent.value.trim();
    let submitHour = $submitEvent.getAttribute('id')

    if (eventName === "") {
        $submitEvent.textContent = "";
        removeItem(submitHour);
    } else {  
        for(let i = 0; i < events.length; i++) {
            if(events[i].eventHour == submitHour) {
                removeItem(submitHour);
            }
        }
        events.push({
            event: eventName,
            eventHour: submitHour,
        });

        localStorage.setItem("eventsArray", JSON.stringify(events));
    }
}

txtAreaColor();
displayEvents();
$schedule.addEventListener('submit', submitHandler);