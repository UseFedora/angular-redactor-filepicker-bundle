'use strict';
angular.module('app', ['ngRoute', 'angular-redactor-filepicker'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/", { templateUrl: "views/main.html", controller: "RedactorDemo"})
      .otherwise({ redirectTo: "/" });
  }]);

angular.module('app')
  .controller('RedactorDemo', ['$scope',
    function ($scope) {

      $scope.redactorOptions = {

      };

      $scope.changeContent = function () {
        $scope.content = "<h1>Some bogus content</h1>"
      }
      $scope.content = `
      <h1>I'm better than your brother.</h1>

      <pre>I'm a version of your brother you can trust when he says "Don't run";</pre>

      <ol>
      	<li>Nobody</li>
      	<li>Exists</li>
      	<li>On</li>
        <li>Purpose</li>
      </ol>

      <ul>
      	<li>Nobody</li>
      	<li>Belongs</li>
      	<li>Anywhere</li>
      </ul>

      <p>
        <span style="color: rgb(192, 80, 77);"><strong><em><u>Everybody's gonna die</u></em></strong></span>
      </p>

      <blockquote>
        <a href="http://google.com">Come watch TV.</a>
      </blockquote>
      `;
    }]);
