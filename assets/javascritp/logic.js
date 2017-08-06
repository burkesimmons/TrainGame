  // Initialize Firebase
var config = {
apiKey: "AIzaSyCAzRVdxHyNcXqv3jeYuyd3NG_7Fz3m13o",
authDomain: "train-scheduler-57238.firebaseapp.com",
databaseURL: "https://train-scheduler-57238.firebaseio.com",
projectId: "train-scheduler-57238",
storageBucket: "",
messagingSenderId: "557586030411"
};
  
firebase.initializeApp(config);

var database = firebase.database();

// var trainName = '';
// var destination = '';
// var nextArrival = '';
// var frequency = '';



// Capture Button Click
$("#add-train").on("click", function() {
  // Don't refresh the page!
    event.preventDefault();

    var submit = {
        trainName: $('#trainName').val().trim(),
        email: $('#destination').val().trim(),
        nextArrival: $('#nextArrival').val(),
        frequency: $('#frequency').val().trim(),
      }
  
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    nextArrival = $('#nextArrival').val();
    frequency = $('#frequency').val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        nextArrival: nextArrival,
        frequency: frequency,
    }); 
    // Assumptions
    // var frequency = 3;
    console.log(frequency);

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));   

    var table = document.getElementById("tableRow");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    // var cell5 = row.insertCell(4);
    cell1.innerHTML = trainName;
    cell2.innerHTML = destination;
    cell3.innerHTML = frequency;
    cell4.innerHTML = nextTrain;
    cell5.innerHTML = tMinutesTillTrain;
    // cell5.innerHTML = "NEW CELL2";
});


database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  // console.log(snapshot.val());

  submit = snapshot.val().newTrain;
  // Log the value of the various properties
  // console.log(snapshot.val().trainName);
  // console.log(snapshot.val().destination);
  // console.log(snapshot.val().nextArrival);
  // console.log(snapshot.val().frequency);

  // Change the HTML
  
    




  // $("#displayed-data").html(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});