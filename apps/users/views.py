from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.views.generic import View
from django.db import IntegrityError
from django.contrib.auth.models import User


class LoginView(View):

    def post(self, *args, **kwargs):
        """
        :param args:
        :param kwargs:
        :return:
        """
        context = {}
        username = self.request.POST.get('username')
        password = self.request.POST.get('password')

        user = authenticate(username=username, password=password)

        x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = self.request.META.get('REMOTE_ADDR')


        # if ip in auth_ip.AUTHORIZED_IP:
        if user is not None:
            if user.is_active:
                login(self.request, user)
                context['success'] = True
                return JsonResponse(context)
            else:
                # Return a 'disabled account' error message
                context['success'] = False
                context['error_msg'] = 'User account has been disabled.'
        else:
            # Return an 'invalid login' error message.
            context['success'] = False
            context['error_msg'] = 'Invalid username/password.'

        return JsonResponse(context)
        # else:
        #     context['success'] = False
        #     context['error_msg'] = 'You are trying to access a restricted area, you will redirect and your ip address'\
        #                            'will be signal to administrator.'


class LogoutView(View):
    """
    The logout view class. This will log the user out and invalidate the session.
    """

    def get(self, *args, **kwargs):
        """
        :param args:
        :param kwargs:
        :return:
        """

        logout(self.request)
        return JsonResponse({'success pop': True})


class RegisterView(View):
    """
    The register view class. This will attempt to create a user from the
    supplied username and password.
    If the username already exists, a 400 response is sent back
    """

    def post(self, *args, **kwargs):
        """
        :param args:
        :param kwargs:
        :return:
        """

        context = {}
        email = self.request.POST.get('email')
        username = self.request.POST.get('username')
        password = self.request.POST.get('password')
        password_confirm = self.request.POST.get('password_conf')

        # Check password matching
        if password != password_confirm:
            context['success'] = False
            context['error_msg'] = 'Password does not match the confirm password.'
            return JsonResponse(context)

        # Check email availability
        if User.objects.filter(email = email).count() == 1:
            context['success'] = False
            context['error_msg'] = 'Email already exists.'
            return JsonResponse(context)

        # Check email and username availability
        try:
            validate_email(email)
            User.objects.create_user(username, email=email, password=password)
            user = authenticate(username=username, password=password)
            login(self.request, user)
            context['success'] = True
            return JsonResponse(context)
        except IntegrityError:
            # Return an 'invalid user' error message.
            context['success'] = False
            context['error_msg'] = 'User already exists.'
            return JsonResponse(context)
        except ValidationError:
            # Return an 'invalid email' error message.
            context['success'] = False
            context['error_msg'] = 'Invalid email'
            return JsonResponse(context)

class LoginRequired(View):

    def get(self, *args, **kwargs):

        context = {}
        if not self.request.user.is_authenticated():
            context['success'] = True
            return JsonResponse(context)

        context['success'] = False
        return JsonResponse(context)

    def post(self, *args, **kwargs):
        context = {}

        if not self.request.user.is_authenticated():
            context['success'] = True
            return JsonResponse(context)

        context['success'] = False
        return JsonResponse(context)

