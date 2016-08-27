/*$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/login?id=sergio%40mail.com&pass=sergio"
    }).then(function(data) {
    	var json = JSON.parse(data);
alert(data);

    });
});
*/

function login(){
var mail = document.getElementById( "inputEmail" ).value;
var password = document.getElementById( "inputPassword" ).value;
    var url_rest = "http://127.0.0.1:8080/login?id=" + mail+"&pass="+password;
       // alert("data");

	$.ajax({
        url: url_rest//"http://localhost:8080/login?id=sergio%40mail.com&pass=sergio"
    }).then(function(data) {
        
       // alert(JSON.stringify(data));
    	
        var json = data;
    	if(json['mail']==mail && json['token']!=null)
    		{
    			//alert(data);
    		document.cookie="PTapp_token = "+json['token']+";path=/;";
    		window.location.href = "home.html";
    	}

    });
}

