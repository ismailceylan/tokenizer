<template>
	<div id="playground">
		<RuleMaker />
		<Editor />
		<Tokens />
	</div>
</template>

<script setup>
import { provide, reactive, ref, shallowReactive } from "vue";
import Editor from "./components/Editor.vue";
import RuleMaker from "./components/RuleMaker.vue";
import Tokens from "./components/Tokens.vue";

const rules = reactive(
{
	triasterix:
	{
		className: "blueviolet",
		targets: [ "***" ],
	},
	dasterix:
	{
		className: "orange",
		targets: [ "**" ],
	},
	asterix:
	{
		className: "chartreuse",
		targets: [ "*" ],
	},
	// word:
	// {
	// 	className: "orangered",
	// 	targets: [ "if", "await", "export", "import", "from", "as", "function", "class", "extends", "else", "var", "let", "const" ],
	// },
	// space:
	// {
	// 	className: "",
	// 	targets: [ " " ],
	// 	options: { mergeTokens: false }
	// },
	// tab:
	// {
	// 	className: "",
	// 	targets: [ "\t" ]
	// },
	// nl:
	// {
	// 	className: "",
	// 	targets: [ "\n", ]
	// },
	// comment:
	// {
	// 	className: "silver",
	// 	targets: [ "//", "/*", "*/" ]
	// },
	// punc:
	// {
	// 	className: "orange",
	// 	targets: [ "'", '"', "`", "=", ">", "<", "[", "]", ",", ";", "+", "-", "*", "/", "%", "&", "|", "^", "~", "!"]
	// },
	// curlys:
	// {
	// 	className: "magenta",
	// 	targets: [ "{", "}" ]
	// },
	// paranthesis:
	// {
	// 	className: "chartreuse",
	// 	targets: [ "(", ")" ]
	// },
	// number:
	// {
	// 	className: "blueviolet",
	// 	targets: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]
	// },
});

provide( "rules", rules );
provide( "tokens", ref([]));
provide( "merge", ref( true ));

</script>

<style scoped>
#playground {
	display: flex;
	gap: 20px;
}
</style>
