import { useEffect, useState } from 'react';
import { Liquid } from 'liquidjs';

import React from 'react';

const SiteSettingsCompo = () => {

   const liquidEngine = new Liquid();
const liquidTemplate = `<div> {% assign deactivateCustomerBusinessSurveyFlowUrl = settings["DeactivateCustomerBusinessSurveyFlowURL"]%}
<input type="hidden" id="deactivateCustomerBusinessSurveyFlowUrl" value="{{deactivateCustomerBusinessSurveyFlowUrl}}" /></div>
`;
const [renderedOutput, setRenderedOutput] = useState('');
useEffect(() => {
 const data = {
    items: ['Item 1', 'Item 2', 'Item 3']
 };

 console.log("renderedOutput1",renderedOutput);
 
 liquidEngine.parseAndRender(liquidTemplate, data)
 .then(output => {
   console.log("siteSetting1",output);
   
 setRenderedOutput(output);
})
.catch(error => {
 console.error('Error rendering Liquid template:', error);
 });
}, []);
return (
 <div>
 <h1>Rendered Liquid Output</h1><div dangerouslySetInnerHTML={{ __html: renderedOutput }} />
 </div>
);
}

export default SiteSettingsCompo;
