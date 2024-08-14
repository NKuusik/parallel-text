from rest_framework import permissions
from django.conf import settings

# Permission
class WhitelistPermission(permissions.BasePermission):
    """
    Global permission check for whitelisted IPs.
    """

    def has_permission(self, request, view):
        domain = request.META['REMOTE_HOST']
        remote_address = request.META['REMOTE_ADDR']
        allowed_hosts = settings.ALLOWED_HOSTS
        return domain in allowed_hosts or remote_address in allowed_hosts