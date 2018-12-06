'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('FindUser', ['$resource',
	function($resource) {
		//is there a way for this service to console log the username?
		console.log('FindUser Service is being accessed');
		return $resource('user/:username'); // Note the full endpoint address
	}
]);
