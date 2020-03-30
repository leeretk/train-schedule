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
var trainFrequency = 0; //tfrequency//
var firstTrainTime = 0;

///// ADD RECORDS TO THE FIREBASE DATABASE //////

$("#add-new-train").on("click", function () {
  event.preventDefault();
  clickCounter++;
  console.log()

  //grabs user input//
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var firstTrainTime = $("#first-train-input").val().trim();

  //creates local "temporary" object for holding train data//
  var trainPush = {
    clickCounter: clickCounter,
    trainName: trainName,
    trainDestination: trainDestination,
    trainFrequency: trainFrequency,
    firstTrainTime: firstTrainTime,
    arrivalTime: arrivalTime,
    minutesAway: minutesAway,
  };

  //uploads data to the database
  trainData.ref().push(trainPush);

  console.log("got a train" + trainPush);
  console.log(trainPush.clickCounter);
  console.log(trainPush.trainName);
  console.log(trainPush.trainDestination);
  console.log(trainPush.trainFrequency);
  console.log(trainPush.firstTrainTime);

 // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#counter-input").val("");
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#first-train-input").val("");
  $("#minutes-away-input").val("");
  $("#arrival-time-input").val("");
});

///// CREATE A FIREBASE EVENT //////

//create a firebase event prevChildKey

trainData.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

  // store everything into a variable
  var tName         =childSnapshot.val().trainName;
  var tDestination  =childSnapshot.val().traindestination;
  var tFrequency    =childSnapshot.val().trainFrequency;
  var tFirstTrain   =childSnapshot.val().firstTrain
  var trainCount    =childSnapshot.val().clickCounter;
   
  var maxMoment = moment.max(moment(), tFirstTrain);
  var minutesAway;
  var arrivalTime;

  if (maxMoment === tFirstTrain) {
    arrivalTime = tFirstTrain.format("hh:mm A");
    minutesAway = tFirstTrain.diff(moment(), "minutes");

  } else {

    var diffTime = moment().diff(tFirstTrain, "minutes");
    var timeRemaining = diffTime % tFrequency; 
    minutesAway = tFrequency - timeRemaining;

    // To calculate the arrival time, add the tMinutes to the current time
    arrivalTime = moment().add(minutesAway, "m").format("hh:mm A");
  }
  console.log("minutesAway:", minutesAway);
  console.log("arrivalTime:", arrivalTime);
  console.log("Time Remaining: " + timeRemaining);

// Add each train's data into the table
  $("#train-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(trainCount),
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(minutesAway),
      $("<td>").text(arrivalTime),
    )
  );
});