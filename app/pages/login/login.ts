"use strict";

import {Component} from "angular2/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {AuthService} from "../../core/services/AuthService";
import {ILoginData} from "../../core/services/AuthService";


@Component({
    selector: "page-login",
    templateUrl: "pages/login/login.template.html",
    directives: [CsmpUpgradeElement]
})
export class Login {

    private user:ILoginData = {
        name: "",
        password: ""
    };

    constructor(private authService:AuthService) {
    }

    login():void {
        this.authService.login(this.user);
    }
}
