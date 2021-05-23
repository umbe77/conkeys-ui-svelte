<script>
  import Modal from "./Modal.svelte";
  import EditKeyModal from "./EditKeyModal.svelte";
  import { checkToken } from "../lib/api";
  import { token } from "../lib/authToken";
  import { keys, lookforKey } from "../lib/keysstore";
  let loginOpen = false;
  const refresh = () => {
    keys.refresh();
  };
  let secret = "";
  let loginError = "";
  let showAdd = false;
  const signin = async () => {
    const { token: tkn, status } = await checkToken(secret);
    secret = "";
    if (status === "OK") {
      $token = tkn;
      loginError = "";
      loginOpen = false;
      return;
    }
    loginError = "Invalid Credentials";
    console.log(loginError);
  };
  const handleSignInBtn = () => {
    if ($token === "") {
      loginOpen = true;
      return;
    }
    $token = "";
  };
</script>

<header>
  <div
    class="bg-blue-500 container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
  >
    <span
      class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
    >
      <span class="text-blue-50 ml-3 text-xl font-bold uppercase">Conkeys</span>
    </span>
    <nav
      class="md:ml-auto flex flex-wrap items-center text-base justify-center"
    >
      <form class="mr-5" on:submit|preventDefault={refresh}>
        <div class="w-96 relative text-gray-700">
          <!-- mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out -->
          <input
            class="w-full h-8 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            bind:value={$lookforKey}
            placeholder="Search key..."
          />
          <button
            type="submit"
            class="absolute inset-y-0 right-0 flex items-center px-4 font-medium text-gray-900 bg-gray-200 rounded-r-lg"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg></button
          >
        </div>
      </form>
      <span class="mr-5 text-blue-50 hover:text-blue-200 cursor-pointer"
        >About</span
      >
    </nav>
    {#if $token !== ""}
      <button
        on:click={() => (showAdd = true)}
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:shadow-sm hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add
      </button>
    {/if}
    <button
      on:click={refresh}
      class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:shadow-sm hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mr-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Refresh
    </button>
    <button
      on:click={handleSignInBtn}
      class=" inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:shadow-sm hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
    >
      <svg
        class="h-4 w-4 mr-1"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
      {#if $token === ""}
        Sign In
      {:else}
        Sign Out
      {/if}
    </button>
  </div>
</header>

{#if loginOpen}
  <Modal on:close={() => (loginOpen = false)}>
    <span slot="header">Admin Secret</span>
    <form class="px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={signin}>
      <div class="mb-1">
        <label
          for="txtSecret"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Secret
        </label>
        <input
          class:border-red-500={loginError !== ""}
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-out"
          type="password"
          autocomplete="off"
          name="txtSecret"
          id="txtSecret"
          bind:value={secret}
        />
        {#if loginError}
          <p class="text-red-500 text-xs italic mt-1">{loginError}</p>
        {/if}
      </div>
    </form>
    <div slot="footer">
      <button
        class="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
        type="submit"
        on:click={signin}
      >
        Save
      </button>
    </div>
  </Modal>
{/if}

{#if showAdd}
  <EditKeyModal on:close={() => (showAdd = false)} />
{/if}
