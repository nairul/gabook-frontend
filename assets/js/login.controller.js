(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller('LoginController', LoginControllerFunction);

  function LoginControllerFunction(authService) {

    var vm = this;

    vm.authService = authService;

  }
})();