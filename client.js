/**
 * @author Julian Gautier
 */

/**
 * Module Dependencies
 */
var dnode = require('dnode');
/**
 * @class SerialPort
 * @param port path to device
 * @param options options to pass to the serialport
 */
var SerialPort = function(port, options) {
	var self = this;
	var isOpen = false;
	/**
	 * write data to the serial port
	 * @param data data to write to port
	 */
	self.write = function(data) {
		var writeToExecute = function() {
				if (!isOpen) {
					self.remote.open(port, options);
					isOpen = true;
				}
				self.remote.write(port, data);
			};
		//have to do this because node-serialport is sync.  there must be a better way?
		if (!self.remote) {
			dnode.connect(document.location.port, function(remote) {
				self.remote = remote;
				writeToExecute();
			});
		} else {
			writeToExecute();
		}
	};
	/**
	 * register event handlres.  "data" is the only event supported
	 * @param event string name of event
	 * @param cb callback to fire when data is received
	 */
	this.on = function(event, cb) {
		//have to do this because node-serialport is sync.  there must be a better way?
		if (!self.remote) {
			dnode.connect(document.location.port, function(remote) {
				self.remote = remote;
				if (event === "data") {
					if (!isOpen) {
						self.remote.open(port, options);
						isOpen = true;
					}
					self.remote.onData(port, function(data) {
						cb(data);
					});
				}
			});
		} else {
			self.remote.onData(port, function(data) {
				cb(data);
			});
		}
	};
};

module.exports = {
	SerialPort: SerialPort
};