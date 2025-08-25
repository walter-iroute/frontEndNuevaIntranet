import { SdkItem } from "@progress/sitefinity-nextjs-sdk/rest-sdk";
import { ComplexType, ContentSection, DataModel, DataType, DisplayName, KnownFieldTypes, LinkModel, MediaItem, Model, SdkItemModel, WidgetEntity, Description, TableView, LengthDependsOn } from "@progress/sitefinity-widget-designers-sdk";

@Model()
class ItemObject {
    @ContentSection('🖼️ Seleccionen Imágenes', 4)
    @MediaItem('images', false, false)
    @DataType('media')
    @DisplayName('Imagen')
    
    @DataModel(SdkItemModel)
    ImageDesktop?: SdkItem;
    
   
}

@WidgetEntity('ImagenesHero', 'Imagenes')
export class ImagenesEntity {
    @DisplayName("Ingrese el Titulo ")
    Title:String = "Titulo por Defecto";

    @DisplayName("Desea el Texto en el Centro")
    @DataType(KnownFieldTypes.CheckBox)
    IsTextCenter: boolean = false;

    @DataModel(ItemObject)
    @DataType(ComplexType.Enumerable)
    @DisplayName('Contenido del Widget')
    Enlaces: ItemObject[] = [];
}
