var SerialPort = require("serialport");

var serialPort = new SerialPort("/dev/cu.wchusbserial1420", {
	baudrate: 9600,
	// defaults for Arduino serial communication
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false
});

serialPort.on('data', function(data) {
  var result = data.toString();

	switch(result) {
    case 'finish':
      process.exit(1);
    	break;
    default:
      console.log('ArduinoResult: '+result);
      break;
  }
});

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
  //console.log('NodeResult:', util.inspect(text));
  //serialPort.write(text + 'E');
  serialPort.write(text.slice(0, text.length - 1)+'E');
  if (text === 'quit\n') {
    done();
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}
