"use strict";

angular
  .module("gaBook", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("UserFactory", [
  	"$resource",
  	UserFactoryFunction
  ])
  .controller("UserIndexController", [
  	"UserFactory",
  	UserIndexControllerFunction
  ])
  .controller("UserShowController", [
  	"UserFactory",
  	"$stateParams",
  	UserShowControllerFunction
  ])
  .controller("UserNewController", [
  	"UserFactory",
  	UserNewControllerFunction
  ])
  .controller("UserEditController", [
  	"UserFactory",
  	"$stateParams",
  	UserEditControllerFunction
  ])

  function RouterFunction($stateProvider){
  $stateProvider
  .state("userIndex", {
    url: "/users",
    templateUrl: "js/ng-views/users/index.html",
    controller: "UserIndexController",
    controllerAs: "vm"
  })
  $stateProvider
  .state("userNew", {
    url: "/users/new",
    templateUrl: "js/ng-views/users/new.html",
    controller: "UserNewController",
    controllerAs: "vm"
  })
  $stateProvider
  .state("userShow", {
    url: "/users/:id",
    templateUrl: "js/ng-views/users/show.html",
    controller: "UserShowController",
    controllerAs: "vm"
  })
  $stateProvider
  .state("userEdit", {
  	url: "/users/:id/edit",
  	templateUrl: "js/ng-views/users/edit.html",
  	controller: "UserEditController",
  	controllerAs: "vm"
  })
}

function UserFactoryFunction( $resource ) {
  return $resource( "https://gist.githubusercontent.com/dhouston14/648df5bcffca8c195daba3fa03e37354/raw/06f565f4a76c2abfab9f28d50ecbccc585ac60cf/data.json" )
}

function UserIndexControllerFunction( UserFactory ){
  this.users = UserFactory.query()
}
function UserNewControllerFunction( UserFactory ){
  this.user = new UserFactory()
  this.create = function(){
    this.user.$save()
  }
}

function UserShowControllerFunction( UserFactory, $stateParams ){
  this.user = UserFactory.get({id: $stateParams.id});
  console.log(this.user)
}

function UserEditControllerFunction( UserFactory, $stateParams ){
    this.user = UserFactory.get({id: $stateParams.id});
    this.update = function(){
      this.user.$update({id: $stateParams.id})
    }
    this.destroy = function(){
      this.user.$delete({id: $stateParams.id});
    }
 }