'use strict';

//Choices service used to communicate Choices REST endpoints
angular.module('choices').factory('OptionLike', ['$resource',
	function($resource) {
		return $resource('/optionlike');
	}
]);
