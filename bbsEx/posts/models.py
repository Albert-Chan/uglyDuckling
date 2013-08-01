from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models

class Topic(models.Model):
    name = models.CharField(max_length=48, unique=True)
    def __unicode__(self):
        return self.name
    def getValidLink(self):
        return "/t/" + self.name
    
def getNoneTopic():
    try:
        e = Topic.objects.get(name='None')
    except ObjectDoesNotExist:
        t=Topic(name='None')
        t.save()
        return t
    return e

class Post(models.Model):
    subject = models.CharField(max_length=30)
    keywords = models.CharField(max_length=50)
    content = models.CharField(max_length=60000)
    author = models.ForeignKey(User)
    time = models.DateTimeField()
    topic = models.ForeignKey(Topic, default=getNoneTopic)
    read_count = models.BigIntegerField(default=0)
    followed_count = models.IntegerField(default=0)
    #public = 4
    #follower = 2
    #private = 1
    read_acl = models.IntegerField(default=1)
    write_acl = models.BooleanField(default=True)
    def __unicode__(self):
        return self.subject
    def getValidLink(self):
        return "/p/" + str(self.id) + '/' + self.subject.replace(' ','-')

class PostHistory(models.Model):
    post = models.ForeignKey(Post)
    modification_datatime = models.DateTimeField()
    author = models.ForeignKey(User)
    #update is calculated by client side javascript
    update = models.CharField(max_length=60000)
    
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
    user = models.ForeignKey(User, related_name='following_user')
    following = models.ForeignKey(User, related_name='following_following')
    
class Follower(models.Model):
    """The list of the user's follower"""
    user = models.ForeignKey(User, related_name='follower_user')
    follower = models.ForeignKey(User, related_name='follower_follower')

class Read(models.Model):
    user = models.ForeignKey(User)
    read = models.ForeignKey(Post)
    last_read_time = models.DateTimeField()
    read_count = models.IntegerField()

class Reply(models.Model):
    content = models.CharField(max_length=60000)
    author = models.ForeignKey(User)
    time = models.DateTimeField()
    post = models.ForeignKey(Post)
    replyTo = models.ForeignKey('self', null=True)