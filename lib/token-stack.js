import { BLANK } from "./constants";
import Token from "./token";

/**
 * Represents a stack of tokens.
 */
export default class TokenStack extends Array
{
	/**
	 * Appends the given string to the latest text node in the stack.
	 * If the stack is empty or the latest token is not a text node,
	 * a new text node is created. The cursor position is updated
	 * as well.
	 *
	 * @param {string} text - The text to append
	 */
	pushToLatestTextNode( text )
	{
		let latest = this[ this.length - 1 ];

		if( ! latest )
		{
			this.push(
				latest = new Token( BLANK )
			);
		}
		else if( latest?.name !== BLANK )
		{
			this.push(
				latest = new Token(
					BLANK, "", latest.line, latest.ends, latest.ends
				)
			);
		}
		else
		{
			latest.end += text.length;
		}

		latest.value += text;
	}

	/**
	 * Adds a token to the stack and returns the new
	 * length of the stack.
	 *
	 * @param {Token} token The token to add.
	 * @returns {number} The stack itself.
	 */
	push( token )
	{
		const latest = this[ this.length - 1 ];

		if( latest )
		{
			token.start = latest.end;
			token.line = latest.line + token.value.split( "\n" ).length - 1;
			token.end = token.start + token.value.length;
		}

		return super.push( token );
	}
}
