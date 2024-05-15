<script lang="ts">
	const API_KEY = 'AIzaSyAM0yLe3oZemXAcL9oQtaulrsZYWG8x1cg';

	import Map from './Map.svelte';

	export let ready: boolean;
</script>

<svelte:head>
	<title>Shodh GIS</title>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
		rel="stylesheet"
	/>

	<script
		defer
		async
		src="https://maps.googleapis.com/maps/api/js?key={API_KEY}&callback=initMap"
	></script>
</svelte:head>

{#if ready}
	<Map></Map>
{:else}
	<span>Loading...</span>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
