import { Content, WidgetEntity, DisplayName, ContentSection } from '@progress/sitefinity-widget-designers-sdk';
import { ContentListSettings, MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntityBase, DetailPageSelectionMode, PagerMode, PagerViewModel } from '@progress/sitefinity-nextjs-sdk/widgets';

@WidgetEntity('ImageCarousel', 'Image Carousel')
export class GobernanzaWidgetEntity implements ContentListEntityBase {

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

    // Content section
    @Content()
    @DisplayName('')
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

}

