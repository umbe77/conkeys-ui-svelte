<script>
  export let type;
  export let h = 6;
  export let w = 6;
</script>

<!-- int 0 -->
{#if type === 0}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-{h} w-{w}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"
    />
  </svg>
{:else if type === 1}
  <!-- decimal 1 -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-{h} w-{w}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    />
  </svg>
{:else if type === 2}
  <!-- string 2 -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-{h} w-{w}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
{:else if type === 3}
  <!-- date 3 -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-{h} w-{w}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
{:else if type === 4}
  <!-- bool 4 -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-{h} w-{w}"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
{/if}
