"use strict";

import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {AppService} from "../../core/services/AppService";
import {IUser} from "../../core/services/AuthService";

@Component({
	selector: "page-hub",
	templateUrl: "pages/hub/hub.template.html",
	directives: [CsmpUpgradeElement, RouterLink]
})
export class Hub {

	public user:IUser;

	constructor(private appService:AppService) {
		this.user = this.appService.user();
	}

	logout():void {
		this.appService.logout();
	}
}
