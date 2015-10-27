'use strict';

angular.module('myApp.appdiagram.appdraggable-directive', [
  'myApp.appdiagram.appelementpointtransformer-service'
])

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
          var svg = element[0].ownerSVGElement;
          var absoluteMaxX = svg.width.baseVal.value;
          var absoluteMaxY = svg.height.baseVal.value;

          var maxWidth = resizingLeft ? startX + startWidth : absoluteMaxX - startX;
          var maxHeight = resizingTop ? startY + startHeight : absoluteMaxY - startY;
          if (resizingLeft || resizingRight) {
            object.width = Math.max(minWidth, Math.min(maxWidth, startWidth + (resizingLeft ? -1 : 1 ) * dx));
          }
          if (resizingTop || resizingBottom) {
            object.height = Math.max(minWidth, Math.min(maxHeight, startHeight + (resizingTop ? -1 : 1 ) * dy));
          }

          var maxX = resizingLeft ? startX + startWidth - minWidth : absoluteMaxX - startWidth;
          var maxY = resizingTop ? startY + startHeight - minHeight : absoluteMaxY - startHeight;
          var justMoving = !(resizingLeft || resizingRight || resizingTop || resizingBottom);
          if (resizingLeft || justMoving) {
            object.x = Math.max(0, Math.min(maxX, startX + dx));
          }
          if (resizingTop || justMoving) {
            object.y = Math.max(0, Math.min(maxY, startY + dy));
          }
        });
      };
      var onend = function(e) {
      };
      Snap(element[0]).drag(onmove, onstart, onend);
    }
  };
}]);
