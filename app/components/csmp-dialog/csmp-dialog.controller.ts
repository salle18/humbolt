import {Component, OnInit, ElementRef} from "angular2/core";
import {IJSONSimulation} from "../../csmp/Simulation";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-dialog",
	templateUrl: "components/csmp-dialog/csmp-dialog.template.html",
	host: {
		class: "mdl-card mdl-shadow--3dp"
	}
})
export class CsmpDialog {

	private simulations:IJSONSimulation[];

	constructor(private appService:AppService, private elementRef:ElementRef) {
		this.simulations = this.appService.simulations;
	}

	ngOnInit():void {
		jQuery(this.elementRef.nativeElement).draggable();
	}

	removeSimulation(id:string):void {
		this.appService.removeSimulation(id);
	}

}
