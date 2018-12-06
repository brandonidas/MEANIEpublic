'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'choiciture';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils','angularFileUpload','flow', 'angularUUID2', 'ngImgCrop','ngLoad', 'cropme','superswipe','ImageCropper','yaru22.angular-timeago','angulartics', 'angulartics.google.analytics','angularCharts']; //'angularMoment'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('choices');
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60269903-1', 'auto');
  ga('send', 'pageview');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

        'use strict'
        angular.module('angularUUID2', []).factory('uuid2', [
            function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return {

                    newuuid: function() {
                        // http://www.ietf.org/rfc/rfc4122.txt
                        var s = [];
                        var hexDigits = "0123456789abcdef";
                        for (var i = 0; i < 36; i++) {
                            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                        }
                        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                        s[8] = s[13] = s[18] = s[23] = "-";
                        return s.join("");
                    },
                    newguid: function() {
                        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                            s4() + '-' + s4() + s4() + s4();
                    }
                }
            
        }])

'use strict';angular.module('angularUUID2',[]).factory('uuid2',[function(){function e(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return{newuuid:function(){var e=[];var t='0123456789abcdef';for(var n=0;n<36;n++){e[n]=t.substr(Math.floor(Math.random()*16),1)}e[14]='4';e[19]=t.substr(e[19]&3|8,1);e[8]=e[13]=e[18]=e[23]='-';return e.join('')},newguid:function(){return e()+e()+'-'+e()+'-'+e()+'-'+e()+'-'+e()+e()+e()}}}])

'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId',
		{
			articleId: '@_id'
		},
		{
			update:
			{
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Configuring the Articles module
angular.module('choices').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Choices', 'choices', 'dropdown', '/choices(/create)?');
		Menus.addSubMenuItem('topbar', 'choices', 'List Choices', 'choices');
		Menus.addSubMenuItem('topbar', 'choices', 'New Choice', 'choices/create');
	}
]);
'use strict';

//Setting up route
angular.module('choices').config(['$stateProvider',
	function($stateProvider) {
		// Choices state routing
		$stateProvider.
		state('listChoices', {
			url: '/choices',
			templateUrl: 'modules/choices/views/list-choices.client.view.html'
		}).
		//can remove to make modal only
		state('createChoice', {
			url: '/choices/create',
			templateUrl: 'modules/choices/views/create-choice.client.view.html'
		}).
		state('viewChoice', {
			url: '/choices/:choiceId',
			templateUrl: 'modules/choices/views/view-choice.client.view.html'
		}).
		state('editChoice', {
			url: '/choices/:choiceId/edit',
			templateUrl: 'modules/choices/views/edit-choice.client.view.html'
		}).
		state('multipload', {
			url: '/multiuploadtest',
			templateUrl: 'modules/choices/views/multiuploadtest.client.view.html'
		}).
		state('feedChoices', {
			url: '/feed',
			templateUrl: 'modules/choices/views/feed-choices.client.view.html'
		}).
		state('breakDownChoice', {
			url: '/breakdown/:choiceId',
			templateUrl: 'modules/choices/views/breakdown-choice.client.view.html'
		});
	}
]);

'use strict';

// Choices controller

angular.module('choices').controller('BreakDownController', ['$scope', '$stateParams', '$location', 'Authentication','Choices',
	function($scope, $stateParams, $location, Authentication, Choices) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		$scope.optionsPath = 'modules/choices/img/options/';
		$scope.optionsFormat = '.png';
		// $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
	  // $scope.data = [300, 500, 100];

		// Find existing Choice
		$scope.findOne = function() {
			$scope.choice = Choices.get({
				choiceId: $stateParams.choiceId
			});
			console.log($scope.choice);
		};

		$scope.config = {
	title: '', // chart title. If this is false, no title element will be created.
  tooltips: true,
  labels: false, // labels on data points
  // exposed events
  mouseover: function() {},
  mouseout: function() {},
  click: function() {},
  // legend config
  legend: {
    display: true, // can be either 'left' or 'right'.
    position: 'left',
    // you can have html in series name
    htmlEnabled: false
  },
  // override this array if you're not happy with default colors
  // colors: ['#00FF25','#FFA400','#0075FF','#FF00DA'],
  innerRadius: 0, // Only on pie Charts
  lineLegend: 'lineEnd', // Only on line Charts
  lineCurveType: 'cardinal', // change this as per d3 guidelines to avoid smoothline
  isAnimate: true, // run animations while rendering chart
  yAxisTickFormat: 's', //refer tickFormats in d3 to edit this value
  xAxisMaxTicks: 7, // Optional: maximum number of X axis ticks to show if data points exceed this number
  waitForHeightAndWidth: false // if true, it will not throw an error when the height or width are not defined (e.g. while creating a modal form), and it will be keep watching for valid height and width values
};

	}
]);

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

'use strict';

//Choices service used to communicate Choices REST endpoints
angular.module('choices')
	.factory('ChoiceFeed', ['$resource',
		function($resource) {
			return $resource('feed');
		}
	])

	.factory('UserFeed', ['$resource',
	function($resource) {
		return $resource('userfeed');
	}
	]);

'use strict';

//Choices service used to communicate Choices REST endpoints
angular.module('choices').factory('Choices', ['$resource',
	function($resource) {
		return $resource('choices/:choiceId', { choiceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Choices service used to communicate Choices REST endpoints
angular.module('choices').factory('OptionLike', ['$resource',
	function($resource) {
		return $resource('/optionlike');
	}
]);

'use strict';

angular.module('choices').factory('Optionuploads', ['$resource',
function($resource) {
	return $resource('user/:username'); // Note the full endpoint address
}
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('notifs', {
			url: '/notifs',
			templateUrl: 'modules/core/views/notifs.client.view.html'
		}).
		state('blog', {
			url: '/blog',
			templateUrl: 'modules/core/views/blog/intro.blog.html'
		});
	}
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.user = Authentication.user;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);

'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
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

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
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

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';
//Custom Routes
//<a href="/#!/settings/displayprofile">View Profile</a>

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('displayProfile', {
			url: '/settings/displayprofile',
			templateUrl: 'modules/users/views/settings/display-profile.client.view.html'
		}).
		state('uploadprofilepic', {
			url: '/settings/uploadprofilepic',
			templateUrl: 'modules/users/views/settings/upload-profile-pic.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).state('view-profile', {
        url: '/user/:username',
        templateUrl: 'modules/users/views/social/view-profile.client.view.html'
    }).state('search-user', {
			url: '/search',
			templateUrl: 'modules/users/views/social/search-user.client.view.html'
		}).state('user-feed', {
			url: '/user-feed/:username',
			templateUrl: 'modules/users/views/social/user-feed.client.view.html'
		});
	}
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/feed');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/feed');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/feed');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
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
}]).directive('image', ["$q", function($q) {

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
}]);

'use strict';

angular.module('users').controller('SettingsController', ['$timeout','$upload','$scope', '$http', '$location', 'Users', 'Authentication',
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


		$scope.myImage='';
		$scope.myCroppedImage='';

		var handleFileSelect=function(evt) {
			var file=evt.currentTarget.files[0];
			var reader = new FileReader();
			reader.onload = function (evt) {
				$scope.$apply(function($scope){
					$scope.myImage=evt.target.result;
				});
			};
			reader.readAsDataURL(file);
		};
		angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


}]);

'use strict';

angular.module('users').controller('ViewProfileController', ['$location','$stateParams','$scope','Users','Followers','Authentication', 'FindUser','FindUserByID',
	function($location, $stateParams, $scope, Users,Followers,Authentication, FindUser) {
		$scope.user = Authentication.user;

		$scope.userThumbURL = 'modules/users/img/profile/';
		$scope.userThumbFormat = '.png';
		
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// $scope.findfollow = function(followers, followers){
		// 	var followers = [];
		// 	var following = [];
		// 	for(var a = 0; a < $scope.profileUserDetails.followers.length; a++){
		// 		followers[a] = FindUserByID.query({ id: $scope.profileUserDetails.followers[a]});
		// 	}
		// 	for(var b = 0; b < $scope.profileUserDetails.followers.length; b++){
		// 		following[b] = FindUserByID.query({ id: $scope.profileUserDetails.followers[a]});
		// 	}
		// 	console.log(followers);
		// }

		$scope.findOneUser = function() {
			//console.log($stateParams.username);
			/*$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});*/
			$scope.profileUserName = $stateParams.username;
			$scope.profileUserDetails = FindUser.get({username : $stateParams.username});

			$scope.isFollowing();
			// $scope.findfollow();

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

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('FindUser', ['$resource',
	function($resource) {
		//is there a way for this service to console log the username?
		console.log('FindUser Service is being accessed');
		return $resource('user/:username'); // Note the full endpoint address
	}
]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('FindUserByID', ['$resource',
	function($resource) {
		//is there a way for this service to console log the username?
		return $resource('/userbyid/:id'); // Note the full endpoint address
	}
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Followers', ['$resource',
    function($resource) {
      console.log('Followers Service is being accessed');
      return $resource('user/follower', {}
      );
    }
  ]);

'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('SearchForUser', ['$resource',
	function($resource) {
		console.log('SearchForUser service accessed');
		return $resource('user/search/:searchedUsername'); // Note the full endpoint addres
	}
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
		function($resource) {
			return $resource('users', {}, {
				update: {
					method: 'PUT'
				}
			});
		}
	]);
