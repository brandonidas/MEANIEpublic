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
		}).
		state('founder', {
			url: '/brandon',
			templateUrl: 'modules/core/views/blog/intro.founder.html'
		}).
		state('thank-you-s', {
			url: '/thank-you-s',
			templateUrl: 'modules/core/views/blog/intro.thanks.html'
		});
	}
]);
