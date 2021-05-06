import { ajaxPromise } from '/jquery_php/module/utils/utils.js';

function sessionStatus() {

    //---------------LOGIN-STATUS---------------------\\
    $('#log-success-button').on('click', function () {
        if (!localStorage.getItem("token-log")) {
            var user = $('#user-email-log').val();
            var pass = $('#password-log').val();
            var userVal = valUser(user);
            var emailVal = valEmail(user);
            var passVal = valPass(pass);

            if (userVal & passVal) {
                login(user, pass);
            } else if (emailVal & passVal) {
                login(user, pass);
            }

        } else {
            //CAMBIAR MEDIANTE TOKEN
            logout();
            window.location.reload();
        }
        loadLang();
    });

    //---------------------REGISTER--------------------\\
    $('#sign-success-button').on('click', function () {
        if (!localStorage.getItem("token-log")) {

            var user = $('#username').val();
            var email = $('#user-email').val();
            var pass = $('#password-log').val();
            var pass2 = $('#user-pass2').val();
            var name = $('#user-name').val();
            var lasname = $('#user-lastname').val();
            var gender = $('#user-gender').val();
            var birthday = $('#user-birthday').val();
            var dir = $('#user-dir').val();
            var country = $('#user-country').val();
            var city = $('#user-city').val();
            var postcode = $('#user-postcode').val();

            try {
                var userVal = valUser(user);
                var emailVal = valEmail(email);
                var passEqual = valSamePass(pass, pass2);
                if (passEqual) {
                    var passVal = valPass(pass);
                }
                var name = valNames(name, 1)
                var lastnameVal = valNames(lasname, 2);
                var genderVal = valGender(gender);
                var birthdayVal = "";//Pendiente//
                var dirVal = valDir(dir);
                var countryVal = valNames(country, 3);
                var cityVal = valNames(city, 4);
                var postcodeVal = valPostCode(postcode);
            } catch (err) {
                console.log(err);
                toastr.success(err);

            }

        }
    });
}

function login(user, pass) {
    ajaxPromise('/jquery_php/module/log/controller/controller_log.php?op=login', 'POST', 'JSON', { user: user, pass: pass })
        .then(function (userLog) {
            if (userLog == "error") {
                console.log("error");
            } else {
                localStorage.setItem("user-log", JSON.stringify(userLog));
                localStorage.setItem("token-log", userLog);
                window.location.reload();
            }
        }).catch(function (err) {
            console.log(err);
        });

}

function logout() {

    localStorage.removeItem("token-log");
    localStorage.removeItem("user-type");

}


//------------------VALIDATORS-------------------\\

function valUser(text) {
    if (text.length > 3) {
        var reg = /^[a-zA-Z]*$/;
        return reg.test(text);
    }
    throw "Error: Invalid Username";
}

function valPass(text) {
    if (text.length > 4) {
        var reg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        return reg.test(text);
    }
    throw "Error: Invalid Password";
}

function valEmail(text) {
    if (text.length > 5) {
        var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
        return reg.test(text);
    }
    throw "Error: Invalid Email";
}


function valDir(text) {
    if (text.length > 5) {
        var reg = /[A-Za-z0-9'\.\-\s\,]/;
        return reg.test(text);
    }
    throw "Error: Invalid Direcction";
}

function valSamePass(pass, pass2) {
    if (pass == pass2) {
        return true;
    }
    throw "Error: Passwords aren't the same";
}

function valNames(text, error) {
    switch (error) {
        case 1:
            error = "Error: Invalid First Name";
            break;
        case 2:
            error = "Error: Invalid Last Name";
            break;
        case 3:
            error = "Error: Invalid Country";
            break;
        case 4:
            error = "Error: Invalid City";
            break;
        default:
            error = "Error: Invalid Field";
            break;
    }
    if (text.length > 5) {
        var reg = /^([A-Za-zÀ-ÖØ-öø-ÿ'.]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'.]+){0,2})$/;
        return reg.test(text);
    }
    throw error;
}

function valGender(text) {
    if (text) {
        return true;
    }
    throw "Error: Invalid Gender";
}

function valPostCode(text) {
    if (text.length > 5) {
        return true;
    }
    throw "Error: Invalid Post Code";
}

$(document).ready(function () {
    sessionStatus();
});