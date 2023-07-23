import { rejects } from "assert";
import axios from "axios";
import { resolve } from "path";
import {
  base64ToByteArray,
  convertJsontoByteArray,
  encodeJSONToBase64,
} from "../Helper/Helper";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  mode: "no-cors",
};
const data: any = {
  organizationUri: "https://dev.azure.com/SEERTEST2",
  personalAccessToken: "3pqupxh5t33cupraelsj6aemtox5r5nqyvdlgpvlfhckihnx6bhq",
  projectName: "SEETTEST1",
  workItemType: "Task",
};
export const saveMappingData = async (_data: any, guid: any) => {
  try {
    const reader = new FileReader();
    const savePromise = new Promise((resolve, reject) => {
      reader.onload = function (e) {
        console.log("Saving", e);
        const bodyContents: any = e?.target?.result;
        const buffer = new Uint8Array(bodyContents);
        window.parent.webapi.safeAjax({
          url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsfieldmappings`,
          type: "PUT",
          contentType: "application/octet-stream",
          processData: false,
          data: buffer,
          success: function (data: any, textStatus: any, xhr: any) {
            resolve({ type: "success", data });
          },
          error: function (request: any, status: any, thrown: any) {
            reject({ type: "error", status: request.status });
          },
        });
      };
      let _tableDataStringify = JSON.stringify(_data);
      const blob = new Blob([_tableDataStringify], { type: "application/json" });
      const file = new File([blob], "foo.txt", { type: "text/plain" });
      reader.readAsArrayBuffer(file);
    });
    return savePromise;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};


export const saveDefaultMappingData = (_guid: any) => {
  return new Promise((resolve, reject) => {
    console.log("defaultSaving");
    var record: any = {};
    record.gyde_defaultsetting = true; // Boolean

    window.parent.webapi.safeAjax({
      type: "PATCH",
      contentType: "application/json",
      url: `/_api/gyde_devopsconfigurations(${_guid})`,
      data: JSON.stringify(record),
      success: function (data: any, textStatus: any, xhr: any) {
        console.log("Record updated");
        resolve({ type: "success", data: data }); // Resolve the promise with type 'success'
      },
      error: function (xhr: any, textStatus: any, errorThrown: any) {
        console.log(xhr);
        reject({ type: "error", error: new Error(textStatus) }); // Reject the promise with type 'error'
      },
    });
  });
};

export const createDevConfigApi = (record: any) => {
  return new Promise((resolve: any, reject: any) => {
    window.parent.webapi.safeAjax({
      type: "POST",
      contentType: "application/json",
      url: "/_api/gyde_devopsconfigurations",
      data: JSON.stringify(record),
      success: function (data: any, textStatus: any, xhr: any) {
        var newId = xhr.getResponseHeader("entityid");
        resolve(newId);
      },
      error: function (xhr: any, textStatus: any, errorThrown: any) {
        reject("Errror");
        console.log("hr", xhr);
      },
    });
  });
};
export const fetchFieldMapping = (guid: any) => {
  return new Promise((resolve, rejects) => {
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsfieldmappings/$value`,
      contentType: "application/json",
      success: function (data: any, textStatus: any, xhr: any) {
        console.log(
          "fetchFieldMapping",
          data,
          "textStatus",
          textStatus,
          "xhr",
          xhr
        );
        resolve({ type: "success", data: data });
      },
      error: function (error: any, status: any, xhr: any) {
        console.log("error", error, status);
        resolve({ type: "error", data: [] });
      },
    });
  });
};
export const fetchDefaultSetting = (pId: any) => {
  console.log("PIDDEV", pId);

  return new Promise((resolve: any, rejects: any) => {
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations?$select=gyde_devopsconfigurationid,_gyde_customerbusinesssurvey_value,_gyde_customerorpartner_value,gyde_defaultsetting,gyde_devopsfieldmappings,gyde_devopsfieldmappings_name,gyde_devopsmappingcomplete,gyde_devopsmappings,gyde_devopsmappings_name,gyde_name,statecode,versionnumber&$filter=(_gyde_customerorpartner_value eq ${pId} and gyde_defaultsetting eq true)`,
      contentType: "application/json",
      headers: {
        Prefer: "odata.include-annotations=*",
      },
      success: function (data: any, textStatus: any, xhr: any) {
        var results = data;
        console.log("FETCH results:==========>", results);
        if (results?.value.length) {
          let _guID = results.value[0]["gyde_devopsconfigurationid"]; // Guid
          resolve({ type: "updateDefault", id: _guID });
          console.log("callLength");
        } else {
          resolve({ type: "createDefault", id: null });
        }
      },
      error: function (xhr: any, textStatus: any, errorThrown: any) {
        console.log("Default Error");
        resolve({ type: "error", id: [] });
      },
    });
  });
};

export const fetchDevopsConfig = (id: any, bId: any) => {
  return new Promise((resolve: any, rejects: any) => {
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations?$select=gyde_devopsconfigurationid,_gyde_customerbusinesssurvey_value,_gyde_customerorpartner_value,gyde_defaultsetting,gyde_devopsfieldmappings,gyde_devopsfieldmappings_name,gyde_devopsmappingcomplete,gyde_devopsmappings,gyde_devopsmappings_name,gyde_name,statecode,versionnumber&$filter=(_gyde_customerorpartner_value eq ${id} and _gyde_customerbusinesssurvey_value eq ${bId} )`,
      contentType: "application/json",
      headers: {
        Prefer: "odata.include-annotations=*",
      },
      success: function (data: any, textStatus: any, xhr: any) {
        var results = data;
        console.log("FETCH fetchDevopsConfig:==========>", results);
        if (results?.value.length) {
          let _guID = results.value[0]["gyde_devopsconfigurationid"]; // Guid
          console.log("fetchDevopsConfig");

          resolve({ type: "updateConfig", id: _guID });
          console.log("callLength");
        } else {
          resolve({ type: "createDefault", id: null });
        }
      },
      error: function (xhr: any, textStatus: any, errorThrown: any) {
        console.log("fetchDevopsConfig Error");
        console.log(xhr);
        resolve({ type: "error", id: null });
      },
    });
  });
};
export const fetchDevOpsMappingField = (guid: any) => {
  return new Promise((resolve, rejects) => {
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsmappings/$value`,
      contentType: "application/json",
      success: function (data: any, textStatus: any, xhr: any) {
        console.log(
          "fetchDevOpsMappingField",
          data,
          "textStatus",
          textStatus,
          "xhr",
          xhr
        );
        resolve({ type: "success", data: data });
      },
      error: function (error: any, status: any, xhr: any) {
        console.log("fetchDevOpsMappingField", error);
        resolve({ type: "error", data: [] });
      },
    });
  });
};
export const fetchDevopsFeildsData = async (auth: any, url: string) => {
  try {
    const result = await axios.post(`${url}`, auth);
    console.log("post req =========> ", result);
    if (result?.status === 200) {
      if (result?.data?.StatusCode === 200) {
        return { status: "success", data: result?.data };
      } else if (result?.data?.StatusCode === 401) {
        return { status: "error", data: result?.data?.Value };
      } else {
        return { status: "error", data: "" };
      }
    } else {
      return { status: "error", data: "" };
    }
  } catch (error: any) {
    return { status: "Error", data: error?.message };
  }
};

export const fetchWorkItemTypesFromDevops = async (value: any) => {
  try {
    //azureWorkItemTypeURL
    const result = await axios.post(
      "https://seerv2sample2.azurewebsites.net/api/GetWorkItemTypes?code=eZ8HwfEwRhr3EMahUUgKUz44rtzwwtaHss-lHwReYpS2AzFuDdbXow==",
      value
    );
    console.log("GetWorkItemTypes =========> ", result);
    if (result?.status === 200) {
      if (result?.data?.StatusCode === 200) {
        return { status: "success", data: result?.data };
      } else if (result?.data?.StatusCode === 401) {
        return { status: "error", data: result?.data };
      } else {
        return { status: "error", data: result?.data };
      }
    } else {
      return { status: "error", data: "Something Went Wrong..!" };
    }
  } catch (error) {
    console.log("GetWorkItemTypes ===========", error);
    return { status: "error", data: error };
  }
};

export const fetchDevOpsConfigById = (id: any) => {
  return new Promise((resolve, reject) => {
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_devopsconfigurations(${id})`,
      contentType: "application/json",
      success: function (data: any, textStatus: any, xhr: any) {
        console.log(
          "fetchDevOpsConfigById",
          data,
          "textStatus",
          textStatus,
          "xhr",
          xhr
        );
        resolve(data);
      },
      error: function (error: any, status: any, xhr: any) {
        console.log("error", error);
        reject(error);
      },
    });
  });
};

export const fetWorkItemsbyId = (id: any) => {
  return new Promise((resolve, reject) => {
    window.parent.webapi.safeAjax({
      type: "GET",
      url: `/_api/gyde_gyde365surveies(${id})`,
      contentType: "application/json",
      success: function (data: any, textStatus: any, xhr: any) {
        console.log(
          "fetchDevOpsConfigById",
          data,
          "textStatus",
          textStatus,
          "xhr",
          xhr
        );
        resolve({ type: "success", data: data });
      },
      error: function (error: any, status: any, xhr: any) {
        console.log("error", error);
        resolve({ type: "error", data: [] });
      },
    });
  });
};

export const fetchWorkItemTypesFromCRM = async () => {
  try {
    const result = await axios.get(
      "https://gydedesignstudiodev.powerappsportals.com/_api/gyde_workitemtypes"
    );
    console.log("get WorkItemTypes From CRM =========> ", result?.data);
    if (result?.status == 200) {
      return { status: "success", data: result?.data };
    } else {
      return { status: "error", data: "Something Went Wrong..!" };
    }
  } catch (error) {
    console.log(" Error get WorkItemTypes From CRM ===========", error);
    return { status: "error", data: error };
  }
};

export const saveWorkItemTypes = async (mappingData: any) => {
  try {
    const data = JSON.stringify({
      gyde_name: "Sample Config - RD",
    });
    const baseUrl = "~/_api/gyde_devopsconfigurations";
    //const response = post(`${baseUrl}`, data, { headers: {"contentType": "application/json",} });

    // Default options are marked with *
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Prefer: "odata.include-annotations=*",
      },
      body: JSON.stringify(data),
    });
    // parses JSON response into native JavaScript objects

    console.log("api response..", response);
    return response.status;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const createMappingFile = async (data: any, guid: any) => {
  try {
    return new Promise((resolve, rejects) => {
      const base64Data = encodeJSONToBase64(data);
      const byteArrayData = base64ToByteArray(base64Data);
      console.log("byteArrayData", guid, byteArrayData);

      window.parent.webapi.safeAjax({
        type: "PUT",
        url: `/_api/gyde_devopsconfigurations(${guid})/gyde_devopsmappings`,
        contentType: "application/octet-stream",
        data: byteArrayData,
        success: function (data: any, textStatus: any, xhr: any) {
          console.log("dataxhr", data, "textStatus", textStatus, "xhr", xhr);

          resolve({ type: "success" });
        },
        error: function (error: any, status: any, xhr: any) {
          console.log("error", error);
          resolve({ type: "error" });
        },
      });
    });
  } catch (error) {
    console.log(" Save Error", error);
    return { status: "error", data: error };
  }
};
