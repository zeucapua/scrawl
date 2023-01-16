<script lang="ts">
  import Markdown from "svelte-exmarkdown";
  let writing = ``; 
</script>


<main class="flex flex-row p-8 gap-8 w-screen h-screen justify-center bg-neutral-800">
  <textarea class="text-white bg-neutral-600 p-8 w-1/2 rounded-lg" bind:value={writing} />
  <div class="prose prose-invert overflow-auto p-8 w-1/2 h-full bg-neutral-900">
    <Markdown md={writing} />
  </div>
</main>

