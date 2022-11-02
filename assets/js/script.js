//Use Moment to get current date
var currentDate = moment().format('dddd, MMM Do YYYY');
//Use jQuery to update HTML content
$("#currentDate").html(currentDate);