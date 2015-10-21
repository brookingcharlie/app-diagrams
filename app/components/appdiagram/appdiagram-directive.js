'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appDiagram', [function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'components/appdiagram/appdiagram-directive.html',
    link: function(scope, element, attrs) {
      scope.poolPadding = 10;
      scope.pools = [
        {
          title: 'awesome.app.dev.company.com.au',
          x: 20,
          y: 20,
          width: 140,
          height: 80
        },
        {
          title: 'questionable.app.prod-www.company.com.au',
          x: 20,
          y: 140,
          width: 140,
          height: 80
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
