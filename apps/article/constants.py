DEFAULT_CATEGORY_ID = 1
DEFAULT_AUTHOR_ID = 1
DEFAULT_FEEDBACK_ID = 1

description_help = "If omitted, the description will be determined by the first bit of the article's content."
keywords_help = "If omitted, the keywords will be the same as the article tags."
tags_help = "Tags that describe this article."
auto_tag_help = "Check this if you want to automatically assign any existing tags to this article based on its content."
followup_for_help = "Select any other articles that this article follows up on."
publish_date_help = "The date and time this article shall appear online."
expiration_date = "Leave blank if the article does not expire."


INJURIES = ""
NEGATIVE_WORDS = ""
MSG_VIEW_ALERT = ""
MSG_USELESS_ALERT = ""

STATUS_CHOICES = (
    ('d', 'Draft'),
    ('p', 'Published'),
    ('w', 'Withdrawn'),
)

RATE_CHOICES = (
    ('0', 'Very Dissatisfied'),
    ('1', 'Dissatisfied'),
    ('2', 'Neutral'),
    ('3', 'Satisfied'),
    ('4', 'Very Satisfied'),
)

TYPE_CHOICES = (
    ('0', 'Right Answer'),
    ('1', 'Wrong Answer'),
)
