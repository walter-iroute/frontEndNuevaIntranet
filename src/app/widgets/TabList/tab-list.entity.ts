import { ContentListEntity, Section } from "@progress/sitefinity-nextjs-sdk/widgets";
import { Content,Choice,ContentSection, DataType, DisplayName, KnownFieldTypes, MixedContentContext, WidgetEntity, ChoiceItem } from "@progress/sitefinity-widget-designers-sdk";

@WidgetEntity('TabsList', 'TabsList')
export class TabsListEntity {
  @DisplayName('Título')
  @DataType('string')
  titulo: string | undefined;

  @DisplayName('Lista de tabs')
  @Content({
    Type: 'Telerik.Sitefinity.Lists.Model.List',
    AllowMultipleItemsSelection: false,
  })
  items: MixedContentContext | null = null;

  @ContentSection('Botón')
  @DataType('string')
  textButton: string | null = null;

  @ContentSection('Botón')
  @DataType('string')
  linkButton: string | null = null;

  @ContentSection('Botón')
  @DataType('string')
  backgroundColor: string | null = null;

  // 🔽 Campo tipo select corregido
  @DisplayName("Modo de visualizacion")
  @DataType(KnownFieldTypes.Choices)
  @Choice([
    { Text: "Lista", Value: "lista" },
  { Text: "Banner", Value: "banner" },

  ] as unknown as ChoiceItem[])

  displayMode: string | null = 'Lista';

}