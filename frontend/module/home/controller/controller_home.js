wolfgames.controller('controller_home', function($scope, services, allPlatforms, viewedGames) {
    

    //-----------[LOCAL STORAGE]-----------\\
    localStorage.carouselOffset = 0;

    //-----------[SLICE PLATFORM OBJECT]------------\\
    var arr = [];
    for (var i = 0; i < allPlatforms.length; i++) {
        let row = Math.floor(i / 2);
        if(!arr[row]){
            arr[row] = [];
        }
        arr[row].push(allPlatforms[i]);
    };

    //-----------[DATA INJECTIONS]------------\\
    $scope.arrays = arr;
    $scope.slides = viewedGames.games;

    //------------[PAGES CAROUSEL]-------------\\
    $scope.changeCarousel = function(offset) {
        
        offset = parseInt(offset);
        let oldOffset = parseInt(localStorage.carouselOffset);
        let newOffset = oldOffset;
        let total = parseInt(viewedGames.total.total);
        let limit = 12;
        let totalOffset = Math.ceil(total / limit) -1;

        if (offset == 1 ){
            newOffset += 1;
        }else if(offset == -1){
            newOffset -= 1;
        }

        if (totalOffset < newOffset){
            newOffset = 0;
        }else if(newOffset < 0){
            newOffset = totalOffset;
        }

        localStorage.carouselOffset = newOffset;
        offset = newOffset * limit;
        services.get('home', 'carousel', {offset: offset} )
        .then(function(games) {
            $scope.slides = games.games;
        }, function(error) {
            console.log(error);
        });// end_services

    };

    //-----------[PAGE REDIRECTION]------------\\
    $scope.redirectShopPlatform = function(platf) {
        location.href = "#/shop?platforms="+platf;
    };
    $scope.redirectShopDetails = function(game) {
        location.href = "#/shop/details/"+game;
    };
});

