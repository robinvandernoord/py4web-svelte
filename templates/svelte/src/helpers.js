// simplify some common things

export function apiroute(endpoint) {
    return route('api', endpoint + '.json');
}

export function route(...path) {
    /**
     * @var appname: appname from window (from backend)
     */
    return `/${appname}/${path.join('/')}`;
}

export async function apirequest(endpoint) {
    // example helper to do a GET request to api/endpoint
    const result = await fetch(apiroute(endpoint));
    if(result.status === 200) {
        return await result.json();
    } else {
        throw await result.text() || result.statusText;
    }
}
