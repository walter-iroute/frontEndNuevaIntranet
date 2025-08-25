import { Attributes, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Tabs', 'Tabs')
export class TabsEntity {

    Content?: string | null = null;
    @Attributes('Tabs', 'Titulo Tabs')
    Title?: { [key: string]: Array<{ Key: string, Value: string }> };
    @Attributes('Tabs', 'Descripcion Tabs')
    Desc?: { [key: string]: Array<{ Key: string, Value: string }> };
}