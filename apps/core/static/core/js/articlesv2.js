/**
 * Created by maxbook on 19/05/16.
 */

jQuery(document).ready(function ($) {

    var Article = function (element, id, options) {
        this.element = element;
        this.id = id;
        this.like_selector = '.like-button' || options.like_selector;
        this.read_selector = '.read-button' || options.read_selector;
        this.bigup_selector = '.useful-button' || options.bigup_selector;
        this.attachment_selector = '.attachment-button' || options.attachment_selector;
        this.comment_selector = '.comment-button' || options.comment_selector;

        this.isLike = function () {
            return query(urls.like_manager, {'action', 'r'});
        };

        this.isRead = function () {
            return query(urls.read_manager, actions.read);
        };

        this.isSearch = function () {
            return query(urls.search_manager, actions.read);
        };

        this.isBigup = function () {
            return query(urls.bigup_manager, actions.read);
        };

        this.setLike = function (active, inactive) {
            query(urls.like_manager, actions.read);
            design(this.like_selector, active, inactive);
        };

        this.setRead = function (active, inactive) {
            query(urls.like_manager, actions.write);
            design(this.read_selector, active, inactive);
        };

        this.setBigup = function (active, inactive) {
            query(urls.like_manager, actions.write);
            design(this.bigup_selector, active, inactive)
        };

        this.setSearch = function () {
            query(urls.like_manager, actions.write);
        };

        this.show = function () {
            query(urls.like_manager, actions.read, {'id': this.id});
        };
    };

    Article.actions = {
        'read': 'r',
        'write': 'w'
    };

    Article.selector = {
        'like_selector': this.like_selector,
        'read_selector': this.read_selector,
        'bigup_selector': this.bigup_selector,
        'comment_selector': this.comment_selector,
        'attachment_selector': this.attachment_selector,
    };

    Article.attrclass = {
        'base': {},
        'liked': {},
        'bigup': {},
    };

    Article.style = {
        'read': {},
        'unread': {}
    };

    Article.urls = {
        'like_manager': LIKE_MANAGER,
        'read_manager': READ_MANAGER,
        'bigup_manager': BIGUP_MANAGER,
        'useful_manager': USEFUL_MANAGER,
        'search_manager': SEARCH_MANAGER,
        'get_article': GET_ARTICLE
    };

    Article.prototype.query = function (url, action, params = null) {
        $.get(url, {'action': action, params}, function (data) {
            var results = {};
            for (var key in data)
                for (var value in data[key])
                    var tmp_key = data[key];
            results.update({tmp_key: {value: data[key][value]}});

            return results;
        });
    };

    Article.prototype.design = function (element, active, inactive) {
        switch (element) {
            case this.like_selector:
                if (this.isLike())
                    $(element).attr('class', active || attrclass.liked);
                else $(element).attr('class', inactive || attrclass.base);
                break;
            case this.read_selector:
                if (this.isRead())
                    $(element).css(active || style.read);
                else $(element).css(inactive || style.unread);
                break;
            case this.bigup_selector:
                if (this.isBigup())
                    $(element).attr('class', active || attrclass.bigup);
                else $(element).attr('class', inactive || attrclass.base);
                break;
            default:
                break;
        }
    };

    var ArticleManager = function (options) {
        this.results_selector = '.results' || options.results_selector;
    };

    Article.urls = {
        'like_manager': LIKE_MANAGER,
        'read_manager': READ_MANAGER,
    };

    ArticleManager.prototype.key = function (self) {
        return self.parent().parent().find('.key').attr("id");
    };

    ArticleManager.prototype.element = function (self) {
        return self.parent().parent();
    };

    ArticleManager.prototype.event = function () {
        $('body')
            .on('click', Article.like_selector, function (event) {
                var article = new Article(key($(this)), element($(this)));
                article.setLike();
                article.destroy();
            })
            .on('click', Article.read_selector, function (event) {
                var article = new Article(key($(this)), element($(this)));
                article.setRead();
                article.destroy();
            })
            .on('click', Article.bigup_selector, function (event) {
                var article = new Article(key($(this)), element($(this)));
                article.setBigup();
                article.destroy();
            })
            .on('click', Article.attachment_selector, function (event) {
                var article = new Article(key($(this)), element($(this)));
                // Do something
                article.destroy();
            })
            .on('click', Article.comment_selector, function (event) {
                var article = new Article(key($(this)), element($(this)));
                // Do something
                article.destroy();
            });
    };

    Article.prototype.setup = function () {
        var self = this;

        this.form_elem = $(this.form_selector);
        this.query_box = this.form_elem.find('input[name=q]');
        // Watch the input box.
        this.query_box.on('keyup', function () {
            var query = self.query_box.val();

            if (query.length < self.minimum_length) {
                return false
            }

            self.fetch(query)
        });

        // On selecting a result, populate the search field.
        this.form_elem.on('click', '.ac-result', function (ev) {
            self.query_box.val($(this).text());
            $('.ac-results').remove();
            $('.cover').hide(100);
            return false
        })
    };

    ArticleManager.prototype.fetch = function (query) {
        var self = this;
        var tags = $('#search_categories').text();
        var sort = $('#search_sorting').text();

        if (tags.indexOf('#') != -1)
            tags = tags.slice(1);
        else
            tags = null;


        $.ajax({
            url: this.url
            , data: {
                'in': tags,
                'q': query,
                'by': sort,
            }
            , success: function (data) {
                self.show_results(data)
            }
        })
    };

    ArticleManager.prototype.show_results = function (data) {

        var results = data.results || [];

        if (results.length > 0) {

            console.log(results.length);
        }
        else {
            console.log('No results');
        }

    };


    window.autocomplete = new Autocomplete({
        form_selector: '.autocomplete-me'
    });
    window.autocomplete.setup();
});
