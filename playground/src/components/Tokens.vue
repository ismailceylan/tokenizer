<template>
	<div id="tokens">
		<h2>Captured Tokens ({{ tokens.length }})</h2>

		<div class="tokens">
			<div class="token" v-for="token of tokens">
				<h3>{{ token.name }}</h3>
				<p class="value">{{ token.value }}</p>
				<p>{{ token.start }}, {{ token.end }} | {{ token.line }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { inject } from "vue";

const tokens = inject( "tokens" );

</script>

<style scoped>
#tokens {

}

h2 {
	font: 600 29px Arial, sans-serif;
}

.tokens {
	display: flex;
	flex-wrap: wrap;
	gap: 15px;
	padding: 0 15px 0 0;
}

.token {
	width: 113px;
	height: 92px;
	background-color: #1b1b1b;
	padding: 10px;
	border-radius: 10px;
}

.token h3 {
	margin: 0;
	font: 600 16px Arial;
	letter-spacing: 2px;
	color: #474747;
}
</style>
