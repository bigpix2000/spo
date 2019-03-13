import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GoodByeMarsWebPartStrings';
import GoodByeMars from './components/GoodByeMars';
import { IGoodByeMarsProps } from './components/IGoodByeMarsProps';

export interface IGoodByeMarsWebPartProps {
  description: string;
  specials:string;
}

export default class GoodByeMarsWebPart extends BaseClientSideWebPart<IGoodByeMarsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGoodByeMarsProps > = React.createElement(
      GoodByeMars,
      {
        description: this.properties.description,
        specials: this.properties.specials
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('specials', {
                  label: strings.SpecialsFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
