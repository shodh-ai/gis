import './app.css';

import App from './App.svelte';

declare global {
	interface Window {
		initMap: () => void;
	}
}

const app = new App({
  target: document.getElementById('app')!,
  props: {
	ready: false
  }
})

window.initMap = function ready() {
	app.$set({ ready: true })
}

export default app
