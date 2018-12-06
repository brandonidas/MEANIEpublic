	'use strict';

	angular.module('users').controller('ProfilePicUploadController', ['$scope','$window','$http','$upload','$location', 'Authentication',
		function($scope,$window,$http,$upload,$location, Authentication) {
			//This is some other stuff
			$scope.user = Authentication.user;
			if (!$scope.user) $location.path('/');
			$scope.cropDone = false;


			$scope.imageCropResult = null;
			$scope.showImageCropper = false;

			$scope.$watch('imageCropResult', function(newVal) {
				if (newVal) {
					console.log('imageCropResult', newVal);
					$scope.file = newVal;
					$scope.cropDone = true;
				}
			});

			$scope.uploadProfilePic = function() {
				var file = $scope.imageResize($scope.file);
				var data = {
					'enctype': 'multipart/form-data',
					'Content-Type': 'multipart/form-data',
					'profilePicFile': file
				};
				console.log(data);

				$http.post( '/users/uploadprofilepic', data
				).
				success( function(response) {
					console.log("success");
					$location.path('/feed');
				}).
				error( function(response) {
					console.log("error");
				});
			};

			//image resizing
			$scope.imageResize = function(file){
				var img = new Image();

				// img.onload = resizeImage;
				img.src = file; //originalDataUriHere;

				function imageToDataUri(img, width, height) {
					// create an off-screen canvas
					var canvas = document.createElement('canvas'),
					ctx = canvas.getContext('2d');

					// set its dimension to target size
					canvas.width = width;
					canvas.height = height;

					// draw source image into the off-screen canvas:
					ctx.drawImage(img, 0, 0, width, height);

					// encode image to data-uri with base64 version of compressed image
					return canvas.toDataURL();
				}

				// console.log(imageToDataUri(img,150,150));

				function base64ToDataUri(base64) {
					return 'data:image/png;base64,' + base64;
				}

				return imageToDataUri(img,150,150);
			};

	}]);
