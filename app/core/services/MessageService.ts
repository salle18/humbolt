import {Injectable} from "angular2/core";
import {SnackbarService} from "../../modules/snackbar/SnackbarService";

@Injectable()
export class MessageService {

	private timeout:number = 2000;

	constructor(private snackbarService:SnackbarService) {
	}

	success(message:string):void {
		this.show(message);
	}

	info(message:string):void {
		this.show(message);
	}

	error(message:string):void {
		this.show(message);
		console.error(message);
	}

	warning(message:string):void {
		this.show(message);
	}

	private show(message:string):void {
		this.snackbarService.showMessage({
			message: message,
			timeout: this.timeout
		});
	}
}
