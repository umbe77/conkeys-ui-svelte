<script>
  import { fade } from "svelte/transition";
  import { token } from "../lib/authToken";
  import { showDeleteKey } from "../lib/keysstore";
  import { deleteKey as delKey } from "../lib/api";
  import ConfKeyType from "./ConfKeyType.svelte";
  import { showEditKey, selectedKey } from "../lib/keysstore";
  export let confKey;
  let { key, type, value } = confKey;

  let showDelete = false;

  const selectKey = () => {
    if ($token === "") {
      return;
    }
    $selectedKey = confKey;
    $showEditKey = true;
  };

  const mouseMove = (direction) => {
    if ($token !== "") {
      showDelete = direction === "in";
    }
  };

  const deleteKey = async () => {
    if ($token === "") {
      return;
    }
    $selectedKey = confKey;
    $showDeleteKey = true;
  };
</script>

<div
  on:mouseenter={() => mouseMove("in")}
  on:mouseleave={() => mouseMove("out")}
  on:click={selectKey}
  class:cursor-pointer={$token !== ""}
  class="border border-gray-200 p-6 rounded-lg hover:shadow-md"
>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col">
      <h2 class="text-lg text-gray-900 font-semibold title-font mb-2">
        {key}
      </h2>
      <p class="truncate leading-relaxed text-base">{value}</p>
    </div>
    <div class="flex flex-col">
      <div
        class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-400 text-blue-100 mb-4"
      >
        <ConfKeyType {type} />
      </div>
      {#if showDelete}
        <svg
          on:click|stopPropagation={deleteKey}
          xmlns="http://www.w3.org/2000/svg"
          transition:fade
          class="h-6 w-6 absolute mt-11 ml-2 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      {/if}
    </div>
  </div>
</div>
