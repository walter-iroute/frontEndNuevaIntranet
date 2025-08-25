import { Content, DisplayName, MixedContentContext, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('ButtonWidget', 'Button')
export class VideoWidgetEntity {

    @DisplayName('Seleccionar video')
    @Content({
        Type: 'Telerik.Sitefinity.Libraries.Model.Video',
        AllowMultipleItemsSelection: false
    })
    FullDecoratorSelectedMedia?: MixedContentContext = undefined;

}
