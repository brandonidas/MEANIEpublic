'use strict';

angular.module('users').controller('SearchUserController', ['$location','$stateParams','$scope','Users','Authentication', 'SearchForUser',
function($location, $stateParams, $scope, Users, Authentication, SearchForUser) {
  $scope.user = Authentication.user;
  // If user is not signed in then redirect back home
  if (!$scope.user) $location.path('/');

  $scope.searchForUser = function(SearchUser) {
  // $stateParams.username;
  $scope.searchResults = SearchForUser.query({
    searchedUsername : this.searchTerm
  });
};

}]);
