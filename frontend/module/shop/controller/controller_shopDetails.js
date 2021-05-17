getyourcar.controller('controller_shopDetails', function($scope, car, cart, favs, services_shop) {
    $scope.data = car;
    $scope.cart = services_shop.setArray(cart);
    $scope.favs = services_shop.setArray(favs);
});