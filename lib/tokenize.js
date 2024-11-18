import Token from "./token";
import TokenStack from "./token-stack";
import Stream from "@iceylan/ascii-byte-stream";

/**
 * Tokenizes a given string using a set of rules and returns a `TokenStream` object.
 *
 * @param {string} str - The string to be tokenized.
 * @param {[Symbol,string][]} rules - An array of arrays containing the rule name and its target.
 * @return {Token[]} A TokenStream object containing the tokenized string.
 */
export default function tokenize( str, rules )
{
	const tokens = new TokenStack;
	const stream = new Stream( str );
	
	do
	{
		let token;

		for( let [ rule, targets ] of rules )
		{
			if( typeof targets === "string" )
			{
				targets = [ targets ];
			}

			for( const target of targets )
			{
				if( stream.matches( target ))
				{
					token = new Token;
	
					token.name = rule;
					token.value = target;
	
					tokens.push( token );
	
					stream.cursor += target.length - 1;
				}
			}
		}

		if( ! token )
		{
			tokens.pushToLatestTextNode( stream.current );
		}
	}
	while( stream.next !== undefined );

	return tokens;
}
