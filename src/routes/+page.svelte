<script lang="ts">
  let writing = ``; 
</script>


<main>
  <textarea bind:value={writing} />
  <div id="preview">

  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    padding: 3vw;
    background-color: #171717;
  }

  textarea {
    width: 50%;
    height: 100%;
    padding: 1rem;
    color: white;
    font-size: 20pt;
    background-color: #404040;
    border-radius: 0.5rem;
  }

  #preview {
    width: 50%;
    height: 100%;
    padding: 1rem;
    color: white;
  }
</style>
