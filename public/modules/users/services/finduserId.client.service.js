'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('FindUserByID', ['$resource',
	function($resource) {
		//is there a way for this service to console log the username?
		return $resource('/userbyid/:id'); // Note the full endpoint address
	}
]);
