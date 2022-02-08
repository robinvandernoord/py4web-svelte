const view = window.view || 'Index';

// dit moet helaas wel handmatig voor alle pagina's die je wilt gebruiken
import Index from './pages/Index.svelte';
import Alternate from './pages/Alternate.svelte';

const components = {Index, Alternate};
const Component = components[view];

const app = new Component({
    target: document.getElementById('content-main'),
    props: window.data,
});

export default app;
