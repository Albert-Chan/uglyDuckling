from bbsEx import views
from django.conf import settings
from django.conf.urls import patterns, include
from django.contrib import admin
from django.contrib.auth.views import login, logout
from posts.views import post, posts, t
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
    (r'^posts/$', posts),
    (r'^posts/(\d+)/.+$', post),
    (r'^t/(.+)$', t),
    (r'^site_static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_PATH}),
)
