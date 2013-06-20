from bbsEx import views
from django.conf.urls import patterns
from django.contrib import admin
from django.contrib.auth.views import login, logout
from comments.views import comment
# Uncomment the next two lines to enable the admin:
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'bbsEx.views.home', name='home'),
    # url(r'^bbsEx/', include('bbsEx.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    (r'^comment/$', comment),
    (r'^hello/$', views.hello),
    (r'^register/$', views.register),
    (r'^$', views.index),
    (r'^login/$', login),
    (r'^logout/$', logout),
)
