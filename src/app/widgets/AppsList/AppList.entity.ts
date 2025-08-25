// /widgets/AppProducts/app-products.entity.ts
import {
    WidgetEntity,
    DefaultValue,
    Content,
    DisplayName,
    ContentSection,
    DataType,
    KnownContentTypes,
    KnownFieldTypes,
} from '@progress/sitefinity-widget-designers-sdk';


import { ContentListSettings, MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntityBase, DetailPageSelectionMode, PagerMode, PagerViewModel } from '@progress/sitefinity-nextjs-sdk/widgets';


@WidgetEntity('Productos por Taxonomía')
export class AppListEntity {
    
    @DefaultValue('Nuestros productos destacados')
    Titulo: string | null = null;
    
    @DefaultValue('aplicaciones')
    @DisplayName('link de redirecionamiento')
    @DataType(KnownFieldTypes.LinkInsert)
    PageLink: string | null = 'aplicaciones';

    @Content()
    @DisplayName('')
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

    
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
