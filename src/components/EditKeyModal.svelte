<script>
  import { createEventDispatcher } from "svelte";
  import { saveKey } from "../lib/api";
  import { token } from "../lib/authToken";
  import { keyTypes } from "../lib/keytype";
  import { keys } from "../lib/keysstore";
  import Modal from "./Modal.svelte";
  import ConfKeyType from "./ConfKeyType.svelte";

  export let confKey;
  let { key, type, value } = confKey || { key: "", type: 0, value: null };
  export let editMode = false;

  let dropdownTypesOpen = false;

  const dispatch = createEventDispatcher();
  let tkn;
  token.subscribe((value) => {
    tkn = value;
    console.log(value);
  });

  let saveError = "";
  let showSaveError = false;
  const save = async () => {
    //TODO: miss integrity checks
    const { error } = await saveKey(
      {
        key,
        type,
        value,
      },
      tkn
    );
    if (error) {
      showSaveError = true;
      saveError = error;
      return;
    }
    showSaveError = false;
    saveError = "";
    keys.refresh();
    dispatch("close");
  };

  const selectType = (typeId) => {
    type = typeId;
    dropdownTypesOpen = false;
  };
</script>

<Modal on:close={() => dispatch("close")}>
  <span slot="header">Add key</span>
  {#if showSaveError}
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
      <p class="ml-6">{saveError}</p>
    </div>
  {/if}
  <form class="px-4 py-5 sm:p-6">
    <div class="grid grid-cols-6 gap-6">
      <div class="col-span-6">
        <label for="txtKey" class="block text-sm font-semibold text-gray-700">
          Key name
        </label>
        <input
          id="txtKey"
          name="txtKey"
          type="text"
          autocomplete="Off"
          readonly={editMode}
          bind:value={key}
          class="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out"
        />
      </div>
      <div class="col-span-2">
        <label for="selType" class="block text-sm font-semibold text-gray-700">
          Type
        </label>
        <div class="mt-1 relative">
          <button
            on:click={() => (dropdownTypesOpen = !dropdownTypesOpen)}
            type="button"
            class="relative shadow w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <span class="flex items-center">
              <div
                class="w-5 h-5 inline-flex items-center justify-center rounded-full bg-blue-400 text-blue-100"
              >
                <ConfKeyType {type} h={3} w={3} />
              </div>
              <span class="ml-3 block truncate">
                {keyTypes[type]}
              </span>
            </span>
            <span
              class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
          <!-- dropdown items -->
          {#if dropdownTypesOpen}
            <ul
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {#each Object.entries(keyTypes) as [typeId, typeDesc]}
                <li
                  on:click={() => selectType(parseInt(typeId))}
                  class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-800 hover:text-white"
                  id="listbox-option-0"
                  role="option"
                >
                  <div class="flex items-center">
                    <div
                      class="w-7 h-7 inline-flex items-center justify-center rounded-full bg-blue-400 text-blue-100"
                    >
                      <ConfKeyType type={parseInt(typeId)} h={5} w={5} />
                    </div>
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="font-normal ml-3 block truncate">
                      {typeDesc}
                    </span>
                  </div>

                  <!--
                Checkmark, only display for selected option.
                
                Highlighted: "text-white", Not Highlighted: "text-indigo-600"
            -->
                  {#if parseInt(typeId) === type}
                    <span
                      class="absolute inset-y-0 right-0 flex font-bold items-center pr-4"
                    >
                      <!-- Heroicon name: solid/check -->
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
      <div class="col-span-4">
        <label for="selType" class="block text-sm font-semibold text-gray-700">
          Value
        </label>
        {#if type === 0}
          <input
            type="number"
            bind:value
            class="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out"
          />
        {:else if type === 1}
          <input
            type="number"
            bind:value
            class="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out"
          />
        {:else if type === 2}
          <input
            type="text"
            bind:value
            class="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out"
          />
        {:else if type === 3}
          <input
            type="datetime"
            bind:value
            class="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out"
          />
        {:else if type === 4}
          <input
            type="checkbox"
            bind:checked={value}
            class="mt-3 shadow border rounded h-6 w-6"
          />
        {/if}
      </div>
    </div>
  </form>
  <div slot="footer">
    <button
      class="px-4 py-2 text-white font-semibold bg-gray-400 rounded"
      on:click={() => dispatch("close")}
    >
      Cancel
    </button>
    <button
      class="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
      on:click={save}
    >
      Save
    </button>
  </div>
</Modal>
