'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Followers', ['$resource',
    function($resource) {
      console.log('Followers Service is being accessed');
      return $resource('user/follower', {}
      );
    }
  ]);
