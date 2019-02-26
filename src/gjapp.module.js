(function () {
'use strict'
angular.module('GJApp', ['ui.router', 'data', 'ui.bootstrap', 'ngFileUpload', 'ui.tinymce','ngSanitize', 'ngAnimate'])
.config(config);
config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}
})();
