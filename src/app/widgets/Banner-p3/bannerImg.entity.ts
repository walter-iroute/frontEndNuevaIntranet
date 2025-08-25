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
export class BannerImgEntityv3 {
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
    @DefaultValue('Subtitulo')
    Subtitulo: string | null = null;
 
}
