window.onload = function(){
	/* Classes */
	function Connection(){
		this.apiKey = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFnLmJsb21Ac3R1ZGVudC5hdmFucy5ubCI.uIJbq_KxtqwKoYrb0rcOkMh7Sp_N4h9ka1kpvXdgxls';
		this.xmlHttp = new XMLHttpRequest();
		
		this.getAction = function(type){
			this.xmlHttp.open( "GET", 'https://zeeslagavans.herokuapp.com/' + type + this.apiKey, false ); // false for synchronous request
			this.xmlHttp.send( null );
			return JSON.parse(this.xmlHttp.responseText);	
		}
		this.deleteAction = function(type){
			this.xmlHttp.open( "GET", 'https://zeeslagavans.herokuapp.com/' + type + this.apiKey, false ); // false for synchronous request
			this.xmlHttp.send( null );
			return JSON.parse(this.xmlHttp.responseText);	
		}
		this.postAction = function(type){
			this.xmlHttp.open( "POST", 'https://zeeslagavans.herokuapp.com/' + type + this.apiKey, false ); // false for synchronous request
			this.xmlHttp.send( null );
			return JSON.parse(this.xmlHttp.responseText);	
		}
	}
	
	function Cell(){
		this.x;
		this.y;
		this.state;
		this.board;
		
		this.init = function(x, y, board){
			this.x = x;
			this.y = y;
			this.state = 'normal';
			this.board = board;
		}
		
		this.getHtml = function(tag){
			var table = $('#'+this.board.owner.table+'-table');
			var row = table.find('tr#'+this.y);
			var col = table.find('.cell#'+this.x);
			var cell = row.find('td#'+this.x);
			
			switch(tag){
				case 'table':
					return table;
				case 'row':
					return row;
				case 'col':
					return col;
				case 'cell':
					return cell;
			}
		}
	}
	
	function Board(){
		this.rows = new Array();
		this.ships = [];
		this.owner;
		
		this.setShips = function(){
			var shipList = new Connection().getAction('ships');
			var y = 1;
			var board = this;
			var ships = this.ships;
			$.each(shipList, function(index, value){
				var currShip = new Ship();
				currShip.init(1, y, this.name, this.length, board);
				ships.push(currShip);
				y++;
			})
		}
		
		this.drawShips = function(){
			$.each(this.ships, function(index, value){
				this.draw();
			})
		}
		
		this.init = function(owner){
			this.owner = owner;
			var initY = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
			var initX = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J");
			for(y = 0; y < 10; y++){
				var currRow = [];
				for(x = 0; x < 10; x++){
					var cell = new Cell();
					cell.init(initX[x], initY[y], this);
					currRow[initX[x]] = cell;
				}
				currRow.length = 10;
				this.rows[initY[y]] = currRow;
			}
		}
		
		this.getCell = function(x, y){
				var initX = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J");
				var row = this.rows[y];
				if(!isNaN(x)){
					x = initX[x-1];
				}
				var cell = row[x];
				return cell;
			}
			
		this.draw = function(){
			$('#'+this.owner.table+'-table').append('<thead>');
			$('#'+this.owner.table+'-table').append('<tbody>');
			$('#'+this.owner.table+'-table'+' thead').append('<td>');
			for(y = 1; y < 11; y++){
				var row = this.rows[y];
				if(y == 1){
					for(x = 1; x < 11; x++){
						var cell = this.getCell(x, y);
						$('#'+this.owner.table+'-table'+' thead').append('<td>'+cell.x);    // Header A,B,C... <>	
					}
					
				}
				$('#'+this.owner.table+'-table').append('<tr class="row" id="'+y+'">');// Rows <>
				$('#'+this.owner.table+'-table'+' tr#'+y).append('<td class="head">'+y);    // Header 1,2,3... ||
				for(x = 1; x < 11; x++){
					var cell = this.getCell(x, y);
					$('#'+this.owner.table+'-table'+' tr#'+y).append('<td class="cell '+this.owner.table+'" id="'+cell.x+'">');
				}
			}
			$('#'+this.owner.table+'-table'+' tr#10').append('<td class="score" id="'+this.owner.table+'-score">');
		}

	}

	function Ship(){
		this.cells = [];
		this.alignment;
		this.name;
		this.lenght;
		this.state;
		this.board;
		
		this.init = function(startX, startY, name, length, board){
			for(x = startX; x <= length; x++){
				var cell = board.getCell(x, startY);
				this.cells.push(cell);
			}
			this.board = board;
			this.length = length;
			this.state = 'alive';
			this.alignment = 'horizontal';
			this.name = name;
		}
		
		this.draw = function(){
			var name = this.name;
			$.each(this.cells, function(index, value){
				var cellHtml = this.getHtml('cell');
				cellHtml.addClass('ship');
				cellHtml.attr('name', name);
			})
		}
	}
	
	function Player(){
		this.name;
		this.isAI;
		this.table;
		
		this.init = function(name){
			if(name){
				this.name = name;
				this.isAI = false;
				this.table = 'player';
			}else{
				this.name = 'Computer';
				this.isAI = true;
				this.table = 'opponent';
			}
		}
	}
	
	/* Main */
	$("#lobbyform").on('click', 'input[id^="player"]', function(){
		$('#lobbyform').hide();
		var plr1 = new Player();
		var plr2 = new Player();
		var pl1Board = new Board();
		var pl2Board = new Board();
		plr1.init('Alec');
		plr2.init();
		
		pl1Board.init(plr1);
		pl1Board.draw('player');
		
		pl2Board.init(plr2);
		pl2Board.draw('opponent');
		pl1Board.setShips();
		pl1Board.drawShips();

		$('#ship-setup');
	

	/* Jquery */

		$('.cell').mouseenter(function(){
			if($(this).closest('table').attr('id') == "player-table"){
				x = $(this).attr('id');
				y = $(this).closest('tr').attr('id');
				$(this).addClass('targetPlr');
				$('#player-score').html(x+'-'+y).css('display', 'table-cell');
			}
			
			else if($(this).closest('table').attr('id') == "opponent-table"){
				x = $(this).attr('id');
				y = $(this).closest('tr').attr('id');
				$(this).addClass('targetEnm');
				$('#opponent-score').html(x+'-'+y).css('display', 'table-cell');


			}
		});
		
		$('.cell').mouseout(function(){
			if($(this).closest('table').attr('id') == "player-table"){
				$(this).removeClass('targetPlr');
				x = $(this).attr('id');
				y = $(this).closest('tr').attr('id');
			}else if($(this).closest('table').attr('id') == "opponent-table"){
				$(this).removeClass('targetEnm');
				x = $(this).attr('id');
				y = $(this).closest('tr').attr('id');
			}
		})
		$('table').mouseout(function(){
			$('.score').css({'display' : 'none'});
		});
		
		$('#gameform').on('click', '.cell', function(){
			var x = $(this).attr('id');
			var y = $(this).closest('tr').attr('id');
			
			
			switch($(this).closest('table').attr('id')){
				case 'opponent-table':
					var board = pl2Board;
					var target = board.getCell(x, y);				
					var hit = false;
					$.each(board.ships, function(index, value){
						$.each(this.cells, function(index, value){
							if(this == target){
								alert('hit');
								target.state = 'hit';
								hit = true;
							target.getHtml('cell').addClass('hit');
								console.log(target);
							}	
						})
					})
					if(!hit){
						target.state = 'missed';
						target.getHtml('cell').addClass('missed');
						console.log(target);
					}
					break;
				
				case 'player-table':
					var board = pl1Board;
					var target = board.getCell(x, y);
					if($(this).hasClass('ship')){
						console.log($(this).attr('name'));
					}
					break;
			}
		});
		$('#gameform').show();
	});
	
	$('#gameform').on('click', '#back', function(){
		$('#gameform').hide();
		$("table[id$='table']").empty();
		$('#lobbyform').show();
	});
	
	
}