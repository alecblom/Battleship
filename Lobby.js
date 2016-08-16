var token = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFnLmJsb21Ac3R1ZGVudC5hdmFucy5ubCI.uIJbq_KxtqwKoYrb0rcOkMh7Sp_N4h9ka1kpvXdgxls';

$(document).ready(function (a) {
	//Loading Lobby
	loadUserInfo();	
	loadGamesList();
	

	$('#requestGame').on('click', function () {
		requestGame();
	});
	$('#deleteGames').on('click', function () {
		deleteGames();
	});
});

function loadGamesList() {
	$('#gamelist').empty();
	$.ajax({
		url : 'https://zeeslagavans.herokuapp.com/users/me/games' + token,
		success : function (result) {
			console.log(result);
			for (x in result) {
				$('#gamelist').append('<li>game id: ' + result[x]._id + ' status: ' + result[x].status + '<input type="button" id="play' + result[x]._id + '" value="Play"></input><input type="button" id="delete' + result[x]._id + '" value="Delete"></input></li>');
			}
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
}

function loadUserInfo() {

	$.ajax({
		url : 'https://zeeslagavans.herokuapp.com/users/me/info' + token,
		success : function (result) {
			console.log(result);
			$('#name').text(result.name);
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
}

function requestGame() {
	$.ajax({
		url : 'https://zeeslagavans.herokuapp.com/games' + token,
		success : function (result) {
			if (result.error != undefined) {
				alert("Already pending for a game");
				
			}
			loadGamesList();
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});

	
}

function deleteGames() {
	$.ajax({
		url : 'https://zeeslagavans.herokuapp.com/users/me/games' + token,
		type : 'DELETE',
		success : function (result) {
			console.log(result);
			loadGamesList();
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});	
}