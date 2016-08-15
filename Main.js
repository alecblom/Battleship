window.onload = function(){	

	$('input[id^="start"]').click(function(){
		$('input[id^="start"]').remove();
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
		pl2Board.setShips();
		//pl2Board.drawShips();

		$('#ship-setup')
	

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
		
		$('.cell').click( function(){
			if($(this).closest('table').attr('id') == 'opponent-table'){
				var hit = false;
				x = $(this).attr('id');
				y = $(this).closest('tr').attr('id');
				var target = pl2Board.getCell(x, y);
				$.each(pl2Board.ships, function(index, value){
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
			}
			
		});
	});

}