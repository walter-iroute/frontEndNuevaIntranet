// banner.entity.ts
import {
    WidgetEntity,
    Content,
    KnownContentTypes,
    MixedContentContext,
    Category,
    DisplayName,
    DefaultValue,
} from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Banner.Img', 'Banner Sostenible')
export class BannerImgEntitycontenidov2 {
    @DisplayName('Imagen')
    @Content({
        Type: 'Telerik.Sitefinity.Libraries.Model.Image',
        AllowMultipleItemsSelection: false,
    })
    @Category('Basic')
    public Imagen: MixedContentContext | null = null;
    

    //@Content({ Type: KnownContentTypes.Images, AllowMultipleItemsSelection: false })
    //Imagen: MixedContentContext | null = null;
    @DefaultValue('Titulo')
    Titulo: string | null = null;
    TituloDuplet: string | null = null;
    Subtitulo: string | null = null;
    Subtitulobold: string | null = null;
    SubtituloItem: string | null = null;
    item1: string | null = null;
    item2: string | null = null;
    item3: string | null = null;
    item4: string | null = null;
    item5: string | null = null;
    item6: string | null = null;
    item7: string | null = null;
    item8: string | null = null;
    item9: string | null = null;
    item10: string | null = null;
    link: string | null = null;
    text_button: string | null = null;


}
