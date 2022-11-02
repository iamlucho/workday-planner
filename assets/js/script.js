//Use Moment to get current date
var currentDate = moment().format('dddd, MMM Do YYYY');

//Use jQuery to update HTML content
$("#currentDate").html(currentDate);

//Create arrays for times and events
var timeofday = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM","5 PM"];

//Create HTML rows for hours and events with buttons
timeofday.forEach(function(element){
    //Remove space from array string in order to set the timeblock ID
    var timeblockID = element.replace(/\s/g, '');
    //Create row HTML tags for each timeblock, including ID and time. 
    var row = "<div id="+ timeblockID +" class='row time-block'>"+
              "<div class='col-md-1 hour'>" + element + "</div>" +
              "<textarea class='col-md-10 eventinput'></textarea>" +
              "<button class='btn saveBtn col-md-1'><i class='fas fa-save'></i></button>"+
              "</div>";
    $(".container").append(row);
    //Check localStorage for saved values
    $("#"+ timeblockID +" .eventinput").val(localStorage.getItem(timeblockID));
});

//Keep track of time and change format of time blocks
function timeTracker() {
    //Obtain current hour of the day using Moment
    var currentTime = moment().hour();
    console.log(currentTime);
    //Loop through each time block and change class based on current time
    $(".time-block").each(function () {
        //Get numeric values from ID of timeblock
        //If statement used to check for AM and PM time
        if ($(this).attr("id").includes("PM") && Number($(this).attr("id").match(/-?\d+\.?\d*/)[0]) < 12){
            //If PM found on string, and is not 12PM, add 12 to time.
            var timefromID = Number($(this).attr("id").match(/-?\d+\.?\d*/)[0]) + 12;
        }
        else {
            var timefromID = $(this).attr("id").match(/-?\d+\.?\d*/)[0];
        }
        console.log(timefromID);

        //Conditional class formatting based on current time
        if (timefromID < currentTime) {
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        }
        else if (timefromID == currentTime) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        else {
            $(this).removeClass("present");
            $(this).removeClass("past");
            $(this).addClass("future");
        }
    })
};

//Run timeTracker function for formating of fields
timeTracker();

//Click event to handle saving data to local storage
$(document).ready(function () {
// Check for click of savebtn
    $(".saveBtn").on("click", function () {
        // Get values from corresponding fields. Field text and event time
        var eventtext = $(this).siblings(".eventinput").val();
        var eventtime = $(this).parent().attr("id");
        // Save text in local storage
        localStorage.setItem(eventtime, eventtext);
    })
});