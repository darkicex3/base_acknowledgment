from haystack.forms import SearchForm


class ArticlesSearchForm(SearchForm):

    def no_query_found(self):
        return self.searchqueryset.all()