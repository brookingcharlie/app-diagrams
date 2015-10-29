'use strict';

angular.module('app.appdiagram.appelementpointtransformer-service', [
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
});
