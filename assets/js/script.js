//Use Moment to get current date
var currentDate = moment().format('dddd, MMM Do YYYY');

//Use jQuery to update HTML content
$("#currentDate").html(currentDate);

//Create arrays for times and events
var timeofday = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM","5 PM"];

//Create HTML rows for hours and events with buttons
timeofday.forEach(function(element){
    var timeblockID = element.replace(/\s/g, '');
    var row = "<div id="+ timeblockID +" class='row time-block'>"+
              "<div class='col-md-1 hour'>" + element + "</div>" +
              "<textarea class='col-md-10 description'></textarea>" +
              "<button class='btn saveBtn col-md-1'><i class='fas fa-save'></i></button>"+
              "</div>";
    $(".container").append(row);
});

//Keep track of time and change format of time blocks
function timeTracker() {
    //Obtain current hour of the day using Moment
    var currentTime = moment().hour();
    console.log('currentTime', currentTime);
    //Loop through each time block and change class based on current time
    $(".time-block").each(function () {
        var timefromID = $(this).attr("id").match(/-?\d+\.?\d*/);
        console.log(timefromID);

        if (blockTime < currentTime) {
            $(this).removeClass("future");
            $(this).removeClass("present");
            $(this).addClass("past");
        }
        else if (blockTime === currentTime) {
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
}
