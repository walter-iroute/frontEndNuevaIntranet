// banner.entity.ts
import {
    WidgetEntity,
    DefaultValue,
} from '@progress/sitefinity-widget-designers-sdk';

@WidgetEntity('Frame Text')
export class FrameTextEntity {
    
    @DefaultValue('Titulo')
    Titulo: string | null = null;
    @DefaultValue('descripcion')
    Texto: string | null = null;
}
