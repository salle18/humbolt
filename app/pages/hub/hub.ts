"use strict";

import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "page-hub",
	templateUrl: "pages/hub/hub.template.html",
	directives: [CsmpUpgradeElement, RouterLink]
})
export class Hub {

	private appService:AppService;

	public user = {
		name: "Korisnik"
	};

	constructor(appService:AppService) {
		this.appService = appService;
	}

	logout():void {
		this.appService.logout();
	}
}
