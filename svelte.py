from py4web.core import Template, request, HELPERS, URL, render
import os
from .settings import APP_NAME
import json
import datetime


class Svelte(Template):
    def __init__(self, component='Index', *a, **kw):
        super().__init__('svelte/index.html', *a, **kw)

        self._component = component

    def transform(self, output, _=None):
        if not isinstance(output, dict):
            return output

        context = dict(
            request=request,
            appname=APP_NAME,
            now=datetime.datetime.now(),

            **HELPERS,
            URL=URL,

            **output,

            __vars__=json.dumps(output),
            __component__=self._component,
        )

        app_folder = os.path.join(os.environ["PY4WEB_APPS_FOLDER"], request.app_name)
        path = self.path or os.path.join(app_folder, "templates")
        filename = os.path.join(path, self.filename)

        return render(
            filename=filename, path=path, context=context, delimiters=self.delimiters
        )
