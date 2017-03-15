(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller('HomeController', HomeControllerFunction);

  function HomeControllerFunction(authService) {

    var vm = this;

    vm.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
    	vm.profile = profile;
    	console.log(vm.profile)
    });
  }
})();