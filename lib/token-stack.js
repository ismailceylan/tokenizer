import Token from "./token";
import { lineCount } from "./helpers";

/**
 * Represents a stack of tokens.
 * 
 * @template Token[]
 */
export default class TokenStack extends Array
{
	/**
	 * Gets the first token from the stack.
	 * 
	 * @returns {Token}
	 */
	get first()
	{
		return this[ 0 ];
	}

	/**
	 * Gets the last token from the stack.
	 * 
	 * @returns {Token}
	 */
	get latest()
	{
		return this[ this.length - 1 ];
	}

	/**
	 * Appends the given string to the latest text node in the stack.
	 * If the stack is empty or the latest token is not a text node,
	 * a new text node is created. It returns the latest token.
	 *
	 * @param {string} text - The text to append
	 * @param {string|Symbol} nodeName - The name of the node
	 * @returns {Token}
	 */
	pushToLatestNode( text, nodeName )
	{
		// let's try to grab the latest node
		let latest = this[ this.length - 1 ];

		// if stack is empty
		if( ! latest )
		{
			this.push(
				// create a new text node
				latest = new Token( nodeName, text )
			);
		}
		// if latest token is not same as given token
		else if( latest.name !== nodeName )
		{
			// we can't merge different tokens, so create a new one
			this.push(
				// create a new text node
				( latest = new Token( nodeName, text ))
					.alignTo( latest )
			);
		}
		// if the latest token name is same as given token
		else if( latest.name === nodeName )
		{
			latest.concat( text );
		}

		return latest;
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
			token.line = latest.line + lineCount( token.value ) - 1;
		}

		return super.push( token );
	}

	/**
	 * Converts the stack of tokens into a single string by
	 * concatenating the values of each token.
	 *
	 * @returns {string} The concatenated string of token values.
	 */
	toString()
	{
		return this
			.map( i => i.value )
			.join( "" );
	}
}
