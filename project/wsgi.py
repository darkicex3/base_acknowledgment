# wsgi.py file begin

import os, sys
# add the hellodjango project path into the sys.path
sys.path.append('/var/www/novostrat')

# add the virtualenv site-packages path to the sys.path
sys.path.append('/var/www/novostrat/env/lib/python3.4/site-packages')

# poiting to the project settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# wsgi.py file end
# ===================
