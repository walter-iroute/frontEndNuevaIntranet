import { WidgetContext } from '@progress/sitefinity-nextjs-sdk';

export interface ViewPropsBase<T extends {[key: string]: any} = {[key: string]: any}> {
    widgetContext: WidgetContext<T>;
    attributes: Record<string, string>;
}