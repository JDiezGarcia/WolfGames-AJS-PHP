var selectedLang = null;
var lang = null;

function loadLang(){
    var elmnts = document.querySelectorAll('[data-tr]');
    for (var i = 0; i < elmnts.length; i++) {
        var trText = selectedLang.hasOwnProperty(lang) ? selectedLang[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr
        if (elmnts[i].tagName=='INPUT'){
            elmnts[i].value = trText;
        } else{
            elmnts[i].innerHTML = trText;
        }
    }

    $('#crud-table').DataTable({
        destroy: true,
        language: selectedLang[lang].table
    });
}

function changeLang(Flang) {
    Flang = Flang || localStorage.getItem('app-lang') || 'en';
    lang = Flang;
    $('#lang-select').val(lang);
    localStorage.setItem('app-lang', lang);

    $.ajax({
        url: '/angularjs_php/frontend/view/inc/lang/' + lang + '.json',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            selectedLang = data;
            loadLang();
        }
    })
}

 angular.element(document).ready(function () {
        changeLang();
        $('#lang-select').change(function() {
            changeLang($('#lang-select').val());
        });;
    });
