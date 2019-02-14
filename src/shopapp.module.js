(function () {
'use strict'
angular.module('ShopApp', ['ui.router', 'data', 'ui.bootstrap', 'ngFileUpload', 'ui.tinymce','ngSanitize'])
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
