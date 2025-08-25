// /widgets/DocumentWidget/document-widget.entity.ts
// /widgets/AppProducts/app-products.entity.ts
import {
    WidgetEntity,
    DefaultValue,
    Content,
    DisplayName,
    ContentSection,
} from '@progress/sitefinity-widget-designers-sdk';

import { ContentListSettings, MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import {
    ContentListEntityBase,
    DetailPageSelectionMode,
    PagerMode,
    PagerViewModel,
} from '@progress/sitefinity-nextjs-sdk/widgets';

@WidgetEntity('Documentos por ParentId')
export class DocumentWidgetEntity {
    @Content({
        Type: 'Telerik.Sitefinity.Libraries.Model.Document',
        IsFilterable: true,
    })
    @DisplayName('Documentos seleccionados')
    @ContentSection('Selecciona los documentos que deseas mostrar', 0)
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

    @DefaultValue('Accede a tus manuales recientes')
    Titulo: string | null = null;

    @DefaultValue('Fortalece tu conocimiento, mejora tu desempeño y promueve la cultura de cumplimiento del Banco.')
    Texto: string | null = null;
}
