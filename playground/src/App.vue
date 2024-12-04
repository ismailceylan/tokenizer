<template>
	<div id="playground">
		<RuleMaker />
		<Editor />
	</div>
</template>

<script setup>
import { provide, reactive, ref } from "vue";
import Editor from "./components/Editor.vue";
import RuleMaker from "./components/RuleMaker.vue";

const rules = reactive(
{
	word:
	{
		className: "orangered",
		targets: [ "if", "await", "export", "import", "from", "as", "function", "class", "extends", "else", "var", "let", "const" ],
	},
	space:
	{
		className: "",
		targets: [ " " ]
	},
	tab:
	{
		className: "",
		targets: [ "\t" ]
	},
	nl:
	{
		className: "",
		targets: [ "\n", ],
		options: { mergeTokens: false }
	},
	comment:
	{
		className: "silver",
		targets: [ "//", "/*", "*/" ]
	},
	punc:
	{
		className: "orange",
		targets: [ "'", '"', "`", "=", ">", "<", "(", ")", "[", "]", "{", "}", ",", ";" ]
	},
	number:
	{
		className: "blueviolet",
		targets: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]
	},
});

provide( "rules", rules );
provide( "tokens", ref([]));

</script>

<style scoped>
#playground {
	display: flex;
	gap: 20px;
}
</style>
