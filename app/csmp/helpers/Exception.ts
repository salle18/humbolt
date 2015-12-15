/**
 * Klasa za definisanje izuzetaka.
 */
class Exception extends Error {

	public message:string = "";

	constructor(message:string = "") {
		super(message);
		this.message = message;
	}

	toString() {
		return this.message;
	}
}

export class Calculation extends Exception {

}

export class DivideByZero extends Exception {

}

export class NotImplemented extends Exception {

}

export class QuitSimulation extends Exception {

}

export class Simulation extends Exception {

}
