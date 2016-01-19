import {Component} from "angular2/angular2";
import {Block, IMetaJSONBlock} from "../../csmp/Block";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";
import {ServerService} from "../../core/services/ServerService";

@Component({
	selector: "csmp-block-list",
	templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
	directives: [CsmpCloneBlock]
})
export class CsmpBlockList {

	private serverService:ServerService;

	public blocks:Block[] = [];

	constructor(serverService:ServerService) {
		this.serverService = serverService;
		this.getBlocks();
	}

	getBlocks() {
		this.serverService.getBlocks().map(res => {
			let blocks = [];
			for (let i = 0; i < (res as IMetaJSONBlock[]).length; i++) {
				blocks[i] = new Block();
				blocks[i].loadMetaJSON(res[i]);
			}
			return blocks;
		}).subscribe(
			blocks => this.blocks = blocks
		);
	}
}
