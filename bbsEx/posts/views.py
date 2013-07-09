from posts.models import Post
from posts.models import Topic
from django import forms
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
import datetime

# Create your views here.
@login_required
def post(request):
    current_posts = Post.objects.order_by('-time')
    if request.method == 'POST':
        form = PostsForm(request.POST)
        if form.is_valid():
            formData = form.cleaned_data
            if(len(formData['topic']) != 0):
                n = formData['topic']
                topics = Topic.objects.filter(name=n)
                if(len(topics) == 0):
                    t = Topic(name=n, parent=None)
                    t.save()
                else:
                    t = topics[0]    
                c = Post(
                    subject=formData['subject'],
                    author=request.user,
                    content=formData['message'],
                    time=datetime.datetime.now(),
                    topic=t,
                )
            else:
                c = Post(
                    subject=formData['subject'],
                    author=request.user,
                    content=formData['message'],
                    time=datetime.datetime.now(),
                )
            c.save()
            return HttpResponseRedirect('/posts')
    else:
        form = PostsForm(
            initial={'subject': 'Your subject', 'message': 'Put your comments here. Max 60000 words!'}
        )
    return render_to_response('posts/posts.html', {'form': form, 'current_posts' : current_posts}, context_instance=RequestContext(request))

class PostsForm(forms.Form):
    subject = forms.CharField(max_length=100)
    topic = forms.CharField(max_length=48)
    message = forms.CharField(widget=forms.Textarea)