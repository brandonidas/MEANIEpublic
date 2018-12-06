'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('SearchForUser', ['$resource',
	function($resource) {
		console.log('SearchForUser service accessed');
		return $resource('user/search/:searchedUsername'); // Note the full endpoint addres
	}
]);
