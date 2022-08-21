// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//   apiKey: "AIzaSyB0agPMzMwAlVHnoumb8Bsr8z67OPcqVjM",
//   authDomain: "chalbo-bfa21.firebaseapp.com",
//   databaseURL: "https://chalbo-bfa21-default-rtdb.firebaseio.com",
//   projectId: "chalbo-bfa21",
//   storageBucket: "chalbo-bfa21.appspot.com",
//   messagingSenderId: "342730849572",
//   appId: "1:342730849572:web:fdfc7a278ae3fce66cc7b1",
//   measurementId: "G-P6FMSGJWCH",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// // Reference messages collection
// var inputsRef = firebase.database().ref("inputs");

$(function () {
  // add input listeners
  google.maps.event.addDomListener(window, "load", function () {
    var from_places = new google.maps.places.Autocomplete(
      document.getElementById("from_places")
    );
    var to_places = new google.maps.places.Autocomplete(
      document.getElementById("to_places")
    );

    google.maps.event.addListener(from_places, "place_changed", function () {
      var from_place = from_places.getPlace();
      var from_address = from_place.formatted_address;
      $("#origin").val(from_address);
    });

    google.maps.event.addListener(to_places, "place_changed", function () {
      var to_place = to_places.getPlace();
      var to_address = to_place.formatted_address;
      $("#destination").val(to_address);
    });
  });
  // calculate one way distance
  function calculateDistance1() {
    var origin = $("#origin").val();
    var destination = $("#destination").val();
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
        // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
        avoidHighways: false,
        avoidTolls: false,
      },
      callback1
    );
  }

  // get distance results
  function callback1(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $("#result").html(err);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $("#result").html(
          "Better get on a plane. There are no roads between " +
            origin +
            " and " +
            destination
        );
      } else {
        var distance = response.rows[0].elements[0].distance;
        var duration = response.rows[0].elements[0].duration;

        var distance_in_kilo = distance.value / 1000; // the kilom
        var distance_in_mile = distance.value / 1609.34; // the mile
        var duration_text = duration.text;
        var duration_value = duration.value;

        // Firebase inserting into database

        // var newInputsRef = inputsRef.push();
        // newInputsRef.set({
        //   from: $("#origin").val(),
        //   to: $("#destination").val(),
        //   date: $("#date").val(),
        //   distance_in_kilo: distance_in_kilo,
        //   duration_text: duration_text,
        // });

        window.localStorage.setItem("distance", distance_in_kilo);
        window.localStorage.setItem("time", duration_text);
        window.localStorage.setItem("leavetime", $("#leavetime").val());
        window.localStorage.setItem("from", origin);
        window.localStorage.setItem("to", destination);
        window.localStorage.setItem("leaveOnDate", $("#date").val());
        window.localStorage.setItem("returnDate", $("#date").val());
        window.location.replace("vehicle.html");
      }
    }
  }

  $("#book-one-way").bind("click", function (e) {
    e.preventDefault();
    // location.href = "vehicle.html";
    calculateDistance1();
  });
});

$(function () {
  // add input listeners
  google.maps.event.addDomListener(window, "load", function () {
    var from_places = new google.maps.places.Autocomplete(
      document.getElementById("from")
    );
    var to_places = new google.maps.places.Autocomplete(
      document.getElementById("to")
    );

    google.maps.event.addListener(from_places, "place_changed", function () {
      var from_place = from_places.getPlace();
      var from_address = from_place.formatted_address;
      $("#origin").val(from_address);
    });

    google.maps.event.addListener(to_places, "place_changed", function () {
      var to_place = to_places.getPlace();
      var to_address = to_place.formatted_address;
      $("#destination").val(to_address);
    });
  });

  // calculate two way distance
  function calculateDistance2() {
    var origin = $("#origin").val();
    var destination = $("#destination").val();
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
        // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
        avoidHighways: false,
        avoidTolls: false,
      },
      callback2
    );
  }
  // get distance results
  function callback2(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $("#result").html(err);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $("#result").html(
          "Better get on a plane. There are no roads between " +
            origin +
            " and " +
            destination
        );
      } else {
        var distance = response.rows[0].elements[0].distance;
        var duration = response.rows[0].elements[0].duration;

        var distance_in_kilo = (2 * distance.value) / 1000; // the kilom
        var distance_in_mile = distance.value / 1609.34; // the mile
        var duration_text = duration.text;
        var duration_value = duration.value;

        // Firebase inserting into database

        // var newInputsRef = inputsRef.push();
        // newInputsRef.set({
        //   from: $("#origin").val(),
        //   to: $("#destination").val(),
        //   date: $("#date").val(),
        //   distance_in_kilo: distance_in_kilo,
        //   duration_text: duration_text,
        // });

        window.localStorage.setItem("distance", distance_in_kilo);
        window.localStorage.setItem("time", duration_text);
        window.localStorage.setItem("leavetime", $("#leavetime").val());
        window.localStorage.setItem("from", origin);
        window.localStorage.setItem("to", destination);
        window.localStorage.setItem("leaveOnDate", $("#two-way-date").val());
        window.localStorage.setItem("returnDate", $("#two-way-date").val());
        window.location.replace("vehicle.html");
      }
    }
  }

  $("#book-two-way").bind("click", function (e) {
    e.preventDefault();
    // location.href = "vehicle.html";
    calculateDistance2();
  });
});
