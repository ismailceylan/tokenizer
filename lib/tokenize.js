import { BLANK } from "./constants";
import Token from "./token";
import TokenStack from "./token-stack";
import Stream from "@iceylan/ascii-byte-stream";

/**
 * Tokenizes a given string using a set of rules and returns a `TokenStack` array object.
 *
 * @param {string} str - The string to be tokenized.
 * @param {[Symbol,string][]} rules - An array of arrays containing the rule name and its target.
 * @param {TokenizeOptions} [options={}] - An object containing optional parameters.
 * @return {TokenStack} A TokenStack array object containing the tokenized string.
 */
export default function tokenize( str, rules, { mergeTokens = false } = {})
{
	const tokens = new TokenStack;
	const stream = new Stream( str );

	do
	{
		let token;

		A: for( let [ rule, targets, { merge: localMerge } = {}] of rules )
		{
			let merge = mergeTokens;

			if( typeof targets === "string" )
			{
				targets = [ targets ];
			}

			if( localMerge !== undefined )
			{
				merge = localMerge;
			}

			for( const target of targets )
			{
				if( stream.matches( target ))
				{
					if( merge )
					{
						token = tokens.pushToLatestNode( target, rule );
					}
					else
					{
						tokens.push(
							token = new Token( rule, target )
						);
					}

					stream.cursor += target.length - 1;
					break A;
				}
			}
		}

		if( ! token )
		{
			tokens.pushToLatestNode( stream.current, BLANK );
		}
	}
	while( stream.next !== undefined );

	return tokens;
}
/**
 * @typedef {Object} TokenizeOptions
 * @property {boolean} [mergeTokens=false] - Whether to merge adjacent text tokens into a single token.
 */
