<script>
  import {
    keys,
    showEditKey,
    showDeleteKey,
    selectedKey,
  } from "../lib/keysstore";
  import KeyCard from "./KeyCard.svelte";
  import DeleteKeyModal from "./DelteKeyModal.svelte";
  import EditKeyModal from "./EditKeyModal.svelte";
  const normalizeKeys = (keys) => {
    return Object.entries(keys).map(([key, value]) => {
      return {
        key,
        type: value.T,
        value: value.V,
      };
    });
  };
  console.log($showDeleteKey);
</script>

<main class="container mx-auto mt-4">
  <div class="flex flex-wrap -m-4">
    {#await $keys}
      <div class="flex items-end justify-center w-full h-32">
        <div class="text-2xl font-semibold">Loading...</div>
      </div>
    {:then response}
      {#each normalizeKeys(response) as confKey (confKey.key)}
        <div class="xl:w-1/3 md:w-1/2 p-4">
          <KeyCard {confKey} />
        </div>
      {/each}
    {/await}
  </div>
</main>

{#if $showEditKey}
  <EditKeyModal
    confKey={$selectedKey}
    editMode={true}
    on:close={() => ($showEditKey = false)}
  />
{/if}

{#if $showDeleteKey}
  <DeleteKeyModal
    confKey={$selectedKey}
    on:close={() => ($showDeleteKey = false)}
  />
{/if}
