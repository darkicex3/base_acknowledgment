from django import forms
from django.forms import ModelForm
from .models import Product, Offer, Customer


class AuthenticationForm(forms.Form):
    username = forms.CharField(
        error_messages={'required': 'Please enter your login.'},
        widget = forms.TextInput(attrs={'id': 'username', 'class': 'form-control', 'placeholder': 'Login'})
    )
    email = forms.EmailField(
        error_messages={'required': 'Please enter your mail.'},
        widget=forms.EmailInput(attrs={'id': 'email', 'class': 'form-control', 'placeholder': 'Email'})
    )
    password_conf = forms.CharField(
        error_messages = {'required': 'Please confirm your password. '},
        widget=forms.PasswordInput(attrs={'id': 'password_conf', 'class': 'form-control', 'placeholder': 'Confirm your password'}),
    )
    password = forms.CharField(
        error_messages = {'required': 'Please enter your password.'},
        widget=forms.PasswordInput(attrs={'id': 'password', 'class': 'form-control', 'placeholder': 'Password'}),
    )

    name = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'name', 'class': 'form-control', 'placeholder': 'Name'}),
    )

    details = forms.CharField(max_length=500,
        widget=forms.Textarea(attrs={'id': 'details', 'class': 'form-control', 'placeholder': 'Details'}),
    )

    cost = forms.IntegerField(
        widget=forms.TextInput(attrs={'id': 'cost', 'class': 'form-control', 'placeholder': 'Cost'}),
    )

    selling_cost = forms.IntegerField(
        widget=forms.TextInput(attrs={'id': 'selling_cost', 'class': 'form-control', 'placeholder': 'Selling Cost'}),
    )

    note = forms.CharField(max_length=2000,
        widget=forms.Textarea(attrs={'id': 'note', 'class': 'form-control', 'placeholder': 'Note'}),
    )

    phone = forms.IntegerField(
        widget=forms.TextInput(attrs={'id': 'phone', 'class': 'form-control', 'placeholder': 'Phone'}),
    )

    mail = forms.EmailField(
        widget=forms.EmailInput(attrs={'id': 'mail', 'class': 'form-control', 'placeholder': 'Email'}),
    )

    address1 = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'address1', 'class': 'form-control', 'placeholder': 'Address 1'}),
    )

    address2 = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'address2', 'class': 'form-control', 'placeholder': 'Address 2'}),
    )

    zip_code = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'zip_code', 'class': 'form-control', 'placeholder': 'Zip Code'}),
    )

    city = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'city', 'class': 'form-control', 'placeholder': 'City'}),
    )

    state = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'state', 'class': 'form-control', 'placeholder': 'State'}),
    )

    country = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'country', 'class': 'form-control', 'placeholder': 'Country'}),
    )

    reference = forms.CharField(
        widget=forms.TextInput(attrs={'id': 'reference', 'class': 'form-control', 'placeholder': 'Reference'}),
    )

    expiration_date = forms.DateField(
        widget=forms.DateInput(attrs={'id': 'expiration_date', 'class': 'form-control', 'placeholder': 'Expiration Date'}),
    )

    date = forms.DateField(
        widget=forms.DateInput(attrs={'id': 'date', 'class': 'form-control', 'placeholder': 'Creation Date'}),
    )











