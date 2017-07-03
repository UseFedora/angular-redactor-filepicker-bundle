/**
 * @file The Teachable text editor, which is an implementation of Redactor.
 * @see  https://imperavi.com/redactor/
 * @example
 * <textarea ng-model="content" redactor></textarea>
 *
 * additional options:
 * - redactor: object (pass in a redactor configuration object)
 */

import './redactor';
import './redactor-fullscreen';
import './redactor-remove-formatting';
import './redactor-filepicker';
import './redactor-fontfamily';
import './redactor-fontcolor';

const redactorOptions = {};
const plugins = [
  'fontcolor', 'fontfamily', 'filepicker', 'removeFormatting', 'fullscreen'
];
const deniedTags = [ 'html', 'head', 'body', 'meta', 'applet' ];
const buttons = [
  'formatting', 'bold', 'italic', 'underline', 'orderedlist',
  'unorderedlist', 'outdent', 'indent', 'image', 'file', 'link',
  'alignment', 'horizontalrule', 'html',
];

const redactorWrapper = ($timeout) => ({
  restrict: 'A',
  require: 'ngModel',
  link: (scope, element, attrs, ngModel) => {
    // Expose scope var with loaded state of Redactor
    scope.redactorLoaded = false;

    const updateModel = () => {
      scope.$apply(ngModel.$setViewValue($_element.redactor('code.get')));
    };

    const options = {
      keyupCallback: updateModel,
      keydownCallback: updateModel,
      execCommandCallback: updateModel,
      autosaveCallback: updateModel,
      focusCallback: updateModel,
      blurCallback: updateModel,
      plugins,
      buttons,
      deniedTags,
      replaceDivs: false
    };
    const additionalOptions = attrs.redactor ? scope.$eval(attrs.redactor) : {};
    const $_element = angular.element(element);
    let editor;

    angular.extend(options, redactorOptions, additionalOptions);

    // prevent collision with the constant values on ChangeCallback
    var changeCallback = additionalOptions.changeCallback || redactorOptions.changeCallback;
    if (changeCallback) {
      options.changeCallback = function(value) {
        updateModel.call(this, value);
        changeCallback.call(this, value);
      }
    }

    // put in timeout to avoid $digest collision.  call render() to
    // set the initial value.
    $timeout(function() {
      editor = $_element.redactor(options);
      ngModel.$render();
    });

    ngModel.$render = function() {
      if (angular.isDefined(editor)) {
        $timeout(function() {
          $_element.redactor('code.set', ngModel.$viewValue || '');
          $_element.redactor('placeholder.toggle');
          scope.redactorLoaded = true;
        });
      }
    };
  }
});

angular.module('angular-redactor-filepicker', [])
  .constant('redactorOptions', redactorOptions)
  .directive('redactor', [ '$timeout', redactorWrapper ]);
