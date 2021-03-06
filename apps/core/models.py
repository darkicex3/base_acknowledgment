# from django.contrib.auth.models import User
# from django.db import models
# from tenant_schemas.models import TenantMixin
# from colorfield.fields import ColorField
#
#
# class KnowledgeBase(TenantMixin):
#     name = models.CharField(max_length=100)
#     logo = models.FileField(upload_to='knowledge_base_logo', blank=True)
#     primary_color = ColorField(default='#FF0000', help_text='This is the primary color of the KB, it will fill the '
#                                                             'header an other important section. Even if you choose'
#                                                             'an ugly color combination, you will be able to change'
#                                                             'it later ... So don\'t be shy.')
#     secondary_color = ColorField(default='#FF0000', help_text='This the secondary color of the KB.')
#     created_on = models.DateField(auto_now_add=True)
#
#     # default true, schema will be automatically created and synced when it is saved
#     auto_create_schema = True
