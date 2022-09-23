import { browser } from '$app/env';
import { writable } from "svelte/store";

let req;
let prev;
let paused;

const elapsed = writable(0);

const handleVisibilityChange = () => {
	if (document.visibilityState === "hidden") {
		paused = true;
		timer.stop();
	}
	else if (paused) timer.start();
};

const tick = (timestamp) => {
	if (!prev) prev = timestamp;
	const diff = Math.round(timestamp - prev);
	prev = timestamp;
	elapsed.update(e => e + diff);
	req = window.requestAnimationFrame(tick);
};

const timer = {
	start() {
		if (browser && !req) {
			document.removeEventListener("visibilitychange", handleVisibilityChange, false);
			document.addEventListener("visibilitychange", handleVisibilityChange, false);
			paused = false;
			prev = null;
			req = window.requestAnimationFrame(tick);
		}
	},
	stop() {
		if (browser && req) {
			window.cancelAnimationFrame(req);
			req = null;
		}
	},
	toggle() {
		req ? timer.stop() : timer.start();
	},
	set(val) {
		if (typeof val === "number") elapsed.set(val);
	},
	reset() {
		elapsed.set(0);
		paused = false;
	}
};

export { timer, elapsed };