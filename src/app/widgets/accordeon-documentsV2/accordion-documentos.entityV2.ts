import { MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Content, ContentSection, DisplayName, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Accordion', 'Documents')
export class AccordionDocumentosEntityV2 extends ContentListEntity {

    @Content()
    @DisplayName('')
    @ContentSection('Content to display', 0)
    SelectedItems: MixedContentContext | null = null;



    @ContentSection('Custom CSS classes', 2)
    @DisplayName('CSS Classes')
    CssClasses: Array<{ FieldName: string; CssClass: string; }> | null = null;    
}