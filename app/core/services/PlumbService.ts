import "sporritt/jsPlumb";

declare let jsPlumb:any;

export class PlumbService {

	private instance:JsPlumbInstance;

	constructor() {
		jsPlumb.ready(() => {
			this.instance = jsPlumb.getInstance();
		});
	}

	getInstance():JsPlumbInstance {
		return this.instance;
	}

}
