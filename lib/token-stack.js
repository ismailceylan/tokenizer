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
	 * a new text node is created.
	 *
	 * @param {string} text - The text to append
	 */
	pushToLatestTextNode( text )
	{
		// let's try to grab the latest node
		let latest = this[ this.length - 1 ];

		// if array is empty
		if( ! latest )
		{
			this.push(
				// create a new text node
				latest = new Token( BLANK, text )
			);
		}
		// if the latest token is not a text node
		else if( latest?.name !== BLANK )
		{
			this.push(
				// create a new text node
				latest = new Token(
					BLANK, text
				)
			);
		}
		// if the latest token is a text node
		else if( latest.name === BLANK )
		{			
			latest.value += text;
			latest.end += text.length;
		}
	}

	/**
	 * Adds a token to the stack and returns the new length of
	 * the stack.
	 *
	 * @param {Token} token The token to add.
	 * @returns {number}
	 */
	push( token )
	{
		const latest = this[ this.length - 1 ];

		if( latest )
		{
			token.start = latest.end + 1;
			token.end = token.start + token.value.length - 1;
			token.line = latest.line + token.value.split( "\n" ).length - 1;
		}

		return super.push( token );
	}
}
