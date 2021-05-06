import { ajaxPromise } from '/jquery_php/module/utils/utils.js';

function searchItems() {
    $('#search-bar').on("keyup", function () {
        var query = window.btoa(unescape(encodeURIComponent($('#search-bar').val())));
        if (query) {
            ajaxPromise('/jquery_php/module/search/controller/controller_search.php?op=search-bar&exists= '+query, 'GET', 'JSON')
                .then(function (data) {
                    var $searchContainer = $('#search-container');
                    var $itemsContainer = $('#searched-items');
                    $itemsContainer.html('');
                    $itemsContainer.width($searchContainer.width());
                    var $ulItems = $('<ul class="list-group list-group-flush"></ul>').appendTo($itemsContainer);

                    if (data.games) {
                        $itemsContainer.removeAttr('hidden');
                        data.games.forEach(game => {
                            var $liGame = $('<li class="list-group-item" id="'+game.gameCod+'"></li>').appendTo($ulItems);
                            var $rowGame = $('<div class="row"></div>').appendTo($liGame);
                            var $imgCol = $('<div class="col-4"><img style="max-width: 100%" src="/jquery_php/view/img/games/' + game.gameImg +'"></div>').appendTo($rowGame);
                            var $infoCol = $('<div class="col-8"></div>').appendTo($rowGame);
                            $infoCol.append('<div class="row"><div style="font-size:18px;" class="col">' + game.gameName + '</div></div>');
                            $infoCol.append('<div class="row"><div style="font-weight: bold;" class="col">' + game.price +'€</div></div>');

                            $liGame.on('click', function() {
                                localStorage.setItem("product-id", $(this).attr('id'));
                                window.location.href = 'index.php?page=shop';
                            });
                        });
                    } else {
                        $itemsContainer.removeAttr('hidden');
                        var $liGame = $('<li class="list-group-item"></li>').appendTo($ulItems);
                        var $rowGame = $('<div class="row"></div>').appendTo($liGame);
                        var $infoCol = $('<div class="col" data-tr="no-found"></div>').appendTo($rowGame);
                    }
                    loadLang();
                }).catch(function (err) {
                    console.error(err)
                });
        } else {
            $('#searched-items').attr('hidden', true);
        }
    });
}

function openItem() {
    
    localStorage.setItem('search', $('#search-bar').val());
    var search = window.btoa(unescape(encodeURIComponent(localStorage.getItem('search'))));
    if (search.length !== 0){
        ajaxPromise('/jquery_php/module/search/controller/controller_search.php?op=exists&exists= ' + search, 'GET', 'JSON')
            .then(function (data) {
                if (+data.total !== 0){
                    localStorage.setItem('shop', 'search-products');
                    window.location.href = 'index.php?page=shop';
                }
            }).catch(function (err) {
                console.error(err)
            });
    }
}

function openEvents(){

    $('#search-button').click(function () {
            openItem();
    });

    $('#search-bar').on('keydown', function (event) {
        if (event.key == 'Enter') {
            event.preventDefault();
            openItem();
        }
    });
}

$(document).ready(function () {
    searchItems();
    openEvents();
});