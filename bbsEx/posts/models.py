from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=48)
    parent = models.ForeignKey('self', null=True, blank=True)
    def clean(self):
        if self.parent.id == self.id:
            raise ValidationError("no self referential models")
    def __unicode__(self):
        return self.name

class Post(models.Model):
    subject = models.CharField(max_length=30)
    keywords = models.CharField(max_length=50)
    content = models.CharField(max_length=60000)
    author = models.ForeignKey(User)
    time = models.DateTimeField()
    topic = models.ForeignKey(Topic)
    read_count = models.BigIntegerField()
    followed_count = models.IntegerField()
    #public = 4
    #follower = 2
    #private = 1
    read_acl = models.IntegerField()
    write_acl = models.BooleanField()
    def __unicode__(self):
        return self.subject

class PostHistory(models.Model):
    post = models.ForeignKey(Post)
    modification_datatime = models.DateTimeField()
    author = models.ForeignKey(User)
    #update is calculated by client side javascript
    update = models.CharField()
    
class Anchoring(models.Model):
    post = models.ForeignKey(Post)
    offset = models.IntegerField()
    length = models.IntegerField()
    
class Rank(models.Model):
    """The hottest posts Top10 in cache"""
    post = models.ForeignKey(Post)
    rank = models.IntegerField()
    
class InterestedTopic(models.Model):
    user = models.ForeignKey(User)
    topic = models.ForeignKey(Topic)
    def __unicode__(self):
        return self.user.name + ": " + self.topic.name

class Following(models.Model):
    """The list of the people who the user is following"""
    user = models.ForeignKey(User)
    following = models.ForeignKey(User)
    
class Follower(models.Model):
    """The list of the user's follower"""
    user = models.ForeignKey(User)
    follower = models.ForeignKey(User)

class Read(models.Model):
    user = models.ForeignKey(User)
    read = models.ForeignKey(Post)
    last_read_time = models.DateTimeField()
    read_count = models.IntegerField()
