'use strict';

module.exports = function(Account) {
	Account.disableRemoteMethodByName('create');
	Account.disableRemoteMethodByName('prototype.patchAttributes');
	Account.disableRemoteMethodByName('deleteById');
};
