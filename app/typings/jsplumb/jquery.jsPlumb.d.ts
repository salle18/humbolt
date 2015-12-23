// Type definitions for jsPlumb 1.3.16 jQuery adapter
// Project: http://jsplumb.org
// Definitions by: Steve Shearn <https://github.com/shearnie/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../jquery/jquery.d.ts"/>

declare var jsPlumb:JsPlumbInstance;

interface JsPlumbInstance {
	setRenderMode(renderMode:string): string;
	bind(event:string, callback:(e) => void): void;
	unbind(event?:string): void;
	ready(callback:() => void): void;
	importDefaults(defaults:Defaults): void;
	Defaults: Defaults;
	restoreDefaults(): void;
	addClass(el:any, clazz:string): void;
	addEndpoint(element:string | JQuery, anchor:any, ep:any): any;
	removeClass(el:any, clazz:string): void;
	hasClass(el:any, clazz:string): void;
	draggable(el:string, options?:DragOptions): JsPlumbInstance;
	draggable(ids:string[], options?:DragOptions): JsPlumbInstance;
	draggable(element:JQuery, options?:DragOptions): JsPlumbInstance;
	draggable(elements:JQuery[], options?:DragOptions): JsPlumbInstance;
	connect(connection:ConnectParams, referenceParams?:ConnectParams): Connection;
	makeSource(el:string, options:SourceOptions): void;
	makeTarget(el:string, options:TargetOptions): void;
	repaintEverything(): void;
	detach(el:JQuery): void;
	detachEveryConnection(): void;
	detachAllConnections(el:string | JQuery, params?:{ fireEvent?: boolean }): void;
	removeAllEndpoints(el:string | JQuery, recurse?:boolean): JsPlumbInstance;
	removeAllEndpoints(el:Element, recurse?:boolean): JsPlumbInstance;
	select(params:SelectParams): Connections;
	getConnections(options?:any, flat?:any): any[];
	deleteEndpoint(uuid:string, doNotRepaintAfterwards?:boolean): JsPlumbInstance;
	deleteEndpoint(endpoint:Endpoint, doNotRepaintAfterwards?:boolean): JsPlumbInstance;
	repaint(el:string | JQuery): JsPlumbInstance;
	reset(): void;
	getInstance(): JsPlumbInstance;
	getInstance(defaults:Defaults): JsPlumbInstance;
	getInstanceIndex(): number;
	setContainer(element:string | JQuery): void;
	selectEndpoints(el:ISelectEndpoints): any;

	SVG: string;
	CANVAS: string;
	VML: string;
}

interface ISelectEndpoints {
	element?: string | JQuery;
	source?: string | JQuery;
	target?: string | JQuery;
	scope?: string;
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
	setDetachable(detachable:boolean): void;
	setParameter<T>(name:string, value:T): void;
	endpoints: Endpoint[];
}

interface Endpoint {
}
