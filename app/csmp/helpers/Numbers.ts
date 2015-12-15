/**
 * Klasa za rad sa point float brojevima.
 */
export class Numbers {

	/**
	 * Epsilon dozvoljena greška.
	 */
	static epsilon:number = 0.00001;

	/**
	 * @return Da li su brojevi jednaki za dozvoljenu grešku.
	 */
	static equal(a:number, b:number):boolean {
		return Math.abs(a - b) < Numbers.epsilon;
	}

	/**
	 * @return Da li su brojevi celobrojno deljivi za zadatu grešku.
	 */
	static divideable(a:number, b:number):boolean {
		let x = Math.floor(a / b);
		return Numbers.equal(a, b * x);
	}

	/**
	 * @return Broj decimala broja.
	 */
	static numOfDecimals(a:number) {
		if (Math.floor(a) === a) {
			return 0;
		}
		return a.toString().split(".")[1].length || 0;
	}
}
