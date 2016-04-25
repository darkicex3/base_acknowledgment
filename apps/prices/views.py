from apps.prices.forms import AuthenticationForm
from django.views.generic.edit import FormView
from django.http import JsonResponse
from django.views.generic import View
from apps.prices.models import Product, Customer, Offer


class CreateProductView(View):

    def post(self, *args, **kwargs):
        """
        :param args:
        :param kwargs:
        :return:
        """
        context = {}

        name = self.request.POST.get('name')
        details = self.request.POST.get('details')
        cost = self.request.POST.get('cost')
        selling_cost = self.request.POST.get('selling_cost')
        note = self.request.POST.get('note')

        q = Product(name=name, details=details, cost=cost, selling_cost=selling_cost, note=note)
        if q.save():
            context['success'] = True

        return JsonResponse(context)


class CreateOfferView(View):

    def post(self, *args, **kwargs):

        context = {}

        reference = self.request.POST.get('reference')
        expiration_date = self.request.POST.get('expiration_date')
        creation_date = self.request.POST.get('creation_date')
        customer = self.request.POST.get('customer')
        products = self.request.POST.get('products')
        status = self.request.POST.get('status')

        q = Offer(reference=reference, expiration_date=expiration_date,
                  date=creation_date, customer=customer, products=products, status=status)
        if q.save():
            context['success'] = True


        return JsonResponse(context)


class CreateCustomerView(View):

    def post(self, *args, **kwargs):

        context = {}

        name = self.request.POST.get('name')
        phone = self.request.POST.get('phone')
        mail = self.request.POST.get('mail')
        address1 = self.request.POST.get('address1')
        address2 = self.request.POST.get('address2')
        zip_code = self.request.POST.get('zip_code')
        city = self.request.POST.get('city')
        state = self.request.POST.get('state')
        country = self.request.POST.get('country')
        note = self.request.POST.get('note')

        q = Customer(name=name, phone=phone, mail=mail, adresse1=address1, adresse2=address2,
                     zip_code=zip_code, city=city, state=state, country=country, note=note)

        if q.save():
            context['success'] = True


        return JsonResponse(context)


class UpdateDataView(View):

    def post(self, *args, **kwargs):


        context = {}
        context['products'] = {}
        context['customers'] = {}
        context['offers'] = {}
        i = 0
        a = 0
        money_refused = 0
        money_accepted = 0
        money_waiting = 0

        list_all_products = Product.objects.all()
        list_all_customers = Customer.objects.all()
        list_all_offers = Offer.objects.all()

        # GET PRODUCTS
        for e in list_all_products:
            i = i + 1
            context['products']['product_' + str(i)] = {
                'ref': e.name,
                'cost': e.cost,
                'selling_cost': e.selling_cost,
                'details': e.details,
                'note': e.note
            }

        i = 0

        # GET CUSTOMERS
        for e in list_all_customers:
            i = i + 1
            context['customers']['customer_' + str(i)] = {
                'name': e.name,
                'mail': e.mail,
                'phone': e.phone,
                'city': e.city,
                'state': e.state,
                'address1': e.adresse1,
                'address2': e.adresse2,
                'zip_code': e.zip_code,
                'country': e.country,
                'note': e.note
            }


        i = 0

        # GET OFFERS
        for e in list_all_offers:
            i = i + 1
            context['offers']['offer_' + str(i)] = {
                'customer': {
                    'name': e.customer.name,
                    'mail': e.customer.mail,
                    'phone': e.customer.phone,
                    'city': e.customer.city,
                    'state': e.customer.state,
                    'address1': e.customer.adresse1,
                    'address2': e.customer.adresse2,
                    'zip_code': e.customer.zip_code,
                    'country': e.customer.country,
                    'note': e.customer.note
                },
                'ref': e.reference,
                'expiration_date': e.expiration_date,
                'date': e.date,
                'status': e.status
            }
            products = e.products.all()

            a = 0

            # GET PRODUCTS
            for y in products:
                a = a + 1
                context['offers']['offer_' + str(i)]['products'] = {}

            a = 0
            for j in products:
                a = a + 1

                context['offers']['offer_' + str(i)]['products']['product_' + str(a)] = {
                    'ref': j.name,
                    'cost': j.cost,
                    'selling_cost': j.selling_cost,
                    'details': j.details,
                    'note': j.note
                }

        for e in Offer.objects.all().filter(status='REFUSED'):
            money_refused = money_refused + e.get_money_offer()

        for e in Offer.objects.all().filter(status='ACCEPTED'):
            money_accepted = money_refused + e.get_money_offer()

        for e in Offer.objects.all().filter(status='WAITING'):
            money_waiting = money_refused + e.get_money_offer()

        context['success'] = True
        context['money_accepted'] = money_accepted
        context['money_refused'] = money_refused
        context['money_waiting'] = money_waiting

        return JsonResponse(context)


class AuthenticationForm(FormView):
    template_name = 'prices/index.html'
    form_class = AuthenticationForm
    success_url = '/thanks/'








