import { ajaxPromise } from '/jquery_php/module/utils/utils.js';
localStorage.setItem('list-offset', 0);

function relatedProduct() {

    $.ajax({
        url: 'config.json',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var script = document.createElement('script');
            const RELAPI_KEY = data.API_KEY.Relevant;
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc&category=3d&sort-by=relevance",
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": RELAPI_KEY,
                    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
                }
            };
            $.ajax(settings).done(function (response) {
                var rows = 2;
                var columns = 6;
                var $carouselElement = $('#relevant-games-carousel');
                var $carouselControler = $('.relevant-games-content');
                var $currentCarouselItem;
                var $currentContainer;
                var $currentRow;
                var $currentCol;
                var $currentProduct;

                for (var i = 0; i < 36; i++) {
                    if (i === 0) {
                        $currentCarouselItem = $('<div class="carousel-item active"></div>').appendTo($carouselElement);
                        $currentContainer = $('<div class="container"></div>').appendTo($currentCarouselItem);

                    } else if (i % (rows * columns) === 0) {
                        $currentCarouselItem = $('<div class="carousel-item"></div>').appendTo($carouselElement);
                        $currentContainer = $('<div class="container"></div>').appendTo($currentCarouselItem);
                    }
                    // Row start
                    if (i % columns === 0) {
                        $currentRow = $('<div class="row"></div>').appendTo($currentContainer);
                    }

                    // Add column
                    $currentCol = $('<div class="col-2 carusel-item"></div>').appendTo($currentRow);
                    $currentProduct = $('<img src=' + response[i].thumbnail + ' id=' + response[i].game_url + ' class="d-block w-100 product"></img>').click(function () {
                        var url = $(this).attr('id');
                        window.open(url);
                    }).appendTo($currentCol);
                }
                $(
                    '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">' +
                    '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                    '<span class="visually-hidden">Previous</span>' +
                    '</a>').appendTo($carouselControler);
                $(
                    '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">' +
                    '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                    '<span class="visually-hidden">Next</span>' +
                    '</a>').appendTo($carouselControler);
            });
        }
    })

}

function localHashComprobation(id) {
    var var1;
    if (localStorage.getItem(id)) {
        var1 = localStorage.getItem(id);
        localStorage.removeItem(id);
        hashStorage.setItem(id, var1);
    } else {
        var1 = hashStorage.getItem(id);
    }
    return var1;
}

function showProduct() {
    //SHOW DETAILS
    if (localStorage.getItem("product-id") || hashStorage.getItem("product-id")) {
        var productID = localHashComprobation("product-id");
        ajaxPromise('/jquery_php/module/shop/controller/controller_shop.php?op=show-product&product-id=' + productID, 'GET', 'JSON')
            .then(function (data) {
                var $shopContainer = $('#shop-products');
                var $content = '';
                var $mainRow;
                var $dataCol;
                var $imgCol;

                $mainRow = $('<div class="row"></div>').appendTo($shopContainer);
                $imgCol = $('<div class="col-6"></div>').appendTo($mainRow);
                $dataCol = $('<div class="col-6"></div>').appendTo($mainRow);
                for (const row in data) {
                    if (row === 'hobby') {
                        $('<br><span data-tr="' + row + '" id="' + row + '"></span><span>:</span>').appendTo($dataCol);
                        let $list = $('<ul></ul>').appendTo($dataCol);
                        data[row].split(':').forEach(hobby => {
                            if (hobby !== '') {
                                $('<li>' + hobby + '</li>').appendTo($list);
                            }
                        });
                    }
                    else if (row !== 'gameImg' && row !== 'gameCod') {
                        $('<br><span data-tr="' + row + '"></span>: <span id="' + row + '">' + data[row] + '</span>').appendTo($dataCol);
                    }
                }
                $('<img style="max-width: 100%;" src=/jquery_php/view/img/games/' + data['gameImg'] + '></img>').appendTo($imgCol);
                var $moreContent = $(`<div class="more-content"></div>`).appendTo($shopContainer);
                var $relevantGames = $(`<div style="margin-top: 100px" class="relevant-games"><h1 data-tr="relevant-games"></h1></div>`).appendTo($moreContent)
                var $relevantGamesContent = $(`<div id="carouselExampleControls" class="carousel slide relevant-games-content" data-bs-ride="carousel"></div>`).appendTo($relevantGames);
                var $relevantGamesCarousel = $(`<div class="carousel-inner" id="relevant-games-carousel"></div>`).appendTo($relevantGamesContent);
                loadLang();
                relatedProduct();
            }).catch(function () {
                // window.location.href = 'index.php?page=error503';
            });

        //SHOW SHOP
    } else {
        var url = "";
        var filters = [];
        var platformCod;
        var limit = 8;

        //Edit Offset
        if (hashStorage.getItem("page") && parseInt(localStorage.getItem('list-offset')) === 0) {
            localStorage.setItem("list-offset", (hashStorage.getItem('page') - 1));

        } else if (localStorage.getItem('list-offset')) {
            //Show Hash 
            hashStorage.setItem('page', parseInt(localStorage.getItem('list-offset')) + 1);
        }

        var offset = localStorage.getItem('list-offset') * limit;

        switch (localStorage.getItem("shop")) {

            case "platform-products":
                //CAME FROM PLATFORM-IMG OR FILTER-PLATFORM
                platformCod = localHashComprobation("platform-cod");
                url = '/jquery_php/module/shop/controller/controller_shop.php?op=platform-products&platform-cod=' + platformCod;
                localStorage.setItem('first-time', true);

                break;

            case "all-products":
                //CAME FROM SHOP
                url = '/jquery_php/module/shop/controller/controller_shop.php?op=all-products';
                localStorage.setItem("first-time", true);
                //REMOVING OPTIONS
                localStorage.removeItem('filters');

                break;

            case "search-products":
                //CAME FROM SEARCH
                var search = localHashComprobation('search')
                url = '/jquery_php/module/shop/controller/controller_shop.php?op=search-products&search=' + search;
                localStorage.setItem("first-time", true);
                //REMOVING OPTIONS
                localStorage.removeItem('filters');
                break;

            case "filtered-products":
                //CAME FROM FILTERS-GENRE
                filters = hashStorage.getItem("filters");
                url = '/jquery_php/module/shop/controller/controller_shop.php?op=filtered-products&filters=' + JSON.stringify(filters);
                search = hashStorage.getItem('search');
                platformCod = hashStorage.getItem('platform-cod');
                if (platformCod) {
                    url += '&platform=' + platformCod;
                }
                if (search) {
                    url += '&search=' + search;
                }
                break;
        }
        ajaxPromise(url, 'POST', 'JSON', { offset: offset })
            .then(function (data) {
                var totalGames = data.total.total;
                var offsetTotal = Math.ceil(totalGames / limit) - 1;
                //GRID CSS
                var totalGames = data.total;
                var offsetTotal = Math.ceil(totalGames / limit) - 1;
                var actualOffset = parseInt(localStorage.getItem("list-offset"));
                var $products = $('#shop-products');
                var $shopContent;
                var $productsCol;
                var $filterCol;
                $shopContent = $('<div class="shop-content"></div>').appendTo($products);
                $filterCol = $('<div class="colF"></div>').appendTo($shopContent);
                $productsCol = $('<div class="colP"></div>').appendTo($shopContent);

                //FIRST-TIME PRINTING FILTERS
                if (localStorage.getItem("first-time")) {
                    //FILTER COLUMN
                    var $currentGameGenres;
                    var $currentGamePlatform;
                    //PLATFORMS ROW
                    for (var i = 0; i < data.platforms.length; i++) {
                        let prop = '';
                        var platform = hashStorage.getItem("platform-cod");
                        if (data.platforms[i].platformCod == platform) {
                            prop = 'checked';
                        }

                        // Row start
                        if (i === 0) {
                            $currentGamePlatform = $(`<div class="platforms">
                            <h3 data-tr="platforms"></h3>
                            </div>`).appendTo($filterCol);
                        }
                        $currentGamePlatform = $(`<div class="form-check filters-platforms">
                            <input class="form-check-input" type="radio" name="platforms" value="" id="`+ data.platforms[i].platformCod + `" ` + prop + `>
                            <label class="form-check-label" data-tr="`+ data.platforms[i].platformCod + `" for="` + data.platforms[i].platformCod + `">
                            </label>`).appendTo($filterCol);
                    }
                    //GENRES ROW
                    for (var i = 0; i < data.filters.length; i++) {
                        // Row start
                        if (i === 0) {
                            $currentGameGenres = $(`<div class="genre">
                            <h3 data-tr="genre"></h3>
                            </div>`).appendTo($filterCol);
                        }
                        $currentGameGenres = $(`<div class="form-check filters-genres">
                            <input class="form-check-input" type="checkbox" value="" id="`+ data.filters[i].genreName + `">
                            <label class="form-check-label" data-tr="`+ data.filters[i].genreName + `" for="` + data.filters[i].genreName + `">
                            </label><span>(`+ data.filters[i].total + `)</span>`).appendTo($filterCol);
                    }
                    localStorage.setItem("filters", JSON.stringify(data.filters));
                    localStorage.setItem("platforms", JSON.stringify(data.platforms));

                    //REMOVING TRIGGER
                    localStorage.removeItem("first-time");

                    //PRINTING FILTERS-CHECKED
                } else {

                    //PLATFORMS
                    var $currentGamePlatform;
                    var platforms = JSON.parse(localStorage.getItem("platforms"));
                    //PLATFORMS ROW
                    for (var i = 0; i < platforms.length; i++) {
                        let prop = '';
                        var platform = hashStorage.getItem("platform-cod");
                        if (platforms[i].platformCod == platform) {
                            prop = 'checked';
                        }
                        // Row start
                        if (i === 0) {
                            $currentGamePlatform = $(`<div class="platforms">
                            <h3 data-tr="platforms"></h3>
                            </div>`).appendTo($filterCol);
                        }
                        $currentGamePlatform = $(`<div class="form-check filters-platforms">
                            <input class="form-check-input" type="radio" name="platforms" value="" id="`+ platforms[i].platformCod + `"` + prop + `>
                            <label class="form-check-label" data-tr="`+ platforms[i].platformCod + `" for="` + platforms[i].platformCod + `">
                            </label>`).appendTo($filterCol);
                    }

                    //GENRES
                    var filters = JSON.parse(localStorage.getItem("filters"));
                    var $currentGameGenres = $(`<div class="genre">
                        <h3 data-tr="genre"></h3>
                        </div>`).appendTo($filterCol);

                    for (let i = 0; i < filters.length; i++) {

                        let prop = '';
                        let checkedFilters = hashStorage.getItem("filters");

                        if (checkedFilters) {
                            for (let l = 0; l < checkedFilters.length; l++) {
                                if (filters[i].genreName === checkedFilters[l]) {
                                    prop = 'checked';
                                }
                            }
                        }

                        let newFilter = filters[i];
                        if (data.filters) {
                            newFilter = data.filters.find(f => f.genreName === filters[i].genreName);
                        }
                        let newTotal = 0;

                        if (newFilter) {
                            newTotal = newFilter.total;
                        } else {
                            prop = 'disabled';
                        }


                        $currentGameGenres = $(`<div class="form-check filters-genres">
                        <input class="form-check-input" type="checkbox" value="" id="`+ filters[i].genreName + `" ` + prop + `>
                        <label class="form-check-label" data-tr="`+ filters[i].genreName + `" for="` + filters[i].genreName + `">
                        </label><span>(`+ newTotal + `)</span>`).appendTo($filterCol);

                    }
                }
                //EVENT FOR CHANGED GENRES FILTER
                $('.filters-genres input').on('change', function () {
                    var filters = JSON.parse(localStorage.getItem("filters"));
                    for (var i = 0; i < filters.length; i++) {
                        if (filters[i].genreName === $(this).attr('id')) {
                            var filtersArray = [];
                            if (hashStorage.getItem("filters")) {
                                filtersArray = hashStorage.getItem("filters");
                            }
                            let cont = 0;
                            for (var l = 0; l < filtersArray.length; l++) {
                                if (filtersArray[l] === filters[i].genreName) {
                                    filtersArray.splice(l, 1);
                                    cont = 1;
                                }
                            }
                            if (cont === 0) {
                                filtersArray.push(filters[i].genreName);
                            }
                            hashStorage.setItem("filters", filtersArray);
                        }
                    }
                    localStorage.setItem('shop', 'filtered-products');
                    //REMOVING CONTENT
                    $('.shop-content,.shop-pagination').remove();
                    localStorage.setItem("list-offset", 0);
                    hashStorage.removeItem('page');
                    showProduct();
                });

                //EVENT FOR CHANGED PLATFORMS FILTER
                $('.filters-platforms input').on('click', function () {
                    var shop = 'platform-products';
                    var platforms = JSON.parse(localStorage.getItem("platforms"));
                    var platform = hashStorage.getItem('platform-cod');

                    for (var i = 0; i < platforms.length; i++) {
                        if (platforms[i].platformCod === $(this).attr('id')) {
                            if (platform == $(this).attr('id')) {
                                shop = 'all-products';
                                hashStorage.removeItem("platform-cod");
                            } else {
                                platforms[i].checked = true;
                                hashStorage.setItem("platform-cod", platforms[i].platformCod);
                            }
                        }
                    }
                    localStorage.setItem('platforms', JSON.stringify(platforms));
                    localStorage.setItem('shop', shop);
                    //REMOVING CONTENT
                    localStorage.setItem("list-offset", 0);
                    hashStorage.removeItem('page');
                    hashStorage.removeItem('filters');
                    hashStorage.removeItem('search');
                    $('.shop-content,.shop-pagination').remove();
                    showProduct();
                });

                //PRINTING PRODUCT-COLUMN
                var columns = 4;
                var rows = Math.ceil(data.games.length / columns);
                var $productsImg;
                var $currentRow;
                var $currentCol;
                var $currentItem;
                var $currentDetails;
                var $buttonDiv;

                for (var i = 0; i < data.games.length; i++) {
                    // Row start
                    if (i % columns === 0) {
                        $currentRow = $('<div class="row-g-1 row"></div>').appendTo($productsCol);
                    }
                    // Add column
                    $currentCol = $(`<div class="col-3 product-shop" id="` + data.games[i].gameCode + `">
                                <div class="card p-3">
                                    <div>
                                        <img src="/jquery_php/view/img/games/`+ data.games[i].gameImg + `" width="100%"/>
                                        <div class="product-details" id="product-details-`+ data.games[i].gameCod + `"> 
                                            <span class="fw-bold d-block game-name" style="display:inline-block">`+ data.games[i].gameName + `</span> 
                                            <span data-tr="price"></span><span>: <span class="detail">`+ data.games[i].price + `€</span></span><br>
                                            <span data-tr="pgi"></span><span>: <span class="detail">`+ data.games[i].pgi + `</span></span>
                                        </div>
                                    </div>
                                </div>
                    </div>`).appendTo($currentRow);
                    $buttonDiv = $(`<div class="buttons d-flex flex-row"></div>`).appendTo("#product-details-" + data.games[i].gameCod);

                    $(`<div class="cart"><i class="fa fa-shopping-cart"></i></div>`).click(function () {
                        console.log("pronto al carrito");
                    }).appendTo($buttonDiv);

                    $(`<button class="btn btn-success cart-button btn-block" id="` + data.games[i].gameCod + `" data-tr="view"><span class="dot"></span></button>`).click(function () {
                        localStorage.setItem("product-id", $(this).attr('id'));
                        window.location.href = 'index.php?page=shop';
                    }).appendTo($buttonDiv);

                    $(`<div class="weight"> <small>` + data.games[i].description + `</small> </div>`).appendTo("#product-details-" + data.games[i].gameCod);
                }
                //PAGINATION
                var $shopPagination = $(`<div class="shop-pagination"></div>`).appendTo($products)
                var $pagination = $(`<nav aria-label="pagination" class="pagination-shop"></nav>`).appendTo($shopPagination);
                var $paginationContent = $(`<ul class="pagination justify-content-end"></ul>`).appendTo($pagination);
                var pages = offsetTotal + 1;
                for (var i = 0; i < pages; i++) {

                    //FIRST BUTTON
                    if ((i === 0) && (i === actualOffset)) {
                        $(`<li class="page-item">
                            <a class="page-link" aria-disabled="true" data-tr="first"></a>
                        </li>`).appendTo($paginationContent);
                    } else if (i === 0) {
                        $(`<li class="page-item">
                            <a class="page-link "data-tr="first"></a>
                        </li>`).click(function () {
                            localStorage.setItem("list-offset", 0);
                            $('.shop-content,.shop-pagination').remove();
                            showProduct();
                        }).appendTo($paginationContent);
                    }

                    //3 PAGES
                    if (i === actualOffset - 1) {
                        //Previous
                        $(`<li class="page-item">
                            <a class="page-link">`+ (actualOffset) + `</a>
                        </li>`).click(function () {
                            localStorage.setItem("list-offset", actualOffset - 1);
                            $('.shop-content,.shop-pagination').remove();
                            showProduct();
                        }).appendTo($paginationContent);
                    } else if (i === actualOffset) {
                        //Actual
                        $(`<li class="page-item">
                            <a class="page-link" aria-disabled="true">`+ (actualOffset + 1) + `</a>
                        </li>`).appendTo($paginationContent);
                    } else if (i === actualOffset + 1) {
                        //Next
                        $(`<li class="page-item">
                            <a class="page-link">`+ (actualOffset + 2) + `</a>
                        </li>`).click(function () {
                            localStorage.setItem("list-offset", actualOffset + 1);
                            $('.shop-content,.shop-pagination').remove();
                            showProduct();
                        }).appendTo($paginationContent);
                    }

                    if ((i === offsetTotal) && (i === actualOffset)) {
                        $(`<li class="page-item">
                            <a class="page-link" aria-disabled="true" data-tr="last"></a>
                        </li>`).appendTo($paginationContent);
                    } else if (i === offsetTotal) {
                        $(`<li class="page-item">
                            <a class="page-link" data-tr="last"></a>
                        </li>`).click(function () {
                            localStorage.setItem("list-offset", offsetTotal);
                            $('.shop-content,.shop-pagination').remove();
                            showProduct();
                        }).appendTo($paginationContent);
                    }
                }
                loadLang();
            }).catch(function (err) {
                console.error(err);
                // window.location.href = 'index.php?page=error503';
            });
    }
}

$(document).ready(function () {
    if (window.location.href.includes('shop')) {
        showProduct();
    }
});