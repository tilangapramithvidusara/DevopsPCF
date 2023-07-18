import { rejects } from 'assert';
import axios from 'axios';
import { resolve } from 'path';
import { base64ToByteArray, convertJsontoByteArray, encodeJSONToBase64 } from '../Helper/Helper';

const headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": '*',
  mode: 'no-cors'
}

const data: any = {
  
    "organizationUri": "https://dev.azure.com/SEERTEST2",
    "personalAccessToken": "3pqupxh5t33cupraelsj6aemtox5r5nqyvdlgpvlfhckihnx6bhq",
    "projectName": "SEETTEST1",
    "workItemType":"Task"

}

// {
//   organizationUri: "https://dev.azure.com/SEERTEST2",
//   personalAccessToken: "5klq5asofuo6bxllhldy25xavs5cvw5obdvo4sxd7p7r76cv4nnq",
//   projectName: "SEETTEST1"
// }
//dvttsdit35edsgajqqwxipnobf7r6x5g2nr337cp5ovhmiylq3za

export const saveMappingData = async(_data:any,guid:any) =>{

 try {
  console.log("Saving");

  let byteArray = convertJsontoByteArray(_data)

  console.log("encoded",guid,":",byteArray);
 

  window.parent.webapi.safeAjax({
    type: "PUT",
    url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsfieldmappings`,
    contentType: "application/octet-stream",
    data: byteArray,
    success: function (data:any, textStatus:any, xhr:any) {
      console.log("dataxhr",data,"textStatus",textStatus,"xhr",xhr);
    
  },

});
  // const baseUrl = "~/_api/gyde_devopsconfigurations" ;
  // const response = await axios.put(`${baseUrl}(${guid})/gyde_devopsfieldmappings`, {data:base64byteArr}, { headers: {"contentType": "application/octet-stream",} });
  // alert(`${response}`);
  // console.log("api response..",response);
  // return response.status;
} catch (error) {
  alert(`${error}`)
  console.error('Error creating account:', error);
  throw error;
}
  

}


export const saveDefaultMappingData = async(_guid:any) =>{

  try {
    console.log("defaultSaving");
    
   alert("------api intergration Save start----------");
  

var record :any= {};
record.gyde_defaultsetting = true; // Boolean
 
   window.parent.webapi.safeAjax({
    type: "PATCH",
     contentType: "application/json",
     url: `/_api/gyde_devopsconfigurations(${_guid})`,
     data: JSON.stringify(record),
     success: function (data:any, textStatus:any, xhr:any) {
       console.log("Record updated");
     },
     error: function (xhr:any, textStatus:any, errorThrown:any) {
       console.log(xhr);
     }
 
 });
   // const baseUrl = "~/_api/gyde_devopsconfigurations" ;
   // const response = await axios.put(`${baseUrl}(${guid})/gyde_devopsfieldmappings`, {data:base64byteArr}, { headers: {"contentType": "application/octet-stream",} });
   // alert(`${response}`);
   // console.log("api response..",response);
   // return response.status;
 } catch (error) {
   alert(`${error}`)
   console.error('Error creating account:', error);
   throw error;
 }
   
 
 }

 export const createDevConfigApi = (record:any)=> {

   return new Promise((resolve:any,reject:any)=> {

    window.parent.webapi.safeAjax({
      type: "POST",
      contentType: "application/json",
      url: "/_api/gyde_devopsconfigurations",
      data: JSON.stringify(record),
      success: function (data:any, textStatus:any, xhr:any) {
          var newId = xhr.getResponseHeader("entityid");
          resolve(newId)
        //  setGuid(newId)
         // recordType ==='newRecord' &&  createMappingFile(mappedWorkItems,newId);
         // console.log("newId",newId);
      },
      error: function (xhr:any, textStatus:any, errorThrown:any) {
        reject("Errror")
          console.log("hr",xhr);
      }
  });
  
   })
 }
 export const fetchFieldMapping = (guid:any)=> {

  //https://partnerstudioportaluk.powerappsportals.com/_api/gyde_devopsconfigurations(bebdc8ea-5524-ee11-9965-6045bd0fcbc6)/gyde_devopsfieldmappings/$value
  //https://seerv2sample2.azurewebsites.net
   return new Promise((resolve,rejects)=> {

    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsfieldmappings/$value`,
      contentType: "application/json",
      success: function (data:any, textStatus:any, xhr:any) {
        console.log("fetchFieldMapping",data,"textStatus",textStatus,"xhr",xhr);
        resolve({type:"success",data:data})

    },
      error: function(error:any, status:any, xhr:any) {
      console.log('error', error,status);
      resolve({type:"error",data:[]})
      
      }
      });
      
   })
    
    


 }
 export const fetchDefaultSetting = (pId:any)=>{
  console.log("PIDDEV",pId);
  
    return new Promise((resolve:any,rejects:any)=>{
      window.parent.webapi.safeAjax({
        type: "GET",
        url: `/_api/gyde_devopsconfigurations?$select=gyde_devopsconfigurationid,_gyde_customerbusinesssurvey_value,_gyde_customerorpartner_value,gyde_defaultsetting,gyde_devopsfieldmappings,gyde_devopsfieldmappings_name,gyde_devopsmappingcomplete,gyde_devopsmappings,gyde_devopsmappings_name,gyde_name,statecode,versionnumber&$filter=(_gyde_customerorpartner_value eq ${pId} and gyde_defaultsetting eq true)`,
        contentType: "application/json",
        headers: {
        "Prefer": "odata.include-annotations=*"
        },
        success: function (data:any, textStatus:any, xhr:any) {
        var results = data;
        console.log("FETCH results:==========>",results);
        if(results?.value.length){
         let _guID =results.value[0]["gyde_devopsconfigurationid"]; // Guid
         resolve({type:'updateDefault',id:_guID})
          console.log("callLength");  
        }else {
          resolve({type:'createDefault',id:null})
        }
       },
        error: function (xhr:any, textStatus:any, errorThrown:any) {
         console.log(xhr);
         rejects(xhr)
         }
        });
    })

 
 }

 export const fetchDevopsConfig =(id:any,bId:any) =>{

  return new Promise((resolve:any,rejects:any)=>{
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations?$select=gyde_devopsconfigurationid,_gyde_customerbusinesssurvey_value,_gyde_customerorpartner_value,gyde_defaultsetting,gyde_devopsfieldmappings,gyde_devopsfieldmappings_name,gyde_devopsmappingcomplete,gyde_devopsmappings,gyde_devopsmappings_name,gyde_name,statecode,versionnumber&$filter=(_gyde_customerorpartner_value eq ${id} and _gyde_customerbusinesssurvey_value eq ${bId} )`,
      contentType: "application/json",
      headers: {
      "Prefer": "odata.include-annotations=*"
      },
      success: function (data:any, textStatus:any, xhr:any) {
      var results = data;
      console.log("FETCH fetchDevopsConfig:==========>",results);
      if(results?.value.length){
       let _guID =results.value[0]["gyde_devopsconfigurationid"]; // Guid
       console.log("fetchDevopsConfig");
       
       resolve({type:'updateConfig',id:_guID})
        console.log("callLength");  
      }else {
       resolve({type:'createDefault',id:null})
      }
     },
      error: function (xhr:any, textStatus:any, errorThrown:any) {
       console.log(xhr);
       rejects(xhr)
       }
      });
  })


 }
 export const fetchDevOpsMappingField = (guid:any)=> {

   return new Promise((resolve,rejects)=> {

    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsmappings/$value`,
      contentType: "application/json",
      success: function (data:any, textStatus:any, xhr:any) {
        console.log("fetchDevOpsMappingField",data,"textStatus",textStatus,"xhr",xhr);
        resolve({type:"success",data:data})
      
    },
      error: function(error:any, status:any, xhr:any) {
      console.log('error', error);
      resolve({type:"error",data:[]})
      }
      });
   })

}
export const fetchDevopsFeildsData = async (auth:any,url:string) => {
  //fetch
  console.log("selected work item :",url,":",auth); 
  try {
    //devopsWorkItemFieldURL
    const result = await axios.post(`${url}`, 
      // {headers: headers},
    //   {
    //     "organizationUri": "https://dev.azure.com/SEERTEST2",
    //     "personalAccessToken": "3pqupxh5t33cupraelsj6aemtox5r5nqyvdlgpvlfhckihnx6bhq",
    //     "projectName": "SEETTEST1",
    //     "workItemType":`${workItem}`
    // }   
    auth
    );
    console.log("post req =========> ", result);
    if(result?.status === 200){
      if(result?.data?.StatusCode === 200){
        return {status:"success", data:result?.data };
      }    
      else if(result?.data?.StatusCode === 401){
        return {status:"error", data:result?.data?.Value };
      }
      else {
        console.log("1111",result);
        
         return  {status:"error", data:""};
      }
    }
    else{
      console.log("2222",result);
      return {status:"error", data:""};
  }     
  } catch (error:any) {  
    console.log("GetWorkItemTypeFields ===========", error);
    return {status:"Error", data:error?.message};   
  }
}

export const fetchWorkItemTypesFromDevops = async(value:any) => {
  try {
    //azureWorkItemTypeURL

    const result = 
    await axios.post('https://seerv2sample2.azurewebsites.net/api/GetWorkItemTypes?code=eZ8HwfEwRhr3EMahUUgKUz44rtzwwtaHss-lHwReYpS2AzFuDdbXow==', 
      // {
      //   "organizationUri": "https://dev.azure.com/SEERTEST2",
      //   "personalAccessToken": "5klq5asofuo6bxllhldy25xavs5cvw5obdvo4sxd7p7r76cv4nnq",
      //   "projectName": "SEETTEST1"
      // }
      value
    );
      console.log("GetWorkItemTypes =========> ", result);
      if(result?.status === 200){
        if(result?.data?.StatusCode === 200){
          return {status:"success", data:result?.data };
        }else if (result?.data?.StatusCode === 401){
          return {status:"error", data:result?.data };
        }else{
          return {status:"error", data:result?.data };
        }
      }else{
        return {status:"error", data:"Something Went Wrong..!" };
      }
 
  } catch (error) {
    console.log("GetWorkItemTypes ===========", error);
    return {status:"error", data:error}
  }
}

export const fetchDevOpsConfigById = (id:any)=> {

  return new Promise((resolve,reject)=>{

    window.parent.webapi.safeAjax({
      type: "GET",
      url:`/_api/gyde_devopsconfigurations(${id})`,
      contentType: "application/json",
      success: function (data:any, textStatus:any, xhr:any) {

        console.log("fetchDevOpsConfigById",data,"textStatus",textStatus,"xhr",xhr);
        resolve(data)
      
    },
      error: function(error:any, status:any, xhr:any) {
      console.log('error', error);
      reject(error)
      }
      });
      
      

  })

}


export const fetWorkItemsbyId =(id:any)=> {
  return new Promise((resolve,reject)=>{
    window.parent.webapi.safeAjax({
      type: "GET",
      url:`/_api/gyde_gyde365surveies(${id})`,
      contentType: "application/json",
      success: function (data:any, textStatus:any, xhr:any) {
        console.log("fetchDevOpsConfigById",data,"textStatus",textStatus,"xhr",xhr);
        resolve({type:"success",data:data})
      
    },
      error: function(error:any, status:any, xhr:any) {
      console.log('error', error);
      resolve({type:"error",data:[]})
      }
      });
      
      

  })


}
// export const postReq3 = async() => {
//   try {
//     const result = await axios.post('https://seerv2samplefunctions.azurewebsites.net/api/workitemtypes?code=Ht8huimZ3kJtn36JX6fjuFRX6fI7GqYnKbg1wJcqlVa2AzFu2nOLRQ==',
//       {data},
//     );
//     console.log("get req =========> ", result);
//   } catch (error) {
//     console.log("error postReq ===========", error);
//     fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))
    
//   }
// }


// export const getReqw = async() => {
//   try {
//     const result = await axios.get('https://seerv2samplefunctions.azurewebsites.net/api/workitemtypes?code=Ht8huimZ3kJtn36JX6fjuFRX6fI7GqYnKbg1wJcqlVa2AzFu2nOLRQ==',
//       {headers: headers},
//     );
//     console.log("get req =========> ", result);
//     return result;
//   } catch (error) {
//     console.log("error postReq ===========", error);
    
//   }
// }

// export const postReqGydeDesignStudioDev = async() => {
//   try {
//     const result = 
//     await axios.get('https://gydedesignstudiodev.powerappsportals.com/_api/$metadata#accounts');
//     console.log("type 1  =========> ", result);
    
//   } catch (error) {
//     console.log("type 1 ===========", error);
    
//   }
// }

export const fetchWorkItemTypesFromCRM  = async() => {
  try {
    const result = 
    await axios.get('https://gydedesignstudiodev.powerappsportals.com/_api/gyde_workitemtypes');
    console.log("get WorkItemTypes From CRM =========> ", result?.data);
    if(result?.status==200){
      return {status:"success", data:result?.data};
    }else{
      return {status:"error", data:"Something Went Wrong..!"};
    }  
  } catch (error) {
    console.log(" Error get WorkItemTypes From CRM ===========", error);
    return {status:"error", data:error};
  }

}

// export const postReq4 = async() => {
//   try {
//     const result = 
//     await axios.get('https://seerv2sample2.azurewebsites.net/api/FetchEntityMetadata?code=OFkmhAGcuj9jL751lEKt-mFiPW9FU2bL53YUeU1iQZXAAzFuo8isRg==');
//     console.log("type 3 =========> ", result);
    
//   } catch (error) {
//     console.log(" type 3 ===========", error);
    
//   }
// }

// export const postReq5 = async() => {
//   try {
//     const result = 
//     await axios.post('https://prod-40.westus.logic.azure.com:443/workflows/c4bc8b5373824bea91817ec66b1c0888/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xxG4MjY6wiYywowK6sbZLWukqntZIwkGExOSO1TS0qs');
//     console.log("type 4 =========> ", result);
    
//   } catch (error) {
//     console.log(" type 4 ===========", error);
    
//   }
// }

export const saveWorkItemTypes  = async (mappingData:any) => {
  // try {
  //   console.log("mapped data set ///",mappingData)
  //   const formData = new FormData();   
  //   const url = "/_api/gyde_devopsconfigurations" ;
  //   const data = JSON.stringify({ "gyde_name":"Sample Config - RD"});
  //   const headers:any = {
  //     "Content-Type": "application/json"
  //   }
  //   console.log("formData...",formData);    
  //   const result = await axios.post(url, data, headers);
  //   console.log("result...",result);
  //   localStorage.setItem('save items',JSON.stringify(result));
  //   return { status:"success", data:result?.data };
  
  // } catch (error) {
  //   console.log(" Save Error", error);
  //   return {status:"error", data:error};
  // }
  try {
    alert("------api intergration start----------");
    const data = JSON.stringify({
      gyde_name: "Sample Config - RD",
    });
    const baseUrl = "~/_api/gyde_devopsconfigurations" ;
   //const response = post(`${baseUrl}`, data, { headers: {"contentType": "application/json",} });

      // Default options are marked with *
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "OData-MaxVersion": "4.0",
      "OData-Version": "4.0",
      "Content-Type": "application/json; charset=utf-8",
      "Accept": "application/json",
      "Prefer": "odata.include-annotations=*"
    },
    body: JSON.stringify(data)
  
  });
  // parses JSON response into native JavaScript objects

    alert(`${response}`);
    console.log("api response..",response);
    return response.status;
  } catch (error) {
    alert(`${error}`)
    console.error('Error creating account:', error);
    throw error;
  }
}

export const createMappingFile  = async(data:any,guid:any) => {
  try {
     return new Promise((resolve,rejects)=> {


      const base64Data = encodeJSONToBase64(data);
      const byteArrayData = base64ToByteArray(base64Data);
      console.log("byteArrayData",guid, byteArrayData);
  
      window.parent.webapi.safeAjax({
        type: "PUT",
        url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsmappings`,
        contentType: "application/octet-stream",
        data: byteArrayData,
        success: function (data:any, textStatus:any, xhr:any) {
          console.log("dataxhr",data,"textStatus",textStatus,"xhr",xhr);

          resolve({type:"success"})
        
      },
      error: function(error:any, status:any, xhr:any) {
        console.log('error', error);
        resolve({type:"error"})
        }

     })
  
  });
    // const result = 
    // await axios.put('/_api/gyde_devopsconfigurations(Devops Config GUID)/gyde_devopsmappings ',
    // {
    //   contentType: "application/octet-stream",
    //   data: byteArrayData,

    // });
    // console.log("result...",result);
    // if(result?.status==200){
    //   return {status:"success", data:result?.data};
    // }else{
    //   return {status:"error", data:"Something Went Wrong..!"};
    // }  
  } catch (error) {
    console.log(" Save Error", error);
    return {status:"error", data:error};
  }

}


// declare global {
//   interface Window {
//     webapi: any;
//   }
// }

