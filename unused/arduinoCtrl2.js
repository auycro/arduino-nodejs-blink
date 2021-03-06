//Add Lib
//var srListPort = require("serialport"); //.SerialPort
var SerialPort = require("serialport");//.SerialPort

//Body
/*
srListPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});
*/

var serialPort = new SerialPort("/dev/cu.wchusbserial1420", {
	baudrate: 9600,
	// defaults for Arduino serial communication
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false
});

var i = 0;
var sendcmd = '';

serialPort.on('data', function(data) {
	console.log('received: '+data.toString());
	switch(data.toString()) {
		case 'hello':
			sendcmd = 'hello';
			break;
		case 'finish':
			process.exit(1);
			break;
		default:
			i++;
			sendcmd = i;
		    break;
	}
	if (i > 5) {
		sendcmd = 'close';
	}
	serialPort.write(sendcmd + 'E');
	console.log('Send: '+sendcmd);
	sendcmd = '';
});
