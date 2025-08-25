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
export class BannerImgEntitycontenido {
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
    SubtituloBold1: string | null = null;
    item1: string | null = null;
    item2: string | null = null;
    item3: string | null = null;
    item4: string | null = null;
    item5: string | null = null;
    item6: string | null = null;
    
    SubtituloBold: string | null = null;
    item11: string | null = null;
    item12: string | null = null;
    item13: string | null = null;
    item14: string | null = null;
    item15: string | null = null;


}
