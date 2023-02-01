<script lang="ts">
  import { writings } from "$lib/stores";
  import Markdown from "svelte-exmarkdown";

  let id = "";
  let content = ""; 
  let name = "";

  interface Writing {
    id : string,
    name : string,
    content : string,
  }

  function newWriting() {
    id = crypto.randomUUID();
    name = "New Writing";
    content = "";
  }

  function setWriting(w : Writing) {
    // TODO:  if current writing is not saved, give option to saveWriting()
    id = w.id;
    name = w.name;
    content = w.content;
  }

  function saveWriting() {
    id = id.length === 0 ? crypto.randomUUID() : id;
    const current_writing = { id: id, name: name, content: content };
    if (checkWriting(current_writing)) {
      const others = list.filter((w : Writing) => { return w.id != current_writing.id });
      let converted : string[] = [];
      for (const saved of others) { converted = [...converted, JSON.stringify(saved)]; }
      writings.set([...converted, JSON.stringify(current_writing)]);
    }
    else {
      writings.set([...$writings, JSON.stringify(current_writing)]);
    }
  }

  function checkWriting(w : Writing) {
    for (const saved of list) {
      if (saved.id === w.id) { return true; } 
    }
    return false;
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
      <button on:click={newWriting} class="w-fit mx-auto px-4 py-2 bg-white text-black">New</button>
    </div>
    <div class="flex flex-col gap-8 w-full">
      {#each list as w}
        {#if id === w.id}
          <button on:click={() => setWriting(w)} class="w-fit px-4 py-2 bg-white text-black">{w.name}</button>
        {:else}
          <button on:click={() => setWriting(w)} class="w-fit px-4 py-2 bg-neutral-600 text-white">{w.name}</button>
        {/if}
      {/each}
    </div>
  </div>
  <textarea class="text-white bg-neutral-600 p-8 w-1/2 rounded-lg" bind:value={content} />
  <div class="prose prose-invert overflow-auto p-8 w-1/2 h-full bg-neutral-900">
    <Markdown md={content} />
  </div>
</main>

