<script>
    export let name = 'iets';
    import {route} from '../helpers';
</script>
<main>
    <h1>Hello {name}!</h1>
    <a href="{route('page2')}">Demo page two</a>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>