(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller('HomeController', HomeControllerFunction);

  function HomeControllerFunction(authService) {

    var vm = this;

    vm.authService = authService;

    authService.getProfileDeferred().then(function (user) {
    	vm.user = user;
    	console.log(vm.user)
    });
  }
})();