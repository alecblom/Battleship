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