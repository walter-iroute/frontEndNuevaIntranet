// banner.entity.ts
import {
    WidgetEntity,
    DefaultValue,
} from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Frame Text')
export class FrameTextAdminInicioEntity {
    
    @DefaultValue('Titulo')
    Titulo: string | null = null;
    
}
