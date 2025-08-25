
import { Category, Content, DataType, DefaultValue, DisplayName, KnownContentTypes, KnownFieldTypes, MixedContentContext,WidgetEntity } from "@progress/sitefinity-widget-designers-sdk";


@WidgetEntity('CardNoticias','CardNoticias')
export class CardNoticiasEntity{
  // @DisplayName("Imagen")
  // @Content({
  //   Type: 'Telerik.Sitefinity.Libraries.Model.Image',
  //   AllowMultipleItemsSelection: false
  // })

  // @DataType(KnownContentTypes.Images)
  // @Category("Contenido")


   @DisplayName('Imagen')
      @Content({
          Type: 'Telerik.Sitefinity.Libraries.Model.Image',
          AllowMultipleItemsSelection: false,
      })
      @Category('Basic')
      public Imagen: MixedContentContext | null = null;
  


  @DisplayName("Titulo Banner")
  @DefaultValue("Accionista")
  @Category("Basic")
  public BannerTitle: string = "";

    
  @DisplayName("Banner Ancho")
  @DefaultValue("420px")
  @Category("Basic")
  public BannerWidth: string = "";

  @DisplayName("Banner Ancho Minimo")
  @DefaultValue("500px")
  @Category("Basic")
  public BannerMinWidth: string = "";

  @DisplayName("Titulo 1")
  @DefaultValue("Dr. H.C. Esteban Quirola Figueroa")
  @Category("Basic")
  public Title: string = "";

  @DisplayName("Subtitulo 2")
  @DefaultValue("Sra. Jenny Quiñonez de Quirola ")
  @Category("Basic")
  public Subtitle: string = "";



  @DisplayName("Descripción")
  @DefaultValue("Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
  @DataType(KnownFieldTypes.TextArea)
  @Category("Basic")
  public Description: string = "";


  @DisplayName("Color de Fondo")
  @DefaultValue('#FFFFFF')
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