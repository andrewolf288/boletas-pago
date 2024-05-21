from django.contrib.auth.models import User, Group, Permission, ContentType
from rest_framework import serializers

class ContentTyeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = ['name']

class PermissionSerializer(serializers.ModelSerializer):
    content_type = serializers.CharField(source='content_type.name')

    class Meta:
        model = Permission
        fields = ['id', 'name', 'content_type', 'codename']

class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['name', 'permissions']

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields  = ['id', 'first_name', 'last_name', 'groups']