(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller("ProfileIndexController", [
    "ProfileFactory",
    "authService",
    ProfileIndexControllerFunction
    ])
    .controller("ProfileShowController", [  
    "ProfileFactory",
    "CommentFactory",
    "$stateParams",
    "$state",
    "authService",
    ProfileShowControllerFunction
    ])
    .controller("ProfileNewController", [
    "ProfileFactory",
    "$state",
    "authService",
    ProfileNewControllerFunction
    ])
    .controller("ProfileEditController", [
    "ProfileFactory",
    "$stateParams",
    "$state",
    "authService",
    ProfileEditControllerFunction
    ])
    
function ProfileIndexControllerFunction( ProfileFactory, authService ){
  this.profiles = ProfileFactory.query()
  var vm = this;
  vm.authService = authService;
  authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    // console.log(vm.user)
    });
  }

function ProfileNewControllerFunction( ProfileFactory, $state, authService ){
  this.profile = new ProfileFactory()
  this.create = function(){
    this.profile.$save(function(){
      $state.go('profileIndex')
    })
  }
  this.profiles = ProfileFactory.query()
  var vm = this;
  vm.authService = authService;
  authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    // console.log(vm.user)
    });
}

function ProfileShowControllerFunction( ProfileFactory, CommentFactory, $stateParams, $state, authService ){
  var current_user = false;
  this.profile = ProfileFactory.get({id: $stateParams.id}, (profile) => {
    var vm = this;
    vm.authService = authService;
    authService.getProfileDeferred().then(function (user) {
    vm.user = user;
    console.log(vm.user.publicProfileUrl)
    console.log(profile.linkedin_url)
    if (profile.linkedin_url == vm.user.publicProfileUrl){
      console.log("Hi Adam")
      current_user = true
      console.log(current_user)
    }
    else{
      console.log("No Match")
    }
    });
  })
  var vm = this;
  vm.authService = authService;
  authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    // console.log(vm.user)
    });
  this.comment = new CommentFactory()
  this.create = function(){
    console.log(this.comment)
    console.log(this.comment.author)
    console.log(vm.user.nickname)
    this.comment.author = vm.user.nickname
    this.comment.author_image = vm.user.picture
    this.comment.$save({profile_id: $stateParams.id}, function (){
      $state.reload();
    })  
  }
    }

function ProfileEditControllerFunction( ProfileFactory, $stateParams, $state, authService ){
    this.profile = ProfileFactory.get({id: $stateParams.id})
    this.update = function(){
      this.profile.$update({id: $stateParams.id}, function(){
        $state.go('profileShow', {id: $stateParams.id})
      })
    }
    this.destroy = function(){
      this.profile.$delete({id: $stateParams.id})
    }
      this.profiles = ProfileFactory.query()
  var vm = this;
  vm.authService = authService;
  authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    // console.log(vm.user)
    });
 }

})();