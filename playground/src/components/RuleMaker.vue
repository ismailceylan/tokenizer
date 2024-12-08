<template>
	<div id="rule-maker">
		<h2>
			Token Definitions
			<label class="merge" for="mergeall">
				<small>merge all tokens</small>
				<input id="mergeall" type="checkbox" v-model="merge">
			</label>
		</h2>

		<div id="form">
			<input placeholder="token label..." v-model="newRuleLabel" style="width:100px">
			<input placeholder="comma separated tokens..." v-model="newRuleTokens" style="width:350px">
			
			<select v-model="newRuleColor">
				<option v-for="name of classList" :value="name" v-text="name" />
			</select>
			
			<button @click="addRule">
				<FontAwesomeIcon :icon="PlusIcon" />
			</button>
		</div>

		<div id="rules">
			<div class="rule" v-for="( rule, label ) in rules">
				<h3 class="label" :style="{ color: rule.className }">{{ label }}</h3>
				
				<div class="close" @click="removeRule( label )">
					<FontAwesomeIcon :icon="CloseIcon" />
				</div>
				
				<div class="tokens">
					<span
						class="token"
						v-for="token of rule.targets"
						v-text="token.replace( ' ', '\\s' ).replace( '\t', '\\t' ).replace( '\n', '\\n' )"
					/>
				</div>

				<label class="merge">
					merge such tokens
					<input
						type="checkbox"
						:checked="rule?.options?.mergeTokens !== undefined ? rule?.options?.mergeTokens : merge"
						@change="rule.options = {}; rule.options.mergeTokens = $event.target.checked"
					>
				</label>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, ref } from "vue";
import CloseIcon from "font-awesome/src/regular/close";
import PlusIcon from "font-awesome/src/solid/plus-large";

const rules = inject( "rules" );
const merge = inject( "merge" );
const newRuleLabel = ref( "" );
const newRuleTokens = ref( "" );
const newRuleColor = ref( "" );

const classList = [ "orangered", "orange", "blueviolet", "silver", "aqua", "chartreuse", "magenta" ]

function addRule()
{
	if( newRuleLabel.value == "" )
	{
		return;
	}

	rules[ newRuleLabel.value ] =
	{
		targets: newRuleTokens.value.split( "," ),
		className: newRuleColor.value
	}

	newRuleLabel.value = newRuleColor.value = newRuleTokens.value = "";
}

function removeRule( label )
{
	delete rules[ label ];	
}

</script>

<style scoped>
#rule-maker {
	max-width: 650px;
}

h2 {
	font: 600 29px Arial, sans-serif;
	margin: 10px 0;
}

h2 small {
	font-size: 14px;
	cursor: pointer;
}

#form {
	display: flex;
	gap: 10px;
	align-items: center;
}

#form button {
	width: 35px;
	height: 35px;
	padding: 10px;
	border-radius: 50%;
	cursor: pointer;
	border: 0;
	background-color: #6db700;
	transition: 200ms;
	flex-shrink: 0;
}

#form button:hover {
	background-color: #98ff00;
}

#form button svg {
	width: 100%;
	height: 100%;
	transition: 200ms;
	transform: rotate(0deg);
}

#form button:hover svg {
	transform: rotate(90deg);
}

#form input, #form select {
	background: #141414;
	color: #ccc;
	border: 0;
	padding: 12px;
	border-radius: 5px;
	
}

#rule-maker {
	min-width: 600px;
}

#rules .close {
	cursor: pointer;
	width: 15px;
	height: 15px;
	color: #484848;
	padding: 5px;
	border-radius: 50%;
	transition: 200ms;
	position: absolute;
	right: 8px;
	top: 8px;
}

#rules .close:hover {
	background-color: #ffa300;
	color: #fff !important;
}

#rules .label {
	font: 700 18px "Segoe UI", sans-serif;
	color: #ffa300;
	margin: 0;
}

#rules {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 15px;
	margin-top: 15px;
}

#rules .rule {
	background-color: #1b1b1b;
	padding: 15px 12px;
	border-radius: 8px;
	display: flex;
	gap: 20px;
	transition: 200ms;
	flex-grow: 1;
	flex-basis: 40%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}

.merge {
	display: inline-flex;
	font: 100 12px verdana;
	cursor: pointer;
	align-items: center;
	padding: 15px;
	color: #666;
}

.rule .merge {
	position: absolute;
	bottom: -5px;
	right: -5px;
}

.merge input {
	width: 13px;
	height: 13px;	
}

#rules .rule:hover {
	background-color: #333;
}

#rules .rule:hover .close {
	color: #121212;
}

#rules .rule .tokens {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	gap: 6px;
	margin-bottom: 35px;
}

#rules .rule .tokens .token {
	background-color: #333;
	color: #aaa;
	padding: 4px 12px;
	font: 100 12px verdana;
	border-radius: 40px;
	transition: 200ms;
}

#rules .rule:hover .tokens .token {
	background-color: #424242;
	color: #fff;
}

</style>
