import axios from "axios";

const tempArr = [
  {
      "fieldName": "Activated By",
      "attributeType": "String",
      "fieldReferenceName": "Microsoft.VSTS.Common.ActivatedBy",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Activated Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "Microsoft.VSTS.Common.ActivatedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Area ID",
      "attributeType": "Integer",
      "fieldReferenceName": "System.AreaId",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Area Path",
      "attributeType": "TreePath",
      "fieldReferenceName": "System.AreaPath",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "The area of the product with which this epic is associated",
      "hasPicklist": false
  },
  {
      "fieldName": "Assigned To",
      "attributeType": "String",
      "fieldReferenceName": "System.AssignedTo",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "The person currently owning the epic",
      "hasPicklist": false
  },
  {
      "fieldName": "Attached File Count",
      "attributeType": "Integer",
      "fieldReferenceName": "System.AttachedFileCount",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Authorized As",
      "attributeType": "String",
      "fieldReferenceName": "System.AuthorizedAs",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Authorized Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "System.AuthorizedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Board Column",
      "attributeType": "String",
      "fieldReferenceName": "System.BoardColumn",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Board Column Done",
      "attributeType": "Boolean",
      "fieldReferenceName": "System.BoardColumnDone",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Board Lane",
      "attributeType": "String",
      "fieldReferenceName": "System.BoardLane",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Changed By",
      "attributeType": "String",
      "fieldReferenceName": "System.ChangedBy",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Changed Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "System.ChangedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Closed By",
      "attributeType": "String",
      "fieldReferenceName": "Microsoft.VSTS.Common.ClosedBy",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Closed Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "Microsoft.VSTS.Common.ClosedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Comment Count",
      "attributeType": "Integer",
      "fieldReferenceName": "System.CommentCount",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Created By",
      "attributeType": "String",
      "fieldReferenceName": "System.CreatedBy",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Created Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "System.CreatedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Description",
      "attributeType": "Html",
      "fieldReferenceName": "System.Description",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "Description or acceptance criteria for this epic to be considered complete",
      "hasPicklist": false
  },
  {
      "fieldName": "External Link Count",
      "attributeType": "Integer",
      "fieldReferenceName": "System.ExternalLinkCount",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "History",
      "attributeType": "History",
      "fieldReferenceName": "System.History",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Hyperlink Count",
      "attributeType": "Integer",
      "fieldReferenceName": "System.HyperLinkCount",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "ID",
      "attributeType": "Integer",
      "fieldReferenceName": "System.Id",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Iteration ID",
      "attributeType": "Integer",
      "fieldReferenceName": "System.IterationId",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Iteration Path",
      "attributeType": "TreePath",
      "fieldReferenceName": "System.IterationPath",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "The sprint within which this epic will be implemented",
      "hasPicklist": false
  },
  {
      "fieldName": "Node Name",
      "attributeType": "String",
      "fieldReferenceName": "System.NodeName",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Parent",
      "attributeType": "Integer",
      "fieldReferenceName": "System.Parent",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Priority",
      "attributeType": "Integer",
      "fieldReferenceName": "Microsoft.VSTS.Common.Priority",
      "allowedValues": [
          "1",
          "2",
          "3",
          "4"
      ],
      "defaultValue": "2",
      "helpText": "Level of importance. 1 = High Priority, 4 = Low Priority.",
      "hasPicklist": true
  },
  {
      "fieldName": "Reason",
      "attributeType": "String",
      "fieldReferenceName": "System.Reason",
      "allowedValues": [
          "Completed",
          "Cut",
          "Deferred",
          "Obsolete",
          "Moved to backlog",
          "Started",
          "Reactivated",
          "Added to backlog"
      ],
      "defaultValue": null,
      "helpText": "The reason why the epic is in its current state",
      "hasPicklist": true
  },
  {
      "fieldName": "Related Link Count",
      "attributeType": "Integer",
      "fieldReferenceName": "System.RelatedLinkCount",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Remote Link Count",
      "attributeType": "Integer",
      "fieldReferenceName": "System.RemoteLinkCount",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Resolved By",
      "attributeType": "String",
      "fieldReferenceName": "Microsoft.VSTS.Common.ResolvedBy",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Resolved Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "Microsoft.VSTS.Common.ResolvedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Rev",
      "attributeType": "Integer",
      "fieldReferenceName": "System.Rev",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Revised Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "System.RevisedDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Stack Rank",
      "attributeType": "Double",
      "fieldReferenceName": "Microsoft.VSTS.Common.StackRank",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Start Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "Microsoft.VSTS.Scheduling.StartDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "The date to start the epic",
      "hasPicklist": false
  },
  {
      "fieldName": "State",
      "attributeType": "String",
      "fieldReferenceName": "System.State",
      "allowedValues": [
          "Doing",
          "Done",
          "To Do"
      ],
      "defaultValue": "To Do",
      "helpText": "To Do = not started yet; Doing = work in progress; Done = work is complete",
      "hasPicklist": true
  },
  {
      "fieldName": "State Change Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "Microsoft.VSTS.Common.StateChangeDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Tags",
      "attributeType": "PlainText",
      "fieldReferenceName": "System.Tags",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Target Date",
      "attributeType": "DateTime",
      "fieldReferenceName": "Microsoft.VSTS.Scheduling.TargetDate",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "The target date for completing the epic",
      "hasPicklist": false
  },
  {
      "fieldName": "Team Project",
      "attributeType": "String",
      "fieldReferenceName": "System.TeamProject",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Title",
      "attributeType": "String",
      "fieldReferenceName": "System.Title",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": "What the user will be able to do when this is implemented",
      "hasPicklist": false
  },
  {
      "fieldName": "Watermark",
      "attributeType": "Integer",
      "fieldReferenceName": "System.Watermark",
      "allowedValues": [],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": false
  },
  {
      "fieldName": "Work Item Type",
      "attributeType": "String",
      "fieldReferenceName": "System.WorkItemType",
      "allowedValues": [
          "Code Review Request",
          "Code Review Response",
          "Epic",
          "Feedback Request",
          "Feedback Response",
          "Issue",
          "Shared Parameter",
          "Shared Steps",
          "Task",
          "Test Case",
          "Test Plan",
          "Test Suite"
      ],
      "defaultValue": null,
      "helpText": null,
      "hasPicklist": true
  }
]
export const generateDevops = async (_data?: any, isChild?:boolean) => {


    try{
        console.count("callibggggg")
        const response = await axios.post('https://seerv2sample2.azurewebsites.net/api/CreateWorkItem?code=0SSvW5ffaDcPDrMKRZIWAQLgsRkYtZM0exwE8i1Cg2UWAzFuG76JIw==',_data);
        console.log('Parent node saved:', response);
        return response;
    }catch(error:any){

        console.log("eerrr",error);
        
    }
//   try {
//       console.log("parentNode...", value );
//       const saveParentObj = {
//         "organizationUri": "https://dev.azure.com/SEERTEST2",
//         "personalAccessToken": "ycccdubmt4qctkjogs4pqljhi5k5vlwlwo4csuqqs7jb6m2taheq",
//         "projectName": "TestMyAgile",
//         "workItemType":value?.rest?.workitemtype,
//         "fieldData":Object?.keys(value?.rest)?.map((attributes:any)=>{
//          return { 
//           name : attributes,
//           value:value?.rest[attributes],
//           referencePath:"" ,
//         }
//         })
//     };

//       const saveChildObj = {
//         "organizationUri": "https://dev.azure.com/SEERTEST2",
//         "personalAccessToken": "ycccdubmt4qctkjogs4pqljhi5k5vlwlwo4csuqqs7jb6m2taheq",
//         "projectName": "TestMyAgile",
//         "workItemType":value?.rest?.workitemtype,
//         "fieldData":Object?.keys(value?.rest)?.map((attributes:any)=>{
//             return { 
//              name : attributes,
//              value:value?.rest[attributes],
//              referencePath:"" ,
//            }
//            }),
//            "parent":"",
//       };
//     //https://seerv2sample2.azurewebsites.net/api/CreateWorkItem?code=0SSvW5ffaDcPDrMKRZIWAQLgsRkYtZM0exwE8i1Cg2UWAzFuG76JIw==
//       // Make an API call to save the parent node data here
//       const response = await axios.post('https://seerv2sample2.azurewebsites.net/api/CreateWorkItem?code=0SSvW5ffaDcPDrMKRZIWAQLgsRkYtZM0exwE8i1Cg2UWAzFuG76JIw==',isChild ? saveChildObj : saveParentObj);
//       console.log('Parent node saved:', response);
//       // Get the ID of the saved parent node
//       const parentId = response.data.id;
//       // Update the parent node's key with the ID
//       value.key = parentId;
//       console.log("saved as ",isChild ? "child"+ saveChildObj : "parent" + saveParentObj );

//       // Recursively save children nodes
//       for (const childNode of value.children) {
//         console.log("childNode", childNode);
//         if(value?.children?.length> 0){
//           // check it has children if so need to save as parent
//           await generateDevops(childNode, false);
//         }else{
//           await generateDevops(childNode, true);
//         }
//       }
//   } catch (error) {
//     console.log("Save  WorkItemTypes ===========", error);
//     return { status: "error", data: error };
//   }
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