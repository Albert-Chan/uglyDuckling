from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Comment(models.Model):
    subject = models.CharField(max_length=30)
    keywords = models.CharField(max_length=50)
    content = models.CharField(max_length=60000)
    author = models.ForeignKey(User)
    #authors = models.ManyToManyField(User)?
    date = models.DateField()
    def __unicode__(self):
        return self.subject