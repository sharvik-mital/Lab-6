/**
 * Sample javascript file. Read the contents and understand them, 
 * then modify this file for your use case.
 */

var myTable;
var funct;
//+"<script>"4
//var arr={"a","aa","aaaa"};

//+ "</script>"
$( window ).on( "load", loadTableAsync);
function setallconversationcontent(){
	txt="    <table id=\"usersTable1\" class=\"display\">" + 
	"        <thead>" + 
	"        <tr> <th>User ID</th> <th>Timestamp</th> <th>Number_of_Messages</th> </tr>" + 
	"        </thead>" + 
	"    </table>";
	document.getElementById("content").innerHTML = txt;
	myTable = $("#usersTable1").DataTable({
        columns: [{data:"uid"}, {data:"last_timestamp"}, {data:"num_msgs"}]
    });
	readycall();
}
$(document).ready(readycall);
function readycall() {
	 var getData = function (request, response) {
	        $.getJSON(
	            "AutoCompleteUser?term=" + request.term,	
	          
	            function (data) {
	                response(data);
	            });
	    };
	    
	$( "#user_phone_id").autocomplete({
		source: getData,
		select: function (event,ui) {
//	        alert('You selected: ' + ui.item.value);
//			location.href="ConversationDetail?other_id="+ui.item.value;
			funct.fun.call(ui.item.value);
	    }
		});

	
    $('#usersTable1 tbody').on( 'click', 'tr', function () {
    	
    	if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            myTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        var str = myTable.row(this).data()["uid"];    
        
        if (str == "") {

          document.getElementById("#content").innerHTML = "";

          return;

        }        
        funct.fun.call(str);
    });
    $('#cc').on('click',function(){
//    	e.preventDefault();
    	txt="<form>"+
    		"Enter user_id: <input type=\"text\" id= \"ccother_id\">"+
    	"</form>";
        txt+="<button onclick=\"createconversation2()\">"+ "Submit" +"</button>";
      	document.getElementById("content").innerHTML = txt;

    });    

//        $('#content').html(myTable.row(this).data()["uid"]);
        
    //load div contents asynchronously, with a call back function
//    alert("Page loaded. Click to load div contents.");
//	$("#content").load("content.html", function(response){
		//callback function
//		alert("Div loaded. Size of content: " + response.length + " characters.");
//	});
}
function SubmitMessage(){
    str=$("#NewMessageForm").serialize();
    var formData=new FormData(document.forms.NewMessageForm);
    otheruser= formData.get('other_id');
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
      		
          	var myObj = JSON.parse(this.responseText);
//          	txt = "<table id=\"etail\" class=\"display\" >";
//          	txt +="<thead>" + "<tr> <th>User ID</th> <th>Text</th> <th>Timestamp</th> </tr>" + "</thead>" ;
          	var x = myObj.status;
          	if(x){
          		funct.fun.call(otheruser);
          	}
          	else{
          		alert("Error: Message Not Sent");
//          		funct.fun.call(otheruser);
          	}
          }

        };

        xhttp.open("POST", "NewMessage", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(str);

}
function createconversation2(){
    var other_user= document.getElementById("ccother_id").value;
    str="other_id="+other_user;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

          if (this.readyState == 4 && this.status == 200) {
      		
          	var myObj = JSON.parse(this.responseText);
          	var x = myObj.status;
          	if(x){
          		alert("Success");
          	}
          	else{
          	var message=myObj.message;
          		alert(""+message);
          	}
//          		funct.fun.call(otheruser);
          	}
          }


        xhttp.open("POST", "CreateConversation", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(str);
}

funct={
		fun:function(){
			xhttp = new XMLHttpRequest();
			str = this;
	        xhttp.onreadystatechange = function() {

	          if (this.readyState == 4 && this.status == 200) {
	      		
	          	var myObj = JSON.parse(this.responseText);
	          	txt = "<table id=\"etail\" class=\"display\" >";
	          	txt +="<thead>" + "<tr> <th>User ID</th> <th>Text</th> <th>Timestamp</th> </tr>" + "</thead>" ;
	          	var x = myObj.data;
	          	for(y in x){
	          		txt += "<tr>";
	          		var z=myObj.data[y];
	          		txt+="<td>"+z.uid+"</td>";
	          		txt+="<td>"+z.text+"</td>";
	          		txt+="<td>"+z.timestamp+"</td>";
	          		txt+="</tr>";
	          	}
	          	txt+="</table>";
	            txt+="<form action=\"\" id=\"NewMessageForm\">"+
	            "Enter Message: <input type=\"text\" name = \"msg\">"+
	            "<input type=\"hidden\" name = \"other_id\" value="+str+">"+
			    "</form>";	
			    txt+="<button onclick=\"SubmitMessage()\">"+ "Submit" +"</button>";
	          	document.getElementById("content").innerHTML = txt;
//	            $("#etail").DataTable({
//	                columns: [{data:"uid"}, {data:"text"}, {data:"timestamp"}]
//	            });
	          }

	        };

	        xhttp.open("GET", "ConversationDetail?other_id="+str, true);
	        
	        xhttp.send();
		}
}

function loadTableAsync() {
	setallconversationcontent();
    myTable.ajax.url("AllConversations").load();
}