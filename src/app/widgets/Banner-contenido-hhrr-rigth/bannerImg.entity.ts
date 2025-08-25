// banner.entity.ts
import {
    WidgetEntity,
    Content,
    KnownContentTypes,
    MixedContentContext,
    Category,
    DisplayName,
    DefaultValue,
    DataType,
    Choice,
} from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Banner.Img', 'Banner Sostenible')
export class BannerImgEntitycontenidohhrrRigth {
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
    itemTitulo: string | null = null;
    itemContenido: string | null = null;

    @DisplayName('Alineacion Vertical Imagen')
    @DataType('choice')
    @Choice([
        { Title: 'Superio', Name: 'principal', Value: 'start' },
        { Title: 'Centrado', Name: 'secundario', Value: 'center' },
        { Title: 'Final', Name: 'promocional', Value: 'end' },
    ])
    @DefaultValue('center')
    @Category('Basic')
    alignImage: string | null = 'center';
}
