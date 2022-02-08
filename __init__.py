from py4web import action, HTTP
from .svelte import Svelte


@action("index")
@action.uses(Svelte())
def index():
    return dict(name='backend')


@action("page2")
@action.uses(Svelte("Alternate"))
def page2():
    return {'nested_data': {'nest 1': {'id': 1, 'value': 35, 'deeper': {'boolean': True}},
                            'nest 2': {'id': 2, 'value': 12, 'deeper': {'boolean': False}},
                            'nest 3': {'id': 3, 'value': 64, 'deeper': {'boolean': None}},
                            }}


@action("non_svelte")
@action.uses("other.html")
def non_svelte():
    return {"variable": "Hello World"}


@action("api/slow_method.json")
def slow_method():
    import time
    time.sleep(5)
    return {'result': 'done'}


@action("api/broken_method.json")
def broken_method():
    raise HTTP(403, 'not allowed')
