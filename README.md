# Visualizing Data with Leaflet

Basic Visualization of earthquake data with magnitude of 1.0+ for the past one day is created using leaflet that looks like the image below:

![2-BasicMap](Images/2-BasicMap.png)

1. **Source of Data set**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. From the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page, url for earthquake data (in JSON format) with magnitude of 1.0+ for the past one day was selected to create visualization. 

   ![4-JSON](Images/4-JSON.png)

2. **Data import & visualization**

  A map is created using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude. Data markers  reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * Popups that provide additional information about the earthquake when a marker is clicked has been added to the map.

   * A legend that provides context for map data has also been incorporated.
   
   * A number of base maps is added to choose from as well as separate out different data sets into overlays that can be turned on and off independently.

   * Layer controls have been added to the map.

   * Visualization looks something like the map above.


**Note**
Please include an API token from mapbox to visualize the map. Public token is incorporated in the script config.js.
