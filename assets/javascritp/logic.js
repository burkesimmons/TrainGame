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

var trainName = '';
var destination = '';
var nextArrival = '';
var frequency = '';

// var submit = {
//         name: $('#name-input').val().trim(),
//         email: $('#email-input').val().trim(),
//         age: $('#age-input').val().trim(),
//         comment: $('#comment-input').val().trim(),
//       }

// Capture Button Click
$("#add-train").on("click", function() {
  // Don't refresh the page!
    event.preventDefault();
  
    trainName = $('#trainName').val().trim();
    destination = $('#destination').val().trim();
    nextArrival = $('#nextArrival').val().trim();
    frequency = $('#frequency').val().trim();

    database.ref().set({
        trainName: trainName,
        destination: destination,
        nextArrival: nextArrival,
        frequency: frequency
    });
});


database.ref().on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Log the value of the various properties
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().nextArrival);
  console.log(snapshot.val().frequency);

  // Change the HTML
  
    var table = document.getElementById("tableRow");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    // var cell5 = row.insertCell(4);
    cell1.innerHTML = snapshot.val().trainName;
    cell2.innerHTML = snapshot.val().destination;
    cell3.innerHTML = snapshot.val().nextArrival;
    cell4.innerHTML = snapshot.val().frequency;
    // cell5.innerHTML = "NEW CELL2";


  // $("#displayed-data").html(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});