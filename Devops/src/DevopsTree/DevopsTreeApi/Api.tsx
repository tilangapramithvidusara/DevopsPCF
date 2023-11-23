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
  
   // id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
  return await new Promise((resolve,reject)=>{
     window.parent.webapi.safeAjax({
    type: "GET",
   // url: `/getsurveyworkItems/?type=workitem&id=${id}`,
    url: `/getsurveyworkItems/?type=workitem&id=${id}&businessSurveyId=${busId}&organizationurl=${orgUrl}&projectname=${pName}`,
    contentType: "application/json",
    success: function (data: any, textStatus: any, xhr: any) {
      console.log("GetWorkItemTypes",data);
      console.log("type of",typeof data);

      if (/("Description":\s*"[^"]*")/.test(data)) {
        data = data.replace(/"Description": "([^"]*)",/g, function (match:any, description:any) {
          var updatedDescription = description.replace(/\n/g, "\\n");
          return `"Description": "${updatedDescription}",`;
        });
    
        try {
          var jsonData = JSON.parse(data);
         
          console.log("jsonParseData", jsonData);
          resolve({ type: "success", data : jsonData});
        } catch (error) {
          console.error("Error parsing JSON: " + error);
        }
      } else {
        try {
          var _data = JSON.parse(data);
      console.log("jsonParseData", _data);
      resolve({ type: "success", data : _data});
        } catch (error) {
          console.error("Error parsing JSON: " + error);
        }
      }
     
    },
    error: function (request: any, status: any, thrown: any) {
      reject({ type: "error", status: request.status });
    },
    });
  })
}

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