wolfgames.controller('controller_shop', function ($scope, services, games, favs, gameFilters, services_shop) {
    
    if (gameFilters) {
        $scope.arrGames = gameFilters;
    }else{
        $scope.arrGames = games;
    }
    console.log(arrGames);
});