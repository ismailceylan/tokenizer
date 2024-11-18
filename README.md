# Tokenizer
This javascript library converts the given strings to universal tokens. With the help of this tokens, language specific parsers can be created. It can tokenize every kind of text, calculate token coordinates and line numbers.

## Installation
`npm install @iceylan/tokenizer`

## Usage
```js
import tokenizer from "@iceylan/tokenizer";

const SPACE = Symbol( "space" );
const EXCLAMATION = Symbol( "excla" );
const NEWLINE = Symbol( "newline" );

const tokens = tokenizer( "Hello \n world!",
[
	[ SPACE , " " ],
	[ NEWLINE , "\n" ],
	[ EXCLAMATION, "!" ],
]);
```

The result of this example will be:

```js
[
	{ name: Symbol( "blank" ), value: "Hello", start: 1, end: 5, line: 1 },
	{ name: Symbol( "space" ), value: " ",     start: 5, end: 6, line: 1 },
	{ name: Symbol( "newline" ), value: "\n",  start: 6, end: 7, line: 2 },
	{ name: Symbol( "space" ), value: " ",     start: 7, end: 8, line: 2 },
	{ name: Symbol( "blank" ), value: "world", start: 8, end: 13, line: 2 },
	{ name: Symbol( "excla" ), value: "!",     start: 13, end: 14, line: 2 }
]
```
