/// <reference path="../../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../../Scripts/typings/jqueryui/jqueryui.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Midas;
(function (Midas) {
    var Business;
    (function (Business) {
        (function (TimelineEvents) {
            TimelineEvents[TimelineEvents["OnShowPreviousCard"] = 0] = "OnShowPreviousCard";
            TimelineEvents[TimelineEvents["OnShowNextCard"] = 1] = "OnShowNextCard";
            TimelineEvents[TimelineEvents["OnShowOpenCard"] = 2] = "OnShowOpenCard";
        })(Business.TimelineEvents || (Business.TimelineEvents = {}));
        var TimelineEvents = Business.TimelineEvents;
        var Timeline = (function (_super) {
            __extends(Timeline, _super);
            function Timeline(settings) {
                var _this = this;
                _super.call(this);
                this.position = 1;
                this.modelIdPrefix = "#eventModal";
                this.selectedDate = "";
                this.tabKeyCode = 9;
                this.enterKeyCode = 13;
                this.leftArrowKeyCode = 37;
                this.rightArrowKeyCode = 39;
                this.CurrentCard = function () {
                    var currentCardId = _this.modelIdPrefix + _this.position;
                    return $(currentCardId);
                };
                this.CurrentCardDate = function () {
                    return _this.CurrentCard().find('.badge').text();
                };
                this.NextCard = function () {
                    if (_this.position < $('.expanded-event').length) {
                        _this.CurrentCard().modal('hide');
                        var nextCardId = _this.modelIdPrefix + ++_this.position;
                        $(nextCardId).modal('show');
                        $('.tl1').timeline('goTo', _this.CurrentCard().data('timelineparentid'));
                        _this.trigger(TimelineEvents[TimelineEvents.OnShowNextCard], { Response: nextCardId });
                    }
                };
                this.PreviousCard = function () {
                    if (_this.position > 1) {
                        _this.CurrentCard().modal('hide');
                        var nextCardId = _this.modelIdPrefix + --_this.position;
                        $(nextCardId).modal('show');
                        $('.tl1').timeline('goTo', _this.CurrentCard().data('timelineparentid'));
                        _this.trigger(TimelineEvents[TimelineEvents.OnShowPreviousCard], { Response: nextCardId });
                    }
                };
                this.OpenCard = function (ce) {
                    var card = $(ce.currentTarget);
                    if (card.hasClass('disableClick')) {
                        card.removeClass('disableClick');
                    }
                    else {
                        var dataVal = card.data('event');
                        _this.position = dataVal;
                        var id = _this.modelIdPrefix + dataVal;
                        $(id).modal();
                    }
                    _this.trigger(TimelineEvents[TimelineEvents.OnShowOpenCard], { Response: card });
                };
                this.AddEventHandlers = function () {
                    $('.next').on('click', function () {
                        _this.NextCard();
                    });
                    $('.prev').on('click', function () {
                        _this.PreviousCard();
                    });
                    $('.card').on('click', function (ce) {
                        _this.OpenCard(ce);
                    });
                    $('.card').on('keypress', function (ce) {
                        if (ce.keyCode === _this.enterKeyCode) {
                            _this.OpenCard(ce);
                        }
                    });
                    $(document).on('keyup', function (ce) {
                        _this.HandleScroll(ce);
                    });
                    $(".timeline-container").on('keyup', function (ce) {
                        _this.HandleTab(ce);
                    });
                    $(".card").draggable({
                        start: function (event, ui) {
                            $(this).addClass('disableClick');
                        },
                        stop: function (event, ui) {
                            $(this).removeClass('disableClick');
                        }
                    });
                };
                this.HandleTab = function (ce) {
                    if (ce.keyCode == _this.tabKeyCode) {
                        var id = $(document.activeElement).parent().data('id');
                        $('.tl1').timeline('goTo', id);
                    }
                };
                this.HandleScroll = function (ce) {
                    if (ce.keyCode == _this.leftArrowKeyCode) {
                        if (_this.ModalIsOpen()) {
                            _this.PreviousCard();
                        }
                    }
                    if (ce.keyCode == _this.rightArrowKeyCode) {
                        if (_this.ModalIsOpen()) {
                            _this.NextCard();
                        }
                    }
                };
                this.ModalIsOpen = function () {
                    return $('body').hasClass('modal-open');
                };
                this.AddEventHandlers();
                $('.tl1').timeline({
                    startItem: $('#StartDate').val()
                });
            }
            Timeline.prototype.destroy = function () {
                $('.tl1').timeline('destroy');
            };
            return Timeline;
        }(Midas.Core.Observable));
        Business.Timeline = Timeline;
        $(function () {
        });
    })(Business = Midas.Business || (Midas.Business = {}));
})(Midas || (Midas = {}));
//# sourceMappingURL=Timeline.js.map