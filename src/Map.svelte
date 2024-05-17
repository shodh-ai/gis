<script lang="ts">
	// @ts-expect-error "google" is not defined because it's being loaded in a script tag in App.svelte
	let map: google.maps.Map;
	let query: string;
	let buttonDisabled: boolean = false;
	let container: HTMLDivElement;

	const zoom = 5;
	const mapId = 'DEMO_MAP_ID';
	const center = { lat: 20.5937, lng: 78.9629 };

	import { onMount } from 'svelte';
	import LoadingIcon from './assets/loading.svg';

	const submitQuery = async () => {
		buttonDisabled = true;

		if (!query) {
			buttonDisabled = false;
			return;
		}

		try {
			const response = await fetch(
				`https://flask-hello-world-two-wine.vercel.app/about/?prompt=${encodeURIComponent(query)}`,
				{
					mode: 'cors'
				}
			);

			const { coordinates } = await response.json();

			if (!coordinates) {
				buttonDisabled = false;
				return;
			}

			// @ts-expect-error
			const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

			for (let coord in coordinates) {
				new AdvancedMarkerElement({
					map: map,
					position: {
						lat: coordinates[coord][0],
						lng: coordinates[coord][1],
					},
					title: coord.toString(),
				});
			}
		} catch {
			alert("Application ran into an error. Please try again later.");
		}

		buttonDisabled = false;
		return;
	};

	onMount(async () => {
		// @ts-expect-error
		map = new google.maps.Map(container, { zoom, center, mapId });
	});
</script>

<div class="form-container">
	<p class="title">Enter Search Query</p>
	<textarea
		name="input"
		id="input"
		bind:value="{query}"
		placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	></textarea>
	<button
		on:click="{submitQuery}"
		disabled="{buttonDisabled}"
		class="submit-btn"
	>
		{#if buttonDisabled}
			<img src={LoadingIcon} alt="Loading Icon" />
		{:else}
			Submit
		{/if}
	</button>
</div>
<div class="full-screen" bind:this="{container}"></div>

<style>
	.full-screen {
		width: 100vw;
		height: 100vh;
	}

	.form-container {
		z-index: 10;
		position: absolute;
		bottom: 16px;
		left: 16px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 30%;
		padding: 16px;
		border-radius: 16px;
		border: 1px #eeeeee solid;
		background-color: white;
	}

	.title {
		margin: 0;
		font-size: 1.5rem;
		color: #435173;
		font-weight: 700;
		padding-bottom: 0.5rem;
	}

	#input {
		padding: 1rem;
		box-sizing: border-box;
		border: 1px solid #43517333;
		border-radius: 5px;
		background-color: #4351730d;
		font-size: 1rem;
		font-weight: 600;
		resize: none;
		color: #435173;
	}

	.submit-btn {
		border: none;
		border-radius: 999px;
		padding: 1rem 0.25rem;
		background-color: #c3e3c5;
		color: #435173;
		font-size: 1rem;
		font-weight: 600;
	}
</style>
