import "sporritt/jsPlumb";
import "jqueryui/ui/draggable";

declare let jsPlumb:any;

export class PlumbService {

	draggable(element:HTMLElement):void {
		element.style.position = 'absolute';
		jsPlumb.draggable(element, {
			grid: [50, 50]
		});
	}
}
