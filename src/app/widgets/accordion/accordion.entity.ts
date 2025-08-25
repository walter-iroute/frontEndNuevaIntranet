import { MixedContentContext } from '@progress/sitefinity-nextjs-sdk';
import { ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Content, ContentSection, DisplayName, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Accordion', 'Preguntas Frecuentes')
export class AccordionEntity extends ContentListEntity {

    @Content()
    @DisplayName('')
    @ContentSection('Select content to display', 0)
    SelectedItems: MixedContentContext | null = null;

    @ContentSection('Custom CSS classes', 0)
    @DisplayName('')
    CssClasses: Array<{ FieldName: string; CssClass: string; }> | null = null;    

}