var token = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InJhYS5ndWVyYW5kQHN0dWRlbnQuYXZhbnMubmwi.fl4tNVgRgFmop5BKJIrmpTHKgXzOudL01dNPXczYm5o';

$( document ).ready(function() {
    console.log( "ready!" );
	loadGamesList();		
	loadUserInfo();
});
	

function loadGamesList(){
	
	$.ajax({
		url : 'https://zeeslagavans.herokuapp.com/users/me/games' + token ,
		success : function (result) {
			console.log(result);
			for(x in result){
				$('#gamelist').append('<li>game id: ' + result[x]._id + ' status: '+ result[x].status +'<input type="button" value="Start"></input></li>');
			}
		},
		error : function (request, status, errorThrown) {
		console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
}

function loadUserInfo(){
		$.ajax({
		url : 'https://zeeslagavans.herokuapp.com/users/me/info' + token ,
		success : function (result) {
			console.log(result);
			$('#name').text(result.name);
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
}