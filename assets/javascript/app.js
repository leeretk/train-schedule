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
var trainDestination = "";
var trainFrequency = 0; //tfrequency//
var firstTrainTime = 0;


$("#add-new-train-btn").on("click", function () {
  event.preventDefault();
  clickCounter++;
  console.log(clickCounter)
  console.log();

  //grabs user input//
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  var firstTrainTime = $("#first-train-input").val().trim();
  // var arrivalTime = $("#arrival-time-input").val().trim();
  // var minutesAway = $("#minutes-away-input").val().trim();

  //creates local "temporary" object for holding train data//
  var trainPush = {
    clickCounter: clickCounter,
    trainName: trainName,
    trainDestination: trainDestination,
    trainFrequency: trainFrequency,
    firstTrainTime: firstTrainTime,
    // minutesAway: minutesAway,
    // arrivalTime: arrivalTime,
  };

  //uploads data to the database
  trainData.ref().push(trainPush);

  console.log("got a train" + trainPush);
  console.log("train count" + trainPush.clickCounter);
  console.log(trainPush.trainName);
  console.log(trainPush.trainDestination);
  console.log(trainPush.trainFrequency);
  console.log(trainPush.firstTrainTime);

 // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#first-train-input").val("");
  $("#minute-away-input").val("");
  $("#arrival-time-input").val("");

});

///// CREATE A FIREBASE EVENT //////

//create a firebase event prevChildKey

trainData.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

  // store everything into a variable
  var tName         =childSnapshot.val().trainName;
  var tDestination  =childSnapshot.val().trainDestination;
  var tFrequency    =childSnapshot.val().trainFrequency;
  var tFirstTrain   =childSnapshot.val().firstTrainTime;
  var trainCount    =childSnapshot.val().clickCounter;
  var minutesAway;
  var arrivalTime;
  

  console.log("first train time" + tFirstTrain);

  var firstTrainSplit = tFirstTrain.split(":");  
  var tFirstTrainMoment = moment().hours(firstTrainSplit[0]).minutes(firstTrainSplit[1]);

  
  console.log("t-first-train-moment" + tFirstTrainMoment)

  var maxMoment = moment.max(moment(), tFirstTrainMoment);
  console.log("max moment: " + maxMoment);

  if (maxMoment === tFirstTrain) {
    arrivalTime = tFirstTrain.format("hh:mm A");
    minutesAway = tFirstTrain.diff(moment(), "minutes");
  } else {
    var diffTime = moment().diff(tFirstTrainMoment, "minutes");
    var timeRemaining = diffTime % tFrequency; 
    minutesAway = tFrequency - timeRemaining;  
    arrivalTime = moment().add(minutesAway, "m").format("hh:mm A");
  };
  console.log("minutesAway:", minutesAway);
  console.log("arrivalTime:", arrivalTime);
  console.log("Time Remaining: " + timeRemaining);

// Add each train's data into the table
$("#train-table > tbody").append(
    $("<tr>").append(
      // $("<td>").text(trainCount),
      $("<td>").text(tName),
      $("<td>").text(tDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(minutesAway),
      $("<td>").text(arrivalTime),
    )
  );
});
