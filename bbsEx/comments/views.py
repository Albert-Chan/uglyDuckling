from comments.models import Comment
from django import forms
from django.http.response import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
import datetime

def comment(request):
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            fromData = form.cleaned_data
            c = Comment(
                subject=fromData['subject'],
                author=request.user,
                content=fromData['message'],
                date=datetime.datetime.now(),
            )
            c.save()
            return HttpResponseRedirect('/hello/')
    else:
        form = CommentForm(
            initial={'subject': 'Your subject', 'message': 'Put your comments here. Max 60000 words!'}
        )
    return render_to_response('comments/comment.html', {'form': form}, context_instance=RequestContext(request))


class CommentForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)