'use strict';

angular.module('myApp.appdiagram.appdiagram-directive', [
  'colorpicker.module'
])

.directive('appDiagram', [function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'components/appdiagram/appdiagram-directive.html',
    link: function(scope, element, attrs) {
      scope.pools = [
        {
          title: 'awesome.app.dev.company.com.au',
          x: 20,
          y: 20,
          width: 140,
          height: 80,
          color: '#5ec2f0'
        },
        {
          title: 'questionable.app.prod-www.company.com.au',
          x: 20,
          y: 140,
          width: 140,
          height: 80,
          color: '#f6beab'
        }
      ];
    }
  };
}])

.directive('appDraggable', [function() {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      Snap(element[0]).drag();
    }
  };
}]);
