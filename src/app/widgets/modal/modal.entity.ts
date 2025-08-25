import { Content, DataType, DefaultValue, DisplayName, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('ModalWidget', 'ModalDialog')
export class ModalEntity {

    @DataType('linkSelector')
    @DisplayName('Enlace o pagina')
    @DefaultValue('')
    link?: any = '';
    @Content({ Type: 'Telerik.Sitefinity.Libraries.Model.Image', AllowMultipleItemsSelection: false })
    @DisplayName('Elegir imagen')
    ImgModal: any;

    @DefaultValue("Descubre más en E-learning.com")
    Content: string = "";
    @DisplayName('Mostrar segundo boton')
    SecondaryBtn: boolean = true;
    BtnCancelText: string = "";
    @DisplayName('Mostrar primer boton')
    PrimaryBtn: boolean = true;

      @DefaultValue("Ver más")
    BtnActionText: string = "";
}