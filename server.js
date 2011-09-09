/**
 * @author Julian Gautier
 */

/**
 * Module Dependencies
 */
var dnode = require('dnode'),
	SerialPort = require("serialport").SerialPort;
/**
 *@class serialportify
 *@param server connect or express server to listen on.
 */
module.exports = function(server) {
	var serialConnections = {};
	var serialportify = dnode(function(client) {
		/*
		 * Opens a serial port
		 * @param port path to device
		 * @param options options object that is passed to serialport
		 */
		this.open = function(port, options) {
			console.log('opening port ' + port);
			serialConnections[port] = new SerialPort(port, options);
		};
		/*
		 * write data to port
		 * @param port path to device
		 * @data data to send to device
		 */
		this.write = function(port, data) {
			serialConnections[port].write(data);
		};
		/**
		 *
		 * @param port path to device
		 * @param cb callback to be executed on data
		 */
		this.onData = function(port, cb) {
			console.log('on the data ' + port);
			serialConnections[port].on('data', function(data) {
				cb(data);
			});
		};
	});
	/**
	 * make serialportify listen on server
	 */
	serialportify.listen(server);
};