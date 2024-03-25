import axios from "axios";
export const generateDevops = async (url:any,_data?: any) => {
    try{

      console.log("createDevopsWorkItemURL",url);
      
        const response = await axios.post(`${url}`,_data);
        console.log('Parent node saved:', response);
        return response;
    }catch(error:any){

        console.log("eerrr",error);
        
    }
};

export const fetchWorkItemTypes = ()=> {

  return new Promise((resolve,reject)=>{
    window.parent.webapi.safeAjax({
  type: "GET",
  url: "/_api/gyde_workitemtypes",
  contentType: "application/json",
  success: function (data: any, textStatus: any, xhr: any) {
    resolve({ type: "success", data });
  },
  error: function (request: any, status: any, thrown: any) {
    reject({ type: "error", status: request.status });
  },
  });
  })
}

export const fetchWorkItemsByBusinessSurveyId = async( id:any,busId:any,orgUrl:any,pName:any)=> {
  console.log("#buisID",id);
  const timestamp = new Date().getTime(); // Generate a timestamp for cache-busting
  console.log("cache",timestamp);
  
   // id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
  return await new Promise((resolve,reject)=>{
     window.parent.webapi.safeAjax({
    type: "GET",
   // url: `/getsurveyworkItems/?type=workitem&id=${id}`,
    url: `/getsurveyworkItems/?type=workitem&id=${id}&businessSurveyId=${busId}&organizationurl=${orgUrl}&projectname=${pName}&timestamp=${timestamp}`,
    contentType: "application/json",
    cache: false,
    headers:{
      'Cache-Control':'no-cache',
      'Pragma':'no-cache'
    },
    success:   function (data: any, textStatus: any, xhr: any) {
      console.log("GetWorkItemTypes",data );
   
console.log("type of*",typeof data ,xhr);
 data = data.replaceAll(",]}", "]}")

//       const keys = Array.from(new Set(data.match(/"([^"]+)":/g).map((match :any) => match.replace(/"/g, '').replace(/:/g, '').trim())));
// console.log(keys);

      
// function handleMultilineProperty(key:any) {
//   if (key === 'Description') {
//     const regexPattern = new RegExp(`"${key}":\\s*"(.*?[^\\\\])\\s*",`, 'g');

//     if (regexPattern.test(data)) {
//       try {
//         data = data.replace(regexPattern, function (match:any, propValue:any) {
//           const updatedValue = propValue.replace(/\n/g, "\\n").replace(/"/g, '\\"');
//           const stringWithBackslash = "This is a double backslash: \\\\";
//           console.log("update", stringWithBackslash.includes("\\\\")); // Output: true

//           if (stringWithBackslash.includes("\\\\")) {
//             let updatedString = updatedValue.replace(/\\"/g, '');
//             console.log("updatedString", updatedString);
//             return `"${key}": "${updatedString}",`;
//           } else {
//             return `"${key}": "${updatedValue}",`;
//           }
//         });
//       } catch (error:any) {
//         console.error(`Error processing ${key}: ${error.message}`);
//       }
//     } else {
//       console.log(`Error processing ${key}`);
//     }
//   } else {
//     const regexPattern = new RegExp(`"${key}":\\s*"[^"]*",`, 'g');

//     if (regexPattern.test(data)) {
//       try {
//         data = data.replace(regexPattern, function (match:any, propValue:any) {
//           const updatedValue = propValue.replace(/\n/g, "\\n").replace(/"/g, '\\"');
//           return `"${key}": "${updatedValue}",`;
//         });
//       } catch (error:any) {
//         console.error(`Error processing ${key}: ${error.message}`);
//       }
//     } else {
//       console.log(`Error processing ${key}`);
//     }
//   }
// }


// keys.forEach(key => handleMultilineProperty(key));

// const keys1 :any = Array.from(new Set(data.match(/"([^"]+)":/g).map((match :any) => match.replace(/"/g, '').replace(/:/g, '').trim())));
//     console.log(keys);
    
//     function handleMultilineProperty1(key :any) {
//         if (new RegExp(`("${key}":\\s*"[^"]*")`).test(data)) {
//             console.log("key",key);
//             data = data.replace(new RegExp(`"${key}": "([^"]*)",`, 'g'), function (match :any, propValue :any) {
//                 const updatedValue = propValue.replace(/\n/g, "\\n");
//                 return `"${key}": "${updatedValue}",`;
//             });
//         }
//     }
//     keys1.forEach((key:any) => handleMultilineProperty1(key));

//       const keys = Array.from(new Set(data.match(/"([^"]+)":/g).map((match: any) => match.replace(/"/g, '').replace(/:/g, '').trim())));
// console.log(keys);

// function handleMultilineProperty(key:any) {
//     if (new RegExp(`("${key}":\\s*"[^"]*")`).test(data)) {
//         console.log("key",key);
//         data = data.replace(new RegExp(`"${key}": "([^"]*)",`, 'g'), function (match:any, propValue:any) {
//             const updatedValue = propValue.replace(/\n/g, "\\n");
//             return `"${key}": "${updatedValue}",`;
//         });
//     }
// }
// keys.forEach(key => handleMultilineProperty(key));



    //   if (/("Description":\s*"[^"]*")/.test(data)) {
    //     data = data.replace(/"Description": "([^"]*)",/g, function (match:any, description:any) {
    //       var updatedDescription = description.replace(/\n/g, "\\n");
    //       return `"Description": "${updatedDescription}",`;
    //     });  
    // }
    // if (/("Acceptance Criteria":\s*"[^"]*")/.test(data)) {
    
    //     console.log("valiud");
    //     data = data.replace(/"Acceptance Criteria": "([^"]*)",/g, function (match:any, description:any) {
    //       var updatedDescription = description.replace(/\n/g, "\\n");
    //       return `"Acceptance Criteria": "${updatedDescription}",`;
          
    //     });
        
    // }
        try {
          var jsonData = JSON.parse(data);
          console.log("jsonParseData", jsonData);
          resolve({ type: "success", data : jsonData});
        } catch (error) {
          console.error("Error parsing JSON: " + error);
        }
     
     
    },
    error: function (request: any, status: any, thrown: any) {
      reject({ type: "error", status: request.status });
    },
    });
  })
}
// export const fetchWorkItemsByBusinessSurveyId = async (id: any, busId: any, orgUrl: any, pName: any) => {
//   console.log("#buisID", id);
//   const timestamp = new Date().getTime(); // Generate a timestamp for cache-busting
//   console.log("cache", timestamp);

//   try {
//     const response :any = await axios.get(`~/getsurveyworkItems/?type=workitem&id=${id}&businessSurveyId=${busId}&organizationurl=${orgUrl}&projectname=${pName}&timestamp=${timestamp}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Cache-Control': 'no-cache',
//         'Pragma': 'no-cache'
//       },
//     });

//     console.log("GetWorkItemTypes", response.data);
//     console.log("type of*", typeof response.data);
//     const jsonData = await response.json();
//     console.log("jsonData",jsonData);
//     console.log("jsonData893",JSON.parse(jsonData));
//     console.log("resppomnseParse",JSON.parse(response.data));
    
//     return { type: "success", data: JSON.parse(response.data) };
//   } catch (error:any) {
//     console.error("Error making request: " + error);
//     return { type: "error", status: error.response?.status || 500 }; // Assuming a generic error status
//   }
// };
export const fetchAllInternalIdsByBusinessSurveyId = async(id:any) => {
  console.log("#fetchAllInternalIdsByBusinessSurveyId",id);
   // id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
  const apiCalls = [
    `/getsurveyworkItems/?type=chapters&id=${id}`,
    `/getsurveyworkItems/?type=sections&id=${id}`,
    `/getsurveyworkItems/?type=questions&id=${id}`,
  ];

  const promises = apiCalls.map((url) => {
    return new Promise((resolve, reject) => {
      window.parent.webapi.safeAjax({
        type: "GET",
        url,
        contentType: "application/json",
        success: function (data:any, textStatus:any, xhr:any) {
          resolve({ type: "success", data });
        },
        error: function (request:any, status:any, thrown:any) {
          reject({ type: "error", status: request.status });
        },
      });
    });
  });

  return await Promise.all(promises);
}

export const migaratedJobStatus = (id:any)=> {

  return new Promise((resolve,reject)=> {

    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsjobhistories?$filter=(statuscode eq 300600001 and _gyde_gyde365survey_value eq ${id})&$count=true`,
      contentType: "application/json",
      headers: {
          "Prefer": "odata.include-annotations=*"
      },
      success: function (data :any, textStatus :any, xhr :any) {
          var results = data;
          console.log("jobhistroy",results);
          var odata_count = results["@odata.count"];
          console.log("odata_count",odata_count);
          resolve({ type: "success", data :odata_count });
      },
      error: function (xhr:any, textStatus:any, errorThrown:any) {
          console.log(xhr);
          reject({ type: "error", status: xhr.status });
      }
  });

  })
}

export const restDevOpsId = async (url:any,_data?: any) => {
  try{

    console.log("restDevOpsIdUrl",url ,_data);
    
      const response = await axios.post(`${url}`,_data);
      console.log('Parent node saved:', response);
      return {type:'success',data:[]};
  }catch(error:any){

      console.log("eerrr",error);
      return {type:'error',data:[]};
  }
};
