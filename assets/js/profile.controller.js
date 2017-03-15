(function () {
  'use strict';

  angular
    .module('gaBook')
    .controller("ProfileIndexController", [
    "ProfileFactory",
    ProfileIndexControllerFunction
    ])
    .controller("ProfileShowController", [  
    "ProfileFactory",
    "CommentFactory",
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
    
function ProfileIndexControllerFunction( ProfileFactory ){
  this.profiles = ProfileFactory.query()
}

function ProfileNewControllerFunction( ProfileFactory ){
  this.profile = new ProfileFactory()
  this.create = function(){
    this.profile.$save()
  }
}

function ProfileShowControllerFunction( ProfileFactory, CommentFactory, $stateParams ){
  this.profile = ProfileFactory.get({id: $stateParams.id})
  this.comment = new CommentFactory()
  this.create = function(){
    console.log(this.comment)
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