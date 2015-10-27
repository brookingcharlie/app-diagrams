'use strict';

angular.module('myApp.appdiagram.appdiagram-directive', [
  'colorpicker.module'
])

.service('appElementPointTransformer', function() {
  return {
    // Transform (x, y) screen coordinates to be relative to SVG element.
    // For explanation, see <http://stackoverflow.com/a/5223921>.
    transform: function(x, y, element) {
      var svg = element[0].ownerSVGElement;
      var screenPoint = svg.createSVGPoint();
      screenPoint.x = x;
      screenPoint.y = y;
      var svgPoint = screenPoint.matrixTransform(svg.getScreenCTM().inverse());
      var svgToElement = svg.getTransformToElement(element[0]);
      return svgPoint.matrixTransform(svgToElement);
    }
  };
})

.directive('appDiagram', [function() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'components/appdiagram/appdiagram-directive.html',
    controllerAs: 'ctrl',
    controller: function () {
      var that = this;
      that.nodes = [
        {
          title: 'really-long-name.of.awesome.application',
          x: 20,
          y: 20,
          width: 140,
          height: 80,
          color: '#5ec2f0'
        },
        {
          title: 'another component of the same application',
          x: 20,
          y: 140,
          width: 140,
          height: 80,
          color: '#f6beab'
        }
      ];
      that.selectedNode = that.nodes[0];
    }
  };
}])

.directive('appDraggable', ['appElementPointTransformer', function(appElementPointTransformer) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var resizeMargin = 15;
      var minWidth = resizeMargin * 2;
      var minHeight = resizeMargin * 2;

      var object = scope.$eval(attrs.appDraggable);

      var startX, startY, startWidth, startHeight;
      var resizingLeft, resizingRight, resizingTop, resizingBottom;

      var onstart = function(x, y, e) {
        startX = object.x;
        startY = object.y;
        startWidth = object.width;
        startHeight = object.height;

        var elementPoint = appElementPointTransformer.transform(x, y, element);
        resizingLeft = elementPoint.x <= (object.x + resizeMargin);
        resizingRight = elementPoint.x >= (object.x + object.width - resizeMargin);
        resizingTop = elementPoint.y <= (object.y + resizeMargin);
        resizingBottom = elementPoint.y >= (object.y + object.height - resizeMargin);
      };
      var onmove = function(dx, dy, x, y, e) {
        scope.$apply(function() {
          var inputWidth = startWidth + (resizingLeft ? -1 : 1 ) * dx;
          var inputHeight = startHeight + (resizingTop ? -1 : 1 ) * dy;
          var inputX = startX + dx;
          var inputY = startY + dy;

          var maxX = resizingLeft ? startX + startWidth - minWidth : Number.MAX_VALUE;
          var maxY = resizingTop ? startY + startHeight - minHeight : Number.MAX_VALUE;
          var justMoving = !(resizingLeft || resizingRight || resizingTop || resizingBottom);

          if (resizingLeft || resizingRight) {
            object.width = Math.max(minWidth, inputWidth);
          }
          if (resizingTop || resizingBottom) {
            object.height = Math.max(minWidth, inputHeight);
          }
          if (resizingLeft || justMoving) {
            object.x = Math.min(maxX, inputX);
          }
          if (resizingTop || justMoving) {
            object.y = Math.min(maxY, inputY);
          }
        });
      };
      var onend = function(e) {
      };
      Snap(element[0]).drag(onmove, onstart, onend);
    }
  };
}])

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
