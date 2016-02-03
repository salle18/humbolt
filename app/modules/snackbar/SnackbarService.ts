import {DynamicComponentLoader, Injectable, ApplicationRef, ElementRef} from "angular2/core";
import {Type} from "angular2/src/facade/lang";
import {Snackbar} from "./components/snackbar.controller";

export interface IMessageData {
	message: string;
	timeout: number;
	actionHandler?(event:Event):void;
	actionText?: string;
}


@Injectable()
export class SnackbarService {

	private messageBox:any = null;

	constructor(private dcl:DynamicComponentLoader, private appRef:ApplicationRef) {
		this.addMessageBox().then(messageBox => this.messageBox = messageBox);
	}

	showMessage(data: IMessageData) {
		if (this.messageBox) {
			this.messageBox.MaterialSnackbar.showSnackbar(data);
		}
	}

	addMessageBox():Promise<any> {
		let appRef = this.appRef["_rootComponents"][0].location;
		return this.dcl.loadNextToLocation(Snackbar, appRef, [])
			.then(componentRef => {
				return componentRef.location.nativeElement;
			});
	}

}
