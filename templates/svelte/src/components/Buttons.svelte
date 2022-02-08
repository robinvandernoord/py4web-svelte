<script>
    // the local storage allows you to keep your variables between page reloads and even browser restarts
    // (unless the user resets their local storage on browser close)
    // if you just need a store that survives reloads, you can also use sessionStorageStore
    import {localStorageStore} from '../stores';

    // button-presses is the key used in localstorage, [0,0,0] is the default
    let buttons = localStorageStore('button-presses', [0, 0, 0]);
    // enable the localstorage:
    buttons.useStore();

    function plusplus(i) {
        // with store.update you get the current value and you return the new value
        buttons.update(b => {
            b[i]++;
            return b;
        });
    }
</script>
<div>
    {#each $buttons as button, index}
        <button class="btn btn-info" on:click={_=>plusplus(index)}>{button}</button>
    {/each}
</div>