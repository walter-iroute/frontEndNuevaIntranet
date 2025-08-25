import { Content, DataType, DisplayName, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('AppWidget', 'Widget personalizable')
export class AppWidgetEntity {
  @DisplayName('Nombre_App')
  @DataType('string')
  title: string | null = null;

  @DisplayName('Descripcion app')
  @DataType('string')
  description: string | null = null;

  @DisplayName('image app')
  @Content({ 
    Type: 'Telerik.Sitefinity.Libraries.Model.Image',
    AllowMultipleItemsSelection: false
  })

  @DataType('string')
  imagen: string | null = null;

}


