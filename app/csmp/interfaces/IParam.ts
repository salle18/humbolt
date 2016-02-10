/**
 * Generički interfejs za parametre sa vrednošću i opisom.
 */
export interface IParam<T> {
	description: string;
	value: T;
}
