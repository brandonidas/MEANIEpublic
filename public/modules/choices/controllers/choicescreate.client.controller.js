'use strict';

// Choices controller
angular.module('choices').controller('ChoicesCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Choices','uuid2','$rootScope','flowFactory',
	function($scope, $stateParams, $location, Authentication, Choices,uuid2,$rootScope,flowFactory) {
		$scope.uuidTest = uuid2.newuuid();
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.usePlaceHoldOptions = true;
		$scope.uploadStatus = 'Upload Unfinished';
		$scope.finishUpload = function(){
			$scope.uploadStatus = 'Upload Finished';
		};
		$scope.uploadCounter = 0;

		$scope.option1 = uuid2.newuuid();
		$scope.option2 = uuid2.newuuid();
		$scope.option3 = uuid2.newuuid();
		$scope.option4 = uuid2.newuuid();

		$scope.options = [$scope.option1,$scope.option2,$scope.option3,$scope.option4];

		$scope.create = function() {
			// Create new Choice object
			var choice = new Choices ({
				choiceQuestion: this.choiceQuestion,
				option1: $scope.option1,
				option2: $scope.option2,
				option3: $scope.option3,
				option4: $scope.option4,
				created: this.created,
				user: 	 $scope.user,
				username: $scope.user.username,
			});

			// Redirect after save
			choice.$save(function(response) {
				// Clear form fields
				// $scope.choiceQuestion = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.flowObject = flowFactory.create({
			// target: '/optionuploads',
			testChunks:false,
			headers:{'Here' : '$scope.options[$scope.uploadCounter]'} //I'm going to try and change this again
		});

		$scope.flowObject.on('filesSubmitted', function (event, $flow) {
			console.log($flow);
			console.log('files submitted!');
			$scope.usePlaceHoldOptions = false;
			$scope.flowObject.opts.target = '/optionuploads/' + $scope.options[$scope.uploadCounter];
			console.log('Here: ' +	$scope.flowObject.opts.target);
		});

		$scope.flowObject.on('fileSuccess', function (event, $flow) {
			$scope.uploadCounter ++; //does this even increment? YES but it's going but to 5 when it should only go up to 3

			//For ensuring counter doesn't go over array length given that the last fileSuccess event doesn't trigger another upload
			if($scope.uploadCounter < ($scope.flowObject.files.length)){
				console.log('Upload Counter: '+ $scope.uploadCounter);
				$scope.flowObject.opts.target = '/optionuploads/' + $scope.options[$scope.uploadCounter];
				console.log('Here: ' +	$scope.flowObject.opts.target);
			}
		});

		$scope.flowControlledBtn = function(){
			$scope.flowObject.upload();
		};

		$scope.flowObject.on('complete', function () {
			$location.path('/feed');
		});

	}])
.config(['flowFactoryProvider', function (flowFactoryProvider, $rootScope) {
	flowFactoryProvider.defaults = {
		permanentErrors: [404, 500, 501],
		maxChunkRetries: 1,
		chunkRetryInterval: 5000,
		simultaneousUploads: 1,
		testChunks:false
	};
	flowFactoryProvider.on('catchAll', function (event) {
		console.log('catchAll', arguments);
	});
	// Can be used with different implementations of Flow.js
	// flowFactoryProvider.factory = fustyFlowFactory;
}]);
