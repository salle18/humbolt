import {Component, DoCheck} from "angular2/core";
import {IMetaJSONBlock} from "../../csmp/Block";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-block-list",
	templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
	directives: [CsmpCloneBlock]
})
export class CsmpBlockList implements DoCheck {

	private appService:AppService;

	public blocks:IMetaJSONBlock[] = [];

	constructor(appService:AppService) {
		this.appService = appService;
	}
	
	ngDoCheck(): void {
		if (!this.blocks.length) {
			this.blocks = this.appService.getMetaBlocks();
		}
	}
	
}
