var time = moment();
// setting current date on the site to the current date from moment.js
$("#currentDay").text(time.format("dddd, MMMM Do"));

// list of all business hours from 9 - 5.
var hoursList = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM"
]

// the container for all the time blocks
var timeBlocks = $("#time-blocks");

// a loop to go through all the business hours
$.each(hoursList, function(i, hours) {
    // time block is the row that contains block time, description, and the save button
    var timeBlock = $("<form>");    
    timeBlock.addClass("row time-block");

    // the hour column of the time block
    var hour = $("<label>");
    hour.addClass("col-3 col-sm-2 col-lg-1 hour textarea");
    hour.text(hours);

    // create two variables for the block time to compare later
    var blocksTime = moment(hours, "h A");  // the block time in 9 AM format
    var blocksTimeHourLater = moment(hours, "h A").add(1, "h"); // the block time in 9 AM format plus an hour 

    // grabbing the saved data from localStorage
    var blockDesc = JSON.parse(localStorage.getItem("blockDesc")) || [];
    
    // the description column of the time block
    var desc = $("<input>");
    desc.addClass("col-6 col-sm-8 col-lg-10 description textarea");
    desc.attr("id", "desc" + i);    // set the id to be desc + i
    desc.val(blockDesc[i]); // set the saved data as the description placeholder
    console.log(i, blockDesc[i])    // checking the index and saved data 
    
    // if the current time is equal to the block time or in between then we set present
    if (time.isSame(blocksTime) || time.isBetween(blocksTime, blocksTimeHourLater)) {
        desc.addClass("present")
    }
    // if the blocktime was before the time then it will set as past
    else if (blocksTime.isBefore(time)) {
        desc.addClass("past")
    }
    // if the block time is after the time then we set it to be future
    else if (blocksTime.isAfter(time)) {
        desc.addClass("future")
    }

    //the buttom column of the time block
    var saveBtn = $("<button>");
    saveBtn.addClass("col-3 col-sm-2 col-lg-1 saveBtn");
    saveBtn.attr("data-index", i);  // set the data index to be the index
    saveBtn.html('<i class="fas fa-save"></i>');    // icon for the save button

    // appending all the elements to the row
    timeBlock.append(hour, desc, saveBtn);
    // append the row to the container
    timeBlocks.append(timeBlock);
});

// this function handles the save event 
function handleSaveItem(event) {
    event.preventDefault();

    // we get the event target
    var btnClicked = $(event.target);
    var btnIndex = 0;

    // if we clicked on the save icon we get undefined so we check its parent 
    if (btnClicked.attr("data-index") === undefined) {
        console.log(btnClicked.parent().attr("data-index"));
        btnIndex = btnClicked.parent().attr("data-index");
    }
    // we check the button for the data index
    else {
        console.log(btnClicked.attr("data-index"));
        btnIndex = btnClicked.attr("data-index");
    }

    // get the block description from localStorage to update
    var blockDesc = JSON.parse(localStorage.getItem("blockDesc")) || [];

    // we will save the row that was updated nothing else
    blockDesc[btnIndex] = $("#desc" + btnIndex).val();
    // checking 
    console.log($("#desc" + btnIndex).val());
    // saved the new data back to localStorage
    localStorage.setItem("blockDesc", JSON.stringify(blockDesc))
}

// when the save button class is clicked
timeBlocks.on("click", ".saveBtn", handleSaveItem);
