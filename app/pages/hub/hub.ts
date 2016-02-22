"use strict";

import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {AuthService} from "../../core/services/AuthService";
import {IUser} from "../../core/services/AuthService";

@Component({
    selector: "page-hub",
    templateUrl: "pages/hub/hub.template.html",
    directives: [CsmpUpgradeElement, RouterLink]
})
export class Hub {

    public user:IUser;

    constructor(private authService:AuthService) {
        this.user = this.authService.user();
    }

    logout():void {
        this.authService.logout();
    }
}
