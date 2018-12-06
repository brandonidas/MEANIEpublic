'use strict';

module.exports = {
	app: {
		title: 'choiciture',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-image-crop/image-crop-styles.css',
				'public/lib/angular-chart.js/dist/angular-chart.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-file-upload/angular-file-upload.js',
				'public/lib/ng-flow/dist/ng-flow-standalone.js',
				'public/modules/angular-uuid-master/dist/angular-uuid2.min.js',
				'public/lib/ngImgCrop/compile/unminified/ng-img-crop.js',
				'public/lib/ng-load/ng-load.js',
				'public/lib/angular-cropme/cropme.js',
				'public/lib/angular-superswipe/superswipe.js',
				'public/lib/angular-image-crop/image-crop.js',
				'public/lib/angular-timeago/src/timeAgo.js',
				'public/lib/angulartics/dist/angulartics.min.js',
				'public/lib/angulartics/dist/angulartics-ga.min.js',
				// 'public/lib/angular-chart.js/dist/angular-chart.js',
				// 'public/lib/Chart.js/Chart.js',
				'public/lib/angular-charts/dist/angular-charts.js',
				'public/lib/d3/d3.min.js',
				'public/modules/core/GA.js',
				//'public/lib/angular-moment/angular-moment.js'
					]
		},
		css: [
			'public/modules/**/css/*.css',

		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
