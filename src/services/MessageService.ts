import {Injectable} from "@angular/core";
import {SnackbarService} from "../modules/snackbar/SnackbarService";
import {ModalService} from "../modules/modal/ModalService";
import {HumboltLoader} from "../../components/humbolt-loader/humbolt-loader.controller";
import {ModalInstance} from "../modules/modal/ModalInstance";
import {ErrorHandler} from "./ErrorHandler";

@Injectable()
export class MessageService {

    private timeout:number = 3000;
    private modalInstance:Promise<ModalInstance>;

    constructor(private snackbarService:SnackbarService, private modal:ModalService, private errorHandler:ErrorHandler) {
    }

    loader():void {
        this.modalInstance = this.modal.open(<any>HumboltLoader, []);
    }

    hideLoader():void {
        if (this.modalInstance) {
            this.modalInstance.then(instance => {
                instance.close();
                this.modalInstance = null;
            });
        }
    }

    success(message:string, actionHandler:()=>void = null, actionText:string = ""):void {
        this.show(message, actionHandler, actionText);
    }

    info(message:string, actionHandler:()=>void = null, actionText:string = ""):void {
        this.show(message, actionHandler, actionText);
    }

    error(message:string, actionHandler:()=>void = null, actionText:string = ""):void {
        this.show(message, actionHandler, actionText);
    }

    warning(message:string, actionHandler:()=>void = null, actionText:string = ""):void {
        this.show(message, actionHandler, actionText);
    }

    handleError(error:any) {
        this.hideLoader();
        this.error(this.errorHandler.handle(error));
    }

    private show(message:string, actionHandler:()=>void, actionText:string):void {
        this.snackbarService.showSnackbar({
            message: message,
            timeout: this.timeout,
            actionHandler: actionHandler,
            actionText: actionText
        });
    }
}
