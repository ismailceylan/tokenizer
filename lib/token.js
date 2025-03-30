import { lineCount } from "./helpers";

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
	line = 1;

	/**
	 * The start position of the token.
	 * 
	 * @type {number}
	 */
	start = 1;

	/**
	 * The end position of the token.
	 * 
	 * @type {number}
	 */
	end = 1;

	constructor( name, value = "" )
	{
		this.name = name;
		this.value = value;
		this.end = ( value || "" ).length;
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

	/**
	 * Aligns the current token to another token.
	 * 
	 * This method updates the line, start, and end properties of the current token
	 * to align with the given token's line and end position.
	 *
	 * @param {Token} token - The token to align this token to.
	 * @returns {Token} The updated token instance.
	 */
	alignTo( token )
	{
		this.line = token.line;
		this.start = token.end + 1;
		this.end = this.start + this.end;

		return this;
	}

	/**
	 * Concatenates the given text to the end of the token.
	 * 
	 * Updates the token's value, line number, and end position.
	 * 
	 * @param {string} text - The text to concatenate.
	 * 
	 * @returns {Token} The updated token instance.
	 */
	concat( text )
	{
		const lineCountOfGivenText = lineCount( text ) - 1;

		this.value += text;
		this.end += text.length;

		if( lineCountOfGivenText > 0 )
		{
			this.line += lineCountOfGivenText;
		}
	}
}
