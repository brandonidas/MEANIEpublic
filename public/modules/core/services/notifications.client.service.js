'use strict';

//Choices service used to communicate Choices REST endpoints
angular.module('core')

.factory('Notify', ['$resource',
	function($resource) {
		return $resource('notifications');
	}
])

.factory('UnseenNotifs', ['$resource',
function($resource) {
	return $resource('notifications/unseen');
}
]);
