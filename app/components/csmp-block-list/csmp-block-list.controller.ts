import {Component} from "angular2/angular2";
import {Block} from "../../csmp/Block";
import * as BlockDefinitions from "../../csmp/BlockDefinitions";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";


@Component({
	selector: "csmp-block-list",
	templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
	directives: [CsmpCloneBlock]
})
export class CsmpBlockList {

	public blocks:Block[] = [];

	constructor() {
		for (let key in BlockDefinitions) {
			this.blocks.push(new BlockDefinitions[key]);
		}
	}
}
