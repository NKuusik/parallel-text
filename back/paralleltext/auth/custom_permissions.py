from rest_framework import permissions
from django.conf import settings
from pprint import pprint

# Permission
class WhitelistPermission(permissions.BasePermission):
    """
    Global permission check for whitelisted IPs.
    """

    def has_permission(self, request, view):
        #domain = request.META['REMOTE_HOST']

        print(request.META)
        #print(domain)
        #remote_address = request.META['REMOTE_ADDR']
        #print(remote_address)
        #whitelisted_origins = settings.WHITELISTED_ORIGINS
        #return domain in whitelisted_origins or remote_address in whitelisted_origins
        return True