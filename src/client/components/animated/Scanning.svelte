<script lang="ts">
  export let duration = 1;
</script>

<svg
  class={$$props.class}
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
  style="--duration: {duration}s;"
>
  <g id="scanning">
    <g id="borders">
      <path
        id="Rectangle 1"
        d="M5 67.5C5 66.1193 6.11929 65 7.5 65V65C8.88071 65 10 66.1193 10 67.5V92.5C10 93.8807 8.88071 95 7.5 95V95C6.11929 95 5 93.8807 5 92.5V67.5Z"
      />
      <path
        id="Rectangle 5"
        d="M90 67.5C90 66.1193 91.1193 65 92.5 65V65C93.8807 65 95 66.1193 95 67.5V92.5C95 93.8807 93.8807 95 92.5 95V95C91.1193 95 90 93.8807 90 92.5V67.5Z"
      />
      <rect id="Rectangle 2" x="5" y="5" width="5" height="30" rx="2.5" />
      <rect id="Rectangle 8" x="90" y="5" width="5" height="30" rx="2.5" />
      <rect
        id="Rectangle 3"
        width="30"
        height="5"
        rx="2.5"
        transform="matrix(1 0 0 -1 5 10)"
      />
      <rect
        id="Rectangle 4"
        width="30"
        height="5"
        rx="2.5"
        transform="matrix(1 0 0 -1 5 95)"
      />
      <rect
        id="Rectangle 6"
        width="30"
        height="5"
        rx="2.5"
        transform="matrix(1 0 0 -1 65 95)"
      />
      <rect
        id="Rectangle 7"
        width="30"
        height="5"
        rx="2.5"
        transform="matrix(1 0 0 -1 65 10)"
      />
    </g>
    <g id="text">
      <rect id="Rectangle 9" x="20" y="60" width="50" height="4" />
      <rect id="Rectangle 14" x="20" y="44" width="60" height="4" />
      <rect id="Rectangle 16" x="20" y="52" width="60" height="4" />
      <rect id="Rectangle 15" x="20" y="36" width="60" height="4" />
    </g>
    <rect id="scanner" x="10" y="10" width="80" height="3" />
  </g>
</svg>

<style>
  svg {
    --duration: 2s;
    width: 100%;
    object-fit: contain;
    animation: scan calc(var(--duration) / 2) ease-in-out 0s infinite alternate;
    border-radius: 5%;
  }
  #borders {
    fill: var(--primary);
  }
  #text {
    fill: var(--primary-light);
  }
  #scanner {
    fill: var(--primary-dark);
    animation: scanner var(--duration) ease-in-out 0s infinite alternate;
  }
  @keyframes scan {
    0% {
      background-color: rgba(255, 187, 0, 0.5);
    }
    100% {
      background-color: rgba(255, 187, 0, 0.1);
    }
  }
  @keyframes scanner {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(77px);
    }
  }
</style>
