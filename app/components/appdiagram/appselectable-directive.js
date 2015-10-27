'use strict';

angular.module('myApp.appdiagram.appselectable-directive', [
  'myApp.appdiagram.appdiagram-directive',
])

.directive('appSelectable', [function() {
  return {
    restrict: 'A',
    require: '^appDiagram',
    link: function(scope, element, attrs, appDiagram) {
      element.mousedown(function(e) {
        scope.$apply(function() {
          appDiagram.selectedNode = scope.$eval(attrs.appSelectable);
        });
      });
    }
  };
}]);
