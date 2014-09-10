var CmdGeo = CmdGeo||{} //namespace

(function() {
	var CmdGeo.controller = {
		init = function (){},
		startInterval = function (){}
	}

	var CmdGeo.gps = {
		updatePosition = function (){},
		setPosition = function (){},
		checkLocations = function (){}
	}

	var CmdGeo.map = {
		updatePositie = function (event){},
		generate = function (myOptions, canvasId){},
		isNumber = function (n){}
	}

	var CmdGeo.debug = {
		geoErrorHandler = function (code, message){},
		debugMessage = function (message){},
		setCustomDebugging = function (debugId){}
	}
})();
