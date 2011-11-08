var WebSocketServer = require('websocket').server;
var http = require('http');

var sender = function(connection, id) {
	return function() {
		if (connection.state != "open") {return;}
		connection.sendUTF(id);
	};
};

var binder = function(f, that, args) {
	return function() {
		f.apply(that, args);
	};
};

var functionsCaller = function(functions) {
	return function() {
		for (var i=0,l=functions.length; i < l; i++) {
			functions[i]();
		}
	};
};

var server = http.createServer(
	function(request, response) {
		console.log("request " + request.url);
		response.writeHead(404);
		response.end();
	}
);

server.listen(
	8080,
	function() {
		console.log("listen 8080");
	}
);

var ws = new WebSocketServer(
	{
		httpServer:server
	}
);

ws.on(
	'request',
	function(request) {

		console.log('connect');
		var connection = request.accept(null, null);

		var timeoutIds  = {};
		var intervalIds = {};

		var onMessage = function(message) {
			dispose(message.utf8Data);
		};

		var dispose = function(message) {

			console.log("message " + message);

			var params  = message.split(" ");
			var type    = params[0].toLowerCase();
			var id      = params[1];
			var ms      = params[2];
			var innerId = "id_" + id;

			switch(type){
			case "settimeout"    : if ( (innerId in timeoutIds )) {return;}; break;
			case "setinterval"   : if ( (innerId in intervalIds)) {return;}; break;
			case "cleartimeout"  : if (!(innerId in timeoutIds )) {return;}; break;
			case "clearinterval" : if (!(innerId in intervalIds)) {return;}; break;
			default: return;
			}

			switch(type){
			case "settimeout":
				var callbackTimeouts = [
					sender(connection, ["timeout", id].join(" ")),
					binder(arguments.callee, this, [["clearTimeout", id].join(" ")])
				];
				timeoutIds[innerId] = setTimeout(
					functionsCaller(callbackTimeouts),
					parseInt(ms, 10)
				);
				break;
			case "setinterval":
				var callbackIntervals = [
					sender(connection, ["interval", id].join(" "))
				];
				intervalIds[innerId] = setInterval(
					functionsCaller(callbackIntervals),
					parseInt(ms, 10)
				);
				break;
			case "cleartimeout":
				clearTimeout(timeoutIds[innerId]);
				delete timeoutIds[innerId];
				break;
			case "clearinterval":
				clearInterval(intervalIds[innerId]);
				delete intervalIds[innerId];
				break;
			}

		};

		connection.on(
			'message',
			onMessage
		);

		connection.on(
			'close',
			function(reasonCode, description) {
				console.log("close");
			}
		);

	}
);
