'use strict';

angular.module('myApp.appdiagram.appdiagram-directive', [
  'colorpicker.module'
])

.directive('appDiagram', [function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'components/appdiagram/appdiagram-directive.html',
    controllerAs: 'ctrl',
    controller: function () {
      var that = this;
      that.pools = [
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
      that.selectedPool = that.pools[0];
    }
  };
}])

.directive('appDraggable', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      Snap(element[0]).drag();
    }
  };
}])

.directive('appSelectable', [function() {
  return {
    restrict: 'A',
    require: '^appDiagram',
    link: function(scope, element, attrs, appDiagram) {
      element.click(function(e) {
        scope.$apply(function() {
          appDiagram.selectedPool = scope.$eval(attrs.appSelectable);
        });
      });
    }
  };
}]);
