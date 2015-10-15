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
}]);

function startMove(e) {
  document.documentElement.moveStartClientX = e.clientX;
  document.documentElement.moveStartClientY = e.clientY;
  document.documentElement.moveStartTarget = e.target;
  document.documentElement.moveStartTargetX = e.target.getAttribute('x');
  document.documentElement.moveStartTargetY = e.target.getAttribute('y');
  document.documentElement.setAttribute("onmousemove", "moveIt(event)");
}

function moveIt(e) {
  var group = document.documentElement.moveStartTarget.parentNode;
  for (var i = 0; i < group.childNodes.length; i++) {
    if (!group.childNodes[i].setAttribute) continue;
    group.childNodes[i].setAttribute("x", parseInt(document.documentElement.moveStartTargetX) + e.clientX - document.documentElement.moveStartClientX);
    group.childNodes[i].setAttribute("y", parseInt(document.documentElement.moveStartTargetY) + e.clientY - document.documentElement.moveStartClientY);
  }
}

function endMove(e) {
  document.documentElement.setAttribute("onmousemove", null)
}
