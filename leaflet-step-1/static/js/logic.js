//Define variable to hold API enpoint for the past day with Magnitude of 1.0+  
var Url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";

// Performs request to URL and send the data.features object to the createFeatures function
d3.json(Url, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Define streetmap layer
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Define darkmap layer
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  //Define an array to hold all circles as a group
  var circleGroup = [];

  // Loop through the data and create one marker for each earthquake object
  for (var i = 0; i < earthquakeData.length; i++) {
    coordinates = [earthquakeData[i].geometry.coordinates[1],earthquakeData[i].geometry.coordinates[0]]
    properties = earthquakeData[i].properties;

  //Set color for circles based off of the magnitude
    var Choosecolor = "red";
    if (properties.mag < 1) {
      Choosecolor = "greenyellow";
    }
    else if (properties.mag < 2) {
      Choosecolor = "yellowgreen";
    }
    else if (properties.mag < 3) {
      Choosecolor = "yellow";
    }
    else if (properties.mag < 4) {
      Choosecolor = "gold";
    }
    else if (properties.mag < 5) {
      Choosecolor = "orange";
    }
    
    // Add circles to map with color and size reflective of the magnitude of the earthquake
    var myCircle = L.circle(coordinates, {
      fillOpacity: 1,
      color: Choosecolor,
      fillColor: Choosecolor,
      radius: (properties.mag * 18000)
    }).bindPopup("<h3>" + properties.place + "</h3> <hr><p>Time: "+ new Date(properties.time) +"</p><p>Magnitude: " + properties.mag.toFixed(2) + "</p>");
    circleGroup.push(myCircle);
  }

  //Create the layer for the circles
  var earthquakes = L.layerGroup(circleGroup);

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Add the layer to the map
  var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5,
    layers: [streetmap,earthquakes]
  });

  // Create a layer control, pass in baseMaps and overlayMaps and add the layer control to the map
  L.control.layers(baseMaps,overlayMaps, {
     collapsed: false
  }).addTo(myMap);

  // // create the legend
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
  	var div = L.DomUtil.create('div', 'info legend');
    var grades = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
    var color = ["greenyellow","yellowgreen","yellow","gold", "orange","red"];
    

  	// loop through grades and generate a div with corresponding colors  
  	for (var i = 0; i < grades.length; i++) {
  		div.innerHTML +=
  			'<p style="margin-left: 15px">' + '<i style="background:' + color[i] + ' "></i>' + '&nbsp;&nbsp;' + grades[i]+ '<\p>';
  	}
  	return div;
  };

  //Add the legend by default
  legend.addTo(myMap)

  //Overlay listener for adding legend upon selecting earthquake data in the control panel
  myMap.on('overlayadd', function(a) {
    legend.addTo(myMap);
  });

  //Overlay listener for remove upon unchecking earthquake data in the control panel
  myMap.on('overlayremove', function(a) {
    myMap.removeControl(legend);
  });
}
