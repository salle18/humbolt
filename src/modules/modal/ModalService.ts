import {DynamicComponentLoader, Injectable, ApplicationRef, ResolvedProvider, ComponentRef, Injector, provide} from "@angular/core";
import {Type} from "@angular/src/facade/lang";
import {Modal} from "./components/modal.controller";
import {ModalInstance} from "./ModalInstance";
import "GoogleChrome/dialog-polyfill";

declare var dialogPolyfill:any;

@Injectable()
export class ModalService {

    constructor(private dcl:DynamicComponentLoader, private appRef:ApplicationRef) {
    }

    open(component:Type, bindings:ResolvedProvider[]):Promise<ModalInstance> {
        let modalInstance = new ModalInstance();
        let modalBindings = Injector.resolve([provide(ModalInstance, {useValue: modalInstance})]);
        let contentBindings = Injector.resolve([provide(ModalInstance, {useValue: modalInstance})]).concat(bindings);
        return this.addModal(modalBindings).then(modalReference => {
            modalInstance.modalReference = modalReference;
            return this.dcl.loadIntoLocation(component, modalReference.location, "modal", contentBindings).then(contentReference => {
                let dialogElement = modalReference.location.nativeElement;
                if (!dialogElement.showModal) {
                    dialogPolyfill.registerDialog(dialogElement);
                }
                dialogElement.showModal();
                modalInstance.contentReference = contentReference;
                return modalInstance;
            });
        });
    }

    private addModal(bindings:ResolvedProvider[]):Promise<ComponentRef> {
        let appRef = this.appRef["_rootComponents"][0].location;
        return this.dcl.loadNextToLocation(Modal, appRef, bindings);
    }

}
