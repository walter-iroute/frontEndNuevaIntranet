'use client';
import { WidgetContext, htmlAttributes, getCustomAttributes, combineClassNames, getMinimumWidgetContext } from "@progress/sitefinity-nextjs-sdk";
import { Tracer } from "@progress/sitefinity-nextjs-sdk/diagnostics/empty";
import { GetBreadcrumbArgs, RestClient } from "@progress/sitefinity-nextjs-sdk/rest-sdk";
import { RenderView, BreadcrumbDefaultView } from "@progress/sitefinity-nextjs-sdk/widgets";
import { StyleGenerator } from "@progress/sitefinity-nextjs-sdk/widgets/styling";
import { BreadcrumbEntity } from "./breadcrumb.entity";
import { useState, useEffect } from "react";
import { BreadcrumbViewProps } from './breadcrumb.view-props';

const PAGE_MISSING_MESSAGE = 'Breadcrumb is visible when you are on a particular page.';

export function Breadcrumb(props: WidgetContext<BreadcrumbEntity>) {
  const [items, setItems] = useState<any[]>([]);
  const { span, ctx } = Tracer.traceWidget(props, true);
  const dataAttributes = htmlAttributes(props);

  useEffect(() => {
    const fetchItems = async () => {
      try {        
        const args: GetBreadcrumbArgs = {
          addStartingPageAtEnd: props.model?.Properties.AddCurrentPageLinkAtTheEnd,
          addHomePageAtBeginning: props.model?.Properties.AddHomePageLinkAtBeginning,
          includeGroupPages: props.model?.Properties.IncludeGroupPages,
          currentPageId: props.requestContext?.layout.Id,
          currentPageUrl: props.requestContext?.layout?.Fields?.ViewUrl,
          culture: props.requestContext?.culture,
          traceContext: ctx
        };

        const resp = await RestClient.getBreadcrumb(args);
        setItems(resp);        
        if (props.model?.Properties.BreadcrumbIncludeOption === BreadcrumbIncludeOption.SpecificPagePath && props.model?.Properties.SelectedPage && props.model?.Properties.SelectedPage.ItemIdsOrdered && props.model?.Properties.SelectedPage.ItemIdsOrdered.length > 0) {
          args.startingPageId = props.model?.Properties.SelectedPage.ItemIdsOrdered[0];
        }

        if (props.model?.Properties.AllowVirtualNodes) {
          args.detailItemInfo = props.requestContext.detailItem;
        }

        const defaultClass = props.model?.Properties.WrapperCssClass;
        const marginClass = props.model?.Properties.Margins && StyleGenerator.getMarginClasses(props.model?.Properties.Margins);
        const breadcrumbCustomAttributes = getCustomAttributes(props.model?.Properties.Attributes, 'Breadcrumb');

        dataAttributes['className'] = combineClassNames(defaultClass, marginClass);
        const viewName = props.model?.Properties.SfViewName;

        const viewProps: BreadcrumbViewProps<BreadcrumbEntity> = {
          widgetContext: getMinimumWidgetContext(props),
          attributes: { ...dataAttributes, ...breadcrumbCustomAttributes },
          items
        };

        return (
          <RenderView
            viewName={viewName}
            widgetKey={props.model.Name}
            traceSpan={span}
            viewProps={viewProps}>
            <BreadcrumbDefaultView {...viewProps} />
          </RenderView>
        );

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);
}

export enum BreadcrumbIncludeOption {
  CurrentPageFullPath = 'CurrentPageFullPath',
  SpecificPagePath = 'SpecificPagePath',
}

