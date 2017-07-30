'use strict';

/**
 * @memberOf SwrveTest.mHajncTestApp
 * @description The directive displays a popup and surrounds its content.
 * @example
   <modal-dialog show='myCondition' on-close='actionOnClose()'></modal-dialog>
 */
angular.module('mHajncTestApp')
.directive('modalDialog', function(ngModalDefaults, $sce) {
    return {
      template: [
        '<div class="ng-modal" ng-show="show">',
          '<div class="ng-modal__overlay" ng-click="hideModal()"></div>',
          '<div class="ng-modal__dialog" ng-style="dialogStyle">',
            '<div ng-click="hideModal()" class="ng-modal__close navigation-button" title="Close Me!">X</div>',
            '<div class="ng-modal__dialog-content" ng-transclude></div>',
          '</div>',
        '</div>'
      ].join(''),
      scope: {
        show: '=',
        onClose: '&?'
      },
      replace: true,
      transclude: true,
      link: function(scope, element, attrs) {
        var setupCloseButton, setupStyle;
        setupCloseButton = function() {
          return scope.closeButtonHtml = $sce.trustAsHtml(ngModalDefaults.closeButtonHtml);
        };
        setupStyle = function() {
          scope.dialogStyle = {};
          if (attrs.width) scope.dialogStyle['width'] = attrs.width;
          if (attrs.height) return scope.dialogStyle['height'] = attrs.height;
        };
        scope.hideModal = function() {
          return scope.show = false;
        };
        scope.$watch('show', function(newVal, oldVal) {
          if (newVal && !oldVal) document.getElementsByTagName("body")[0].style.overflow = "hidden";
          else document.getElementsByTagName("body")[0].style.overflow = "";
          if ((!newVal && oldVal) && (scope.onClose != null)) return scope.onClose();
        });
        setupCloseButton();
        return setupStyle();
      }
    };
  }
)

.provider("ngModalDefaults", function() {
  return {
    $get: function() { return {} },
    set: function(keyOrHash, value) { }
  };
})
