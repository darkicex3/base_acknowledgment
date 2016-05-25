# wsgi.py file begin

import os, sys
# add the hellodjango project path into the sys.path
sys.path.append('/var/www/base_acknowledgment')

# add the virtualenv site-packages path to the sys.path
sys.path.append('/var/www/base_acknowledgment/env/lib/python3.4/site-packages')

# poting to the project settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

application = get_wsgi_application()
application = DjangoWhiteNoise(application)

# wsgi.py file end
# ===================
