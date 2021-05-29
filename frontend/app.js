var wolfgames = angular.module('wolfgames', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize', 'toastr', 'ui.bootstrap', 'ngAria']);
//----- TRADUCTION I18N -----\\
//--- http://jsfiddle.net/arleray/pmbyst0n/ ---\\
wolfgames.run(function ($rootScope, $window, services) {

    //---------[SEARCH-BAR]---------\\
    $rootScope.searchBar = function () {
        let query = window.btoa(encodeURIComponent($rootScope.searchQuery));
        if ($rootScope.searchQuery.length > 0) {
            services.get('search', 'search-bar', { query: query })
                .then(function (games) {
                    $rootScope.noQuery = false;
                    if (typeof games == 'object') {
                        $rootScope.noMatch = false;
                        delete $rootScope.searchGames;
                        $rootScope.searchGames = games.games;
                    } else {
                        $rootScope.noMatch = true;
                    }
                }, function (error) {
                    console.log(error);
                    $rootScope.noMatch = true;
                })
        } else {
            $rootScope.noQuery = true;
            console.log("enter")
        }
    };

    $rootScope.redirectSearchList = function () {
        if(!$rootScope.searchQuery){
            location.href = "#/shop";
        }else{
            let query = $rootScope.searchQuery;
            delete $rootScope.searchQuery;
            delete $rootScope.searchGames;
            location.href = "#/shop?search=" + query;
        }
    };

    $rootScope.redirectSearchOne = function (game) {
        delete $rootScope.searchQuery;
        delete $rootScope.searchGames;
        location.href = "#/shop/details/"+game;
    };
});

wolfgames.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "frontend/module/home/view/view_home.html",
                controller: "controller_home",
                resolve: {
                    viewedGames: async function (services) {
                        data = await services.get('home', 'carousel', { offset: 0 });
                        return data;
                    },
                    allPlatforms: function (services) {
                        data = services.get('home', 'platformsImg');
                        return data;
                    }
                }// END_RESOLVE
            })
            .when("/shop", {
                templateUrl: "frontend/module/shop/view/view_shop.html",
                controller: "controller_shop",
                resolve: {
                    games: async function (services, $route) {
                        let params = $route.current.params;
                        let page = params.page;
                        let search = params.search;
                        for (var k of ['platforms', 'genres', 'search']) {
                            if (k in params && typeof params[k] !== 'object') {
                                params[k] = [params[k]];
                            }
                        }
                        if (!page) {
                            page = 0;
                        } else {
                            page = (page - 1) * 8;
                        }
                        
                        if (search) {
                            search = window.btoa(encodeURIComponent(search));
                            console.log(search);
                        }

                        if (Object.keys(params).length > 0) {
                            data = await services.get('shop', 'products', { filters: params, offset: page, search: search });
                        } else {
                            data = await services.get('shop', 'products', { offset: 0 });
                        }
                        if (Object.keys(data.games).length <= 0) {
                            return null;
                        }
                        return data;
                    }
                    /*,
                    favs: function (services) {
                        return services.post('shop', 'sendFavs', { JWT: localStorage.token });
                    },
                    cart: function (services) {
                        return services.post('cart', 'selectCart', { JWT: localStorage.token });
                    }*/
                }// END_RESOLVE
            })
            .when('/shop/details/:gameCod', {
                templateUrl: "frontend/module/shop/view/view_shopDetails.html",
                controller: "controller_shopDetails",
                resolve: {
                    game: async function (services, $route) {
                        data = await services.get('shop', 'details', { gameCod: $route.current.params.gameCod })
                        return data;
                    }/*,
                    favs: function (services) {
                        return services.post('shop', 'sendFavs', { JWT: localStorage.token });
                    },
                    cart: function (services) {
                        return services.post('cart', 'selectCart', { JWT: localStorage.token });
                    }*/
                }// END_RESOLVE
            })
            /*.when("/contact", {
                    templateUrl: "frontend/module/contact/view/view_contact.html", 
                    controller: "controller_contact"
                })
                }).when("/login", {
                    templateUrl: "frontend/module/login/view/view_logIn.html",
                    controller: "controller_logIn"
                }).when("/register", {
                    templateUrl : "frontend/module/login/view/view_register.html",
                    controller: "controller_register"
                }).when("/recover", {
                    templateUrl: "frontend/module/login/view/view_recover.html",
                    controller: "controller_recover"
                }).when("/login/activate/:token", {
                    resolve: {
                        activateUser: function(services, $route, toastr) {
                            services.put('login', 'validateEmail', {'token': $route.current.params.token})
                            .then(function(response) {
                                if (response == 1) {
                                    toastr.success('Thank you for verifing your account.' ,'Account verified..');
                                }else {
                                    toastr.error('The current token is invalid.' ,'Error');
                                }// end_else
                                location.href = "#/login";
                            }, function(error) {
                                console.log(error);
                            });// end_services
                        }// end_activateUser
                    }// end_resolve
                }).when("/login/recover/:token", {
                    templateUrl: "frontend/module/login/view/view_recoverForm.html",
                    controller: "controller_recoverForm",
                    resolve: {
                        checkToken: function(services, $route, toastr) {
                            services.post('login', 'checkTokenRecover', {'token': $route.current.params.token})
                            .then(function(response) {
                                if (response == 'fail') {
                                    toastr.error("The current token is invalid." ,'Error');
                                    location.href = "#/home";
                                }// end_if
                            }, function(error) {
                                console.log(error);
                            });
                        }// end_checkToken
                    }// end_resolve
                }).when("/profile", {
                    templateUrl: "frontend/module/profile/view/view_profile.html",
                    controller: "controller_profile",
                    resolve: {
                        userData: function (services) {
                            return services.post('profile', 'sendData', {JWT: localStorage.token});
                        }, userPurchases: function(services) {
                            return services.post('profile', 'showPurchases', {JWT: localStorage.token});
                        }, userFavs: function(services) {
                            return services.post('profile', 'sendUserFavs', {JWT: localStorage.token});
                        }// end_userFavs
                    }// end_resolve
                }).when("/cart", {
                    templateUrl: "frontend/module/cart/view/view_cart.html",
                    controller: "controller_cart",
                    resolve: {
                        dataCart: function(services) {
                            return services.post('cart', 'loadDataCart', {JWT: localStorage.token});
                        }
                    }
                }).when("/admin", {
                    templateUrl: "frontend/module/crud/view/view_crud.html",
                    controller: "controller_crud",
                    resolve: {
                        dataCrud: function(services) {
                            return services.post('crud', 'listCars');
                        }
                    }
                }).when("/admin/addCar", {
                    templateUrl: "frontend/module/crud/view/view_crud_addCar.html",
                    controller: "controller_crud_addCar"
                })*/.otherwise("/home", {
                templateUrl: "frontend/module/home/view/view_home.html",
                controller: "controller_home"
            });
    }]);
