from posts.models import Post, Reply
from posts.models import Topic
from django import forms
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
import datetime

@login_required
def delete(request, post_id):
    post = Post.objects.get(id=post_id)
    post.delete()
    return HttpResponse()

@login_required
def t(request, topic_name):
    current_posts = Post.objects.filter(topic__name=topic_name).order_by('-time')
    return doPost(request, current_posts)

@login_required
def p(request, post_id):
    post_id = int(post_id)
    post = Post.objects.get(id=post_id)
    current_posts = { post }
    comments = Reply.objects.filter(post=post).order_by('time')
    comments = process(comments)
    if request.method == 'POST':
        form = ReplyForm(request.POST)
        if form.is_valid():
            formData = form.cleaned_data
            reply_id = formData['reply_id']
            replyTo = None
            if(len(reply_id) != 0):
                replyTo = Reply.objects.get(id=int(reply_id))
            r = Reply(
                author=request.user,
                content=formData['content'],
                time=datetime.datetime.now(),
                post = post,
                replyTo = replyTo,
            )
            r.save()
            return HttpResponseRedirect(request.path)
    else:
        form = ReplyForm()
    return render_to_response('posts/post.html', {'current_posts' : current_posts, 'reply_form' : form, 'comments' : comments}, context_instance=RequestContext(request))

def process(comments):
#     copy = list(comments)
#     i = 0
#     while i < len(copy):
#         comment = copy[i]
#         print comment.id
#         pos = j = i+1
#         while j < len(copy):
#             child = copy[j]
#             print child.id
#             if(child.replyTo != None):
#                 print child.replyTo.id
#                 if(child.replyTo.id == comment.id):
#                     del copy[j]
#                     copy.insert(pos, child)
#                     child.indent = comment.indent + 50
#                     ++pos
#             j = j+1
#         i = i+1
    replys = list(comments)
    retVal = []
    processed = []
    for reply in replys:
        if not reply in processed:
            for c in getChildReply(replys, processed, reply):
                retVal.append(c)
    return retVal

def getChildReply(replys, processed, reply):
    if reply in processed:
        return []
    retVal = [reply]
    for r in replys:
        if( (not r in processed) and r.replyTo != None and r.replyTo.id == reply.id):
            for c in getChildReply(replys, processed, r):
                c.indent = c.indent + 50
                retVal.append(c)
    processed.append(reply)
    return retVal

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
    return render_to_response('posts/posts.html', {'form': form, 'current_posts' : current_posts }, context_instance=RequestContext(request)) 

# Create your views here.
@login_required
def posts(request):
    current_posts = Post.objects.order_by('-time')
    for post in current_posts:
        post.reply_count = len(Reply.objects.filter(post=post))
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

@login_required
def add_topic(request):
    if request.method == 'POST':
        post_id = request.POST['post_id']
        topic_name = request.POST['topic_name']
        topic = Topic(name=topic_name)
        topic.save()
        post = Post.objects.get(id=post_id)
        post.topic = topic
        post.save()
    return HttpResponseRedirect('/login/', context_instance=RequestContext(request))

class PostsForm(forms.Form):
    subject = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'size':100}))
    topic = forms.CharField(max_length=48, required=False)
    message = forms.CharField(widget=forms.Textarea(attrs={'rows': 10, 'cols':100}))
    
class ReplyForm(forms.Form):
    content = forms.CharField(widget=forms.Textarea)
    reply_id = forms.CharField(widget=forms.HiddenInput(), required=False)