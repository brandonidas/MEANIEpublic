'use strict';

angular.module('choices').factory('Optionuploads', ['$resource',
function($resource) {
	return $resource('user/:username'); // Note the full endpoint address
}
]);
