/**
 * This function will count the number of lines in given string.
 * 
 * ```js
 * lineCount( "Hello\nWorld" );
 * // => 2
 * ```
 * @param {string} str - The string that will be counted.
 * @returns {number} - Number of lines in given string.
 */
export default function lineCount( str )
{
	return str.split( "\n" ).length;
}
