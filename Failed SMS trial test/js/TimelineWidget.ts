module Midas.Widgets {
    export class TimelineWidgetItem extends Midas.Core.WidgetItem {
        initialise() {
            super.initialise();

            this.timelineLoadingElement = this.element.find('#TimelineLoadingPanel');

            var timelineLoadingPanel = this.timelineLoadingElement.getAjaxLoadingPanel();
            if (timelineLoadingPanel != null) {
                timelineLoadingPanel.bind(Midas.Core.AjaxLoadingPanel.loadedEventName, () => {
                    this.initialiseTimeline();
                });
            }
        }

        private timelineLoadingElement: JQuery;
        private timeline: Business.Timeline;

        private initialiseTimeline = () => {
            this.timeline = new Midas.Business.Timeline({});
            this.timeline.bind(Midas.Business.TimelineEvents[Midas.Business.TimelineEvents.OnShowPreviousCard], this.registerTimelineGoogleAnalyticsEvent);
            this.timeline.bind(Midas.Business.TimelineEvents[Midas.Business.TimelineEvents.OnShowNextCard], this.registerTimelineGoogleAnalyticsEvent);
            this.timeline.bind(Midas.Business.TimelineEvents[Midas.Business.TimelineEvents.OnShowOpenCard], this.registerTimelineGoogleAnalyticsEvent);
        }

        private registerTimelineGoogleAnalyticsEvent = () => {
            var element = this.timelineLoadingElement;
            new Midas.Core.GoogleAnalyticsTracker().elementReady(element);
        }

        destroy(): void {
            this.timeline.destroy();

            super.destroy();
        }
    }

    export class TimelineWidgetItemInitialiser implements Midas.Core.IWidgetItemInitialiser {
        initialise(widgetItemElement: JQuery): Core.WidgetItem {
            return new TimelineWidgetItem(widgetItemElement);
        }
    }
}