var today = moment();

$("#currentDay").text(today.format("dddd, MMMM Do"));

var time = moment("1 PM", "hm A");

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

var timeBlocks = $("#time-blocks");

$.each(hoursList, function(i, hours) {
    var timeBlock = $("<form>");
    timeBlock.addClass("row", "time-block");

    var hour = $("<label>");
    hour.addClass("col-2 hour");
    hour.text(hours);

    var blocksTime = moment(hours, "h A");
    var blocksTimeHourLater = moment(hours, "h A").add(1, "h");

    var blockDesc = JSON.parse(localStorage.getItem("blockDesc")) || [];

    var desc = $("<input>");
    desc.addClass("col-8 description");
    desc.val(blockDesc[i]);
    console.log(i, blockDesc[i])
    
    if (time.isSame(blocksTime) || time.isBetween(blocksTime, blocksTimeHourLater)) {
        desc.addClass("present")
    }
    else if (blocksTime.isBefore(time)) {
        desc.addClass("past")
    }
    else if (blocksTime.isAfter(time)) {
        desc.addClass("future")
    }

    var saveBtn = $("<button>");
    saveBtn.addClass("col-2 saveBtn");
    saveBtn.html('<i class="fas fa-save"></i>');

    timeBlock.append(hour, desc, saveBtn);
    timeBlocks.append(timeBlock);
});

function handleSaveItem(event) {
    event.preventDefault();
    var btnClicked = $(event.target);

    console.log(btnClicked);
    var blockDesc = JSON.parse(localStorage.getItem("blockDesc")) || [];
    blockDesc[0] = "hi";
    localStorage.setItem("blockDesc", JSON.stringify(blockDesc))
}

timeBlocks.on("click", ".saveBtn", handleSaveItem);
