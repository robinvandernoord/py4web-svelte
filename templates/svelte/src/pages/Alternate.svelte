<style>
    /* styles written here will be compiled into bundle.css, but scoped to this page!
     You can use additional processors like SCSS or LESS, using plugins.
     */

    /*colors from http://c0bra.github.io/color-scheme-js/*/
    .failure {
        background-color: #bf6060;
    }

    .loading {
        background-color: #fff5bf
    }

    .success {
        background-color: #9ecc8f
    }

    .time {
        background-color: #ff80f4;
    }

    .blue {
        background-color: #aec6cf;
    }

    main {
        margin-top: 25px;
    }
</style>
<script>
    // code written here will be compiled into bundle.js.
    // you can use additional processors like coffeescript or typescript, using plugins.
    import {apirequest} from '../helpers';

    // importing a component
    import Buttons from '../components/Buttons.svelte';
    import Nested from '../components/Nested.svelte';

    export let nested_data;

    let time;
    let slow_class = 'loading';

    async function slow_function() {
        // api request for something slow
        // example to show await with a 'waiting' value
        const result = await apirequest('slow_method');
        slow_class = 'success'; // changing a class to update styles
        return result;
    }

    async function failing_function() {
        // api request to failure
        // example to show await with an 'on failure' value
        return await apirequest('broken_method');
    }

    function updatetime() {
        // example to show that all it takes to update the DOM,
        // is giving a variable a new value!
        time = (new Date()).toLocaleTimeString();
        setTimeout(updatetime, 1000);
    }

    // start time loop
    updatetime();
</script>

<main>
    <ul class="list-group">
        <li class="list-group-item time">Current time: {time}</li>
        <li class="list-group-item {slow_class}">
            {#await slow_function()}
                still loading...
            {:then data}
                Finally! {data.result}
            {:catch e}
                This should not happen :( {e}
            {/await}
        </li>
        <li class="list-group-item failure">
            {#await failing_function()}
            {:then data}
                This should never happen
            {:catch e}
                {console.log(e, typeof e) || ''}
                Something went wrong (successfully): {e}
            {/await}
        </li>
        <li class="list-group-item">
            <!-- using a component as if it were normal HTML -->
            <Buttons />
        </li>
        <li class="list-group-item blue">
            <!-- if you want to use data in a component, you need to pass it -->
            <Nested {nested_data} />
        </li>
    </ul>
</main>