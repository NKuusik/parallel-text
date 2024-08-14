from rest_framework import permissions
from django.conf import settings
from pprint import pprint

# Permission
class WhitelistPermission(permissions.BasePermission):
    """
    Global permission check for whitelisted domain names.
    """

    def has_permission(self, request, view):
        has_permission = False
        whitelisted_origins = settings.WHITELISTED_ORIGINS
        if settings.DEBUG is True:
             has_permission = True
        else: 
            domain = None
            if 'HTTP_ORIGIN' in request.META:
                domain = request.META['HTTP_ORIGIN']
            elif 'HTTP_REFERER' in request.META:
                domain = request.META['HTTP_REFERER']
            has_permission = domain in whitelisted_origins
        return has_permission