<script lang="ts">
  import { writings } from "$lib/stores";
  import Markdown from "svelte-exmarkdown";

  let writing = ``; 
  let name = "";

  function setWriting(w : Record<string, string>) {
    // TODO:  if current writing is not saved, give option to saveWriting()
    writing = w.writing;
    name = w.name;
  }

  function saveWriting() {
    const current_writing = JSON.stringify({ name: name, writing: writing });
    // TODO: overwrite if name is the same
    writings.set([...$writings, current_writing]);
  }

  function clearWritings() {
    writings.set([]);
  }

  $: list = JSON.parse("[" + $writings + "]")

</script>

<main class="flex flex-row p-8 gap-8 w-screen h-screen justify-center bg-neutral-800">
  <div class="flex flex-col gap-8 w-fit">
    <input type="text" bind:value={name} class="px-4 py-2" placeholder="Writing #"/>
    <div class="flex flex-row gap-8 justify-center">
      <button on:click={saveWriting} class="w-fit mx-auto px-4 py-2 bg-white text-black">Save</button>
      <button on:click={clearWritings} class="w-fit mx-auto px-4 py-2 bg-white text-black">Clear</button>
    </div>
    {#each list as w}
      <button on:click={() => setWriting(w)} class="w-fit mx-auto px-4 py-2 bg-white text-black">{w.name}</button>
    {/each}
  </div>
  <textarea class="text-white bg-neutral-600 p-8 w-1/2 rounded-lg" bind:value={writing} />
  <div class="prose prose-invert overflow-auto p-8 w-1/2 h-full bg-neutral-900">
    <Markdown md={writing} />
  </div>
</main>

