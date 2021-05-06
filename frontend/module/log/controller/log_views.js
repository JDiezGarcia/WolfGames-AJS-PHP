import { ajaxPromise } from '/jquery_php/module/utils/utils.js';

function modalLoad() {

    var $modalLogin = $(`<div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header border-bottom-0">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-title text-center">
                                    <h4 data-tr="login"></h4>
                                </div>
                                <div class="d-flex flex-column text-center">
                                    <form>
                                        <div class="form-group">
                                            <input type="user" class="form-control" id="user-email-log"
                                                placeholder="user/email@email.com">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" id="password-log"
                                                placeholder="Password">
                                        </div>
                                        <button type="button" class="btn btn-info btn-block btn-round" id="log-success-button" data-tr="login"></button>
                                    </form>

                                    <div class="text-center text-muted delimiter" data-tr="social-log"></div>
                                    <div class="d-flex justify-content-center social-buttons">
                                        <button type="button" class="btn btn-secondary btn-round" data-toggle="tooltip"
                                            data-placement="top" title="Twitter">
                                            <i class="fa fa-twitter"></i>
                                        </button>
                                        <button type="button" class="btn btn-secondary btn-round" data-toggle="tooltip"
                                            data-placement="top" title="Facebook">
                                            <i class="fa fa-facebook"></i>
                                        </button>
                                        <button type="button" class="btn btn-secondary btn-round" data-toggle="tooltip"
                                            data-placement="top" title="Linkedin">
                                            <i class="fa fa-linkedin"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer d-flex justify-content-center">
                                <div class="signup-section">
                                    <span data-tr="login-section"></span>
                                    <a class="text-info" id="sign-log" data-bs-dismiss="modal"data-bs-toggle="modal"
                                    data-bs-target="#register-modal" style="cursor:pointer;" data-tr="sign-up"></a>.
                                </div>
                            </div>
                        </div>
                    </div>`);

    var $modalRegister = $(`<div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-title text-center">
                                <h4 data-tr="register"></h4>
                            </div>
                            <div class="d-flex flex-column text-center">
                                <form>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-user input-group-text" ></i>
                                        </div>
                                        <input id="username" type="text" class="form-control" placeholder="Username" aria-label="Username">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-envelope input-group-text"></i>
                                        </div>
                                        <input id="user-email" type="text" placeholder="Email Address" class="form-control">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-lock input-group-text"></i>
                                        </div>
                                        <input id="user-pass1" type="password" placeholder="Password" class="form-control">
                                        <input id="user-pass2" type="password" placeholder="Confirm Password" class="form-control">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-id-badge input-group-text"></i>
                                        </div>
                                        <input id="user-name" type="text" placeholder="First Name" class="form-control">
                                        <input id="user-lastname" type="text" placeholder="Last Name" class="form-control">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-transgender input-group-text"></i>
                                        </div>
                                        <select name="gender" id="user-gender" class="form-control">
                                            <option value="" disabled="" selected="">Gender</option>
                                            <option value="male">Male</option>
                                            <option value="femal">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div class="input-group-prepend">
                                            <i class="fa fa-calendar input-group-text"></i>
                                        </div>
                                        <input id="user-birthday" type="date" class="form-control" name="trip-start" placeholder="yyyy-mm-dd" min="1900-01-01">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-home input-group-text"></i>
                                        </div>
                                        <input id="user-dir" type="text" placeholder="Direction" class="form-control">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-flag input-group-text"></i>
                                        </div>
                                        <input  id="user-country" type="text" style="max-width: 140px" placeholder="Country" class="form-control">
                                    </div>

                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-building input-group-text"></i>
                                        </div>
                                        <input id="user-city" type="text" placeholder="City" class="form-control">
                                        <div class="input-group-prepend">
                                            <i class="fa fa-inbox input-group-text"></i>
                                        </div>
                                        <input id="user-postcode" type="text" placeholder="Post-Code" class="form-control">
                                        
                                    </div>

                                    <button type="button" class="btn btn-info btn-block btn-round" id="sign-success-button" data-tr="register"></button>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-center">
                            <div class="login-section">
                                <span data-tr="register-section"></span>
                                <a class="text-info" id="log-section" data-bs-toggle="modal"
                                data-bs-target="#log-modal" data-bs-dismiss="modal" style="cursor:pointer;" data-tr="log-in"></a>.
                            </div>
                        </div>
                    </div>
                </div>`);

    var $modalCloseSession = $(`<div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header border-bottom-0">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-title text-center">
                                    <h4 data-tr="logout"></h4>
                                    <br/>
                                    <p data-tr="close-session"></p>
                                    <button type="button" class="btn btn-info btn-block btn-round" id="log-success-button" data-tr="yes"></button>
                                    <button type="button" class="btn btn-info btn-block btn-round" id="log-close-button" data-bs-dismiss="modal" aria-label="Close" data-tr="no"></button>
                                </div>
                            </div>
                        </div>
                    </div>`);

    $('.container-log').remove();
    var $login = $('.login');
    var $containerLog = $('<div class="container-log"></div>').appendTo($login);

    //LOAD-LOGIN-CONTENT
    if (localStorage.getItem("token-log")) {
        $modalCloseSession.appendTo('#log-modal');
        var user = JSON.parse(localStorage.getItem("user-log"));

        $(`<div class="` + user.user + `" id="login-icon"><img style="max-width: 30px;" src="/jquery_php/view/img/user/` + user.img + `"/><span> ` + user.user + `</span></div>`).appendTo($containerLog);
    } else {
        $modalLogin.appendTo('#log-modal');
        $modalRegister.appendTo('#register-modal');
        $(`<i class="fa fa-user-o" id="login-icon"> <span data-tr="login"></span></i>`).appendTo($containerLog);
    }
}

function menus() {
    var $navmenu = $('#navbar-menu');
    var $menu = $(`<ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
                <a class="nav-link home" href="index.php?page=homepage" data-tr="Home"></a>
        </li>
        <li class="nav-item">
            <a class="nav-link shop" href="index.php?page=shop" data-tr="shop">
                <i class="fa fa-angle-down"></i>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link services" href="index.php?page=services" data-tr="Services">
                <i class="fa fa-angle-down"></i>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link aboutus" href="index.php?page=aboutus" data-tr="AboutUs"></a>
        </li>
        <li class="nav-item">
            <a class="nav-link contactus" href="index.php?page=contactus" data-tr="Contact"></a>
        </li>
        </ul>`).appendTo($navmenu);

    if (localStorage.getItem('user-type')) {
        $(`<li class="nav-item">
        <a class="nav-link user" href="index.php?page=controller_user&op=list" data-tr="user">
        <i class="fa fa-angle-down"></i>
        </a>
        </li>`).appendTo($menu);
    }
}

$(document).ready(function () {
    menus();
    modalLoad();
    //EVENT FOR CLICK ON SHOP NAV
    $('.nav-item .shop').on('click', function () {
        localStorage.setItem('shop', 'all-products');
    });
});