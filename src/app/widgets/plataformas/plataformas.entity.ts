import { Content, WidgetEntity, DisplayName, DataType, DefaultValue, ContentSection, ViewSelector } from '@progress/sitefinity-widget-designers-sdk';
import { ContentListSettings, MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntityBase, DetailPageSelectionMode, PagerMode, PagerViewModel } from '@progress/sitefinity-nextjs-sdk/widgets';

@WidgetEntity('ImageCarousel', 'Image Carousel')
export class PlataformasWidgetEntity implements ContentListEntityBase {

    @Content()
    @DisplayName('')
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

    @DefaultValue('ListWithPlataformas ')
    @DisplayName('List template')
    @ContentSection('Select content to display', 1)
    @ViewSelector([
        { Title: 'List with Noticias', Value: 'ListWithNotices' },
        { Title: 'List with CF', Value: 'ListWithCF' },
        { Title: 'List with Plataformas', Value: 'ListWithPlataformas' },
        { Title: 'List with Recursos', Value: 'ListWithRecursos' },
        { Title: 'List with Mercadeo', Value: 'ListWithMercadeo' },
        { Title: 'List with Procesos', Value: 'ListWithProcesos' }
    ])
    SfViewName: string = 'List';

    @ContentSection('Custom CSS classes', 0)
    @DisplayName('')
    CssClasses: Array<{ FieldName: string; CssClass: string; }> | null = null;

    @DisplayName('Transition Time (seconds)')
    @DataType('number')
    @DefaultValue(3) // Valor por defecto de 3 segundos entre transiciones
    Tiempo: number = 3; // Tiempo entre transiciones    

    @DisplayName('Slides per View')
    @DataType('number')
    @DefaultValue(4)
    SlidesPerView: number = 4;

    @DisplayName('Space Between Slides (px)')
    @DataType('number')
    SpaceBetween: number = 0;

    @DisplayName('Infinite Loop')
    @DataType('boolean')
    Infinite: boolean = true;

    @DisplayName('Navegacion')
    @DataType('boolean')
    Navegacion: boolean = true;

    @DisplayName('CenteredSlides')
    @DataType('boolean')
    CenteredSlides: boolean = true;

    @DisplayName('FreeMode')
    @DataType('boolean')
    FreeMode: boolean = true;

    @DisplayName('CardMode')
    @DataType('boolean')
    CardMode: boolean = true;

    @ContentSection('List Settings', 0)
    ListSettings: ContentListSettings | null = null;
    @ContentSection('FilterExpression', 0)
    FilterExpression: any = null;
    @ContentSection('SelectionGroupLogicalOperator', 0)
    SelectionGroupLogicalOperator: 'AND' | 'OR' = 'AND';
    @ContentSection('OrderBy', 0)
    OrderBy: string = 'PublicationDate DESC';
    @ContentSection('SortExpression', 0)
    SortExpression: string = 'PublicationDate DESC';
    @ContentSection('SelectExpression', 0)
    SelectExpression?: string | undefined;
    @ContentSection('Pager Settings', 0)
    PagerTemplate: string = PagerViewModel.PageNumberDefaultTemplate;
    @ContentSection('Pager Settings', 1)
    PagerQueryTemplate: string = 'page';
    @ContentSection('Pager Settings', 2)
    PagerMode: PagerMode = PagerMode.URLSegments;
    @ContentSection('Pager Settings', 3)
    DetailPage: MixedContentContext | null = null;
    @ContentSection('Pager Settings', 4)
    DetailPageMode: DetailPageSelectionMode = DetailPageSelectionMode.SamePage;

}

