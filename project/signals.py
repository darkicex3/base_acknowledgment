from haystack.signals import RealtimeSignalProcessor


class RelatedRealtimeSignalProcessor(RealtimeSignalProcessor):

    """
    Extension to haystack's RealtimeSignalProcessor not only causing the
    search_index to update on saved model, but also for image url, which is needed to show
    images on search results
    """


def handle_save(self, sender, instance, **kwargs):
    if hasattr(instance, 'reindex_related'):
        for related in instance.reindex_related:
            related_obj = getattr(instance, related)
            self.handle_save(related_obj.__class__, related_obj)
    return super(RelatedRealtimeSignalProcessor, self).handle_save(sender, instance, **kwargs)


def handle_delete(self, sender, instance, **kwargs):
    if hasattr(instance, 'reindex_related'):
        for related in instance.reindex_related:
            related_obj = getattr(instance, related)
            self.handle_delete(related_obj.__class__, related_obj)
    return super(RelatedRealtimeSignalProcessor, self).handle_delete(sender, instance, **kwargs)