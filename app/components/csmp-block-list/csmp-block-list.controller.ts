import {Component} from "angular2/angular2";
import {Block} from "../../csmp/Block";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";
import {ServerService} from "../../core/services/ServerService";

@Component({
	selector: "csmp-block-list",
	templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
	directives: [CsmpCloneBlock]
})
export class CsmpBlockList {

	public blocks:Block[] = [];

	constructor(serverService:ServerService) {

		this.blocks = serverService.getBlocks();

	}
}
