(function() {

"use strict";

angular
  .module("gaBook", [
    "auth0.lock",
    "angular-jwt",
    "ui.router",
    "ngResource"
  ])
  .config(RouterFunction)

  function RouterFunction($stateProvider, $locationProvider, lockProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("login", {
    url: "/login",
    templateUrl: "assets/js/ng-views/login.html",
    controller: "LoginController",
    controllerAs: "vm"
  })
  .state("home", {
    url: "/home",
    templateUrl: "assets/js/ng-views/home.html",
    controller: "HomeController",
    controllerAs: "vm"
  })
  .state("profileIndex", {
    url: "/",
    templateUrl: "assets/js/ng-views/profiles/index.html",
    controller: "ProfileIndexController",
    controllerAs: "vm"
  })
  .state("profileNew", {
    url: "/profiles/new",
    templateUrl: "assets/js/ng-views/profiles/new.html",
    controller: "ProfileNewController",
    controllerAs: "vm"
  })
  .state("profileShow", {
    url: "/profiles/:id",
    templateUrl: "assets/js/ng-views/profiles/show.html",
    controller: "ProfileShowController",
    controllerAs: "vm"
  })
  .state("profileEdit", {
  	url: "/profiles/:id/edit",
  	templateUrl: "assets/js/ng-views/profiles/edit.html",
  	controller: "ProfileEditController",
  	controllerAs: "vm"
  })

  lockProvider.init({
    clientID: 'Zuev5acHjyPROS9MnavRigamFueQFIRb',
    domain: 'gabook.auth0.com'
  });

  $urlRouterProvider.otherwise('/home');
  }
})();