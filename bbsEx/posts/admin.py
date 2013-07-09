'''
Created on Jul 9, 2013

@author: azhu
'''
from django.contrib import admin
from posts import models

admin.site.register(models.Topic)
admin.site.register(models.Post)