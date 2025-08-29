import { WidgetRegistry, initRegistry, defaultWidgetRegistry } from '@progress/sitefinity-nextjs-sdk';
import { ButtonWidgetEntity } from './widgets/Button/button.entity';
import { ButtonWidget } from './widgets/Button/button';
import { NavbarHorizontalCustom } from './widgets/navbarTab/navbarHorizontalCustom';
import { StaticSection } from './widgets/custom-section/static-section';
import { StaticSectionEntity } from './widgets/custom-section/static-section.entity';
import { ContainerView } from './widgets/custom-section/container.view';
import { ContainerFluidView } from './widgets/custom-section/container-fluid.view';
import { TwoMixedView } from './widgets/custom-section/twoMixed.view';
import { ThreeAutoLayoutView } from './widgets/custom-section/threeAutoLayout.view';
import { CarouselWidget } from './widgets/carrusel/carrusel';
import { CarouselWidgetEntity } from './widgets/carrusel/carrusel.entity';
import { FestividadesWidget } from './widgets/festividades/festividades';
import { FestividadesWidgetEntity } from './widgets/festividades/festividades.entity';
import { GenericoWidget } from './widgets/carruselv4/festividades';
import { GenericoWidgetEntity } from './widgets/carruselv4/festividades.entity';
import { GenericoWidgetHHRR } from './widgets/cards-HHRR/festividades';
import { GenericoWidgetEntityHHRR } from './widgets/cards-HHRR/festividades.entity';
import { GenericoWidgetContent } from './widgets/cards-generico-content/festividades';
import { GenericoWidgetEntityContent } from './widgets/cards-generico-content/festividades.entity';
import { Accordion } from './widgets/accordion/accordion';
import { AccordionEntity } from './widgets/accordion/accordion.entity';
import { VideoWidget } from './widgets/video/video';
import { VideoWidgetEntity } from './widgets/video/video.entity';
import { MisCursosWidget } from './widgets/cursos/mis-cursos';
import { MisCursosWidgetEntity } from './widgets/cursos/mis-cursos.entity';
import { NoticiasWidget } from './widgets/noticias/noticias';
import { NoticiasWidgetEntity } from './widgets/noticias/noticias.entity';
import { NavigationExtendsEntity } from './widgets/navbarTab/navbarExtends.entity';
import { ModalEntity } from './widgets/modal/modal.entity';
import { ModalWidget } from './widgets/modal/modal';
import { CardListEntity } from './widgets/cardList/cardList.entity';
import { CardList } from './widgets/cardList/cardList';
import { DetalleNoticiaEntity } from './widgets/detalle-noticia/detalle-noticia.entity';
import { DetalleNoticia } from './widgets/detalle-noticia/detalle-noticia';
import { HistorialNoticiasEntity } from './widgets/historial-noticias/historial-noticias.entity';
import { HistorialNoticia } from './widgets/historial-noticias/historial-noticias';
import { CarruselProductoRelacionados } from './widgets/productos-relacionados/CarruselProductoRelacionados';
import { Carrusel } from './widgets/CarruselNuevo/Carrusel/carrusel';
import { CarruselEntity } from './widgets/CarruselNuevo/Carrusel/carrusel.entity';
import { PlataformasWidgetEntity } from './widgets/plataformas/plataformas.entity';
import { PlataformasWidget } from './widgets/plataformas/plataformas';
import { GobernanzaWidgetEntity } from './widgets/gobernanza/gobernanza.entity';
import { GobernanzaWidget } from './widgets/gobernanza/gobernanza';
import { CustomNavigationView } from './widgets/navigation/menu-header/menu-header.view';
import { CarouselAreasServer } from './widgets/ContentList/CarruselV2/carrusel-areas.server';
import { CarruselRecursos } from './widgets/ContentList/carrusel-recursos/carrusel-recursos';
import { AplicacionesWidget } from './widgets/Apps-tabs/apps-tabs';
import { AppsTabsEntity } from './widgets/Apps-tabs/app-tabs.entity';
import { BeneficiosWidget } from './widgets/beneficios-tabs/beneficios-tabs';
import { BeneficiosTabsEntity } from './widgets/beneficios-tabs/beneficios-tabs.entity';
import { BannerImg } from './widgets/Banner-p1/bannerImg';
import { BannerImgEntity } from './widgets/Banner-p1/bannerImg.entity';
import { BannerImgv2 } from './widgets/Banner-p2/bannerImg';
import { BannerImgEntityv2 } from './widgets/Banner-p2/bannerImg.entity';
import { BannerImgv3 } from './widgets/Banner-p3/bannerImg';
import { BannerImgEntityv3 } from './widgets/Banner-p3/bannerImg.entity';
import { BannerImgv4 } from './widgets/Banner-P4/bannerImg';
import { BannerImgEntityv4 } from './widgets/Banner-P4/bannerImg.entity';
import { BannerImgcontenido } from './widgets/Banner-contenido/bannerImg';
import { BannerImgEntitycontenido } from './widgets/Banner-contenido/bannerImg.entity';
import { BannerImgcontenidohhrrRigth } from './widgets/Banner-contenido-hhrr-rigth/bannerImg';
import { BannerImgEntitycontenidohhrrRigth } from './widgets/Banner-contenido-hhrr-rigth/bannerImg.entity';
import { BannerImgcontenidov2 } from './widgets/Banner-contenidov2/bannerImg';
import { BannerImgEntitycontenidov2 } from './widgets/Banner-contenidov2/bannerImg.entity';
import { BannerImgcontenidov2HHRR } from './widgets/Banner-contenido-HHRR-gestion/bannerImg';
import { BannerImgEntitycontenidov2HHRR } from './widgets/Banner-contenido-HHRR-gestion/bannerImg.entity';
import { FrameText } from './widgets/Frame-text/frameText';
import { FrameTextEntity } from './widgets/Frame-text/frameText.entity';
import { FrameTextAdminInicio } from './widgets/Frame-text-admin-inicio/frameText';
import { FrameTextAdminInicioEntity } from './widgets/Frame-text-admin-inicio/frameText.entity';
import { Banner } from "./widgets/banner/banner";
import { BannerEntity } from "./widgets/banner/banner.entity";
import { Sidebar } from "./widgets/sidebar/sidebar";
import { SidebarEntity } from "./widgets/sidebar/sidebar.entity";
import { AppsListWidget } from "./widgets/AppsList/AppList";
import { AppListEntity } from "./widgets/AppsList/AppList.entity";
import { DocumentList } from "./widgets/DocsRecent/DocsRecent"
import { DocumentWidgetEntity } from "./widgets/DocsRecent/DocsRecent.entity";
import {TabsList} from "./widgets/TabList/tab-list";
import {TabsListEntity} from "./widgets/TabList/tab-list.entity";
import { AccordionDocumentosV2 } from './widgets/accordeon-documentsV2/accordion-documentosV2';

import { AccordionDocumentosEntityV2 } from './widgets/accordeon-documentsV2/accordion-documentos.entityV2';
import {Imagenes} from "./widgets/Imagenes/Imagenes";
import {ImagenesEntity} from "./widgets/Imagenes/Imagenes.entity";
import { GestorArchivosWidget } from './widgets/Documentos/documentos';
import { DocumentosTabsEntity } from './widgets/Documentos/documentos.entity';

import { CardNoticias } from './widgets/card_noticias/card_noticias';
import { CardNoticiasEntity } from './widgets/card_noticias/card_noticias.entity';
import { Directorio } from './widgets/Directorio/directorio';
import { DirectorioEntity } from './widgets/Directorio/directorio.entity';
import { CarouselAreasServerGenerico } from './widgets/ContentList/CarruselGenerico/carrusel-areas.server';

import { CardListAreasServer } from './widgets/ContentList/CardListV2/cardList-areas.server';

import { TabsListAreaServer } from './widgets/ContentList/TabList/tabList-areas.server';

const customWidgetRegistry: WidgetRegistry = {
    widgets: {
        ButtonCustom: {
            componentType: ButtonWidget, // registration of the widget
            entity: ButtonWidgetEntity, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Button Flotante Directorio',
            },
        },

          AccordionDocumentsCustom: {
            componentType: AccordionDocumentosV2, // registration of the widget
            entity: AccordionDocumentosEntityV2, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Accordion Documents Custom',
            },
        },

        BannerCustom: {
            componentType: Banner, // registration of the widget
            entity: BannerEntity, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Banner Custom',
            },
        },

          "ImagenesCustom": {
            componentType: Imagenes, // registration of the widget
            entity: ImagenesEntity, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Imagenes Custom',
            },
        },
        'CardNoticiascustom': {
            componentType: CardNoticias, // registration of the widget
            entity: CardNoticiasEntity, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'CardNoticias custom',
            },
        },

        DirectorioCustom: {
            componentType: Directorio, // registration of the widget
            entity: DirectorioEntity, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Directorio Custom',
            },
        },
        TabListCustom: {
            componentType: TabsList, // registration of the widget
            entity: TabsListEntity, // registration of the designer
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'TabList Custom',
            },
        },

        StaticSection: {
            componentType: StaticSection, // registration of the widget
            entity: StaticSectionEntity, // registration of the designer
            editorMetadata: {
                Title: 'Static section',
                Category: 'Layout',
                Section: 'Empty section',
                IconName: 'section',
            },
            views: {
                // registration of the views
                Container: ContainerView,
                ContainerFluid: ContainerFluidView,
                TwoMixed: TwoMixedView,
                ThreeAutoLayout: ThreeAutoLayoutView,
            },
            ssr: true, // whether this is a server rendered or client rendered component
        },
        Carrusel: {
            componentType: CarouselWidget,
            entity: CarouselWidgetEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Carrusel',
            },
        },
        TabsList: {
            componentType: TabsList,
            entity: TabsListEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Tabs List',
            },
        },
        Festividades: {
            componentType: FestividadesWidget,
            entity: FestividadesWidgetEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Festividades',
            },
        },
        Generico: {
            componentType: GenericoWidget,
            entity: GenericoWidgetEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Generico-swiper',
            },
        },
        Generico_hhrr: {
            componentType: GenericoWidgetHHRR,
            entity: GenericoWidgetEntityHHRR,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Generico-Cards',
            },
        },
        Generico_Juridico: {
            componentType: GenericoWidgetContent,
            entity: GenericoWidgetEntityContent,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Generico-Cards-Content',
            },
        },
        Accordion: {
            componentType: Accordion,
            entity: AccordionEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Accordion',
            },
        },
        Video: {
            componentType: VideoWidget,
            entity: VideoWidgetEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Video',
            },
        },
        MisCursos: {
            componentType: MisCursosWidget,
            entity: MisCursosWidgetEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'MisCursos',
            },
        },
        Noticias: {
            componentType: NoticiasWidget,
            entity: NoticiasWidgetEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Noticias',
            },
        },
        NavBarTab: {
            componentType: NavbarHorizontalCustom,
            entity: NavigationExtendsEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'NavBar',
            },
        },
        ModalWidget: {
            componentType: ModalWidget,
            entity: ModalEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'ModalWidget',
            },
        },
        // 'SitefinityLoginForm': {
        //     componentType: LoginForm,
        //     entity: LoginFormEntity,
        //     ssr: false, // whether this is a server rendered or client rendered component
        //     editorMetadata: {
        //         Title: 'Login form'
        //     }
        // },
        CardList: {
            componentType: CardList,
            entity: CardListEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Card List',
            },
        },
        DetalleNoticia: {
            componentType: DetalleNoticia,
            entity: DetalleNoticiaEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Detalle Noticia',
            },
        },
        HistorialNoticias: {
            componentType: HistorialNoticia,
            entity: HistorialNoticiasEntity,
            ssr: false, // whether this is a server rendered or client rendered component
            editorMetadata: {
                Title: 'Historial de Noticia',
            },
        },
        CarruselHero: {
            componentType: Carrusel,
            entity: CarruselEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Carrusel Hero',
            },
        },
        Plataformas: {
            componentType: PlataformasWidget,
            entity: PlataformasWidgetEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Plataformas',
            },
        },
        Gobernanza: {
            componentType: GobernanzaWidget,
            entity: GobernanzaWidgetEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Gobernanza',
            },
        },

        TabsApp: {
            componentType: AplicacionesWidget,
            entity: AppsTabsEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Tabs App',
            },
        },

        ListApp: {
            componentType: AppsListWidget,
            entity: AppListEntity,
            ssr: true,
            editorMetadata: {
                Title: 'List App',
            },
        },
        TabsBeneficios: {
            componentType: BeneficiosWidget,
            entity: BeneficiosTabsEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Tabs Beneficios',
            },
        },
        Banner: {
            componentType: BannerImg,
            entity: BannerImgEntity,
            ssr: true,
            editorMetadata: {
                Title: 'Banner Admin',
            },
        },
        Bannerv2: {
            componentType: BannerImgv2,
            entity: BannerImgEntityv2,
            ssr: true,
            editorMetadata: {
                Title: 'Banner Areas',
            },
        },
        Bannerv3: {
            componentType: BannerImgv3,
            entity: BannerImgEntityv3,
            ssr: true,
            editorMetadata: {
                Title: 'Banner Areas internas',
            },
        },
        Bannerv4: {
            componentType: BannerImgv4,
            entity: BannerImgEntityv4,
            ssr: true,
            editorMetadata: {
                Title: 'Banner Areas Adicionales',
            },
        },
        Bannerv5: {
            componentType: BannerImgcontenido,
            entity: BannerImgEntitycontenido,
            ssr: true,
            editorMetadata: {
                Title: 'Banner contenido v1',
            },
        },
        Bannerv5_hhrr_rigth: {
            componentType: BannerImgcontenidohhrrRigth,
            entity: BannerImgEntitycontenidohhrrRigth,
            ssr: true,
            editorMetadata: {
                Title: 'Banner contenido v3',
            },
        },
        Bannerv6: {
            componentType: BannerImgcontenidov2,
            entity: BannerImgEntitycontenidov2,
            ssr: true,
            editorMetadata: {
                Title: 'Banner contenido v2',
            },
        },
        Bannerv7_hhrr: {
            componentType: BannerImgcontenidov2HHRR,
            entity: BannerImgEntitycontenidov2HHRR,
            ssr: true,
            editorMetadata: {
                Title: 'Banner contenido v4',
            },
        },
        frameText: {
            componentType: FrameText,
            entity: FrameTextEntity,
            ssr: true,
            editorMetadata: {
                Title: 'FrameText',
            },
        },
        frameTextAdminInicio: {
            componentType: FrameTextAdminInicio,
            entity: FrameTextAdminInicioEntity,
            ssr: true,
            editorMetadata: {
                Title: 'FrameText-Admin-Inicio',
            },
        },
        SideBar: {
            componentType: Sidebar,
            entity: SidebarEntity,
            ssr: true,
            editorMetadata: {
                Title: 'SideBar',
            },
        },
        AppList: {
            componentType: AppsListWidget,
            entity: AppListEntity,
            ssr: false,
            editorMetadata: {
                Title: 'AppList',
            },
        },
        DocumentList: {
            componentType: DocumentList,
            entity: DocumentWidgetEntity,
            ssr: false,
            editorMetadata: {
                Title: 'Documentos Recientes',
            },
        },
        SitefinityGestorArchivos: {
            componentType: GestorArchivosWidget,
            entity: DocumentosTabsEntity,

            ssr: false, // o true si deseas prerenderizado
            editorMetadata: {
                Title: 'Gestor de Archivos',
                Category: 'Content',
            },
        },

        
      
    },
};

defaultWidgetRegistry.widgets['SitefinityContentList'].views! = {
    ProductosRelacionadosView: {
        Title: 'Productos Relacionados',
        ViewFunction: CarruselProductoRelacionados,
    },
    CarrucelAreaView: {
        Title: 'Carrucel',
        ViewFunction: CarouselAreasServer,
    },
    CardListV3:{
        Title:"Card List Generico",
        ViewFunction: CardListAreasServer,
    },
    CarrucelCustom: {
        Title: 'CarrucelGenerico',
        ViewFunction: CarouselAreasServerGenerico,
    },
    CarruselRecursosView: {
        Title: 'Carrusel Recursos',
        ViewFunction: CarruselRecursos,
    },
    CardListView: {
        Title: 'Card List',
        ViewFunction: CardList,
    },
    TabListView: {
        Title: 'TabList ',
        ViewFunction: TabsListAreaServer,
    },
};

// addWidgetViews(defaultWidgetRegistry, 'SitefinityNavigation', {'CustomView': {
//     Title: 'Custom view',
//     ViewFunction: NavbarHorizontalCustom
// }});

// const Navigation = defaultWidgetRegistry.widgets['SitefinityNavigation']

// if(Navigation){
//     Navigation.ssr = false
// }

customWidgetRegistry.widgets = {
    ...defaultWidgetRegistry.widgets,
    ...customWidgetRegistry.widgets,
    //...CSRFormComponents
};

export const widgetRegistry: WidgetRegistry = initRegistry(customWidgetRegistry);
