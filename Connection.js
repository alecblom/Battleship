	function Connection(){
		this.apiKey = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFnYmxvbUBhdmFucy5ubCI.SYPXBmpAnytrcKts7toGW5DYfaMWPyni2_0J4BOBpDw';
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