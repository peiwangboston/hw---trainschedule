// Initialize Firebase
var config = {
    apiKey: "AIzaSyB17rmLib10jF5GwG7IwJ9HGRGS0OO5APs",
    authDomain: "hw-trainschedule.firebaseapp.com",
    databaseURL: "https://hw-trainschedule.firebaseio.com",
    projectId: "hw-trainschedule",
    storageBucket: "",
    messagingSenderId: "500696874285"
  };
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;
var firstTrain = 0;

// function storeInput (){

// });

$(".submit").on("click", function(){
event.preventDefault();
// console.log("hi");
trainName = $("#trainInput").val().trim();
destination = $("#destinationInput").val().trim();
frequency = $("#frequencyInput").val();
firstTrain = $("#firstTrain").val().trim();
// nextArrival = $("#nextarrivalInput").val().trim();
// minutesAway = $("#minutesawayInput").val();


console.log(trainName);
console.log(destination);
console.log(frequency);
console.log(nextArrival);
console.log(minutesAway);

database.ref().push({
trainName: trainName,
destination: destination,
frequency: frequency,
nextarrival: nextArrival,
minutesaway: minutesAway,
dateAdded: firebase.database.ServerValue.TIMESTAMP
});

});



database.ref().on("child_added", function(childSnapshot){
    
// Log everything that’s coming out of snapshot


console.log(childSnapshot.val().trainName);
console.log(childSnapshot.val().destination);
console.log(childSnapshot.val().frequency);
console.log(childSnapshot.val().nextarrival);
console.log(childSnapshot.val().minutesaway);

// $(“#full-member-list”).append(“<div class=‘well’><span id= ‘name’>”

// childSnapshot.val().name +
// “</span><span id=‘email’> ” +  childSnapshot.val().email +
// “</span><span id=‘age’> ” + childSnapshot.val().age +
// “</span><span id=‘comment’> ” + childSnapshot.val().comment +“</span></div>“;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// Store everything into a variable.
var tName = childSnapshot.val().trainName;
var tDst = childSnapshot.val().destination;
var tFrq = childSnapshot.val().frequency;
var tRt = childSnapshot.val().nextarrival;
var tmin = childSnapshot.val().minutesaway;

// Employee Info
console.log(tName);
console.log(tDst);
console.log(tFrq);
console.log(tRt);

// Prettify the employee start
// var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
// // Calculate the months worked using hardcore math
// // To calculate the months worked
// var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
// console.log(empMonths);
// // Calculate the total billed rate
// var empBilled = empMonths * empRate;
// console.log(empBilled);
// Add each train's data into the table
    
var firstTime = "3:00";
// // First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);
// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
// Time apart (remainder)
var tRemainder = diffTime % tFrq;
console.log(tRemainder);
// Minute Until Train
var tMinutesTillTrain = tFrq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$("tbody").append("<tr> <td>" + tName + "</td> <td>" + tDst + "</td> <td>" +
tFrq + " mins" + "</td> <td>" + moment(nextTrain).format("hh:mm a") + "</td> <td>" + tMinutesTillTrain + "</td> </tr>");
});



