var feedURL = "https://www.metaweather.com/api/location/44418/";

$(document).on('pagecreate', '#pagethree', function(event) {
	
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
            return num.toFixed(0);
        }, 
         
         format2: function ( num ) {
            return num.toFixed(2);
        }, 
        
        
        } 
	});
            
        }
	
};

    xmlhttp.open("GET", feedURL, true);
    xmlhttp.send();
    
 });