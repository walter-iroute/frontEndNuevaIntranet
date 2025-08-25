import { Choice, ChoiceItem, ChoiceWithText, ColorPalette, ConditionalVisibility, DataModel, DataType, DefaultValue, DescriptionExtended, DisplayName, KnownFieldTypes, StylingConfig, WidgetEntity } from '@progress/sitefinity-widget-designers-sdk';

const slects : ChoiceItem[] = [
    {'Title':'Seleccionar','Value':'default'},
    {'Title':'Right','Value':'right'}, 
    {'Title':'Center','Value':'center'}
]

const stylingConfig: StylingConfig = {
    ColorPalettes: {
        Default: {
            Colors: ['#295135','#FFADAD', '#CB801B', '#F59AFF', '#8BF4FF', '#92FFFB', '#9EFFC9', '#FFFFAE', '#FFEB8D', '#E4CFC5', '#DCECF5', '#FFFFFF', '#FF7A7B', '#FF71AD', '#C267DC', '#57C1FF', '#5FD0C8', '#6BDE96', '#FFFF7B', '#FFB85A', '#B19D92', '#A9B9C2', '#cccccc', '#FF4848', '#DC3E7B', '#8F34A9', '#238EFC', '#2C9D95', '#38AB63', '#FFE048', '#ED8527', '#7E6A5F', '#76868F', '#000000'],
            DefaultColor: '#295135'
        }
    }
};

const BackgroundArray = [
    { Title: 'None', Name: 'no_background', Value: 'no_background' },
    { Title: 'Color', Name: 'background_color', Value: 'background_color' },
    { Title: 'Transparent', Name: 'background_transparent', Value: 'background_transparent' },
]


const BorderArray = [
    { Title: 'None', Name: 'no_border', Value: 'no_border' },
    { Title: 'Border', Name: 'border', Value: 'border' },
]

@WidgetEntity('ButtonWidget', 'Button')
export class ButtonWidgetEntity {
    @DataType('linkInsert')
    @DisplayName('Enlace o pagina')
    @DefaultValue('')
    link?: any = ''; 

    @Choice(BackgroundArray)
    Background: 'no_background' | 'background_color' | 'background_transparent' = 'no_background'; // Valor por defecto

    @ConditionalVisibility('{"conditions":[{"fieldName":"Background","operator":"Equals","value":"background_color"}]}')
    @ColorPalette('Background', stylingConfig)
    @DataType('color')
    @DisplayName('Background Color')
    @DefaultValue('')
    color?: any = ''; 


    @ColorPalette('Color Text', stylingConfig)
    @DataType('color')
    @DisplayName('Color Text')
    @DefaultValue('')
    colortext?: any = ''; 

    @Choice(BorderArray)
    Border: 'no_border' | 'border' = 'no_border'; // Valor por defecto

    @ConditionalVisibility('{"conditions":[{"fieldName":"Border","operator":"Equals","value":"border"}]}')
    @ColorPalette('Background', stylingConfig)
    @DataType('color')
    @DisplayName('Border Color')
    @DefaultValue('')
    colorBorder?: any = ''; 


    @DisplayName('Texto de contenido')
    Text: string = 'Button'; // Lista de imágenes con URL y texto alternativo

    @DataType('choiceList')
    @DisplayName('¿Agregar icono?')
    @DefaultValue(false)
    IconBol: boolean = false ;

    @DisplayName('Icono')
    Icon: string = ''; 

    @Choice({Choices:slects})
    @DataType('choices')
    @DisplayName('Alineacion del boton')
    showButton?: ChoiceItem | null = null;

  
}
