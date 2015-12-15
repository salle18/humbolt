import {RungeKutta} from "./IntegrationMethod";

/**
 * Euler metoda Runge Kutta prvog reda.
 */
export class Euler extends RungeKutta {

	protected description:string = "Euler";
	protected className:string = "Euler";
	protected table:number[][] = [
		[0, 0],
		[1, 1]
	];
}

/**
 * Srednja tačka Runge Kutta metoda drugog reda.
 */
export class MiddlePoint extends RungeKutta {

	protected description:string = "Metoda srednje tačke";
	protected className:string = "MiddlePoint";
	protected table:number[][] = [
		[0, 0, 0],
		[1 / 2, 1 / 2, 0],
		[1, 0, 1]
	];
}

/**
 * Heun metoda Runge Kutta drugog reda.
 */
export class Heun extends RungeKutta {

	protected description:string = "Heun";
	protected className:string = "Heun";
	protected table:number[][] = [
		[0, 0, 0],
		[1, 1, 0],
		[1, 1 / 2, 1 / 2]
	];
}

/**
 * Ralston metoda Runge Kutta drugog reda.
 */
export class Ralston extends RungeKutta {

	protected description:string = "Ralston";
	protected className:string = "Ralston";
	protected table:number[][] = [
		[0, 0, 0],
		[2 / 3, 2 / 3, 0],
		[1, 1 / 4, 3 / 4]
	];
}

/**
 * Klasična Runge Kutta metoda trećeg reda.
 */
export class RungeKuttaIII extends RungeKutta {

	protected description:string = "Runge Kutta III";
	protected className:string = "RungeKuttaIII";
	protected table:number[][] = [
		[0, 0, 0, 0],
		[1 / 2, 1 / 2, 0, 0],
		[1, -1, 2, 0],
		[1, 1 / 6, 2 / 6, 1 / 6]
	];
}

/**
 * Klasična Runge Kutta metoda četvrtog reda.
 */
export class RungeKuttaIV extends RungeKutta {

	protected description:string = "Runge Kutta IV";
	protected className:string = "RungeKuttaIV";
	protected table:number[][] = [
		[0, 0, 0, 0, 0],
		[1 / 2, 1 / 2, 0, 0, 0],
		[1 / 2, 0, 1 / 2, 0, 0],
		[1, 0, 0, 1, 0],
		[1, 1 / 6, 2 / 6, 2 / 6, 1 / 6]
	];
}

/**
 * Modifikacija klasične Runge Kutta metoda 3/8.
 */
export class RungeKuttaIV38 extends RungeKutta {

	protected description:string = "Runge Kutta IV 3/8";
	protected className:string = "RungeKuttaIV38";
	protected table:number[][] = [
		[0, 0, 0, 0, 0],
		[1 / 3, 1 / 3, 0, 0, 0],
		[2 / 3, -1 / 3, 1, 0, 0],
		[1, 1, -1, 1, 0],
		[1, 1 / 8, 3 / 8, 3 / 8, 1 / 8]
	];
}
