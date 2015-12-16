declare let jsPlumb:any;

export class PlumbService {

	draggable(element:HTMLElement):void {
		jsPlumb.draggable(element);
	}
}
