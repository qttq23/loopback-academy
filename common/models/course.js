'use strict';

const utils = require('../../server/routes/utils.js')
const models = require('../../server/server.js').models


module.exports = function(Course) {

	// https://loopback.io/doc/en/lb3/Validating-model-data.html
	//https://loopback.io/doc/en/lb3/MongoDB-connector.html#handling-objectid
	Course.validatesLengthOf('name', { min: 5, max: 20 });


	// additional methods
	Course.register = async function(id, reqBody, callback) {

		console.log('course.js: register, id: ' + id)
		console.log(reqBody)

		let data = { 'courseId': id, 'accountId': reqBody.accountId }
		await models.accountCourse.create(data);
		return "register ok"
	}

	// declare
	Course.remoteMethod(
		'register', {
			http: { path: '/:id/register', verb: 'post' },
			accepts: [
			{ arg: 'id', type: 'string', required: true, http: { source: 'path' } },
			{ arg: 'reqBody', type: 'object', http: { source: 'body' }}
			],
			returns: { arg: 'result', type: 'string' }
		}
		);


	// middleware
	Course.beforeRemote('register', async function(context, affectedInstance, next) {

		// check access token
		try {
			const token = context.req.get('x-access-token')
			const decoded = await utils.verifyJWT(token, "abcdef")
			return context.req.body.accountId = decoded.userId;

		} catch (err) {
			console.log(err)
			return context.res.status(401).json({ error: err.message })
		}

	});

};
