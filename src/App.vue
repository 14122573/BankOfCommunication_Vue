<template>
	<div id="portal">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'Portal'
	}
</script>

<style>
	#portal {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		width: 100%;
		height: 100%;
		/* overflow: hidden; */
	}

	#Layout {
		height: 100%;
	}

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px white inset;
	}
</style>
