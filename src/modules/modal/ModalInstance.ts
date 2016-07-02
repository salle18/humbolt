import {ComponentRef} from "@angular/core";

export class ModalInstance {

    public contentReference:ComponentRef;
    public modalReference:ComponentRef;

    constructor() {
        return;
    }

    close():void {
        this.contentReference.destroy();
        this.modalReference.destroy();
    }

}
