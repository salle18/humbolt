import {Injectable} from "angular2/core";
import {SnackbarService} from "../../modules/snackbar/SnackbarService";
import {ModalService} from "../../modules/modal/ModalService";
import {HumboltLoader} from "../../components/humbolt-loader/humbolt-loader.controller";
import {ModalInstance} from "../../modules/modal/ModalInstance";
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
        this.modalInstance.then(instance => instance.close());
    }

    success(message:string):void {
        this.show(message);
    }

    info(message:string):void {
        this.show(message);
    }

    error(message:string):void {
        this.show(message);
    }

    warning(message:string):void {
        this.show(message);
    }

    handleError(error:any) {
        this.error(this.errorHandler.handle(error));
    }

    private show(message:string):void {
        this.snackbarService.showSnackbar({
            message: message,
            timeout: this.timeout
        });
    }
}
