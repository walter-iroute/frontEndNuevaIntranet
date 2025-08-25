import { Attributes, Category, Choice, ConditionalVisibility, Content, ContentSection, DataType, DefaultValue, DisplayName, IsNullable, KnownFieldTypes, Margins, ViewSelector, WidgetEntity, WidgetLabel } from '@progress/sitefinity-widget-designers-sdk';
import { NavigationEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import { OffsetStyle } from '@progress/sitefinity-nextjs-sdk/widgets/styling';
import { MixedContentContext } from '@progress/sitefinity-nextjs-sdk';

@WidgetEntity('NavigationCustomEntity', 'Navigation')
export class NavigationExtendsEntity extends NavigationEntity {

    @ContentSection('Logo', 1)
    @Content({
        Type: 'Telerik.Sitefinity.Libraries.Model.Image',
        AllowMultipleItemsSelection: false
    })
    Logo: MixedContentContext | null = null

    @ContentSection('Select pages', 2)
    @DisplayName('Display...')
    @DefaultValue('TopLevelPages')
    @DataType(KnownFieldTypes.RadioChoice)
    @Choice([
        { Title: 'Top-level pages (and their child-pages if template allows)', Value: 'TopLevelPages' },
        { Title: 'All pages under particular page...', Value: 'SelectedPageChildren' },
        { Title: 'All pages under currently opened page', Value: 'CurrentPageChildren' },
        { Title: 'All sibling pages of currently opened page', Value: 'CurrentPageSiblings' },
        { Title: 'Custom selection of pages...', Value: 'SelectedPages' }])
    SelectionMode?: string;

    @Content({ Type: 'Telerik.Sitefinity.Pages.Model.PageNode', AllowMultipleItemsSelection: false })
    @ContentSection('Select pages', 2)
    @DisplayName('')
    @ConditionalVisibility('{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022SelectionMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022SelectedPageChildren\u0022}],\u0022inline\u0022:\u0022true\u0022}')
    SelectedPage?: MixedContentContext;

    @ContentSection('Select pages', 2)
    @Content({ Type: 'Telerik.Sitefinity.Pages.Model.PageNode', OpenMultipleItemsSelection: true })
    @DisplayName('')
    @ConditionalVisibility('{\u0022conditions\u0022:[{\u0022fieldName\u0022:\u0022SelectionMode\u0022,\u0022operator\u0022:\u0022Equals\u0022,\u0022value\u0022:\u0022SelectedPages\u0022}],\u0022inline\u0022:\u0022true\u0022}')
    CustomSelectedPages?: MixedContentContext;

    @ContentSection('Select pages', 2)
    @DisplayName('Levels to include')
    @DefaultValue('1')
    @DataType(KnownFieldTypes.ChipChoice)
    @Choice({
        Choices: [
            { Title: '1 level', Name: '1', Value: 1 },
            { Title: '2 levels', Name: '2', Value: 2 },
            { Title: '3 levels', Name: '3', Value: 3 },
            { Title: '4 levels', Name: '4', Value: 4 },
            { Title: '5 levels', Name: '5', Value: 5 },
            { Title: 'All levels', Name: 'All', Value: null }],
        NotResponsive: true
    })
    @IsNullable(true)
    LevelsToInclude?: number;

    @ContentSection('Display settings')
    @Margins('Navigation')
    Margins?: OffsetStyle;

    // Display settings
    @ContentSection('Display settings')
    @DisplayName('View')
    @DefaultValue('Horizontal')
    @ViewSelector([
        { Value: 'Accordion' },
        { Value: 'Horizontal' },
        { Value: 'Tabs' },
        { Value: 'Vertical' }
    ])
    SfViewName?: string;

    // Advanced
    @WidgetLabel()
    @Category('Advanced')
    SfWidgetLabel?: string = 'Navigation';

    @Category('Advanced')
    @DisplayName('CSS class')
    @DataType('string')
    WrapperCssClass?: string;

    @Category('Advanced')
    @DefaultValue(false)
    @DisplayName('Show parent page')
    ShowParentPage?: boolean;

    @Category('Advanced')
    @Attributes('Navigation')
    Attributes?: { [key: string]: Array<{ Key: string, Value: string }> };
}