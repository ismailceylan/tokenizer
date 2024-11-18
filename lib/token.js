/**
 * Represents a token.
 */
export default class Token
{
	/**
	 * The name of the token.
	 * 
	 * @type {Symbol}
	 */
	name;

	/**
	 * The value of the token.
	 * 
	 * @type {string}
	 */
	value;

	/**
	 * The line number of the token.
	 * 
	 * @type {number}
	 */
	line;

	/**
	 * The start position of the token.
	 * 
	 * @type {number}
	 */
	start;

	/**
	 * The end position of the token.
	 * 
	 * @type {number}
	 */
	end;

	constructor( name, value = "", line = 1, start = 1, end = 1 )
	{
		this.name = name;
		this.value = value;
		this.line = line;
		this.start = start;
		this.end = end;
	}

	/**
	 * Returns the length of the token's value.
	 * 
	 * @returns {number} The length of the value string.
	 */
	get length()
	{
		return this.value.length;
	}
}
