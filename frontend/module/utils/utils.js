export function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData,
            crossDomain: true
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}

window.onhashchange = () => {
	window.location.reload();
}

window.hashStorage = {
	data: {},
	save() {
		var fhash = window.onhashchange;
		if (window.onhashchange !== null){
			window.onhashchange = null;
			setTimeout(() => {window.onhashchange = fhash;}, 10);
		}
		location.hash = JSON.stringify(this.data);
		if (location.hash.length <= 3) {
			location.hash = "";
		}
	},
	removeItem(key) {
		delete this.data[key];
		this.save();
	},
	setItem(key, val) {
		this.data[key] = val;
		this.save();
	},
	getItem(key) {
		return this.data[key];
	}
};

function tryLoadHashStorage() {
	try {
		hashStorage.data = JSON.parse(decodeURI(location.hash).slice(1));
	} catch (e) { }
}

tryLoadHashStorage();

function checkToken(){
	
	//CHECK TOKEN JWT
}
toastr.options = {
	"closeButton": true,
	"debug": false,
	"newestOnTop": false,
	"progressBar": true,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
}