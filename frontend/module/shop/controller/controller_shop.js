wolfgames.controller('controller_shop', function ($scope, $routeParams, $route, services, games) {
    //-----[VARS DECLARATIONS]-----\\


    var arrGames = games.games;
    var arrPlatforms = games.platforms;
    var arrGenres = games.genres;
    var total = games.total;
    var allGenres = games.allGenres;
    var allPlatforms = games.allPlatforms;

    //----------[DATA INJECTION]----------\\
    $scope.arrGames = arrGames;
    $scope.arrPlatforms = arrPlatforms;
    $scope.arrGenres = arrGenres;
    $scope.total = total;
    $scope.allGenres = checkDisable(allGenres, arrGenres, "genres", "genreName");
    $scope.allPlatforms = checkDisable(allPlatforms, arrPlatforms, "platforms", "platformCod");

    //-----------[FILTER ROUTE APPLIES]------------\\

    $scope.filters = function (filter, type) {
        if (type === "genre") {
            let arr = $routeParams.genres;
            if (typeof arr == "object") {
                $routeParams.genres.push(filter);
            } else if (arr) {
                $routeParams.genres = [arr, filter];
            } else {
                $routeParams.genres = [filter];
            }
        } else if (type === "platform") {
            let arr = $routeParams.platforms;
            if (typeof arr == "object") {
                $routeParams.platforms.push(filter);
            } else if (arr) {
                $routeParams.platforms = [arr, filter];
            } else {
                $routeParams.platforms = [filter];
            }
        }
        $route.updateParams($routeParams);
        $route.reload();
    }

    //-----------[FILTER CHECK AND DISABLE APPLIES]------------\\
    function checkDisable(allFilters, filters, type, key) {
        for (let i = 0; i < allFilters.length; i++) {
            let prop = '';
            if (type in $route.current.params) {
                if (typeof $route.current.params[type] == "object") {
                    for (let l = 0; l < $route.current.params[type].length; l++) {
                        if (allFilters[i][key] === $route.current.params[type][l]) {
                            prop = 'checked';
                            allFilters[i].prop = prop;
                            console.log(allFilters[i].prop)
                        }
                    }
                } else {
                    if (allFilters[i][key] === $route.current.params[type]) {
                        prop = 'checked';
                        allFilters[i].prop = prop;
                        console.log(allFilters[i].prop)
                    }
                }
            }
            let newFilter;
            if (filters) {
                newFilter = filters.find(f => f[key] === allFilters[i][key]);
            }
            let newTotal = 0;
            if (newFilter) {
                newTotal = newFilter.total;
                allFilters[i].total = newTotal;
            } else {
                prop = 'disabled';
                allFilters[i].prop = prop;
                allFilters[i].total = newTotal;
            }
        }
        return allFilters;
    }

    //----------[PAGE REDIRECTION]-----------\\
    $scope.redirectShopDetails = function (game) {
        location.href = "#/shop/details/" + game;
    };
});