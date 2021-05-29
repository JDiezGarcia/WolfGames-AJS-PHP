wolfgames.controller('controller_shop', function ($window, $scope, $routeParams, $route, services, games) {

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
    $scope.allGenres = checkDisable(allGenres, arrGenres, "genres", "genreName");
    $scope.allPlatforms = checkDisable(allPlatforms, arrPlatforms, "platforms", "platformCod");
    $scope.total = pagination(total);

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
            $routeParams.page = 1;
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
                        }
                    }
                } else {
                    if (allFilters[i][key] === $route.current.params[type]) {
                        prop = 'checked';
                        allFilters[i].prop = prop;
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

        let actualPage = parseInt($route.current.params.page);
        let limit = 8;
        let totalOffset = Math.ceil(parseInt(total) / limit) - 1;
        let object = {};
        object.pages = totalOffset + 1;

        if (actualPage) {
            object.actualPage = actualPage;
            object.nextPage = actualPage + 1;
            object.previousPage = actualPage - 1;
        } else {
            object.previousPage = 0;
            object.actualPage = 1;
            object.nextPage = object.actualPage + 1;
        }
        return object;
    }
    //----------[PAGE REDIRECTION]-----------\\
    $scope.changePage = function (actualPage, action, pages) {
        actualPage = parseInt(actualPage);
        switch (action) {
            case 'First':
                actualPage = 1;
                break;
            case 'Last':
                actualPage = parseInt(pages);
                break;

            case 'Next':
                actualPage = actualPage + 1;
                break;

            case 'Previous':
                actualPage = actualPage - 1;
                break;
            default:
                break;
        }
        $routeParams.page = actualPage
        $route.updateParams($routeParams);
        $route.reload();
    };
    //----------[PAGE REDIRECTION]-----------\\
    $scope.redirectShopDetails = function (game) {
        location.href = "#/shop/details/" + game;
    };
});