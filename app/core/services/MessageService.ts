export class MessageService {

	success(message:string):void {
		alert(message);

	}

	info(message:string):void {
		alert(message);
	}

	error(message:string):void {
		alert(message);
		console.error(message);
	}

	warning(message:string):void {
		alert(message);
	}

	confirm(message:string):boolean {
		return true;
	}
}
