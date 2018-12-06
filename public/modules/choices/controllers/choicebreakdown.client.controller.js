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
