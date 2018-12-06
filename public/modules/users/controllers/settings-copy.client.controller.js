'use strict';

angular.module('users').controller('OLDSettingsController', ['$timeout','$upload','$scope', '$http', '$location', 'Users', 'Authentication',
	function($timeout, $upload, $scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;
			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
/*
$scope.onFileSelect = function($files) {
    console.log($files);
    for (var i = 0; i < $files.length; i++) {

			var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/users/uploadprofilepic',
        method: 'POST',
        headers: {
					'enctype': 'multipart/form-data',
					'Content-Type': 'multipart/form-data',
					},
        data: {myObj: $scope.myModelObj},
        file: file,
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
    }
  };
*/
// Preconfigured image conversion parameters
$scope.config = {
		width: 600,
		height: 600,
		quality: 1
	};

function resize_images(maxht, maxwt, minht, minwt) {
  var imgs = document.getElementsByTagName('img');

  var resize_image = function(img, newht, newwt) {
    img.height = newht;
    img.width  = newwt;
  };

  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.height > maxht || img.width > maxwt) {
      // Use Ratios to constraint proportions.
      var old_ratio = img.height / img.width;
      var min_ratio = minht / minwt;
      // If it can scale perfectly.
      if (old_ratio === min_ratio) {
        resize_image(img, minht, minwt);
      }
      else {
        var newdim = [img.height, img.width];
        newdim[0] = minht;  // Sort out the height first
        // ratio = ht / wt => wt = ht / ratio.
        newdim[1] = newdim[0] / old_ratio;
        // Do we still have to sort out the width?
        if (newdim[1] > maxwt) {
          newdim[1] = minwt;
          newdim[0] = newdim[1] * old_ratio;
        }
        resize_image(img, newdim[0], newdim[1]);
      }
    }
  }
}

//Puts files into files variable
$scope.onFileSelect = function($files) {
	$scope.files = [];
	$scope.files = $files;
};
//uploads files on click
$scope.onUploadButton = function(){
	var progress = function(evt) {
		console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	};
	var success = function(data, status, headers, config) {
		// file is uploaded successfully
		console.log(data);
		console.log('File Upload Successful');
		$location.path('settings/displayprofile');
	};
	var picFile = $scope.files;
	console.log(picFile);
	for (var i = 0; i < picFile.length; i++) {
		var file = picFile;
		$scope.upload = $upload.upload({
			url: '/users/uploadprofilepic',
			method: 'POST',
			headers: {
				'enctype': 'multipart/form-data',
				'Content-Type': 'multipart/form-data',
				},
			data: {myObj: $scope.myModelObj},
			file: file,
		})
		.progress(progress)
		.success(success);
	}
};

}]).config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|blob|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|blob|chrome-extension):/);
}]).directive('image', function($q) {

		var URL = window.URL || window.webkitURL;

		var getResizeArea = function () {
				var resizeAreaId = 'fileupload-resize-area'; // CANVAS ID

				var resizeArea = document.getElementById(resizeAreaId);

				if (!resizeArea) {
						resizeArea = document.createElement('canvas');
						resizeArea.id = resizeAreaId;
						resizeArea.style.visibility = 'hidden';
						document.body.appendChild(resizeArea);
				}

				return resizeArea;
		};

		var resizeImage = function (origImage, options) {
				var maxHeight = options.resizeMaxHeight || 300;
				var maxWidth = options.resizeMaxWidth || 250;
				var quality = options.resizeQuality || 0.7;
				var type = options.resizeType || 'image/jpg';

				var canvas = getResizeArea();

				var height = origImage.height;
				var width = origImage.width;

				// calculate the width and height, constraining the proportions
				if (width > height) {
						if (width > maxWidth) {
								height = Math.round(height *= maxWidth / width);
								width = maxWidth;
						}
				} else {
						if (height > maxHeight) {
								width = Math.round(width *= maxHeight / height);
								height = maxHeight;
						}
				}

				canvas.width = width;
				canvas.height = height;

				//draw image on canvas
				var ctx = canvas.getContext('2d');
				ctx.drawImage(origImage, 0, 0, width, height);

				return canvas.toDataURL(type, quality);
		};

		var createImage = function(url, callback) {
				var image = new Image();
				image.onload = function() {
						callback(image);
				};
				image.src = url;
		};

		var fileToDataURL = function (file) {
				var deferred = $q.defer();
				var reader = new FileReader();
				reader.onload = function (e) {
						deferred.resolve(e.target.result);
				};
				reader.readAsDataURL(file);
				return deferred.promise;
		};


		return {
				restrict: 'A',
				scope: {
						image: '=',
						resizeMaxHeight: '@?',
						resizeMaxWidth: '@?',
						resizeQuality: '@?',
						resizeType: '@?',
				},
				link: function postLink(scope, element, attrs, ctrl) {

						var doResizing = function(imageResult, callback) {
								createImage(imageResult.url, function(image) {
										var dataURL = resizeImage(image, scope);
										imageResult.resized = {
												dataURL: dataURL,
												type: dataURL.match(/:(.+\/.+);/)[1],
										};
										callback(imageResult);
								});
						};

						var applyScope = function(imageResult) {
								scope.$apply(function() {
										//console.log(imageResult);
										if(attrs.multiple)
												scope.image.push(imageResult);
										else
												scope.image = imageResult;
								});
						};


						element.bind('change', function (evt) {
								//when multiple always return an array of images
								if(attrs.multiple)
										scope.image = [];
								var dataURLFunc = function (dataURL) {
									imageResult.dataURL = dataURL;
								};
								var imageResultFunc = function(imageResult) {
									applyScope(imageResult);
								};
								var files = evt.target.files;
								for(var i = 0; i < files.length; i++) {
										//create a result object for each file in files
										var imageResult = {
												file: files[i],
												url: URL.createObjectURL(files[i])
										};

										fileToDataURL(files[i]).then(dataURLFunc);

										if(scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
												doResizing(imageResult, imageResultFunc);
										}
										else { //no resizing
												applyScope(imageResult);
										}
								}
						});
				}
		};
});
