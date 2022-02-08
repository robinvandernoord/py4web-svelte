<script>
    // simple transitions are really easy
    import {fade, fly} from 'svelte/transition';

    export let nested_data;

    function remove() {
        // remove key from an object to show dynamic updates to objects
        const keys = Object.keys(nested_data);
        delete nested_data[keys[keys.length - 1]]; // deleting the last property
        // // force ui update:
        nested_data = nested_data;
    }

    function add() {
        const r = Math.floor(Math.random() * 100);
        nested_data[`nest ${r}`] = {
            'value': Math.floor(Math.random() * 1000),
            'deeper': {'boolean': Math.random() < 0.5}
        };
    }
</script>
<button class="btn btn-danger" on:click={remove}>-</button>
<button class="btn btn-success" on:click={add}>+</button>
{#each Object.entries(nested_data) as [key, values], index}
    <div out:fly="{{ y: 100, duration: 500 }}" in:fade>
        <h4>{key}</h4>
        <ul>
            <li>Value: {values.value}</li>
            <li>Deep value: {values.deeper.boolean}</li>
        </ul>
    </div>
{/each}