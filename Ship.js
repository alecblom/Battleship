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
			$.each(this.cells, function(index, value){
				var cellHtml = this.getHtml('cell');
				cellHtml.addClass('ship');
			})
		}
	}