import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App, { AppConfig } from "./src/App";
// import config from "./"

export class Devops implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;

    // Fetch the configuration dynamically
    // fetch("./config.json") // Replace with the actual path to your configuration file
    //   .then((response) => response.json())
    //   .then((config) => {
    //     const appConfig: AppConfig = {
    //       apiKey: config.apiKey,
    //       apiEndpoint: config.apiEndpoint,
    //     };

    //     // Render the App component with the configuration
    //     ReactDOM.render(React.createElement(App, { config: appConfig }), this.container);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to load configuration:", error);
    //   });
        // const appConfig: AppConfig = {
        //   apiKey: config.apiKey,
        //   apiEndpoint: config.apiEndpoint,
        // };
    ReactDOM.render(React.createElement(App), this.container);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // No need to update the view since the rendering is handled in the init method
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
