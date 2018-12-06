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
