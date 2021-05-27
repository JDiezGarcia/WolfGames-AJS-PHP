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
    $scope.total = pagination(total);
    $scope.allGenres = checkDisable(allGenres, arrGenres, "genres", "genreName");
    $scope.allPlatforms = checkDisable(allPlatforms, arrPlatforms, "platforms", "platformCod");

    //-----------[FILTER ROUTE APPLIES]------------\\

    $scope.filters = function (filter, type) {
        var k = ['platforms', 'genres']
        if (k.indexOf(type) !== -1) {
            let arr = $routeParams[type];
            if (arr) {
                let i = arr.indexOf(filter);
                if (i == -1) {
                    $routeParams[type].push(filter);
                } else {
                    $routeParams[type].splice(i, 1);

                    if (arr.length == 0) {
                        $routeParams[type] = null;
                    }
                }
            } else {
                $routeParams[type] = [filter];
            }
            console.log($route)
            $route.updateParams($routeParams);
            $route.reload();
        }
    }

    //-----------[FILTER CHECK AND DISABLE APPLIES]------------\\
    function checkDisable(allFilters, filters, type, key) {
        for (let i = 0; i < allFilters.length; i++) {
            let prop = '';
            //---------[ADDING CHECKED ATTR]---------\\
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
            //---------[ADDING TOTALS AND DISABLED ATTR]---------\\
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

    //----------[PAGINATION]----------\\
    function pagination(total) {

        let actualPage = $route.current.page;
        let limit = 8;
        let totalOffset = Math.ceil(total / limit) -1;
    }


    //----------[PAGE REDIRECTION]-----------\\
    $scope.redirectShopDetails = function (game) {
        location.href = "#/shop/details/" + game;
    };
});