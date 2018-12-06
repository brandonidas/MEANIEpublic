'use strict';

//Choices service used to communicate Choices REST endpoints
angular.module('choices')
	.factory('ChoiceFeed', ['$resource',
		function($resource) {
			return $resource('feed');
		}
	])

	.factory('UserFeed', ['$resource',
	function($resource) {
		return $resource('userfeed/:username');
	}
	]);
