'use strict';

var resizeMargin = 15;

// Transform (x, y) screen coordinates to be relative to SVG element.
// For explanation, see <http://stackoverflow.com/a/5223921>.
function getElementPoint(x, y, element) {
  var svg = element[0].ownerSVGElement;
  var screenPoint = svg.createSVGPoint();
  screenPoint.x = x;
  screenPoint.y = y;
  var svgPoint = screenPoint.matrixTransform(svg.getScreenCTM().inverse());
  var svgToElement = svg.getTransformToElement(element[0]);
  return svgPoint.matrixTransform(svgToElement);
}

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
      var object = scope.$eval(attrs.appDraggable);

      var startX;
      var startY;
      var startWidth;
      var startHeight;

      var resizingLeft;
      var resizingRight;
      var resizingTop;
      var resizingBottom;

      var onstart = function(x, y, e) {
        startX = object.x;
	startY = object.y;
        startWidth = object.width;
        startHeight = object.height;

        var elementPoint = getElementPoint(x, y, element);
        resizingLeft = elementPoint.x <= (object.x + resizeMargin);
        resizingRight = elementPoint.x >= (object.x + object.width - resizeMargin);
        resizingTop = elementPoint.y <= (object.y + resizeMargin);
        resizingBottom = elementPoint.y >= (object.y + object.height - resizeMargin);
      };
      var onmove = function(dx, dy, x, y, e) {
        scope.$apply(function() {
          if (resizingLeft || resizingRight) {
            object.width = startWidth + (resizingLeft ? -1 : 1 ) * dx;
          }
          if (resizingTop || resizingBottom) {
            object.height = startHeight + (resizingTop ? -1 : 1 ) * dy;
          }
          if (resizingLeft || !(resizingRight || resizingTop || resizingBottom)) {
            object.x = startX + dx;
          }
          if (resizingTop || !(resizingLeft || resizingRight || resizingBottom)) {
	    object.y = startY + dy;
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
          appDiagram.selectedPool = scope.$eval(attrs.appSelectable);
        });
      });
    }
  };
}]);
