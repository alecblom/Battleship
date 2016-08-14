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
			console.log(this.ships);
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