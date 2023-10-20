declare global {
    interface Window {
      Xrm: any;
    }
  }

export const languageTranslator = async(dispatch:any, initialState:any)=> {

    const url = await window.parent.Xrm.Utility.getGlobalContext().getClientUrl();
    const language = await window.parent.Xrm.Utility.getGlobalContext().userSettings.languageId
    const webResourceUrl = `${url}/WebResources/gyde_localizedstrings.${language}.resx`;
    try {
      const response = await fetch(`${webResourceUrl}`);
      const data = await response.text();
      const filterKeys = ['copyingnotallowed', 'permissionapinotsupport', 'grantpermission']; // Replace with the key you want to filter
      // filterKeys.map((filterKey: string, index: number) => {
      //   const parser = new DOMParser();
      //   // Parse the XML string
      //   const xmlDoc = parser.parseFromString(data, "text/xml");
      //   // Find the specific data element with the given key
      //   const dataNode: any = xmlDoc.querySelector(`data[name="${filterKey}"]`);
      //   // Extract the value from the data element
      //   const value: any = dataNode?.querySelector("value").textContent;

      //   // if (index === 0) {
      //   //   setCopyNotAllowed(value)
      //   // }
      //   // if (index === 1) {
      //   //   setApiNotSupport(value)
      //   // }
      //   // if (index === 2) {
      //   //   setGrantPermission(value)
      //   // }
      //   console.log('data ====> ',  index, value); 
      // });

      Object.keys(initialState).map(async (key, index) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const dataNode:any = xmlDoc.querySelector(`data[name="${key}"]`);
        const value = dataNode?.querySelector("value").textContent;
       console.log("Langue value",value);
       
        // Dispatch the value to update state based on the index
        if(value){
          dispatch({ type: key, value });
        }
        console.log('data ====> ', index, value);
      });
      // this.setState({ data });
    } catch (error) {
      console.error('Error loading data:', error);
    }
}

