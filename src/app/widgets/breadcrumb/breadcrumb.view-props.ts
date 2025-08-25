import { BreadcrumbItem } from "@progress/sitefinity-nextjs-sdk/rest-sdk";
import { BreadcrumbEntity, ViewPropsBase } from "@progress/sitefinity-nextjs-sdk/widgets";

export interface BreadcrumbViewProps<T extends BreadcrumbEntity> extends ViewPropsBase<T> {
    items: BreadcrumbItem[];
}
