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