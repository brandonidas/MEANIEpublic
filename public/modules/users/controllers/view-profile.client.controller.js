'use strict';

angular.module('users').controller('ViewProfileController', ['$location','$stateParams','$scope','Users','Followers','Authentication', 'FindUser','FindUserByID','UserFeed',
	function($location, $stateParams, $scope, Users,Followers,Authentication, FindUser, UserFeed) {
		$scope.user = Authentication.user;

		$scope.userThumbURL = 'modules/users/img/profile/';
		$scope.userThumbFormat = '.png';

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		//Feature not working and not planning on working
		// $scope.userFeed = UserFeed.get({username : $stateParams.username});
		// console.log($scope.userFeed);

		$scope.findOneUser = function() {

			$scope.profileUserName = $stateParams.username;
			$scope.profileUserDetails = FindUser.get({username : $stateParams.username});

			$scope.isFollowing();

		};

		$scope.isFollowing = function(){
			console.log($scope.profileUserDetails);
		};
		//Just as a test, I think the _id of the user should be echoed for the purpose of getting the user's profile pic
		// TODO: remove user password from server response

	$scope.followUser = function(){
		//console.log('You hit the follower button!');
		console.log( $scope.user.username + ' is trying to follow ' + $scope.profileUserName);
		var follow = new Followers ({
			followed : $scope.profileUserDetails
		});

		follow.$save();
		$scope.findOneUser(); //data refresh, eventually replace with static increment
	};

}]);
