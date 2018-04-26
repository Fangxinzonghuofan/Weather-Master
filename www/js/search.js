$(document).on("pagecreate","#pagesix",function(){
  $('#searchButton').on("click", function(){
    getCityWeather();
  });            
});            




function searchText() {
	var city = $('#textinput').val();
	alert(city);
}

function storeValue(key, value) {
	//add some code to store the key-value pair in persistant storage 
}



function getCityWeather(city) {
	
    var cityURL = "https://www.metaweather.com/api/location/search/?query=" + '#textinput' ;
    
	console.log("222");
	// Use an HTML GET request to obtain data from an API
	var xmlhttp=new XMLHttpRequest();
	//xmlhttp.open("GET", feedURL, false);
	//xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
         
         
         
        if (this.readyState == 4 && this.status == 200) {	
		
	       var woeid= JSON.parse(xmlhttp.responseText);
            console.log(woeid[0].woeid);
            
            getWeatherForWOEID(woeid[0].woeid);
            
	   }
            
    }
	


    xmlhttp.open("GET", cityURL, true);
    xmlhttp.send();
    
 }



function getWeatherForWOEID(woeid) {

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
    	el: 'weatherTable', <!-- where -->
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
