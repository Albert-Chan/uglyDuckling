from bbsEx import views
from comments.views import comment
from django.conf.urls import patterns, include
from django.contrib import admin
from django.contrib.auth.views import login, logout
# Uncomment the next two lines to enable the admin:
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'bbsEx.views.home', name='home'),
    # url(r'^bbsEx/', include('bbsEx.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),
    
    (r'^$', views.index),
    (r'^login/$', login),
    (r'^logout/$', logout),
    (r'^comment/$', comment),
)
