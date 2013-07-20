from posts.models import Post
from posts.models import Topic
from django import forms
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
import datetime

@login_required
def delete(request, post_id):
    post = Post.objects.get(id=post_id)
    post.delete()
    return HttpResponseRedirect('/login/')

@login_required
def t(request, topic_name):
    current_posts = Post.objects.filter(topic__name=topic_name).order_by('-time')
    return doPost(request, current_posts)

@login_required
def p(request, post_id):
    post_id = int(post_id)
    post = Post.objects.get(id=post_id)
    current_posts = { post }
    return render_to_response('posts/post.html', {'current_posts' : current_posts}, context_instance=RequestContext(request))

@login_required
def comment(request, post_id):
    form = PostsForm(
            initial={'subject': 'Your subject', 'message': 'Put your comments here. Max 60000 words!'}
        )
    return render_to_response('posts/new_post.html', {'form': form}, context_instance=RequestContext(request))

def doPost(request, current_posts):
    if request.method == 'POST':
        form = PostsForm(request.POST)
        if form.is_valid():
            formData = form.cleaned_data
            c = Post(
                subject=formData['subject'],
                author=request.user,
                content=formData['message'],
                time=datetime.datetime.now(),
            )
            if(len(formData['topic']) != 0):
                n = formData['topic']
                topics = Topic.objects.filter(name=n)
                if(len(topics) == 0):
                    t = Topic(name=n)
                    t.save()
                else:
                    t = topics[0]  
                c.topic = t
            c.save()
            return HttpResponseRedirect('/p')
    else:
        form = PostsForm(
            initial={'subject': 'Your subject', 'message': 'Put your comments here. Max 60000 words!'}
        )
    return render_to_response('posts/posts.html', {'form': form, 'current_posts' : current_posts}, context_instance=RequestContext(request)) 

# Create your views here.
@login_required
def posts(request):
    current_posts = Post.objects.order_by('-time')
    return doPost(request, current_posts)
    
def get_candidates(request, query_string):
    candidates = Topic.objects.filter(name__contains=query_string)
    return render_to_response('topic/candidates.html', {'candidates': candidates,})

@login_required
def select_topic(request, post_id, topic_id):
    post = Post.objects.get(id=post_id)
    topic = Topic.objects.get(id=topic_id)
    post.topic = topic
    post.save()
    return HttpResponseRedirect('/login/')

class PostsForm(forms.Form):
    subject = forms.CharField(max_length=100)
    topic = forms.CharField(max_length=48, required=False)
    message = forms.CharField(widget=forms.Textarea)
