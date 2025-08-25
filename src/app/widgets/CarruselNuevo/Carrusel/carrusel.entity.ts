import { SdkItem } from "@progress/sitefinity-nextjs-sdk/rest-sdk";
import { ComplexType, ContentSection, DataModel, DataType, DisplayName, KnownFieldTypes, LinkModel, MediaItem, Model, SdkItemModel, WidgetEntity, Description, TableView, LengthDependsOn } from "@progress/sitefinity-widget-designers-sdk";

@Model()
class ItemBasic{
    @ContentSection('📝 Contenido del Banner', 1)
    @DisplayName('Titulo del banner')
    titulo: string = '';

    @ContentSection('📝 Contenido del Banner', 2)
    @DisplayName('Subtitulo o contenido')
    @DataType(KnownFieldTypes.TextArea)
    contenido: string = '';

    @ContentSection('🔗 Configuración de Botón', 3)
    @DataType(KnownFieldTypes.LinkSelector)
    @DisplayName('Enlace del botón')
    EnlaceCTA: LinkModel | null = null;
}


@Model()
class ItemObject {
    @ContentSection('📝 Contenido del Banner', 1)
    @DisplayName('Contenido del Banner')
    @DataModel(ItemBasic)
    contenido: ItemBasic = new ItemBasic();

    @ContentSection('🖼️ Imágenes del Banner', 4)
    @MediaItem('images', false, false)
    @DataType('media')
    @DisplayName('Imagen para Desktop')
    @DataModel(SdkItemModel)
    ImageDesktop?: SdkItem;
    
    @ContentSection('🖼️ Imágenes del Banner', 5)
    @MediaItem('images', false, false)
    @DataType('media')
    @DisplayName('Imagen para Móvil')
    @DataModel(SdkItemModel)
    ImageMovil?: SdkItem;
}

@WidgetEntity('CarruselHero', 'Carrusel')
export class CarruselEntity {
    @DataModel(ItemObject)
    @DataType(ComplexType.Enumerable)
    @DisplayName('Contenido del Carrusel')
    Enlaces: ItemObject[] = [];
}
