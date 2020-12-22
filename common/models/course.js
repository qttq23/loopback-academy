'use strict';

module.exports = function(Course) {

	// https://loopback.io/doc/en/lb3/Validating-model-data.html
	//https://loopback.io/doc/en/lb3/MongoDB-connector.html#handling-objectid
	Course.validatesLengthOf('name', { min: 5, max: 20 });

};
