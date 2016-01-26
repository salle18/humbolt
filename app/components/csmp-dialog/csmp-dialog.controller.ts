import {Component, OnInit, ElementRef, Input, NgZone} from "angular2/core";
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

	@Input() dialog:any;

	private simulations:IJSONSimulation[];

	constructor(private appService:AppService, private elementRef:ElementRef, private zone:NgZone) {
		this.simulations = this.appService.simulations;
	}

	ngOnInit():void {
		this.zone.runOutsideAngular(() => jQuery(this.elementRef.nativeElement).draggable());
	}

	removeSimulation(id:string):void {
		this.appService.removeSimulation(id);
	}

	close():void {
		this.dialog.visible = false;
	}
}
