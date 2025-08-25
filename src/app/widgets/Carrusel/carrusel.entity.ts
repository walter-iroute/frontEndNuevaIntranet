import { Content, WidgetEntity, DisplayName, DataType, DefaultValue, ContentSection } from '@progress/sitefinity-widget-designers-sdk';
import { ContentListSettings, MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntityBase, DetailPageSelectionMode, PagerMode, PagerViewModel } from '@progress/sitefinity-nextjs-sdk/widgets';

@WidgetEntity('ImageCarousel', 'Image Carousel')
export class CarouselWidgetEntity implements ContentListEntityBase {
    ListSettings: ContentListSettings | null = null;
    FilterExpression: any = null;
    SelectionGroupLogicalOperator: 'AND' | 'OR' = 'AND';
    OrderBy: string = 'PublicationDate DESC';
    SortExpression: string = 'PublicationDate DESC';
    SelectExpression?: string | undefined;
    PagerTemplate: string = PagerViewModel.PageNumberDefaultTemplate;
    PagerQueryTemplate: string = 'page';
    PagerMode: PagerMode = PagerMode.URLSegments;
    DetailPage: MixedContentContext | null = null;
    DetailPageMode: DetailPageSelectionMode = DetailPageSelectionMode.SamePage;    

    @DisplayName('Transition Time (seconds)')
    @DataType('number')
    @DefaultValue(3) // Valor por defecto de 3 segundos entre transiciones
    Tiempo: number = 3; // Tiempo entre transiciones    

    // Content section
    @Content()
    @DisplayName('')
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

    Infinite: boolean = true;
    Navegacion: boolean = true;    
    SlidesPerView: number = 1;
    SpaceBetween: number = 50;
    CenteredSlides: boolean = true;
    FreeMode: boolean = true;
    CardMode: boolean = false;
}
