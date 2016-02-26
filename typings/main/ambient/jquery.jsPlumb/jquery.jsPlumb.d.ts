// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/95f5e492259b6884a0cd726ea71a0cf769aba434/jsplumb/jquery.jsPlumb.d.ts
// Type definitions for jsPlumb 1.3.16 jQuery adapter
// Project: http://jsplumb.org
// Definitions by: Steve Shearn <https://github.com/shearnie/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare var jsPlumb: jsPlumbInstance;

interface jsPlumbInstance {
	setRenderMode(renderMode: string): string;
	bind(event: string, callback: (e: any) => void ): void;
	unbind(event?: string): void;
	ready(callback: () => void): void;
	importDefaults(defaults: Defaults): void;
	Defaults: Defaults;
	restoreDefaults(): void;
	addClass(el: any, clazz: string): void;
    addEndpoint(ep: string, op1: any, op2: any): any;
	removeClass(el: any, clazz: string): void;
	hasClass(el: any, clazz: string): void;
    	draggable(el: string, options?: DragOptions): jsPlumbInstance;
    	draggable(ids: string[], options?: DragOptions): jsPlumbInstance;
    	connect(connection: ConnectParams, referenceParams?: ConnectParams): Connection;
    	makeSource(el: string, options: SourceOptions): void;
    	makeTarget(el: string, options: TargetOptions): void;
    	repaintEverything(): void;
    	detachEveryConnection(): void;
	detachAllConnections(el: string, options: any): void;
    	removeAllEndpoints(el: string, recurse?: boolean): jsPlumbInstance;
    	removeAllEndpoints(el: Element, recurse?: boolean): jsPlumbInstance;
    	select(params: SelectParams): Connections;
    	getConnections(options?: any, flat?: any): any[];
    	deleteEndpoint(uuid: string, doNotRepaintAfterwards?: boolean): jsPlumbInstance;
    	deleteEndpoint(endpoint: Endpoint, doNotRepaintAfterwards?: boolean): jsPlumbInstance;
    repaint(el: string, options?: any): jsPlumbInstance;
    repaint(el: Element, options?: any): jsPlumbInstance;
    	getInstance(): jsPlumbInstance;
    selectEndpoints(options: any):any;
    detach(el: string): void;
	getInstance(defaults: Defaults): jsPlumbInstance;
	getInstanceIndex(): number;
    reset():void;
	
    SVG: string;
    CANVAS: string;
    VML: string;
}

interface Defaults {
	Endpoint?: any[];
	PaintStyle?: PaintStyle;
	HoverPaintStyle?: PaintStyle;
	ConnectionsDetachable?: boolean;
	ReattachConnections?: boolean;
	ConnectionOverlays?: any[][];
    Container?: any; // string(selector or id) or element
    DragOptions?: DragOptions;
}

interface PaintStyle {
	strokeStyle: string;
	lineWidth: number;
}

interface ArrowOverlay {
	location: number;
	id: string;
	length: number;
	foldback: number;
}

interface LabelOverlay {
	label: string;
	id: string;
	location: number;
}

interface Connections {
	detach(): void;
	length: number;
}

interface ConnectParams {
    source?: any; // string, element or endpoint
    target?: any; // string, element or endpoint
	detachable?: boolean;
	deleteEndpointsOnDetach?: boolean;
	endPoint?: string;
	anchor?: string;
	anchors?: any[];
	label?: string;
    uuids?: any[];
}

interface DragOptions {
	containment?: string;
}

interface SourceOptions {
	parent: string;
	endpoint?: string;
	anchor?: string;
	connector?: any[];
	connectorStyle?: PaintStyle;
}

interface TargetOptions {
	isTarget?: boolean;
	maxConnections?: number;
	uniqueEndpoint?: boolean;
	deleteEndpointsOnDetach?: boolean;
	endpoint?: string;
	dropOptions?: DropOptions;
	anchor?: any;
}

interface DropOptions {
	hoverClass: string;
}

interface SelectParams {
	scope?: string;
	source: string;
	target: string;
}

interface Connection {
    setDetachable(detachable: boolean): void;
    setParameter<T>(name: string, value: T): void;
    endpoints: Endpoint[];
}

interface Endpoint {
}
