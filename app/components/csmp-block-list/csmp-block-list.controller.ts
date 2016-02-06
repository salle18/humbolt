import {Component} from "angular2/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {IMetaJSONBlock} from "../../csmp/Block";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-block-list",
	templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
	directives: [CsmpUpgradeElement, CsmpCloneBlock]
})
export class CsmpBlockList {

	public blocks:IMetaJSONBlock[];

	constructor(private appService:AppService) {
		this.blocks = this.appService.metaBlocks;
	}

}
