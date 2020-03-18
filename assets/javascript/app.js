var config = {
  apiKey: "AIzaSyAXaAGfrycDeF1dRDHJbSnIwBJi6bhIfKg",
  authDomain: "denver-bootcamp-c486c.firebaseapp.com",
  databaseURL: "https://denver-bootcamp-c486c.firebaseio.com",
  projectId: "denver-bootcamp-c486c",
  storageBucket: "denver-bootcamp-c486c.appspot.com",
  messagingSenderId: "342893461798"
};

firebase.initializeApp(config);


// VARIABLES  // 

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

  clickCounter = $("#counter-input").val().trim();
  destination = $("#destination-input").val().trim();
  trainFrequency = $("#frequency-input").val().trim();
  minutesAway = $("#minutes-input").val().trim();
  nextArrival = $("#next-arrival-input").val().trim();
  trainName = $("#train-name-input").val().trim();

var train = {
  clickCounter: clickCounter,
  destination: destination,
  trainFrequency: trainFrequency,
  minutesAway: minutesAway,
  nextArrival: nextArrival,
  trainName: trainName,
}
  database.ref().push(train)
  console.log("got a train" + train)
});

// MAIN PROCESS + INITIAL CODE // 

// database.ref("/train-schedule").on("value", function (snapshot) {
//   console.log(snapshot.val());

//   clickCounter = snapshot.val().clickCount;
//   console.log(clickCounter);

//   // Log the value of the various properties
//   console.log(snapshot.val().clickCounter);
//   console.log(snapshot.val().destination);
//   console.log(snapshot.val().trainFrequency);
//   console.log(snapshot.val().minutesAway);
//   console.log(snapshot.val().nextArrival);
//   console.log(snapshot.val().trainName);

//   // Change the HTML
//   $("#displayed-data").text(snapshot.val().clickCounter + " | " + snapshot.val().destination + " | " + snapshot.val().trainFrequency + " | " + snapshot.val().minutesAway + " | " + snapshot.val().nextArrival + " | " + snapshot.val().trainName);

//   // If any errors are experienced, log them to console.
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });


