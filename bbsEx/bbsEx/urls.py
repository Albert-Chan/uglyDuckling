from bbsEx import views
from django.conf import settings
from django.conf.urls import patterns, include
from django.contrib import admin
from django.contrib.auth.views import login, logout
from posts.views import p, posts, t, comment, delete, select_topic, \
    get_candidates, add_topic
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
    (r'^register/$', views.register),
    (r'^$', views.index),
    (r'^login/$', login),
    #(r'^logout/$', logout),
    (r'^logout/$', logout, {'next_page': '/'}),
    (r'^p/$', posts),
    (r'^p/(\d+)/.+$', p),
    (r'^del/(\d+)$', delete),
    (r'^t/(.+)$', t),
    (r'^site_static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_PATH}),
    (r'^comment/(\d+)$', comment),
    (r'^q_topic/(.+)$', get_candidates),
    (r'^add_topic/$', add_topic),
    (r'^select_topic/(\d+)/(\d+)$', select_topic),
)
