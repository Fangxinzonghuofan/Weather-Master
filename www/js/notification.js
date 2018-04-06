var notification_count=0;

$(document).on('pageinit', function() {

	$('#TestButton').on('click', function() {
		createMessage();
	});
	
	$('#DialogButton').on('click', function() {
		createDialog();
	});


	$('#NotificationButton').on('click', function() {
		createNotification();
	});


});



function createMessage(){		
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: 'God bless you.', duration: 1000}); 	
}
        	

function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example
      
	navigator.notification.confirm(
    	'Did you bring an umbrella??',  // message
        dialogDismissed,         // callback
        'Before you go out',            // title
        ['Yes', 'No']                  // buttons
    );

}
        	
        	
        	
function dialogDismissed(buttonIndex) {
	
	if(buttonIndex==1) new Toast({content: "Excellent", duration: 3000});
   	else if(buttonIndex==2) new Toast({content: 'Think twice.', duration: 3000});

}

   
   
function createNotification() {
        		
	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + 1000); //delayed time  - add 1 second
    			
    //
    //setup notification
    //
	window.plugin.notification.local.schedule({ 
    	id: 		1,
        title: 		"Mom's kind reminder",
        message: 	"Don't forget to bring your umbrella, dear",
        date: 		notificationTime, 
        badge: 		notification_count++
   	});
    
}