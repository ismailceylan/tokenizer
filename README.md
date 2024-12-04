# Tokenizer
This javascript library converts the given strings to universal tokens. With the help of this tokens, language specific parsers can be created. It can tokenize every kind of text, calculate token coordinates with line numbers.

## Playground
You can try it out [here](https://ismailceylan.github.io/tokenizer/) in a real world application.

## Installation
`npm install @iceylan/tokenizer`

## Usage
```js
import tokenize from "@iceylan/tokenizer";

const SPACE = Symbol( "space" );
const EXCLAMATION = Symbol( "excla" );
const PARANTHESIS = Symbol( "parant" );

const tokens = tokenize( "Hello \n\n (world!)",
[
	[ SPACE , " " ],
	[ "newline" , "\n" ],
	[ EXCLAMATION, "!" ],
	[ PARANTHESIS, [ "(", ")" ]]
]);
```

The result of this example will be:

```js
[
	{ name: Symbol( "blank" ),   value: "Hello", start: 1,  end: 5,  line: 1 },
	{ name: Symbol( "space" ),   value: " ",     start: 6,  end: 6,  line: 1 },
	{ name: "newline",           value: "\n",    start: 7,  end: 7,  line: 2 },
	{ name: "newline",           value: "\n",    start: 8,  end: 8,  line: 3 },
	{ name: Symbol( "space" ),   value: " ",     start: 9,  end: 9,  line: 3 },
	{ name: Symbol( "parant" ),  value: "(",     start: 10, end: 10, line: 3 },
	{ name: Symbol( "blank" ),   value: "world", start: 11, end: 15, line: 3 },
	{ name: Symbol( "excla" ),   value: "!",     start: 16, end: 16, line: 3 },
	{ name: Symbol( "parant" ),  value: "(",     start: 17, end: 17, line: 3 }
]
```

## Token Merging
By default, repeated tokens will not be merged. The Tokenizer only merges adjacent text tokens by default but you can change this behavior by setting the `mergeTokens` option to `true`. So the Tokenizer will merge all the adjacent tokens into a single token.

```js
const text = "Hello   World";
const rules =
[
	[ "space" , " " ],
];

const tokens = tokenize( text, rules, { mergeTokens: true });
```

The result of this example will be:

```js
[
	{ name: Symbol( "blank" ), value: "Hello",  start: 1,  end: 5,  line: 1 },

	// instead of this
	// { name: "space", value: " ",   start: 6, end: 6, line: 1 },
	// { name: "space", value: " ",   start: 7, end: 7, line: 1 },
	// { name: "space", value: " ",   start: 8, end: 8, line: 1 },
	
	// the space tokens will be merged into one
	{ name: "space",    value: "   ", start: 6, end: 8, line: 1 },

	{ name: Symbol( "blank" ), value: "World", start: 9, end: 13, line: 2 },
]
```
