wolfgames.controller('controller_shop', function ($scope, $routeParams, $route, services, games) {
    //-----[VARS DECLARATIONS]-----\\
    var arrGames;
    var arrPlatforms;
    var arrFilters;
    var total;
    var arrAllP;
    var arrAllG;
    //-----[FILTERED GAMES DETECTION]-----\\
    if (Object.keys($routeParams).length > 0) {
        
    }else{
        arrGames = games.games;
        arrPlatforms = games.platforms;
        arrFilters = games.filters;
        total = games.total;
        console.log(games);
    }
    console.log(games)
    
    //Route use
    console.log(arrGames, $routeParams);
    /*$routeParams.genre = ['asd', 'fgh'];
    console.log(1, $routeParams);
    $route.updateParams($routeParams);*/

    //----------[DATA INJECTION]----------\\
    $scope.arrGames = arrGames;
    $scope.arrPlatforms = arrPlatforms;
    $scope.arrFilters = arrFilters;


    //----------[PAGE REDIRECTION]-----------\\
    $scope.redirectShopDetails = function(game) {
        location.href = "#/shop/details/"+game;
    };
});