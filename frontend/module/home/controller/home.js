import { ajaxPromise } from '/jquery_php/module/utils/utils.js';
localStorage.setItem('carousel-offset', 0);
function carousel() {
    var limit = 12;
    var offset = localStorage.getItem('carousel-offset') * limit;
    ajaxPromise('/jquery_php/module/home/controller/controller_home.php?op=carousel', 'POST', 'JSON', {offset: offset})
        .then(function (data) {
            console.log(data);
            var totalGames = data.total.total;
            var offsetTotal = Math.ceil(totalGames / limit) -1;
            var actualOffset = localStorage.getItem("carousel-offset");
            console.log(offsetTotal);
            var rows = 2;
            var columns = 6;
            var $carouselElement = $('#carousel-game');
            var $carouselControler = $('#carouselExampleControls');
            var $currentCarouselItem;
            var $currentContainer;
            var $currentRow;
            var $currentCol;
            var $currentProduct;

            for (var i = 0; i < data.games.length; i++) {
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
                $currentProduct = $('<img src="/jquery_php/view/img/games/' + data.games[i].gameImg + '" id=' + data.games[i].gameCod + ' class="d-block w-100 product"></img>').click(function () {
                    // console.log($(this).attr('id'));
                    localStorage.setItem("product-id", $(this).attr('id'));
                    window.location.href = 'index.php?page=shop';
                }).appendTo($currentCol);
            }
            $(
                '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">' +
                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                '<span class="visually-hidden">Previous</span>' +
                '</a>').click(function (){
                    if (parseInt(localStorage.getItem("carousel-offset")) === 0){
                        localStorage.setItem("carousel-offset", offsetTotal);
                        console.log(localStorage.getItem("carousel-offset"));
                        $('.carousel-control-next,.carousel-control-prev').remove();
                        $('#carousel-game').html('');
                        carousel();
                        
                    }else {

                        var offsetMinus = parseInt(localStorage.getItem("carousel-offset"));
                        offsetMinus = offsetMinus - 1;
                        localStorage.setItem("carousel-offset", offsetMinus);
                        console.log(offsetMinus);
                        $('.carousel-control-next,.carousel-control-prev').remove();
                        $('#carousel-game').html('');
                        carousel();
                    }
            }).appendTo($carouselControler);
            $(
                '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">' +
                '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                '<span class="visually-hidden">Next</span>' +
                '</a>').click(function (){
                    if (parseInt(localStorage.getItem("carousel-offset")) === offsetTotal){
                        localStorage.setItem("carousel-offset", 0);
                        $('.carousel-control-next,.carousel-control-prev').remove();
                        $('#carousel-game').html('');
                        carousel();
                    }else {
                        var offsetPlus = parseInt(localStorage.getItem("carousel-offset"));
                        offsetPlus = offsetPlus + 1;
                        localStorage.setItem("carousel-offset", offsetPlus);
                        $('.carousel-control-next,.carousel-control-prev').remove();
                        $('#carousel-game').html('');
                        carousel();
                    }
            }).appendTo($carouselControler);
        }).catch(function () {
            // window.location.href = 'index.php?page=error503';
        });
}

function categoriesImg() {
    ajaxPromise('/jquery_php/module/home/controller/controller_home.php?op=platformsImg', 'GET', 'JSON')
        .then(function (data) {
            var rows = 2;
            var columns = 2;

            var $categoriesImg = $('.categories');
            var $categoryImg;
            var $currentRow;
            var $currentCol;

            for (var i = 0; i < data.length; i++) {
                // Row start
                if (i % columns === 0) {
                    $currentRow = $('<div class="row-cat row"></div>').appendTo($categoriesImg);
                }

                // Add column
                $currentCol = $('<div class="img-categ col-6" id=' + data[i].platformCod + '>' +
                    '<img src="/jquery_php/view/img/platforms/' + data[i].platformImg + '" class="image" style="width:100%">' +
                    '<div class="middle"><div class="text" style="text-align: center;" data-tr=' + data[i].platformCod + '></div></div>').click(function () {
                        localStorage.setItem("platform-cod", $(this).attr('id'));
                        localStorage.setItem("shop", "platform-products");
                        window.location.href = 'index.php?page=shop';
                    });
                $currentRow.append($currentCol);
            }
            loadLang();
        }).catch(function () {
            // window.location.href = 'index.php?page=error503';
        });
}
$(document).ready(function () {
    carousel();
    categoriesImg();
});