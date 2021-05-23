<script>
  import { createEventDispatcher } from "svelte";
  import { deleteKey as delKey } from "../lib/api";
  import { token } from "../lib/authToken";
  import { keys } from "../lib/keysstore";
  import Modal from "./Modal.svelte";

  export let confKey;
  let showDeleteError = false;
  let deleteError = "";

  const dispatch = createEventDispatcher();
  const deleteKey = async () => {
    const { error } = await delKey(confKey.key, $token);
    if (error) {
      showDeleteError = true;
      deleteError = error;
      return;
    }
    showDeleteError = false;
    deleteError = "";
    keys.refresh();
    dispatch("close");
  };
</script>

<Modal on:close={() => dispatch("close")}>
  <span slot="header">Remove Key</span>
  {#if showDeleteError}
    <div
      class="relative px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg"
      role="alert"
    >
      <span class="absolute inset-y-0 left-0 flex items-center ml-4">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"
          ><path
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          /></svg
        >
      </span>
      <p class="ml-6">{deleteError}</p>
    </div>
  {/if}
  <div class="p-3 flex flex-col items-center justify-center">
    <h4 class="mb-2 text-xl">Deleting key <strong>{confKey.key}</strong></h4>
    <p>Are you sure to continue?</p>
  </div>
  <div slot="footer">
    <button
      class="px-4 py-2 text-white font-semibold bg-gray-400 rounded"
      on:click={() => dispatch("close")}
    >
      Cancel
    </button>
    <button
      on:click={deleteKey}
      class="px-4 py-2 text-white font-semibold bg-red-400 rounded"
    >
      Delete
    </button>
  </div>
</Modal>
