import Token from "./token";

/**
 * Represents a stack of tokens.
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

		// if array is empty
		if( ! latest )
		{
			this.push(
				// create a new text node
				latest = new Token(
					nodeName,
					text,
					undefined,
					undefined,
					( text || "" ).length
				)
			);

		}
		else if( latest.name !== nodeName )
		{
			this.push(
				// create a new text node
				latest = new Token(
					nodeName,
					text,
					latest.line,
					latest.start + 1,
					( text || "" ).length
				)
			);
		}
		// if the latest token is a text node
		else if( latest.name === nodeName )
		{			
			latest.value += text;
			latest.end += text.length;
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
			token.line = latest.line + token.value.split( "\n" ).length - 1;
		}

		return super.push( token );
	}
}
