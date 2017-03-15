(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller('HomeController', HomeControllerFunction);

  function HomeControllerFunction(authService) {

    var vm = this;

    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
    	vm.user = profile;
    	console.log(vm.user)
    });
  }
})();