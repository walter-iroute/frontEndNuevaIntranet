import { Content, DataType, DisplayName, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('beneficiosWidget', 'Widget personalizable')
export class BeneficiosWidgetEntity {
  @DisplayName('Nombre_beneficios')
  @DataType('string')
  title: string | null = null;

  @DisplayName('Descripcion beneficios')
  @DataType('string')
  description: string | null = null;

  @DisplayName('image beneficios')
  @Content({ 
    Type: 'Telerik.Sitefinity.Libraries.Model.Image',
    AllowMultipleItemsSelection: false
  })

  @DataType('string')
  imagen: string | null = null;

}


