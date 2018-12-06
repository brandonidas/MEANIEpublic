'use strict';

// Choices controller

angular.module('choices').controller('ChoicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Choices','OptionLike' ,'$modal','$log', 'ChoiceFeed','nowTime',
	function($scope, $stateParams, $location, Authentication, Choices, OptionLike, $modal, $log, ChoiceFeed, nowTime) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		$scope.nowTime = nowTime;

		$scope.optionsPath = 'modules/choices/img/options/';
		$scope.optionsFormat = '.png';

		console.log($scope.user);

		$scope.optionLikeBase = function(optionId, optionNum, choice){
			var alreadyLiked = false;
			var optionNameLikes = 'option' + optionNum + 'Likes';
			var optionName = 'option' + optionNum;
			var choice_id = choice._id;
			var optionLike = new OptionLike ({
				'username'				: $scope.user.username,
				'option_id' 			: optionId,
				'optionName' 			: optionName,
				'optionNameLikes' : optionNameLikes,
				choice : choice,
				liker : [$scope.user]
			});
			// optionLike[$scope.user._id] = $scope.user._id;

			//check if the user has already liked the option
			for(var i = 0; i < choice[optionNameLikes].length; i++){
				if( choice[optionNameLikes][i] == $scope.user._id){
					console.log('already liked!');
					alreadyLiked =true;
				}
			};
			//if conditional for the above
			if(alreadyLiked==false){
				optionLike.$save();
				console.log('You just tried to like ' + optionNameLikes +' id '+ optionId);
				for(var ii = 0; ii < $scope.choicesFeed.length; ii++){
					if($scope.choicesFeed[ii]._id == choice_id){
						$scope.choicesFeed[ii][optionNameLikes].push($scope.user._id);
						$scope.choicesFeed[ii][optionNameLikes].userLiked = true;
					}
				};
			} else {
				//create function for unlike
			};
		};

		$scope.option1Like= function(optionid, choice){
			$scope.optionLikeBase(optionid,1, choice);
		};

		$scope.option2Like= function(optionid, choice){
			$scope.optionLikeBase(optionid,2, choice);
		};

		$scope.option3Like= function(optionid, choice){
			$scope.optionLikeBase(optionid,3, choice);
		};

		$scope.option4Like= function(optionid, choice){
			$scope.optionLikeBase(optionid,4, choice);
		};

		// Remove existing Choice
		$scope.remove = function(choice) {
			if ( choice ) {
				choice.$remove();

				for (var i in $scope.choices) {
					if ($scope.choices [i] === choice) {
						$scope.choices.splice(i, 1);
					}
				}
			} else {
				$scope.choice.$remove(function() {
					$location.path('feed');
				});
			}
		};

		// Find a list of Choices
		$scope.find = function() {
			$scope.choices = Choices.query();
		};

		// Feed of choices
		$scope.feed = function(){
			$scope.choicesFeed = ChoiceFeed.query();
		};


		$scope.option3Loaded = function(index){
			if(index == undefined){
				$scope.choice.option3loaded = true;
			}else{
				$scope.choicesFeed[index].option3loaded = true;
			};
		};

		$scope.option4Loaded = function(index){
			if(index == undefined){
				$scope.choice.option4loaded = true;
			}else{
				$scope.choicesFeed[index].option4loaded = true;
			};
		};

		// Find existing Choice
		$scope.findOne = function() {
			$scope.choice = Choices.get({
				choiceId: $stateParams.choiceId
			});
		};
	}
]);
