(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller('HomeController', HomeControllerFunction);

  function HomeControllerFunction(authService) {

    var vu = this;

    vu.authService = authService;

    authService.getProfileDeferred().then(function (profile) {
    	vu.user = profile;
    	console.log(vu.user)
    });
  }
})();