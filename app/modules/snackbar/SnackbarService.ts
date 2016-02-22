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

    private snackBar:any = null;

    constructor(private dcl:DynamicComponentLoader, private appRef:ApplicationRef) {
    }

    showSnackbar(data:IMessageData):void {
        if (!this.snackBar) {
            this.addSnackbarBox().then(snackBarBox => {
                this.snackBar = snackBarBox.firstChild;
                setTimeout(() => {
                    this.displayData(data);
                }, 0);
            });
        } else {
            this.displayData(data);
        }
    }

    private displayData(data:IMessageData):void {
        this.snackBar.MaterialSnackbar.showSnackbar(data);
    }

    private addSnackbarBox():Promise<any> {
        let appRef = this.appRef["_rootComponents"][0].location;
        return this.dcl.loadNextToLocation(Snackbar, appRef, [])
            .then(componentRef => {
                return componentRef.location.nativeElement;
            });
    }

}
