//initialize firebasae//
var config = {
  apiKey: "AIzaSyAXaAGfrycDeF1dRDHJbSnIwBJi6bhIfKg",
  authDomain: "denver-bootcamp-c486c.firebaseapp.com",
  databaseURL: "https://denver-bootcamp-c486c.firebaseio.com",
  projectId: "denver-bootcamp-c486c",
  storageBucket: "denver-bootcamp-c486c.appspot.com",
  messagingSenderId: "342893461798"
};

firebase.initializeApp(config);
var trainData = firebase.database();

//set variables//
var clickCounter = 0;
var trainName = 0;
var destination = "";
var trainFrequency = 10; //tfrequency//
var firstTime = "03:30";

///// ADD RECORDS TO THE DATABASE //////

$("#add-new-train").on("click", function () {
  event.preventDefault();
  clickCounter++;
  console.log()

  //grabs user input//
  var trainName = $("#train-name-input").val().trim();
  var traindestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();

  //creates local "temporary" object for holding train data//
  var trainPush = {
    clickCounter: clickCounter,
    trainName: trainName,
    destination: traindestination,
    trainFrequency: trainFrequency,
    firstTrain: firstTrain,
  };

  //uploads data to the database
  trainData.ref().push(trainPush);

  console.log("got a train" + trainPush);
  console.log(trainPush.clickCounter);
  console.log(trainPush.traindestination);
  console.log(trainPush.trainFrequency);
  console.log(trainPush.trainName);
  console.log(trainPush.firstTrain);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#counter-input").val("");
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#first-train-input").val("");
});


//create a firebase event
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

  // store everything into a variable
  var tName         =childSnapshot.val().trainName;
  var tDestination  =childSnapshot.val().traindestination;
  var tFrequency    =childSnapshot.val().trainFrequency;
  var tFirstTrain   =childSnapshot.val().firstTrain;

  var trainNextArrival = tFirstTrain.split(":");

  var trainTime = moment()
    .hours(timeArr[0])
    .minutes(timeArr[1]);

  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  var trainMinutesAway =childSnapshot.val().minutesAway;
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainMinutesAway),
    $("<td>").text(trainNextArrival),
  );
  
 // Append the new row to the table
 $("#train-table > tbody").append(newRow);
});






var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
var currentTime = moment(); 
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Next Train
var nextArrival= moment().add(minutesAway, "minutes"); //nextTrain//
console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
  
var timeRemaining = diffTime % trainFrequency; //tRemainder//
console.log("TIME REMAINING: " + timeRemaining);

//var minutesAway = 0;
var minutesAway = trainFrequency - timeRemaining;
console.log("MINUTES TILL TRAIN: " + minutesAway);

  //train push?
  nextArrival= moment().add(minutesAway, "minutes"); //nextTrain//
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  timeRemaining = diffTime % trainFrequency; //tRemainder//
  minutesAway = trainFrequency - timeRemaining;