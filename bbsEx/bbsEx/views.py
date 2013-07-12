#!/usr/bin/env python
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext

def hello(request):
    return render_to_response('hello.html',  {'user': request.user, })

def index(request):
    registerForm = UserCreationForm()
    return render_to_response('index.html', {'signUpForm': registerForm, }, context_instance=RequestContext(request) )

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1']) 
            auth.login(request, user)
            if request.session.test_cookie_worked():
                request.session.delete_test_cookie()
            return HttpResponseRedirect("/p")
    #return render_to_response("registration/register.html", {'form': UserCreationForm(), }, context_instance=RequestContext(request))
