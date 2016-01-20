import {Component} from "angular2/angular2";
import {Block, IMetaJSONBlock} from "../../csmp/Block";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-block-list",
	templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
	directives: [CsmpCloneBlock]
})
export class CsmpBlockList {

	private appService:AppService;

	public blocks:Block[] = [];

	constructor(appService:AppService) {
		this.appService = appService;
		this.getBlocks();
	}

	getBlocks() {
		this.appService.getBlocks().subscribe(
			blocks => this.blocks = blocks
		);
	}
}
