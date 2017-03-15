(function () {
  'use strict';

  angular
    .module('gaBook')
    .factory("ProfileFactory", [
      "$resource",
      ProfileFactoryFunction
    ])
    .factory("CommentFactory", [
      "$resource",
      CommentFactoryFunction
    ])

function ProfileFactoryFunction( $resource ) {
  return $resource( "https://gabook.herokuapp.com/profiles/:id.json", {}, {
    update: { method: "PUT" }
  })
}
function CommentFactoryFunction ( $resource ) {
  return $resource( "https://gabook.herokuapp.com/profiles/:profile_id/comments/:id.json", {}, {
    update: {method: "PUT" }
  })
}
})();