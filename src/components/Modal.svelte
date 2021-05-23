<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
  const close = () => {
    dispatch("close");
  };
  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };
</script>

<svelte:window on:keydown={handle_keydown} />

<div
  transition:fade={{ duration: 200 }}
  class="w-screen absolute top-0 flex justify-center h-screen items-start bg-gray-200 bg-opacity-75 antialiased"
>
  <div
    class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto mt-24 rounded-lg border border-gray-300 shadow-xl"
  >
    <!-- title bar -->
    <div
      class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-t-lg"
    >
      <p class="font-semibold text-gray-800">
        <slot name="header" />
      </p>
      <svg
        on:click={close}
        class="w-6 h-6 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
    <!-- Body -->
    <div class="flex flex-col px-6 py-1 bg-gray-50">
      <slot />
    </div>
    <!-- Footer / Buttons -->
    <div
      class="flex flex-row-reverse items-center p-5 bg-white border-t border-gray-200 rounded-b-lg"
    >
      <slot name="footer" />
    </div>
  </div>
</div>
