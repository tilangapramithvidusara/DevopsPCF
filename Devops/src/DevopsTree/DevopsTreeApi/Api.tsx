import axios from "axios";
export const generateDevops = async (_data?: any, isChild?:boolean) => {
    try{
        const response = await axios.post('https://seerv2sample2.azurewebsites.net/api/CreateWorkItem?code=0SSvW5ffaDcPDrMKRZIWAQLgsRkYtZM0exwE8i1Cg2UWAzFuG76JIw==',_data);
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

export const fetchWorkItemsByBusinessSurveyId = async( id:any)=> {
    id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
  return await new Promise((resolve,reject)=>{
     window.parent.webapi.safeAjax({
    type: "GET",
    url: `/getsurveyworkItems/?type=workitem&id=${id}`,
    contentType: "application/json",
    success: function (data: any, textStatus: any, xhr: any) {
      console.log("GetWorkItemTypes",data);
      resolve({ type: "success", data });
    },
    error: function (request: any, status: any, thrown: any) {
      reject({ type: "error", status: request.status });
    },
    });
  })
}

export const fetchAllInternalIdsByBusinessSurveyId = async(id:any) => {
    id = '73e7d54d-7c03-ee11-8f6e-6045bd0fcbc6';
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