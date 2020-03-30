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

///// ADD RECORDS TO THE FIREBASE DATABASE //////

//set variables//
var clickCounter = 0;
var trainName = 0;
var destination = "";
var trainFrequency = 0; //tfrequency//
var firstTrainTime = 0;


$("#add-new-train-btn").on("click", function () {
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
    minutesAway: minutesAway,
    arrivalTime: arrivalTime,
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
});

///// CREATE A FIREBASE EVENT //////

//create a firebase event prevChildKey

trainData.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

  // store everything into a variable
  var tName         =childSnapshot.val().trainName;
  var tDestination  =childSnapshot.val().traindestination;
  var tFrequency    =childSnapshot.val().trainFrequency;
  var tFirstTrain   =childSnapshot.val().firstTrainTime;
  var trainCount    =childSnapshot.val().clickCounter;
  var tMinutesAway   =childSnapshot.val().minutesAway;
  var tArrivalTime  =childSnapshot.val().arrivalTime;
  
  var maxMoment = moment.max(moment(), tFirstTrain);

  if (maxMoment === tFirstTrain) {
    arrivalTime = tFirstTrain.format("hh:mm A");
    minutesAway = tFirstTrain.diff(moment(), "minutes");

  } else {

    var diffTime = moment().diff(tFirstTrain, "minutes");
    var timeRemaining = diffTime % tFrequency; 

    minutesAway = tFrequency - timeRemaining;  
    arrivalTime = moment().add(tMinutesAway, "m").format("hh:mm A");
  }

  console.log("minutesAway:", tMinutesAway);
  console.log("arrivalTime:", tArrivalTime);
  console.log("Time Remaining: " + timeRemaining);

// Add each train's data into the table
  $("#train-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(trainCount),
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(tFirstTrain),
      $("<td>").text(tMinutesAway),
      $("<td>").text(tArrivalTime),
    )
  );
});
