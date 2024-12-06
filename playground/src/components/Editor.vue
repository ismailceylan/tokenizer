<template>
	<div
		id="editor"
		contenteditable="true"
		spellcheck="false"
		@input="onEditorChange( $event )"
	/>
</template>

<script setup>
import { inject, watch } from "vue";
import { tokenize, BLANK } from "../../../index";
import { throttle } from "mark3/helper/function";
import select from "selection-range";

const rules = inject( "rules" );
const tokens = inject( "tokens" );

watch(
	rules,
	throttle(() =>
		onEditorChange({ target: document.querySelector( "#editor" )}),
		350
	),
	{ deep: true }
);

/**
 * Re-tokenizes the current editor content and updates the DOM
 * 
 * @param {Event} event
 */
function onEditorChange({ target })
{
	const value = target.innerText.split( "" ).map( i => i.charCodeAt( 0 ) == 160? " " : i ).join( "" );
	let html = "";
	
	tokens.value = tokenize( value, normalizedRules( rules ), { mergeTokens: true });

	for( const token of tokens.value )
	{
		if( token.name === BLANK )
		{
			html += token.value;
		}
		else if( token.name === "nl" )
		{
			html += "<br>";
		}
		else
		{
			html += `<span class="token ${token.name} ${rules[ token.name ].className}">${token.value.replace( / /g, "&nbsp;" )}</span>`;
		}
	}

	const oldPos = select( target );

	target.innerHTML = html;

	select( target, oldPos );
}

function normalizedRules( rules )
{
	const rulesStack = [];

	for( const rule in rules )
	{
		rulesStack.push([ rule, rules[ rule ].targets ]);
	}

	return rulesStack;
}

</script>

<style scoped>
div {
	background-color: #111;
    border: 0;
    outline: 0;
    padding: 15px 15px 20px 15px;
    border-radius: 14px;
    font: 100 18px monospace, serif;
	width: 625px;
	flex-shrink: 0;
	white-space: break-spaces;
}

</style>

<style>
.token.orangered {
    color: orangered;
}

.token.orange {
    color: orange;
}

.token.blueviolet {
    color: blueviolet;
}

.token.silver {
	color: silver;
}

.token.aliceblue {
	color: aliceblue;
}

</style>
