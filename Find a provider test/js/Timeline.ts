/// <reference path="../../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../../Scripts/typings/jqueryui/jqueryui.d.ts" />

module Midas.Business {

    export enum TimelineEvents {
        OnShowPreviousCard,
        OnShowNextCard,
        OnShowOpenCard
    }

    export class Timeline extends Midas.Core.Observable {

    private position: number = 1;
    private modelIdPrefix = "#eventModal"
    private selectedDate: string = "";
    private tabKeyCode: number = 9;
    private enterKeyCode: number = 13;
    private leftArrowKeyCode: number = 37;
    private rightArrowKeyCode: number = 39;
              
    constructor(settings: any) {      
            super();

            this.AddEventHandlers(); 
                
            $('.tl1').timeline({
                startItem: $('#StartDate').val()
            });

        }

        CurrentCard = (): JQuery => {
            
            var currentCardId = this.modelIdPrefix + this.position;

            return $(currentCardId);
        }

        CurrentCardDate = (): string => {

            return this.CurrentCard().find('.badge').text();
        }


        NextCard = (): void => {

            if (this.position < $('.expanded-event').length) {

                this.CurrentCard().modal('hide');

                var nextCardId = this.modelIdPrefix + ++this.position;

                $(nextCardId).modal('show');

                $('.tl1').timeline('goTo', this.CurrentCard().data('timelineparentid'));

                this.trigger(TimelineEvents[TimelineEvents.OnShowNextCard], { Response: nextCardId });
            }

        }

        PreviousCard = (): void => {
            
            if (this.position > 1) {

                this.CurrentCard().modal('hide');

                var nextCardId = this.modelIdPrefix + --this.position;

                $(nextCardId).modal('show');

                $('.tl1').timeline('goTo', this.CurrentCard().data('timelineparentid'));

                this.trigger(TimelineEvents[TimelineEvents.OnShowPreviousCard], { Response: nextCardId });
            }
        }


        OpenCard = (ce: JQueryEventObject): void => {
            
            var card = $(ce.currentTarget);

            if (card.hasClass('disableClick')) {

                card.removeClass('disableClick');

            } else {
                var dataVal = card.data('event');

                this.position = dataVal;

                var id = this.modelIdPrefix + dataVal;

                $(id).modal();
            }

            this.trigger(TimelineEvents[TimelineEvents.OnShowOpenCard], { Response: card });
        }

        AddEventHandlers = (): void => {
            
            $('.next').on('click', () => {
                this.NextCard();
            });

            $('.prev').on('click', () => {
                this.PreviousCard();
            });

            $('.card').on('click', (ce) => {
                this.OpenCard(ce);
            });

            $('.card').on('keypress', (ce) => {
                if (ce.keyCode === this.enterKeyCode) {                                       
                    this.OpenCard(ce);
                }                
            });
       
            $(document).on('keyup', (ce) => {
                this.HandleScroll(ce);
            });

            $(".timeline-container").on('keyup', (ce) => {
                this.HandleTab(ce);
            });

            $(".card").draggable({
                start: function (event, ui) {
                    $(this).addClass('disableClick');
                },
                stop: function (event, ui) {
                    $(this).removeClass('disableClick');
                }
            });
        }

        HandleTab = (ce: JQueryEventObject): void => {            
            if (ce.keyCode == this.tabKeyCode) {

                var id = $(document.activeElement).parent().data('id');

                $('.tl1').timeline('goTo', id);
            }
        }

        HandleScroll = (ce: JQueryEventObject): void => {
            if (ce.keyCode == this.leftArrowKeyCode) {
                if (this.ModalIsOpen()) {
                    this.PreviousCard();
                } 
            }
            if (ce.keyCode == this.rightArrowKeyCode) {
                if (this.ModalIsOpen()) {
                    this.NextCard();
                } 
            }
        }       

        ModalIsOpen = (): boolean => {
            return $('body').hasClass('modal-open');
        }

        destroy(): void {
            $('.tl1').timeline('destroy');
        }
    }

    $(() => {     
    });
}