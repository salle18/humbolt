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

	public user = {
		name: "Korisnik"
	};

	constructor(private appService:AppService) {
	}

	logout():void {
		this.appService.logout();
	}
}
