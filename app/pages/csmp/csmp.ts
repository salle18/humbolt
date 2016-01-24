"use strict";

import { Component } from "angular2/core";
import { CsmpMenu } from "../../components/csmp-menu/csmp-menu.controller";
import { CsmpPanel } from "../../components/csmp-panel/csmp-panel.controller";
import { CsmpBlockList } from "../../components/csmp-block-list/csmp-block-list.controller";
import { CsmpCanvas } from "../../components/csmp-canvas/csmp-canvas.controller";
import { CsmpInspector } from "../../components/csmp-inspector/csmp-inspector.controller";
import {CsmpPannable} from "../../directives/csmp-pannable";

@Component({
	selector: "page-home",
	templateUrl: "pages/csmp/csmp.template.html",
	directives: [CsmpMenu, CsmpPanel, CsmpBlockList, CsmpCanvas, CsmpPannable, CsmpInspector]
})
export class Csmp {

	constructor() {
		console.log("Csmp component loaded");
	}
}