(function() {

"use strict";

angular
  .module("gaBook", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    RouterFunction
  ])
  .controller("ProfileIndexController", [
  	"ProfileFactory",
  	ProfileIndexControllerFunction
  ])
  .controller("ProfileShowController", [
  	"ProfileFactory",
  	"$stateParams",
  	ProfileShowControllerFunction
  ])
  .controller("ProfileNewController", [
  	"ProfileFactory",
  	ProfileNewControllerFunction
  ])
  .controller("ProfileEditController", [
  	"ProfileFactory",
  	"$stateParams",
  	ProfileEditControllerFunction
  ])
  .controller("ProfileRedirectController", [

  ])

  function RouterFunction($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $stateProvider
  .state("profileIndex", {
    url: "/",
    templateUrl: "assets/js/ng-views/profiles/index.html",
    controller: "ProfileIndexController",
    controllerAs: "vm"
  })
  $stateProvider
  .state("profileNew", {
    url: "/profiles/new",
    templateUrl: "assets/js/ng-views/profiles/new.html",
    controller: "ProfileNewController",
    controllerAs: "vm"
  })
  $stateProvider
  .state("profileShow", {
    url: "/profiles/:id",
    templateUrl: "assets/js/ng-views/profiles/show.html",
    controller: "ProfileShowController",
    controllerAs: "vm"
  })
  $stateProvider
  .state("profileEdit", {
  	url: "/profiles/:id/edit",
  	templateUrl: "assets/js/ng-views/profiles/edit.html",
  	controller: "ProfileEditController",
  	controllerAs: "vm"
  })
}

function ProfileIndexControllerFunction( ProfileFactory ){
  this.profiles = ProfileFactory.query()
}
function ProfileNewControllerFunction( ProfileFactory ){
  this.profile = new ProfileFactory()
  this.create = function(){
    this.profile.$save()
  }
}

function ProfileShowControllerFunction( ProfileFactory, $stateParams ){
  this.profile = ProfileFactory.get({id: $stateParams.id});
}

function ProfileEditControllerFunction( ProfileFactory, $stateParams ){
    this.profile = ProfileFactory.get({id: $stateParams.id})
    this.update = function(){
      this.profile.$update({id: $stateParams.id})
    }
    this.destroy = function(){
      this.profile.$delete({id: $stateParams.id})
    }
 }
})();