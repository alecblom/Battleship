var token = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InJhYS5ndWVyYW5kQHN0dWRlbnQuYXZhbnMubmwi.fl4tNVgRgFmop5BKJIrmpTHKgXzOudL01dNPXczYm5o';
var baseUrl = 'https://zeeslagavans.herokuapp.com';

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
	$('#requestAIGame').on('click', function () {
		requestAIGame();
	});
	

});

function loadGamesList() {
	$('#gamelist').empty();
	$.ajax({
		url : baseUrl + '/users/me/games' + token,
		success : function (result) {
			console.log(result);
			for (x in result) {
				var title;
				if(result[x].enemyName != undefined){
					title = 'Game vs: ' + result[x].enemyName + ' &#9658; Status: ' + result[x].status;
				}else{
					title = 'Game vs: Still searching... &#9658; Status: ' + result[x].status;
				}
				$('#gamelist').append('<li>' + title + '<input type="button" class="play" id="' + result[x]._id + '" value="Play"></input></li>');
			}
			$('.play').on('click', function () {
				getGameInfo($(this).attr('id'));
			});
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
}

function loadUserInfo() {
	$.ajax({
		url : baseUrl + '/users/me/info' + token,
		success : function (result) {
			$('#name').text(result.name);
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});
}

function requestGame() {
	$.ajax({
		url : baseUrl + '/games' + token,
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

function requestAIGame() {
	$.ajax({
		url : baseUrl + '/games/AI' + token,
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
		url : baseUrl + '/users/me/games' + token,
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

function getGameInfo(gameId){
	$.ajax({
		url : baseUrl + '/games/' + gameId + token,
		success : function (result) {
			console.log(result);
			return result;
		},
		error : function (request, status, errorThrown) {
			console.log("Ajax call error! Request: " + request + " status: " + status + " errorThrown: " + errorThrown);
		}
	});	
}