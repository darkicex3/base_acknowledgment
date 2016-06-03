/**
 * Created by maxbook on 19/05/16.
 */

/****************      ARTICLE MANAGER    ******************/

var ArticleManager = function (options) {
    var results_selector = '.table-article tbody';
    var results_daily_selector = '.content-list-daily-recap';
    var results_poll_selector = '.content-list-poll';
    var link_article_selector = '.link-title-article';
    var daily_recap_selector = '.daily-recap-item';
    var poll_selector = '.poll-item';
    var attachment_selector = '';
    this.display = 'list';
    this.counter = 20;
    this.category = 'Home';
    this.autoquery = null;
    this.autocomplete = false;
    this.sorting = 'publish_date';
    var result = 0;
    var progress = 0;
    var current_article = null;
    var current_daily_recap = null;
    var current_poll = null;

    this.getListArticle = function (category, tags, sorting, counter, autocomplete, autoquery) {
        var count = counter || this.counter;
        var cat = category || this.category;
        var sort = sorting || this.sorting;
        var auto = autocomplete || this.autocomplete;
        var autoq = autoquery || this.autoquery;

        query(cat, tags, count, sort, auto, autoq);
    };

    this.getListDailyRecap = function (sorting, from_date) {
        var sort = sorting || null;
        var date_fr = from_date || null;

        query_daily_recap(sort, date_fr);
    };

    this.getListPolls = function (sorting, id) {
        var sort = sorting || null;
        var art_id = id || null;

        query_polls(sort, art_id);
    };

    this.initEvents = function () {
        window.body.on("click", link_article_selector, function () {
            article($(this))
        });

        window.body.on("click", daily_recap_selector, function () {
            daily_recap($(this))
        });

        window.body.on("click", poll_selector, function () {
            poll($(this))
        });

        for (var element in selector_action) if (selector_action.hasOwnProperty(element))
            window.body.on("click", selector_action[element], function () {
                console.log($(this));
                action($(this))
            });
    };

    var query_polls = function (sorting, id) {
        $.get(urls.get_polls,
            {
                'sorting': sorting,
                'id': id
            },
            function (data) {
                console.log(data);
                results_polls(data);
                Pace.restart();
            }
        );
    };

    var query_daily_recap = function (sorting, from_date) {
        $.get(urls.get_list_daily_recap,
            {
                'sorting': sorting,
                'from': from_date
            },
            function (data) {
                results_daily_recap(data);
                Pace.restart();
            }
        );
    };

    var query = function (category, tags, sorting, counter, autocomplete, autoquery) {
        $.get(urls.get_list_articles,
            {
                'by': category,
                'counter': counter,
                'sorting': sorting,
                'autocomplete': autocomplete,
                'autoquery': autoquery
            },
            function (data) {
                results(data);
                Pace.restart();
            }
        );
    };

    var article = function (object) {
        var article = new Article(object.parent().parent().attr("id"), object.parent().parent());
        current_article = article;
        article.setView();
        article.show();
    };

    var daily_recap = function (object) {
        var daily_recap = new DailyRecap(object.attr("id"), object);
        current_daily_recap = daily_recap;
        daily_recap.setView();
        daily_recap.show();
    };

    var poll = function (object) {
        var poll = new Poll(object.attr("id"), object);
        result = 0;
        progress = 0;
        current_poll = poll;
        poll.show();
    };

    var restartPoll = function () {
        result = 0;
        progress = 0;
        $('.result-poll').remove();
        $('.restart-poll').remove();
        $('.show-results-poll').remove();
        $('.body-poll').children('#question1').show();
    };

    var showResultsPolls = function () {
        console.log('3efrih3bg');
        $('.restart-poll').remove();
        $('.show-results-poll').remove();
        $('.question-poll').show();

        $('.choice').each(function () {
            $(this).removeClass('choice').addClass('res');
        });
        $('.wc1').each(function () {
            $(this).css('background', '#000');
        });
    };

    var nextQuestion = function (object) {
        var classNextQuestion = 'question' + (parseInt(object.parent().parent().attr('id').replace('question', '')) + 1);
        $(object.parent().parent()).fadeOut(200, function () {
            var nextQuestion = $('#' + classNextQuestion);
            var choice_id = object.attr('id');
            var number_of_question = object.parent().parent().parent().parent().find('.nb_questions').attr('id');
            var progress_bar_speed = 100 / number_of_question;
            var progress_bar = $('.progress-bar-poll');

            $.get(urls.wrong_or_right, {'choice_id': choice_id}, function (data) {
                var pts_per_question = 20;
                console.log(data['ok']);
                if (data['ok'] == 'ok') {
                    result += pts_per_question;
                }

                console.log(result);

                if (typeof nextQuestion.attr('id') == 'undefined') {
                    progress_bar.css('width', '100%');
                    console.log(number_of_question, result, pts_per_question);
                    var score = (result / (number_of_question * pts_per_question)) * 20;

                    if (score == 20) {
                        $('<div class="result-poll">Perfect</div>' +
                            '<div class="restart-poll mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent res">Restart</div>' +
                            '<div class="show-results-poll mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect res">Show Results</div>'
                        ).insertBefore("#question1");
                    } else {
                        $('<div class="result-poll">' + parseInt(score) + '/20</div>' +
                            '<div class="restart-poll mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent res">Restart</div>' +
                            '<div class="show-results-poll mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect res">Show Results</div>'
                        ).insertBefore("#question1");
                    }
                } else {
                    progress += progress_bar_speed;
                    progress_bar.css('width', progress + '%');
                }
            });

            nextQuestion.show(100);
        });
    };

    action = function (object) {
        if (current_article)
            current_article.element = object;
        else if (current_daily_recap)
            current_daily_recap.element = object;
        else if (current_poll)
            current_poll.element = object;

        // ACTION ARTICLE
        if (object.attr('class').indexOf('favorite') >= 0)
            current_article.setLike();
        else if (object.attr('class').indexOf('choice') >= 0)
            nextQuestion(object);
        else if (object.attr('class').indexOf('useful') >= 0)
            current_article.setBigup();

        // FEEDBACK ARTICLE
        else if (object.attr('class').indexOf('button-next-step-feedback') >= 0)
            current_article.nextStepFeedback();
        else if (object.attr('class').indexOf('button-back-step-feedback') >= 0)
            current_article.backStepFeedback();
        else if (object.attr('class').indexOf('button-step3-step-feedback') >= 0)
            current_article.giveNewFeedback();
        else if (object.attr('class').indexOf('mark') >= 0)
            current_article.changeMarkFeedback();
        else if (object.attr('class').indexOf('submit-feedback') >= 0)
            current_article.sendFeedback();

        // POLLS FILTER
        else if (object.attr('class').indexOf('restart-poll') >= 0)
            restartPoll();
        else if (object.attr('class').indexOf('show-results-poll') >= 0)
            showResultsPolls();
        else if (object.attr('class').indexOf('any_date_p') >= 0)
            window.Manager.getListPolls('any_date');
        else if (object.attr('class').indexOf('past_7_days_p') >= 0)
            window.Manager.getListPolls('past_7_days');
        else if (object.attr('class').indexOf('this_month_p') >= 0)
            window.Manager.getListPolls('this_month');
        else if (object.attr('class').indexOf('this_year_p') >= 0)
            window.Manager.getListPolls('this_year');
        else if (object.attr('class').indexOf('today_p') >= 0)
            window.Manager.getListPolls('today');

        // DAILY RECAP FILTER
        else if (object.attr('class').indexOf('any_date') >= 0)
            window.Manager.getListDailyRecap('any_date');
        else if (object.attr('class').indexOf('past_7_days') >= 0)
            window.Manager.getListDailyRecap('past_7_days');
        else if (object.attr('class').indexOf('this_month') >= 0)
            window.Manager.getListDailyRecap('this_month');
        else if (object.attr('class').indexOf('this_year') >= 0)
            window.Manager.getListDailyRecap('this_year');
        else if (object.attr('class').indexOf('today') >= 0)
            window.Manager.getListDailyRecap('today');
    };

    var results = function (data, display) {
        var result = '';

        for (var key in data) if (data.hasOwnProperty(key))
            result += list(data[key]['id'], data[key]['title'], data[key]['desc'], data[key]['pub_date'],
                data[key]['loved'], data[key]['tags'], data[key]['favorites'], data[key]['read'],
                data[key]['useful'], data[key]['bigup'], data[key]['modified'], data[key]['views'],
                data[key]['url_option'], data[key]['url'], data[key]['attachments'], data[key]['newart']);


        $(results_selector).empty().append(result).parent().parent().parent().show();
        $('.attr_att').append('<i class="center-icon-attach attachment-button-list ' +
                'material-icons color_base md-24">attach_file</i>');

        $("#grid-data").bootgrid();
        $("table").trigger("update");
    };

    var results_polls = function (data, display) {
        var result = '';
        for (var key in data) if (data.hasOwnProperty(key)) {
            var questions = data[key]['questions'];
            result += list_polls(key, data[key]['poll_title'], data[key]['pub_date']);
        }

        $(results_poll_selector).empty().append(result);
    };

    var results_daily_recap = function (data, display) {
        var result = '';

        for (var key in data) if (data.hasOwnProperty(key))
            result += list_daily_recap(data[key]['id'], data[key]['title'], data[key]['desc'], data[key]['pub_date'],
                data[key]['loved'], data[key]['tags'], data[key]['favorites'], data[key]['read'],
                data[key]['useful'], data[key]['bigup'], data[key]['modified'], data[key]['views'],
                data[key]['url_option'], data[key]['url']);

        $(results_daily_selector).empty().append(result);
    };

    var list_polls = function (poll_id, poll_title, pub_date) {
        return '<div class="poll-item ' + poll_id + '" id="' + poll_id + '">' +
            '<a data-toggle="modal" class="link-poll" href="#display-poll">' + poll_title + '</a>' +
            '<a class="date-poll schedule-txt-poll-list txt">' + pub_date + '</a>' +
            '</div>';
    };

    var list_daily_recap = function (key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                                     useful_counter, bigup_article, last_update, view_counter, url_option, url) {

        return '<div class="daily-recap-item ' + key + '" id="' + key + '">' +
            '<a data-toggle="modal" class="link-daily-recap" href="#display-daily-recap">' + title + '</a>' +
            '<a class="date-daily-recap schedule-txt-dialy-recap-list txt">' + date_publish + '</a>' +
            '</div>';
    };

    var list = function (key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                         useful_counter, bigup_article, last_update, view_counter, url_option, url, att, newart) {
        var attr_new = (newart == 'new' ? '<span class="id-article" style="">New</span><span class="id-article-ess" style="">Essential</span></td>' : '');
        var attr_att = (att != '' ? ' attr_att' : '');

        var href = (url_option == 'ok' ? url : '#display-article');
        var redirect = (url_option == 'ok' ? '_blank' : '');
        var classattr = (url_option == 'ok' ? 'link-title-article-url' : 'link-title-article');

        return '<tr class="row' + key + '" id="' + key + '" style="position: relative">' +
            '<th class="field-title font-list padding-list">' +
            '<span class="'+newart+'"></span><a data-toggle="modal" href="' + href + '" target="' + redirect + '" class="padding-bottom-list ' + classattr + attr_att + '">' +
            '' + title +
            '</a>' +
            '<br>' + tags + '</th>' +
            '<td class="field-publish_date padding-top-list nowrap">' + date_publish + '</td>' +
            // '<td class="field-modified padding-top-list nowrap">' + last_update + '</td>' +
            '<td class="center field-useful_counter padding-top-list">' + useful_counter + '</td>' +
            '<td class="center field-favorite_counter padding-top-list">' + favorite_counter + '</td>' +
            '<td class="center field-view_counter padding-top-list" style="position: relative">' + view_counter + attr_new +
            '</tr>'
    };

    var urls = {
        'get_list_articles': GET_LIST_ARTICLES,
        'get_list_daily_recap': GET_DAILY_RECAP,
        'get_polls': GET_POLLS,
        'wrong_or_right': W_O_R
    };

    var selector_action = {
        'like_selector': '.favorite',
        'read_selector': '.read-button',
        'bigup_selector': '.useful',
        'comment-to-step-2': '.button-next-step-feedback',
        'comment-to-step-1': '.button-back-step-feedback',
        'comment-step-3': '.button-step3-step-feedback',
        'send-feedback': 'form-feedback',
        'icon-feedback': '.mark',
        'submit-feedback': '.submit-feedback',

        'any_date': '.any_date',
        'today': '.today',
        'past_7_days': '.past_7_days',
        'this_month': '.this_month',
        'this_year': '.this_year',

        'any_date_p': '.any_date_p',
        'today_p': '.today_p',
        'past_7_days_p': '.past_7_days_p',
        'this_month_p': '.this_month_p',
        'this_year_p': '.this_year_p',

        'choice': '.choice',
        'restart-poll': '.restart-poll',
        'show-results-poll': '.show-results-poll'
    };

    var selector = {
        'body_selector': '.modal-body-article',
        'stats_selector': '.modal-stats-article',
        'comment_selector': '.modal-comments-article',
        'attachment_selector': '.modal-attachments-article',
        'like_icon': '.favorite'
    }
};


