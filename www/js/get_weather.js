$(document).on("pagecreate","#pagesix",function(){
    
    console.log("pagecreate #pagesix");
    
  $('#searchButton').on("click", function(){
      console.log("#searchButton click");
   var city= $('#textinput').val(); 
      console.log("#searchButton val " + city  );
    getCityWeather(city);
    checkConnection();
    
  });            
});            

function getCityWeather(city) {
	
    console.log("#getCityWeather " +city);
    
    var cityURL = "https://www.metaweather.com/api/location/search/?query=" + city ;
    
	console.log("111");
	// Use an HTML GET request to obtain data from an API
	var xmlhttp=new XMLHttpRequest();
	//xmlhttp.open("GET", feedURL, false);
	//xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
         
         
         
        if (this.readyState == 4 && this.status == 200) {	
		
	       var woeid= JSON.parse(xmlhttp.responseText);
            console.log(woeid[0].woeid);
            
            getWeatherForWOEID(woeid[0].woeid, "searchTable");
            
	   }
            
    }
	


    xmlhttp.open("GET", cityURL, true);
    xmlhttp.send();
    
 }



function getWeather(latitude, longitude) {
	
    var loctionURL = "https://www.metaweather.com/api/location/search/?lattlong=" + latitude +"," + longitude;
    
	console.log("111");
	// Use an HTML GET request to obtain data from an API
	var xmlhttp=new XMLHttpRequest();
	//xmlhttp.open("GET", feedURL, false);
	//xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
         
         
         
        if (this.readyState == 4 && this.status == 200) {	
		
	       var woeid= JSON.parse(xmlhttp.responseText);
            console.log(woeid[0].woeid);
            
            getWeatherForWOEID(woeid[0].woeid, "locationTable");
            
	   }
            
    }
	


    xmlhttp.open("GET", loctionURL, true);
    xmlhttp.send();
    
 }


function getWeatherForWOEID(woeid, tableName) {

    var feedURL = "https://www.metaweather.com/api/location/" + woeid + "/";

	console.log("111");
	// Use an HTML GET request to obtain data from an API
	var xmlhttp=new XMLHttpRequest();
	//xmlhttp.open("GET", feedURL, false);
	//xmlhttp.send();
	 xmlhttp.onreadystatechange = function() {
         
    if (this.readyState == 4 && this.status == 200) {	
		
	// parse the resulting JSON into Javascript Data Object 
	// you can use a live parser to inspect the contents of the JSON
	// http://json.parser.online.fr/ 
	var weather= JSON.parse(xmlhttp.responseText);
	
	
	//Define Ractive binding
	var ractive = new Ractive({
    	el: tableName, <!-- where -->
    	template: '#myTemplate', <!-- how -->
    	data: { <!-- what - specify the list of weather reports using dot notation-->
        
            weather : weather.consolidated_weather, 
            
        format: function ( num ) {
            return num.toFixed(1);
        }, 
         
        
        } 
	});
            
        }
	
};

    xmlhttp.open("GET", feedURL, true);
    xmlhttp.send();
    
 }



function checkConnection() {
    var networkState = navigator.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
 
    alert('Connection type: ' + states[networkState]);
}