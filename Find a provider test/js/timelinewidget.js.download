var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Midas;
(function (Midas) {
    var Widgets;
    (function (Widgets) {
        var TimelineWidgetItem = (function (_super) {
            __extends(TimelineWidgetItem, _super);
            function TimelineWidgetItem() {
                var _this = this;
                _super.apply(this, arguments);
                this.initialiseTimeline = function () {
                    _this.timeline = new Midas.Business.Timeline({});
                    _this.timeline.bind(Midas.Business.TimelineEvents[Midas.Business.TimelineEvents.OnShowPreviousCard], _this.registerTimelineGoogleAnalyticsEvent);
                    _this.timeline.bind(Midas.Business.TimelineEvents[Midas.Business.TimelineEvents.OnShowNextCard], _this.registerTimelineGoogleAnalyticsEvent);
                    _this.timeline.bind(Midas.Business.TimelineEvents[Midas.Business.TimelineEvents.OnShowOpenCard], _this.registerTimelineGoogleAnalyticsEvent);
                };
                this.registerTimelineGoogleAnalyticsEvent = function () {
                    var element = _this.timelineLoadingElement;
                    new Midas.Core.GoogleAnalyticsTracker().elementReady(element);
                };
            }
            TimelineWidgetItem.prototype.initialise = function () {
                var _this = this;
                _super.prototype.initialise.call(this);
                this.timelineLoadingElement = this.element.find('#TimelineLoadingPanel');
                var timelineLoadingPanel = this.timelineLoadingElement.getAjaxLoadingPanel();
                if (timelineLoadingPanel != null) {
                    timelineLoadingPanel.bind(Midas.Core.AjaxLoadingPanel.loadedEventName, function () {
                        _this.initialiseTimeline();
                    });
                }
            };
            TimelineWidgetItem.prototype.destroy = function () {
                this.timeline.destroy();
                _super.prototype.destroy.call(this);
            };
            return TimelineWidgetItem;
        }(Midas.Core.WidgetItem));
        Widgets.TimelineWidgetItem = TimelineWidgetItem;
        var TimelineWidgetItemInitialiser = (function () {
            function TimelineWidgetItemInitialiser() {
            }
            TimelineWidgetItemInitialiser.prototype.initialise = function (widgetItemElement) {
                return new TimelineWidgetItem(widgetItemElement);
            };
            return TimelineWidgetItemInitialiser;
        }());
        Widgets.TimelineWidgetItemInitialiser = TimelineWidgetItemInitialiser;
    })(Widgets = Midas.Widgets || (Midas.Widgets = {}));
})(Midas || (Midas = {}));
//# sourceMappingURL=TimelineWidget.js.map