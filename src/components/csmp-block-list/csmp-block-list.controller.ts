import {Component} from "@angular/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {CsmpCloneBlock} from "../../directives/csmp-clone-block";
import {CsmpAppService} from "../../services";
import {IMetaJSONBlock} from "../../csmp/interfaces/IMetaJSONBlock";

@Component({
    selector: "csmp-block-list",
    templateUrl: "components/csmp-block-list/csmp-block-list.template.html",
    directives: [CsmpUpgradeElement, CsmpCloneBlock]
})
export class CsmpBlockList {

    public blocks:IMetaJSONBlock[];

    constructor(private appService:CsmpAppService) {
        this.blocks = this.appService.metaBlocks;
    }

}
