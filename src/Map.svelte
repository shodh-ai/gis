<script lang="ts">
	let container: HTMLDivElement;
	let zoom = 5;
	const center = { lat: 20.5937, lng: 78.9629 };

	import { onMount } from 'svelte';

	onMount(async () => {
		// @ts-expect-error "google" is not defined because it's being loaded in a script tag in App.svelte
		const map = new google.maps.Map(container, { zoom, center });
	});
</script>

<div class="form-container">
	<p class="title">Enter Search Query</p>
	<textarea name="input" id="input"></textarea>
	<button class="submit-btn">Search</button>
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
		background-color: #4351730D;
		font-size: 1rem;
		font-weight: 600;
		resize: none;
		color: #435173;
	}

	.submit-btn {
		border: none;
		border-radius: 999px;
		padding: 1rem 0.25rem;
		background-color: #C3E3C5;
		color: #435173;
		font-size: 1rem;
		font-weight: 600;
	}
</style>
