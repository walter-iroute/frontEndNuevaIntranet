import { MixedContentContext } from "@progress/sitefinity-nextjs-sdk";
import { Category, Content, DataType, DefaultValue, DisplayName, KnownContentTypes, KnownFieldTypes, WidgetEntity } from "@progress/sitefinity-widget-designers-sdk";


@WidgetEntity('Banner','Banner')
export class BannerEntity{
  @DisplayName("Imagen")
  @Content({
    Type: 'Telerik.Sitefinity.Libraries.Model.Image',
    AllowMultipleItemsSelection: false
  })
  @Category("Basic")
  public Imagen: string = "";


  @DisplayName("Titulo")
  @DefaultValue("Nuestro propósito")
  @Category("Basic")
  
  public Title: string = "";


  @DisplayName("Tamano del Titulo")
  @DefaultValue('52px')
   @Category("Basic")
   public FontSize: string ="";


  @DisplayName("Descripción")
  @DefaultValue("Respaldar el bienestar y la salud financiera de todos con soluciones financieras sostenibles que promuevan el desarrollo productivo del país.")
  @Category("Basic")
  public Description: string = "";


  @DisplayName("Color de Fondo")
  @DefaultValue('#E1EDE4')
  @Category("Basic")
  public BannerBackground: string ="";


}

export interface IBanner{
     Id: string;
  Title: string;
  Url: string;
  ThumbnailUrl?: string;
  AlternativeText?: string;
}