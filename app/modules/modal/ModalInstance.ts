import {ComponentRef} from "angular2/core";

export class ModalInstance {

    public contentReference:ComponentRef;
    public modalReference:ComponentRef;

    constructor() {
    }

    close():void {
        this.contentReference.dispose();
        this.modalReference.dispose();
    }

}
