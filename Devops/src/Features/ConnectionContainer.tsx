import React, { useEffect, useState } from "react";
import { Button, notification, Radio, RadioChangeEvent, Spin } from "antd";
// import $ from 'jquery';
import TableComponent from "../Components/TableComponent";
import PopupComponent from "../Components/PopupComponent";
import ConnectionComponent from "../Components/ConnectionComponent";
import {
  exampleCRMData,
  exampleDevOpsData,
  SampleData,
  savedMappedData,
  workItemTypes,
} from "../Constants/Samples/sample";
import SampleModel from "../Components/SampleMode";
import { FetchCrmFields } from "../Api/crmApis";
import {
  fetchWorkItemTypesFromCRM,
  fetchWorkItemTypesFromDevops,
  fetchDevopsFeildsData,
  saveWorkItemTypes,
  createMappingFile,
  saveMappingData,
  saveDefaultMappingData,
  fetchFieldMapping,
  fetchDevOpsMappingField,
  fetchDefaultSetting,
  createDevConfigApi,
  fetchDevOpsConfigById,
  fetchDevopsConfig,
  fetWorkItemsbyId,
} from "../Api/devopsApis";
import { convertByteArrayToJson } from "../Helper/Helper";




declare global {
  interface Window {
    webapi: any;
    devopsWorkItemTypes:any;
    azureWorkItemTypeURL:any;
    devopsWorkItemFields:any;
    devopsWorkItemFieldURL:any;
  }
}


export default function ConnectionContainer() {
  const dataSource = [
    {
      key: "1",
      name: "Issue",
      gyde_name: "N/A",
      mapping: "Mapping",
      enable: false,
    }, // info: 'Additional info for John Doe',
    {
      key: "2",
      name: "Epic",
      gyde_name: "Epic",
      mapping: "Mapping",
      enable: true,
    }, // info: 'Additional info for Jane Smith'
    {
      key: "3",
      name: "Task",
      gyde_name: "Task",
      mapping: "Mapping",
      enable: true,
    }, //info: 'Additional info for Jhon Smith'
    {
      key: "4",
      name: "Test Case",
      gyde_name: "Test Case",
      mapping: "Mapping",
      enable: true,
    },
    {
      key: "5",
      name: "Test Plan",
      gyde_name: "Test Plan",
      mapping: "Mapping",
      enable: true,
    },
    {
      key: "6",
      name: "Test Suite",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
    {
      key: "7",
      name: "Shared Steps",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
    {
      key: "8",
      name: "Shared Parameter",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
    {
      key: "9",
      name: "Code Review Request",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
    {
      key: "10",
      name: "Code Review Response",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
    {
      key: "11",
      name: "Feedback Request",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
    {
      key: "12",
      name: "Feedback Response",
      gyde_name: "",
      mapping: "Mapping",
      enable: false,
    },
  ];
  const [dataArr, setDataArr] = useState<any>([]);
  const [isSavedCompleteFlag, setisSavedCompleteFlag] = useState<boolean>(false);
  const [dataFieldArr, setFieldDataArr] = useState<any>([]);
  const [devopsWorkItemTypes, setDevopsWorkItemTypes] = useState<any>([]);
  const [crmWorkItemTypes, setCrmWorkItemTypes] = useState<any>([]);
  const options: any = [...devopsWorkItemTypes]; //"N/A"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDataArr, setTaskDataArr]: any = useState([]);
  const [tableColumn, setColumns] = useState<any>([]);
  const [selectedWorkItem, setSelectedWorkItem] = useState<any>();
  const [devopsResult,setDevopsResult] = useState<any>();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [isMappedSaved,setIsMappedSaved] = useState<boolean>(false);
  const [configureSettings,setConfigureSettings] = useState<any>("configureMapping");
  const [savedFilteredData, setSavedFilteredData] : any = useState([]);
  const [mappedWorkItems, setMappedWorkItems] : any = useState([]);
  const [workitemTypesData, setWorkitemTypeData]  = useState<any>({
    source:'Work item type',devOps:'Work item type'});
  const [partnetType, setPartnerType] : any = useState("partner work item");
  const [title,SetTitle] :any = useState('Title')
  const [mappingType, setMappingType] : any = useState('');
  const [mappedField, setmMppedField] = useState<any>('');
  const [isEnablePopUp, setIsEnablePopUp] = useState<boolean>(false);

  
  const [defaultGuId,setDefaultGuId] :any = useState()
  const [guId,setGuId] :any = useState()
  const url = new URL(window.location.href);

  // Get the URLSearchParams object from the URL
  const queryParameters = url.searchParams;
  console.log("queryParameters",queryParameters);
  
  const cusId = queryParameters.get("cusid")
  const cbsId = queryParameters.get("cbsid")
  const _pId = queryParameters.get("pid")
  const _itemId = queryParameters.get("id")
  const _navigateUrl = queryParameters.get("returnto")
  console.log("cbs11",cbsId,cusId)
  
  const dataSource1 = crmWorkItemTypes?.map((item: any, num: number) => {
    // console.log("devopsWorkItemTypes[num] :", devopsWorkItemTypes[num]);
    // console.log("item?.gyde_name[num] :", item?.gyde_name);
    // console.log(
    //   "logic build :",
    //   devopsWorkItemTypes?.find((res: any) => res == "Epic")
    // );
    return {
      key: num,
      name: item?.gyde_name,
      gyde_name: devopsWorkItemTypes?.find(
        (res: any) => res == item?.gyde_name
      ),
      mapping: "Mapping",
      enable:
        devopsWorkItemTypes?.find((res: any) => res == item?.gyde_name) ==
        item?.gyde_name
          ? true
          : false,
    };
  });

  const showModal = () => {
    console.log("shooo");
    const data: string | null = localStorage.getItem("items");
    const authData: any = data ? JSON.parse(data) : null;
    apiRequest(authData);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedWorkItem({});
  };

  const workItemColumns = [
    {
      title: "SOURCE WORK ITEM TYPE",
      dataIndex: "name",
      key: "name",
      disabled: true,
    },
    {
      title: "DEVOPS TARGET WORK ITEM TYPE",
      dataIndex: "gyde_name",
      key: "country",
      dropdownOptions: options,
    },
    {
      title: "FIELD MAPPINGS",
      dataIndex: "mapping",
      key: "mapping",
      buttonField: true,
    }, // accordionContent: 'Additional info'
  ];

  useEffect(() => {
    //tempAPI();
    const data: string | null = localStorage.getItem("items");
    const authData: any = data ? JSON.parse(data) : null;
    console.log("authData... parse", authData);
    apiRequest(authData);
  }, [selectedWorkItem]);

  const apiRequest = async (authData: any) => {
    const authObj = {
      organizationUri: authData?.organizationUri,
      personalAccessToken: authData?.personalAccessToken,
      projectName: authData?.projectName,
      workItemType: selectedWorkItem?.name,
    };
    let devopsWorkItemFieldURL =  window?.parent?.devopsWorkItemFieldURL;
    let devopsWorkItemFields =  window?.parent?.devopsWorkItemFields
   
    
    if (selectedWorkItem?.name != undefined && selectedWorkItem?.name != null) {
      console.log("ff1",devopsWorkItemFieldURL);
      console.log("fc",devopsWorkItemFields);
      
      const devopsData = await fetchDevopsFeildsData(authObj,devopsWorkItemFieldURL);
      console.log("apiDara,", devopsData, selectedWorkItem);
     // const crmData = await FetchCrmFields();
      let sameDropdownFeild: any = [];
      if (devopsData.status === "success") {
       // console.log("crm", crmData);
       const crmData = JSON.parse(devopsWorkItemFields)
       console.log("CCCW",crmData);
       
        let tableData = crmData?.map((crm: any, key: any) => {
          let dropdownArr: any = devopsData.data?.Value
            .filter(
              (devOps: any) =>
                ((crm.AttributeType === "Memo" ||
                  crm.AttributeType === "String" ||
                  crm.AttributeType === "Lookup") &&
                  (devOps.attributeType === "String" ||
                    devOps.attributeType === "PlainText" ||
                    devOps.attributeType === "TreePath" ||
                    devOps.attributeType === "StringTreePath" ||
                    devOps.attributeType === "Identity")) ||
                (crm.AttributeType === "Memo" &&
                  (devOps.attributeType === "Html" ||
                    devOps.attributeType === "History" ||
                    devOps.attributeType === "HistoryHtml")) ||
                (crm.AttributeType === "String" &&
                  devOps.attributeType === "DateTime") ||
                (crm.AttributeType === "Decimal" &&
                  (devOps.attributeType === "Integer" ||
                    devOps.attributeType === "Double")) ||
                (crm.AttributeType === "Picklist" &&
                  (devOps.attributeType === "PicklistInteger" ||
                    devOps.attributeType === "PicklistString" ||
                    devOps.attributeType === "DoublePicklist")) ||
                ((crm.AttributeType === "String" ||
                  crm.AttributeType === "Lookup") &&
                  (devOps.attributeType = "defaultGuId")) ||
                (crm.AttributeType === "Boolean" &&
                  devOps.attributeType === "Boolean")
            )
            .map((_data: any, key: any) => {
              if (
                crm.SchemaName === _data.fieldName &&
                _data.allowedValues?.length &&
                crm.Options?.length
              )
                sameDropdownFeild.push({
                  mappingName: _data.fieldName,
                  defaultOptionList: [
                    {
                      crmOption: crm.Options,
                      devOpsOption: _data.allowedValues,
                    },
                  ],
                });
              return {
                key: key,
                dropdownValue: _data.fieldName,
                option:
                  _data.allowedValues?.length && crm.Options?.length
                    ? [
                        {
                          crmOption: crm.Options,
                          devOpsOption: _data.allowedValues,
                        },
                      ]
                    : [],
                isPickList:
                  _data.allowedValues?.length && crm.Options?.length
                    ? true
                    : false,
              };
            });

          let isOptionList = sameDropdownFeild.some(
            (f: any) => f.mappingName === crm.SchemaName
          );
          return {
            key: key,
            sourceWorkItem: crm.SchemaName,
            dropdown: [...dropdownArr],
            mapping: "",
            enable: isOptionList ? true : false,
            defaultOptionList: [],
            isText: false,
            isSelected: isOptionList ? true : false,
            isPickListComplete:false,
            isSavedType: "default"
          };

          // defaultOptionList: isOptionList
          // ? sameDropdownFeild.find((f: any) => f.defaultOptionList)
          // : [],
        });
        let currentLength = tableData.length + 1;
        let _tableData = [
          {
            key: currentLength+1,
            sourceWorkItem: `${title}`,
            devopsWorkItem: `${title}`,
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
          },
          {
            key: currentLength+2,
            sourceWorkItem: `${workitemTypesData.source}`,
            devopsWorkItem: `${workitemTypesData.devOps}`,
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
          },
          {
            key: currentLength+3,
            sourceWorkItem:`${partnetType}`,
            devopsWorkItem: `${partnetType}`,
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
          },
          ...tableData,
        ];
        //console.log("devopsData", _tableData);
    // setTaskDataArr(_tableData);
 
       // default Fetch 
      //  console.log("_p");
       
          let updatedSavedData :any= await fetchFieldMappingData(mappedField)
          let updatedDefaultData:any = await fetchDefaultSettingData(_pId);

          console.log("updated1111",updatedSavedData,updatedDefaultData);
           if(updatedSavedData?.length){
            console.log("sa111");
            
            setTaskDataArr(updatedSavedData[0]["value"]);
           }
          else if(updatedDefaultData?.length){
            setTaskDataArr(updatedDefaultData);
            console.log("outter",updatedDefaultData);

          }else {
            console.log("innner",_tableData);
            
            setTaskDataArr(_tableData);

          }
         //fetchDefaultSettingData(_pId);

        // if(_savedObj){

        // const _savedTableData:any =  _savedObj.filter(f =>  _tableData.filter((_savedData:any)=>{
        //     f.sourceWorkItem === _savedData.sourceWorkItem

        //   }))

        //   console.log("*****_savedTableData",_savedTableData);
          
        //   setTaskDataArr(_savedTableData);
        // }else {
        //   setTaskDataArr(_tableData);
        // }
       
        const columns = [
          {
            title: "SOURCE WORK ITEM FIELD",
            dataIndex: "sourceWorkItem",
            key: "sourceWorkItem",
          },
          {
            title: "DEVOPS TARGET WORK ITEM FIELD",
            dataIndex: "devopsWorkItem",
            key: "devopsWorkItem",
            dropdownOptions: options,
          },
          {
            title: "FIELD MAPPINGS",
            dataIndex: "mapping",
            key: "mapping",
            buttonField: true,
          }, // accordionContent: 'Additional info'
        ];
        setColumns(columns);
        setIsModalOpen(true);
        setIsLoading(false);
      } else if (devopsData.status === "error") {
        // notification.error({message:devopsData.data,type:'error'})
        setIsLoading(false);
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    isModalOpen && taskDataArr.length
      ? setIsLoading(true)
      : setIsLoading(false);
  }, [isModalOpen, taskDataArr]);
  // console.log(" devopsWorkItemTypes :", devopsWorkItemTypes);
  // console.log("dataSource",dataSource);
  useEffect(() => {
    fetchWorkItemTypesFromCRM().then((result: any) => {
      console.log("crm work items :", result, result?.data?.value);
      setCrmWorkItemTypes(result?.data?.value);
    });
  }, []);

  useEffect(()=>{
    console.log("cbs******",cbsId,cusId,_pId);

    findDevopsConfigGuId(cusId,cbsId)

   //getWorkitemNames(_itemId)
    // window.parent.webapi.safeAjax({
    //   type: "GET",
    //   url: "/_api/gyde_workitemtypes",
    //   contentType: "application/json",
    //   success: function (res:any, status:any, xhr:any) {
    //   console.log("all fetch",res);
    //   },
    //   error: function(error:any, status:any, xhr:any) {
    //   console.log('error', error);
    //   }
    //   });

  },[devopsWorkItemTypes])

  const getWorkitemNames =  async(_itemId:any)=> {
     console.log("_itemId",_itemId);
     
    let result =  await fetWorkItemsbyId(_itemId)

    console.log("result",result);
    
  }

  const fetchFieldMappingData = async(itemKey:any) => {
    
    if(guId){
      let _result:any = await fetchFieldMapping(guId)
    if(_result.type == "success"){
      let JsonData = convertByteArrayToJson(_result.data)
      console.log("fieldMAppQ",JsonData);
    console.log("fieldMAppQ",itemKey);
    
      const updatedData = JsonData.filter((item: any) => {
        console.log("12",item.key,itemKey);
        
         return item.key === itemKey
        
      });
      console.log("upppp",updatedData);
      
      return updatedData;
    }else if(_result.type == "error")
    return [];
    
    }else {
      return [];
    }
  }


  const  findDevopsConfigGuId = async(cusId:any,bId:any)=> {

   let _result:any =   await fetchDevopsConfig(cusId,bId)
console.log("devOpsCOnfig",_result);

   if(_result.type === 'updateConfig'){
      //filter((element:any)=>crmWorkItemTypesData?.includes(element?.gyde_name))
       setGuId(_result.id)
       let result :any = await fetchDevOpsMappingField(_result.id)
      
        let JsonMappedData = convertByteArrayToJson(result.data)
        console.log("JsonDataFirst",JsonMappedData);

        const crmWorkItemTypesData = crmWorkItemTypes?.map((item:any)=>item?.gyde_name);
        const comparedData = JsonMappedData?.map((data:any)=> {
          console.log("options: saved data", options?.find((item:any)=> item), data?.gyde_name)
          return {
            key: data?.key,
            name:data?.name,
            gyde_name:data?.gyde_name == "N/A" ? data?.gyde_name : options?.find((item:any)=> item == data?.gyde_name),
            mapping:data?.mapping,
            enable: options?.find((item:any)=> item == data?.gyde_name) ? true : false
          }
        });
        setSavedFilteredData(comparedData);
        console.log("comparedData...!@#", comparedData);
        

   }
   else {
    if(_result.type === 'createDefault'){
      setGuId("")
      createDevConfig('newRecord')
  }
   }
  }

//CUSID ,BID if default = PID
  useEffect(()=>{


    
    if(isModalOpen){
    // fetchDefaultSettingData(_pId);
    }
  },[isModalOpen])

  const  fetchDefaultSettingData = async(pid:any) => {
    console.log("pID",pid);
    
       let result:any = await fetchDefaultSetting(pid);
       console.log("fetchSEtting",result);
       
       if(result.type=== 'updateDefault'){
          setDefaultGuId(result.id)
         let _result:any = await fetchFieldMapping(result.id)
         console.log("RRRDF",_result);
         
         if(_result?.type === "success"){
          let JsonData = convertByteArrayToJson(_result.data)
          console.log("defaultQQQ",JsonData);
     const updatedData = JsonData.filter((item: any) => {
       console.log("OTem,",item);
       if (item.key === mappedField) {
         return  { ...item, ["value"]:dataSource,};
       }
     });
 
      console.log("updated",updatedData.length);
      if( updatedData.length){
       return updatedData[0]["value"]
      }else{
              return [];
      }  
    
         }
         else{
          return [];
  }  
     
       }else if (result.type=== 'createDefault'){
        createDevConfig('default')
        return [];
       }
  }

  useEffect(()=>{

   
  let devopsWorkItemTypes =  window?.parent?.devopsWorkItemTypes
  let azureWorkItemTypeURL =  window?.parent?.azureWorkItemTypeURL
  let devopsWorkItemFields =  window?.parent?.devopsWorkItemFields
  let devopsWorkItemFieldURL =  window?.parent?.devopsWorkItemFieldURL
console.log("devopsWorkItemTypes*",devopsWorkItemTypes);
console.log("azureWorkItemTypeURL*",azureWorkItemTypeURL);
console.log("devopsWorkItemFields*",devopsWorkItemFields);
console.log("devopsWorkItemFieldURL*",devopsWorkItemFieldURL);

  },[])

  
   useEffect(()=>{
    // when saved data retrieved this will used...
    // const crmWorkItemTypesData = crmWorkItemTypes?.map((item:any)=>item?.gyde_name);
    // const comparedData = savedMappedData?.filter((element:any)=>crmWorkItemTypesData?.includes(element?.gyde_name))?.map((data:any)=> {
    //   console.log("options: saved data", options?.find((item:any)=> item), data?.gyde_name)
    //   return {
    //     key: data?.key,
    //     name:data?.name,
    //     gyde_name:data?.gyde_name == "N/A" ? data?.gyde_name : options?.find((item:any)=> item == data?.gyde_name),
    //     mapping:data?.mapping,
    //     enable: options?.find((item:any)=> item == data?.gyde_name) ? true : false
    //   }
    // });
    // setSavedFilteredData(comparedData);
    // console.log("comparedData...!@#", comparedData);
  },[devopsWorkItemTypes])

  const savePopupModelData = async (buttonType:any) => {
    console.log("buttonType",buttonType,defaultGuId);
    
    console.log("SavedMainData",dataFieldArr,taskDataArr);
    if(dataFieldArr.length){
        console.log("API SAved");
      let _isSelected =     dataFieldArr.every((field:any)=> field.isSelected)
      setisSavedCompleteFlag(_isSelected)
      console.log("_isSelected",_isSelected);

      if(buttonType === 'Save'){
        if(guId){
          let _result:any =await  fetchFieldMapping(guId)
        let updatedData = dataFieldArr.map((item:any)=> {
          return  { ...item, ["isSavedType"]:"saved",};
        })
          commonFieldMappingSave(guId,_result,mappedField,updatedData)
        }else {
          notification.error({message:"GUID Not found"})
        }
      
      }else if (buttonType === 'Default' ){
        
        if(defaultGuId){

          let _result:any =await  fetchFieldMapping(defaultGuId)
          let updatedData = dataFieldArr.map((item:any)=> {
            return  { ...item, ["isSavedType"]:"setasDefault",};
          })
          saveDefaultMappingData(defaultGuId)
          commonFieldMappingSave(defaultGuId,_result,mappedField,updatedData)
          
        }else {
          notification.error({message:"GUID Not found"})
        }
        
      }
    //  setIsModalOpen(false);
    }else if (taskDataArr.length){ 
      let _isSelected =     taskDataArr.every((field:any)=> field.isSelected)
      setisSavedCompleteFlag(_isSelected) 
      if(buttonType === 'Save'){
        if(guId){
          let _result =await  fetchFieldMapping(guId)
          let updatedData = taskDataArr.map((item:any)=> {
            return  { ...item, ["isSavedType"]:"saved",};
          })
        commonFieldMappingSave(guId,_result,mappedField,updatedData)
        }else {
          notification.error({message:"GUID Not found"})
        }
        
       
      }else if (buttonType === 'Default' ){
        if(defaultGuId){
          let _result =await  fetchFieldMapping(defaultGuId)
          let updatedData = taskDataArr.map((item:any)=> {
            return  { ...item, ["isSavedType"]:"setasDefault",};
          })
          saveDefaultMappingData(defaultGuId)
        commonFieldMappingSave(defaultGuId,_result,mappedField,updatedData)
        }else {
          notification.error({message:"GUID Not found"})
        }
       
      }

      console.log("default");      
  }
  }
  const handleConfigure = ({ target: { value } }: RadioChangeEvent) => {
    setConfigureSettings(value);
  };

  const handleMappingItemSave = async () => {
  //   console.log("mapped work items....",mappedWorkItems);
  // let _result =  saveWorkItemTypes(mappedWorkItems);
  // console.log("result",_result);
  if(guId){
    let response:any = await  createMappingFile(mappedWorkItems,guId); 
   if(response.type === 'success'){
    setIsMappedSaved(true)
   }
   else if(response.type === 'error'){
    setIsMappedSaved(false)
   }
  }
  else {
    createDevConfig("newRecord",true);
  }

console.log("defaultGuId",defaultGuId); 
  }
console.log("call back",mappedWorkItems);


const createDevConfig = async(recordType:any ="newRecord",isCreateMapping:boolean =false)=> {

  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  
  console.log("cbs******",cbsId,cusId);
  
  var record :any= {};
  record.gyde_name = `react config ${recordType}${hours}${minutes}${seconds}`; 
  record["gyde_customerorpartner@odata.bind"] = recordType ==='default' ? `/accounts(${_pId})` :  `/accounts(${cusId})`// Lookup
  record["gyde_customerbusinesssurvey@odata.bind"] = `/gyde_customerbusinesssurveies(${cbsId})`; // Lookup
  //add  name default true;
  console.log("record1",record);
 let newId = await createDevConfigApi(record)
 console.log("newIDDEV",newId);
 
 if(newId){
  console.log("recordType",recordType);
  
  recordType ==='default' && setDefaultGuId(newId) ,saveDefaultMappingData(newId)
  recordType ==='newRecord' &&  setGuId(newId);


  if(isCreateMapping){
   let response:any = await createMappingFile(mappedWorkItems,newId); 

   if(response.type === 'success'){
    setIsMappedSaved(true)
   }
   else if(response.type === 'error'){
    setIsMappedSaved(false)
   }
  }

  
  console.log("newId",newId);
 }
  // window.parent.webapi.safeAjax({
  //     type: "POST",
  //     contentType: "application/json",
  //     url: "/_api/gyde_devopsconfigurations",
  //     data: JSON.stringify(record),
  //     success: function (data:any, textStatus:any, xhr:any) {
  //         var newId = xhr.getResponseHeader("entityid");
          // setDefaultGuId(newId)
          // recordType ==='newRecord' &&  createMappingFile(mappedWorkItems,newId);
          // console.log("newId",newId);
  //     },
  //     error: function (xhr:any, textStatus:any, errorThrown:any) {
  //         console.log("hr",xhr);
  //     }
  // });
}
// var contactId = `${<p>{'request.params.id'}</p>}`;
// console.log("liquid code..", contactId)


const commonFieldMappingSave =(guId:any,_result:any,itemKey:any,dataSource:any) => {
console.log("result101",guId,":",_result,":",itemKey,dataSource);

  if(_result.type === 'success'){
    let JsonData = convertByteArrayToJson(_result.data)
    const updatedData = JsonData.map((item: any) => {
      console.log("OTem,",item);
      if (item.key === itemKey) {
        return  { ...item, ["value"]:dataSource,};
      }
      return item;
      
    });
    console.log("xxJ",JsonData);
    console.log("fetchFieldMapping",_result);
    console.log("updated102",updatedData);
    if (!updatedData.some((item:any) => item.key === itemKey)) {
      updatedData.push({ key: itemKey, value: dataSource });
    }
    console.log("updated103",updatedData);
   // let _structureData = [{key:itemKey,value:updatedData}]
    saveMappingData(updatedData,guId)
  }
 else if(_result.type === 'error'){
  let _structureData = [{key:itemKey,value:dataSource}]
  saveMappingData(_structureData,guId)
 }
}

  return (
    <div className="devops-container">
      <Spin spinning={isLoading}>
        <h1 className="title">DevOps Work Items</h1>
        <h3 className="sub-title">
          <span>Connection Details</span>
          <span>
            {" "}
            <h5 className="sub-title2"> Survey Name - Business Name</h5>
          </span>
        </h3>
        <ConnectionComponent
          setWorkItemData={(res: any) => {
            setDevopsWorkItemTypes(res?.data?.Value), setDevopsResult(res);
          }}
        />
 <div className="text-left mb-20">
        {isMappedSaved && <Radio.Group
          options={[
            { label: "DevOps Generator", value: "devopsGenerator" },
            { label: "Configure Mapping", value: "configureMapping" },
          ]}
          onChange={handleConfigure}
          value={configureSettings}
          optionType="button"
          buttonStyle="solid"
        />}
        </div>
        {devopsResult?.status && (
          <>
            <h3 className="sub-title">Mapping - Work Item Types</h3>
            <TableComponent
              dataSource={savedFilteredData?.length  ? savedFilteredData :dataSource}
              columns={workItemColumns}
              onMapping={() => {}}
              size="small"
              scroll={{ y: 300 }}
              isModelopen={false}
              modelAction={showModal}
              className={
                configureSettings == "devopsGenerator" ? "disable-table" : ""
              }
              setDropDownValue={(data: any) => setSelectedWorkItem(data)}
              

              // rowClassName={
              //   configureSettings == "devopsGenerator" ? "disable-table" : ""
              // }
              // disabled={configureSettings == "devopsGenerator" ? true : false}
              saveMappingItems={(data:any)=>setMappedWorkItems(data)}
              setMappingType={setmMppedField}
              isPicklistModel={false}
              setWorkitemTypeData={setWorkitemTypeData}
              
            />

            <span>
              <Button
                className="cancel-btn mr-10"
                type="primary"
                htmlType="button"
               
                onClick={() => {
                   console.log("_navigateUrl",_navigateUrl);
                   
                  window.location.href = `/${_navigateUrl}`
                  
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="button" onClick={handleMappingItemSave}>
                Save
              </Button>
              {/* <div>{`% assign deactivateCustomerBusinessSurveyFlowUrl = settings["DeactivateCustomerBusinessSurveyFlowURL"]%`}
              <input type="hidden" id="deactivateCustomerBusinessSurveyFlowUrl" value="{{deactivateCustomerBusinessSurveyFlowUrl}}" /></div> */}
            </span>


          </>
        )}
        {/* <TableComponent dataSource={dataSource} columns={columns} /> */}
        {isModalOpen && (
          <PopupComponent
            visible={isModalOpen}
            onOk={handleOk}
            onClose={handleCancel}
            buttons={[
              { title: "Cancel", onClickHandler: "" },
              { title: "Set as Default", onClickHandler: savePopupModelData },
              { title: "Save", onClickHandler: savePopupModelData },
            ]}
            Content={
              <div>
                <TableComponent
                  dataSource={taskDataArr}
                  columns={tableColumn}
                  onMapping={() => {}}
                  size="small"
                  scroll={{ y: 300 }}
                  modelAction={showModal}
                  isModelopen={isModalOpen}
                  setDataArr={setDataArr}
                  setFieldDataArr={setFieldDataArr}
                  isPicklistModel={false}
                  currentPickListData ={dataArr}
                  setMappingType={setmMppedField}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <Button
                   className="ant-btn-default cancel-btn"
                    onClick={(e) => {
                      /* Handle button click */
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ant-btn-primary"
                    onClick={(e) => {
                      savePopupModelData("Default")
                      /* Handle button click */
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Set as Default
                  </Button>
                  <Button
                    className="ant-btn-primary"
                    onClick={()=>{
                      savePopupModelData("Save")
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            }
          />
        )}
      </Spin>
    </div>
  );
}
