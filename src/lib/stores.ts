import { writable } from "svelte/store";
import { browser } from "$app/environment";

const initWritings = browser ? window.localStorage.writings : [];

export const writings = writable(initWritings || []);

writings.subscribe((value : unknown) => {
  if (browser) { 
    window.localStorage.writings = value; 
  }
});
