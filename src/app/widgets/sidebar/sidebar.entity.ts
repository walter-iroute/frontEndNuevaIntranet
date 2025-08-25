import { Content, WidgetEntity, DisplayName, ContentSection } from '@progress/sitefinity-widget-designers-sdk';
import { ContentListSettings, MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntityBase, DetailPageSelectionMode, PagerMode, PagerViewModel } from '@progress/sitefinity-nextjs-sdk/widgets';

@WidgetEntity('Sidebar', 'Sidebar Menu')
export class SidebarEntity implements ContentListEntityBase {

    @Content()
    @DisplayName('')
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

    @ContentSection('Custom CSS classes', 0)
    @DisplayName('')
    CssClasses: Array<{ FieldName: string; CssClass: string; }> | null = null;
    LevelsToInclude: any;
    SelectedPage: any;
    CustomSelectedPages: any;
    SelectionMode: any;
    ShowParentPage: any;

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