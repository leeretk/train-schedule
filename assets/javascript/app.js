var config = {
    apiKey: "AIzaSyAXaAGfrycDeF1dRDHJbSnIwBJi6bhIfKg",
    authDomain: "denver-bootcamp-c486c.firebaseapp.com",
    databaseURL: "https://denver-bootcamp-c486c.firebaseio.com",
    projectId: "denver-bootcamp-c486c",
    storageBucket: "denver-bootcamp-c486c.appspot.com",
  };

  firebase.initializeApp(config);

  // VARIABLES
    // --------------------------------------------------------------------------------

    var database = firebase.database();
    var clickCounter = 0;

    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------

    $("#click-button").on("click", function() {
      clickCounter++;

      database.ref().set({
        clickCount: clickCounter
      });
    });

    // MAIN PROCESS + INITIAL CODE
    // --------------------------------------------------------------------------------

    database.ref().on("value", function(snapshot) {
      console.log(snapshot.val());

      clickCounter = snapshot.val().clickCount;

      $("#click-value").text(snapshot.val().clickCount);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
