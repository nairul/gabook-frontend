(function () {
  'use strict';

  angular
    .module('gaBook')
    .factory("ProfileFactory", [
      "$resource",
      ProfileFactoryFunction
    ])

function ProfileFactoryFunction( $resource ) {
  return $resource( "https://gabook.herokuapp.com/profiles/:id.json", {}, {
    update: { method: "PUT" }
  })
}
})();