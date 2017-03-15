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
    "authService",
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
    
function ProfileIndexControllerFunction( ProfileFactory, authService ){
  this.profiles = ProfileFactory.query({}, (profiles) => {    
  })
  var vm = this;
  vm.authService = authService;
  authService.getProfileDeferred().then(function (profile) {
    vm.user = profile;
    // console.log(vm.user.publicProfileUrl)
    });
  }

function ProfileNewControllerFunction( ProfileFactory ){
  this.profile = new ProfileFactory()
  this.create = function(){
    this.profile.$save()
  }
}

function ProfileShowControllerFunction( ProfileFactory, CommentFactory, $stateParams, authService ){
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
  this.comment = new CommentFactory()
  this.create = function(){
    this.comment.$save({profile_id: $stateParams.id})
  }
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