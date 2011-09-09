var serialport = require('serialport')
   ,SerialPort = serialport.SerialPort;
var port = new SerialPort('sampleport');
port.on('data',function(data){
	var theString = "";
	for(var i = 0, length = data.length;i < length; i++){
		theString += String.fromCharCode(data[i]);
	}
	console.log(theString);
});