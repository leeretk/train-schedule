var config = {
  apiKey: "AIzaSyAXaAGfrycDeF1dRDHJbSnIwBJi6bhIfKg",
  authDomain: "denver-bootcamp-c486c.firebaseapp.com",
  databaseURL: "https://denver-bootcamp-c486c.firebaseio.com",
  projectId: "denver-bootcamp-c486c",
  storageBucket: "denver-bootcamp-c486c.appspot.com",
  messagingSenderId: "342893461798"
};

firebase.initializeApp(config);
var database = firebase.database();

var clickCounter = 0;
var destination = "";
var trainFrequency = 0;
var minutesAway = 0;
var nextArrival = 0;
var trainName = 0;

///// ADD RECORDS TO THE DATABASE //////

$("#add-new-train").on("click", function () {
  event.preventDefault();
  
  clickCounter++;
  console.log()

  //grabs user input//
  clickCounter = $("#counter-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainFrequency = $("#frequency-input").val().trim();
  minutesAway = $("#minutes-input").val().trim();
  nextArrival = $("#next-arrival-input").val().trim();
  trainName = $("#train-name-input").val().trim();

  //creates local "temporary" object for holding train data//
  var trainPush = {
    clickCounter: clickCounter,
    destination: destination,
    trainFrequency: trainFrequency,
    minutesAway: minutesAway,
    nextArrival: nextArrival,
    trainName: trainName,
  };

  //uploads data to the database
  database.ref().push(trainPush);

  console.log("got a train" + trainPush);
  console.log(trainPush.clickCounter);
  console.log(trainPush.destination);
  console.log(trainPush.trainFrequency);
  console.log(trainPush.minutesAway);
  console.log(trainPush.nextArrival);
  console.log(trainPush.trainName);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#counter-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#minutes-input").val("");
  $("#frequency-input").val("");
  $("#minutes-input").val("");

});

//create a firebase event

database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());
  var trainName =childSnapshot.val().trainName;
  var trainDestination =childSnapshot.val().destination;
  var trainFrequency =childSnapshot.val().trainFrequency;
  var trainMinutesAway =childSnapshot.val().minutesAway;
  var trainNextArrival =childSnapshot.val().nextArrival;

  // console.log("trainName: " +  trainName);
  // console.log("trainDesintation: " +  trainDestination);
  // console.log("trainFrequency: " +  trainFrequency);
  // console.log("trainMinutesAway: " +  trainMinutesAway);
  // console.log("trainNextArrival: " +  trainNextArrival);
  
 // Prettify Arrival Time
 var trainNextArrivalPretty = moment.unix(trainNextArrival).format("HH:mm");
//  var trainMinutesAwayPretty = moment.unix(trainMinutesAway).format(":mm");
//  var trainFrequencyPretty = moment.unix(trainFrequency).format(":mm");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainMinutesAway),
    $("<td>").text(trainNextArrivalPretty),
  );

 // Append the new row to the table
 $("#train-table > tbody").append(newRow);

});


