'use strict';

module.exports = function(Account) {

	// limit api
	Account.disableRemoteMethodByName('create');
	Account.disableRemoteMethodByName('prototype.patchAttributes');
	Account.disableRemoteMethodByName('deleteById');

	// validation
	Account.validatesUniquenessOf('email', { message: 'email is not unique' });
};
