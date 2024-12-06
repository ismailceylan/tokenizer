<template>
	<div id="rule-maker">
		<h2>Token Definitions</h2>

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
				<span class="label">{{ label }}</span>
				<span class="tokens">{{ rule.targets }}</span>
				<div class="close" @click="removeRule( label )">
					<FontAwesomeIcon :icon="CloseIcon" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject, ref } from "vue";
import CloseIcon from "font-awesome/src/regular/close";
import PlusIcon from "font-awesome/src/solid/plus-large";

const rules = inject( "rules" );
const newRuleLabel = ref( "" );
const newRuleTokens = ref( "" );
const newRuleColor = ref( "" );

const classList = [ "orangered", "orange", "blueviolet", "silver", "aliceblue" ]

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
}

#rules .close:hover {
	background-color: #ffa300;
	color: #fff !important;
}

#rules .label {
	font: 700 18px "Segoe UI", sans-serif;
	color: #ffa300;
}

#rules .rule {
	background-color: #1b1b1b;
	padding: 15px 12px;
	border-radius: 8px;
	margin: 6px 0;
	display: flex;
	gap: 20px;
	justify-content: space-between;
	align-items: center;
	transition: 200ms;
}

#rules .rule:hover {
	background-color: #333;
}

#rules .rule:hover .close {
	color: #121212;
}
</style>
