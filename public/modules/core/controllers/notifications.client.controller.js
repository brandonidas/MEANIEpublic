'use strict';

angular.module('core').controller('NotificationsController', ['$scope', 'Authentication','Notify','$interval','UnseenNotifs',
	function($scope, Authentication, Notify, $interval, UnseenNotifs) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.user = Authentication.user;
		$scope.unseenNotifs = false;

		$scope.userThumbURL = 'modules/users/img/profile/';
		$scope.userThumbFormat = '.png';

		$scope.optionThumbURL = 'modules/choices/img/options/';
		$scope.optionThumbFormat = '.png';

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.subControllerAccess = 'Success';

		var getNotifs = function(){
			return Notify.query();
			//This is here because it seems as if you can only query once for some reason
		};

		$scope.list = function(){
			$scope.notifications = getNotifs();
			console.log('List');
			console.log($scope.notifications);
		};


		//function for comparing notification arrays to see if there are new notifications
		$scope.notifCheck = function(){
			$scope.newNotifs = UnseenNotifs.query(); //queries are for arrays
			// var newNotifs = newNotifsRaw.map(function(value, index) {
			// 	return [value];
			// });
			// console.log('Unseen Notifs');
			// console.log($scope.newNotifs);
			// console.log($scope.newNotifs.length);
			if($scope.newNotifs.length > 0){
				$scope.unseenNotifs = true;
			} else{
				$scope.unseenNotifs = false;
			}
		};

		$scope.seenNotifs = function(){
			UnseenNotifs.save();
		};

		//$interval for requerying for notifications
		//set to every 10 seconds, 3 for testing
		$interval($scope.notifCheck, 3000);
		// $interval($scope.list, 10000);

	}
]);
