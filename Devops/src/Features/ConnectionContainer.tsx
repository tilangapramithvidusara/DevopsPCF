import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  notification,
  Radio,
  RadioChangeEvent,
  Select,
  Spin,
} from "antd";
// import $ from 'jquery';
import { Trans, useTranslation } from "react-i18next";
import TableComponent from "../Components/TableComponent";
import PopupComponent from "../Components/PopupComponent";
import ConnectionComponent from "../Components/ConnectionComponent";
import {
  fetchDevopsFeildsData,
  createMappingFile,
  saveMappingData,
  saveDefaultMappingData,
  fetchFieldMapping,
  fetchDevOpsMappingField,
  fetchDefaultSetting,
  createDevConfigApi,
  fetchDevopsConfig,
  fetWorkItemsbyId,
  saveConnectiondata,
  fetchDevopsConnectionDetails,
  getDevopsWorkItemType,
} from "../Api/devopsApis";
import DevopsTree from "../DevopsTree/DevopsTree";
import axios from "axios";
import { languageTranslator } from "../language/languagetranslator";

declare global {
  interface Window {
    webapi: any;
    devopsWorkItemTypes: any;
    azureWorkItemTypeURL: any;
    devopsWorkItemFields: any;
    devopsWorkItemFieldURL: any;
    DevopsCreateWorkItem: any;
    userId: any;
  }
}

const initialState = {
  DevOpsConfiguration_SaveButton: "Save",
  DevOpsConfiguration_SetAsDefaultButton: "Set as Default",
  DevOpsConfiguration_CancelButton: "Cancel",
  DevOpsConfiguration_NextButton: "Next",
  DevOpsConfiguration_DevopsWorkitemTitle: "DevOps Work Items",
  DevOpsConfiguration_ConnectionDetailsTitle: "Connection Details",
  DevOpsConfiguration_MappingWorkItemTypeTitle: "Mapping - Work Item Types",
  DevOpsConfiguration_OrganizationUrlTitle: "Organization URL",
  DevOpsConfiguration_DevOpsProjectTitle: "DevOps Project",
  DevOpsConfiguration_AuthorizationTokenTitle: "Authorization Token",
  DevOpsConfiguration_ConnectButton: "Connect",
  DevOpsConfiguration_FieldMappingTitle: "Field Mapping",
  DevOpsConfiguration_WorkItemFieldMappingTitle: "Work Item Field Mapping",
  DevOpsTree_MigrateTitle: "Migrate to DevOps",
  DevOpsTree_ShowNewWorkItemsTitle: "Show new work items",
  DevOpsTree_ApplyBtn: "Apply",
  DevOpsTree_CollapseBtn: "Collapse All",
  DevOpsTree_ExpandBtn: " Expand All",
  DevOpsTree_workItemTitle: "DevOps Work Item Summary",
  DevOpsTree_BackBTN: "Back",
};

function stateReducer(state: any, action: any) {
  switch (action.type) {
    case "DevOpsConfiguration_SaveButton":
      return { ...state, DevOpsConfiguration_SaveButton: action.value };
    case "DevOpsConfiguration_SetAsDefaultButton":
      return { ...state, DevOpsConfiguration_SetAsDefaultButton: action.value };
    case "DevOpsConfiguration_CancelButton":
      return { ...state, DevOpsConfiguration_CancelButton: action.value };
    case "DevOpsConfiguration_NextButton":
      return { ...state, DevOpsConfiguration_NextButton: action.value };
    case "DevOpsConfiguration_DevopsWorkitemTitle":
      return {
        ...state,
        DevOpsConfiguration_DevopsWorkitemTitle: action.value,
      };
    case "DevOpsConfiguration_ConnectionDetailsTitle":
      return {
        ...state,
        DevOpsConfiguration_ConnectionDetailsTitle: action.value,
      };
    case "DevOpsConfiguration_MappingWorkItemTypeTitle":
      return {
        ...state,
        DevOpsConfiguration_MappingWorkItemTypeTitle: action.value,
      };
    case "DevOpsConfiguration_OrganizationUrlTitle":
      return {
        ...state,
        DevOpsConfiguration_OrganizationUrlTitle: action.value,
      };
    case "DevOpsConfiguration_DevOpsProjectTitle":
      return { ...state, DevOpsConfiguration_DevOpsProjectTitle: action.value };
    case "DevOpsConfiguration_AuthorizationTokenTitle":
      return {
        ...state,
        DevOpsConfiguration_AuthorizationTokenTitle: action.value,
      };
    case "DevOpsConfiguration_ConnectButton":
      return { ...state, DevOpsConfiguration_ConnectButton: action.value };
    case "DevOpsConfiguration_FieldMappingTitle":
      return { ...state, DevOpsConfiguration_FieldMappingTitle: action.value };
    case "DevOpsConfiguration_WorkItemFieldMappingTitle":
      return {
        ...state,
        DevOpsConfiguration_WorkItemFieldMappingTitle: action.value,
      };
    case "DevOpsTree_MigrateTitle":
      return { ...state, DevOpsTree_MigrateTitle: action.value };
    case "DevOpsTree_ShowNewWorkItemsTitle":
      return { ...state, DevOpsTree_ShowNewWorkItemsTitle: action.value };
    case "DevOpsTree_ApplyBtn":
      return { ...state, DevOpsTree_ApplyBtn: action.value };
    case "DevOpsTree_CollapseBtn":
      return { ...state, DevOpsTree_CollapseBtn: action.value };
    case "DevOpsTree_ExpandBtn":
      return { ...state, DevOpsTree_ExpandBtn: action.value };
    case "DevOpsTree_workItemTitle":
      return { ...state, DevOpsTree_workItemTitle: action.value };
    case "DevOpsTree_BackBTN":
      return { ...state, DevOpsTree_BackBTN: action.value };
    default:
      return state;
  }
}

export default function ConnectionContainer() {
  const [dataArr, setDataArr] = useState<any>([]);
  const [dataFieldArr, setFieldDataArr] = useState<any>([]);
  const [devopsWorkItemTypes, setDevopsWorkItemTypes] = useState<any>([]);
  const [crmWorkItemTypes, setCrmWorkItemTypes] = useState<any>([]);
  const options: any = [...devopsWorkItemTypes]; //"N/A"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDataArr, setTaskDataArr]: any = useState([]);
  const [tableColumn, setColumns] = useState<any>([]);
  const [selectedWorkItem, setSelectedWorkItem] = useState<any>();
  const [devopsResult, setDevopsResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMappedSaved, setIsMappedSaved] = useState<boolean>(false);
  const [configureSettings, setConfigureSettings] = useState<any>("");
  const [savedFilteredData, setSavedFilteredData] = useState<any>([]);
  const [mappedWorkItems, setMappedWorkItems]: any = useState([]);
  const [workitemTypesData, setWorkitemTypeData] = useState<any>({
    source: "Work item type",
    devOps: "Work item type",
  });
  const [partnetType, setPartnerType]: any = useState({
    source: "Parent Work Item",
    devOps: "Parent Work Item",
  });
  const [title, SetTitle]: any = useState("Title");
  const [mappingType, setMappingType]: any = useState("");
  const [mappedField, setmMppedField] = useState<any>({
    devOps: "",
    source: "",
  });
  const [isEnablePopUp, setIsEnablePopUp] = useState<boolean>(false);
  const [configurationData, setConfigurationData] = useState<any>();
  const [defaultGuId, setDefaultGuId]: any = useState();
  const [guId, setGuId]: any = useState();
  const url = new URL(window.location.href);
  const [retrieveDevopsMapping, setRetrieveDevopsMapping] = useState<any>([]);
  const [dataAfterSave, setDataAfterSave] = useState<any>([]);
  const [isSavedCompleteFlag, setIsSavedCompleteFlag] = useState<any>({
    key: "",
    value: "",
  });
  const [draftData, setDraftData] = useState<any>([]);
  const [isTreeViewVisible, setIsTreeViewVisible] = useState(false);
  const [connectionSaveData, setConnectionSaveData] = useState<any>();
  const [saveConnectionDetail, setSaveConnectionDetail] = useState<any>();
  const [currentFeildData, setCurrentFeildData] = useState<any>([]);
  const [language, dispatch] = useReducer(stateReducer, initialState);
  const [sequenceBy, setSequenceBy] = useState<String>("");
  console.log("userIdCrrent", window?.parent?.userId);

  // Get the URLSearchParams object from the URL
  const queryParameters = url.searchParams;
  console.log("queryParameters", queryParameters);
  const cusId = queryParameters.get("cusid");
  const cbsId = queryParameters.get("cbsid");
  const _pId = queryParameters.get("pid");
  const _itemId = queryParameters.get("id");
  const _navigateUrl = queryParameters.get("returnto");

  useEffect(() => {
    // languageTranslator(dispatch,initialState)
  }, []);

  const showModal = () => {
    const data: string | null = localStorage.getItem("items");
    const authData: any = data ? JSON.parse(data) : null;
    apiRequest(authData);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsLoading(false);
    console.log("cancelModel", isModalOpen, isLoading);
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
    },
  ];
  useEffect(() => {
    if (retrieveDevopsMapping?.length == 0) {
      const data = crmWorkItemTypes?.map((item: any, num: number) => {
        return {
          key: num,
          name: item,
          gyde_name: devopsWorkItemTypes?.find((res: any) => res == item),
          enable:
            devopsWorkItemTypes?.find((res: any) => res == item) == item
              ? true
              : false,
        };
      });
      setRetrieveDevopsMapping(data);
    }
  }, [devopsWorkItemTypes]);
  console.log("data not saved initial data", retrieveDevopsMapping);

  useEffect(() => {
    const data: string | null = localStorage.getItem("items");
    const authData: any = data ? JSON.parse(data) : null;
    console.log("authData... parse", authData);
    apiRequest(authData);
  }, [selectedWorkItem]);

  const apiRequest = async (authData: any) => {
    setIsLoading(true);
    setTaskDataArr([]);
    setFieldDataArr([]);

    const authObj = {
      organizationUri: authData?.organizationUri,
      personalAccessToken: authData?.personalAccessToken,
      projectName: authData?.projectName,
      workItemType: selectedWorkItem?.gyde_name,
    };
    let devopsWorkItemFieldURL = window?.parent?.devopsWorkItemFieldURL;
    let devopsWorkItemFields = window?.parent?.devopsWorkItemFields;
    if (
      selectedWorkItem?.gyde_name != undefined &&
      selectedWorkItem?.gyde_name != null
    ) {
      const devopsData = await fetchDevopsFeildsData(
        authObj,
        devopsWorkItemFieldURL
      );
      console.log("devopsData==>,", devopsData, selectedWorkItem);
      let sameDropdownFeild: any = [];
      let fieldReferenceArr: any = [];
      if (devopsData?.status === "success") {
        const crmData = JSON.parse(devopsWorkItemFields);
        console.log("crmData==>", crmData);

        // const businessProcessid = {
        //   "SchemaName": "Business Process ID",
        //   "AttributeType": "Memo",
        //   "Options": null
        // }
        // const gridResponeData = {
        //   "SchemaName": "Document Output & Partner Notes",
        //   "AttributeType": "Memo",
        //   "Options": null
        // }
        // const dcOutput = {
        //   "SchemaName": "Document Output",
        //   "AttributeType": "Memo",
        //   "Options": null
        // }
        // const partnerNotes = {
        //   "SchemaName": "Partner Notes",
        //   "AttributeType": "Memo",
        //   "Options": null
        // }
        // crmData?.push(businessProcessid,gridResponeData,dcOutput,partnerNotes)
        console.log("gridResponeData"), crmData;
        let tableData = crmData?.map((crm: any, key: any) => {
          let dropdownArr: any = devopsData?.data
            .filter(
              (devOps: any) =>
                devOps.fieldName !== "Work Item Type" &&
                devOps.fieldName !== "Title" &&
                (((crm.AttributeType === "Memo" ||
                  crm.AttributeType === "String" ||
                  crm.AttributeType === "Lookup") &&
                  crm?.Options === null &&
                  (devOps.attributeType === "String" ||
                    devOps.attributeType === "PlainText" ||
                    devOps.attributeType === "TreePath" ||
                    devOps.attributeType === "StringTreePath" ||
                    devOps.attributeType === "Identity")) ||
                  (crm.AttributeType === "Memo" &&
                    crm?.Options === null &&
                    (devOps.attributeType === "Html" ||
                      devOps.attributeType === "History" ||
                      devOps.attributeType === "HistoryHtml")) ||
                  (crm.AttributeType === "String" &&
                    crm?.Options === null &&
                    devOps.attributeType === "DateTime") ||
                  (crm.AttributeType === "Decimal" &&
                    crm?.Options === null &&
                    (devOps.attributeType === "Integer" ||
                      devOps.attributeType === "Double")) ||
                  (crm.AttributeType === "Picklist" &&
                    (devOps.attributeType === "PicklistInteger" ||
                      devOps.attributeType === "PicklistString" ||
                      devOps.attributeType === "DoublePicklist")) ||
                  ((crm.AttributeType === "String" ||
                    crm.AttributeType === "Lookup") &&
                    crm?.Options === null &&
                    devOps.attributeType === "defaultGuId") ||
                  (crm.AttributeType === "Boolean" &&
                    crm?.Options === null &&
                    devOps.attributeType === "Boolean") ||
                  (crm?.Options != undefined &&
                    crm?.Options?.length &&
                    devOps?.hasPicklist === true) || crm?.Options?.length &&
                    devOps?.attributeType === "String")
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
              crm.SchemaName === _data.fieldName &&
                fieldReferenceArr.push({
                  name: _data.fieldName,
                  ref: _data?.fieldReferenceName,
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
                fieldReferenceName: _data?.fieldReferenceName,
              };
            });

          let isOptionList = sameDropdownFeild.some(
            (f: any) => f.mappingName === crm.SchemaName
          );
          let referenceName = fieldReferenceArr.find(
            (f: any) => f.name === crm.SchemaName
          );
          console.log(
            "fieldReferenceArr**67",
            fieldReferenceArr,
            "name",
            referenceName
          );
          const isAutoMappField =
            referenceName !== undefined &&
            typeof referenceName === "object" &&
            Object.keys(referenceName).length > 0
              ? true
              : false;
          console.log("isAutoMappField**", isAutoMappField);
          return {
            key: key,
            sourceWorkItem: crm.SchemaName,
            devopsWorkItem: isAutoMappField ? referenceName?.name : "",
            dropdown: [...dropdownArr],
            mapping: "",
            enable: isOptionList ? true : false,
            defaultOptionList: [],
            isText: false,
            isSelected: isAutoMappField ? true : isOptionList ? true : false,
            isPickListComplete: false,
            pickListArr: [],
            isSavedType: "default",
            fieldReferenceName:
              referenceName !== undefined &&
              typeof referenceName &&
              Object.keys(referenceName).length
                ? referenceName.ref
                : "",
          };
        });
        let currentLength = tableData.length + 1;
        let _tableData = [
          {
            key: currentLength + 1,
            sourceWorkItem: `${title}`,
            devopsWorkItem: `${title}`,
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
            fieldReferenceName: "System.Title",
          },
          {
            key: currentLength + 2,
            sourceWorkItem: `${workitemTypesData.source}`,
            devopsWorkItem: `${workitemTypesData.devOps}`,
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
            fieldReferenceName: "System.WorkItemType",
          },
          {
            key: currentLength + 3,
            sourceWorkItem: `${partnetType.source}`,
            devopsWorkItem: `${partnetType.devOps}`,
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
            fieldReferenceName: "",
          },
          ...tableData,
        ];
        console.log("tableDataInitial ===>", tableData);
        let updatedSavedData: any = await fetchFieldMappingData(
          mappedField?.source
        );
        let updatedDefaultData: any = await fetchDefaultSettingData(
          _pId,
          false
        );
        console.log(
          "updatedSavedData123====*",
          updatedSavedData,
          updatedDefaultData,
          updatedDefaultData?.data?.length
        );
        if (updatedSavedData?.length) {
          const newupdatedArr = updatedSavedData[0]["value"].map(
            (item: any) => {
              const _latestItem = tableData.find((table: any) => {
                return item.sourceWorkItem === table.sourceWorkItem;
              });
              console.log(
                "_latestItem",
                _latestItem,
                ":",
                item?.sourceWorkItem,
                "item.devopsWorkItem,",
                item?.devopsWorkItem
              );
              if (_latestItem) {
                const foundInDropdown = _latestItem.dropdown?.some(
                  (option: any) =>
                    option?.dropdownValue === item?.devopsWorkItem
                );

                console.log("foundInDropdown*1", foundInDropdown);

                if (foundInDropdown) {
                  return { ...item, dropdown: _latestItem.dropdown };
                } else {
                  return {
                    ...item,
                    defaultOptionList: [],
                    dropdown: _latestItem.dropdown,
                    devopsWorkItem: "N/A",
                  };
                }
              } else {
                return item;
              }
            }
          );
          console.log("newupdatedArr", newupdatedArr);
          setTaskDataArr(newupdatedArr);
        } else if (updatedDefaultData?.data?.length) {
          const newupdatedArr = updatedDefaultData?.data.map((item: any) => {
            const _latestItem = tableData.find((table: any) => {
              return item.sourceWorkItem === table.sourceWorkItem;
            });
            console.log("_latestItemD", _latestItem, ":", item.sourceWorkItem);

            if (_latestItem) {
              const foundInDropdown = _latestItem.dropdown?.some(
                (option: any) => option?.dropdownValue === item?.devopsWorkItem
              );
              if (foundInDropdown) {
                return { ...item, dropdown: _latestItem.dropdown };
              } else {
                return {
                  ...item,
                  defaultOptionList: [],
                  dropdown: _latestItem.dropdown,
                  devopsWorkItem: "N/A",
                };
              }
            } else {
              return item;
            }
          });
          console.log("newupdatedArr", newupdatedArr);

          setTaskDataArr(newupdatedArr);
        } else {
          setTaskDataArr(_tableData);
        }
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
            width: "40%",
          },
          {
            title: "FIELD MAPPINGS",
            dataIndex: "mapping",
            key: "mapping",
            buttonField: true,
          },
        ];
        setColumns(columns);
        // setIsLoading(false);
        setIsModalOpen(true);
      } else if (devopsData?.status === "error") {
        // setIsLoading(false);
        setIsModalOpen(false);
      } else {
        console.log("trigger Action");
      }
      setIsLoading(false);
    }
  };

  // useEffect(()=> {
  //   languageTranslator(dispatch,initialState);
  // },[])

  useEffect(() => {
    if (isLoading === false) {
      console.log("setIsLoading(false)", isLoading);
      setIsLoading(false);
    }
  }, [isModalOpen, isLoading]);

  useEffect(() => {
    console.log("cbs******", cbsId, cusId, _pId);
    findDevopsConfigGuId(cusId, cbsId, "", false);
    getWorkitemNames(_itemId);
  }, [devopsWorkItemTypes]);

  const getWorkitemNames = async (_itemId: any) => {
    console.log("_itemId", _itemId);
    let result: any = await fetWorkItemsbyId(_itemId);
    setConfigurationData(result?.data);
    console.log("result", result);
  };

  const fetchFieldMappingData = async (itemKey: any) => {
    if (guId) {
      let _result: any = await fetchFieldMapping(guId);
      if (_result.type == "success") {
        console.log("fetchFieldMapping ==>", _result?.data.data, itemKey);
        const _resultData = _result?.data?.data;
        const updatedData = _resultData.filter((item: any) => {
          return item.key === itemKey;
        });
        console.log("MappingupdatedData", updatedData);
        return updatedData;
      } else if (_result.type == "error") return [];
    } else {
      return [];
    }
  };

  const findDevopsConfigGuId = async (
    cusId: any,
    bId: any,
    requestType: string,
    isCreate: boolean = false
  ) => {
    const workItemType = await getDevopsWorkItemType(_itemId, "workItemType");
    let _result: any = await fetchDevopsConfig(cusId, bId);
    console.log("devOpsCOnfig", _result);
    if (_result.type === "updateConfig") {
      setGuId(_result.id);
      let result: any = await fetchDevOpsMappingField(_result.id);
      if (result.type == "success") {
        let JsonMappedData = JSON.parse(result.data);
        console.log(
          "JsonDataFirst",
          "load when saved data retrieving.....",
          JsonMappedData
        );
        const validateData = await JsonMappedData?.data?.map((item: any) => {
          return {
            ...item,
            enable:
              devopsWorkItemTypes?.find(
                (res: any) => res == item?.gyde_name
              ) === undefined
                ? false
                : item?.enable,
            gyde_name: devopsWorkItemTypes?.find(
              (res: any) => res == item?.gyde_name
            )
              ? devopsWorkItemTypes?.find((res: any) => res == item?.gyde_name)
              : "N/A",
          };
        });

        console.log("validate^8",  validateData.filter((item:any) => workItemType.includes(item.name)));
        const updatedJsonMappedData = validateData.filter((item:any) => workItemType.includes(item.name));
        console.log("updatedJsonMappedData*",updatedJsonMappedData);

        console.log("crmWorkItemTypes",workItemType);
        
        workItemType.forEach((value:any) => {
    const existingItem = validateData.find((item:any) => item.name === value);
    if (!existingItem) {
        updatedJsonMappedData.push({
            key: JsonMappedData.length,
            name: value,
            gyde_name: "N/A",
            enable: false,
            isCorrectlyMapped: false,
            fieldMapping: false
        });
    }
});



   console.log("updatedJsonMappedData",updatedJsonMappedData);
   
        // .map((item: any) => {
        //   return {
        //     ...item,
        //     gyde_name:
        //       item?.gyde_name === "N/A"
        //         ? "N/A"
        //         : devopsWorkItemTypes?.find(
        //             (res: any) => res == item?.gyde_name
        //           ),
        //   };
        // });
        setRetrieveDevopsMapping(updatedJsonMappedData);
        setDataAfterSave(updatedJsonMappedData);
        console.log("JsonMappedData", validateData);
        setIsLoading(false);
        console.log("savedFilteredData...!@#", savedFilteredData);
      } else if (result.type === "error") {
        return [];
      }
    } else if (_result.type === "createDefault") {
      setGuId("");
      const _data = isCreate && (await createDevConfig(requestType));
      setIsLoading(false);
      console.log("_data", _data);
      return "config";
    }
  };
  const fetchDefaultSettingData = async (
    pid: any,
    actionType: boolean = false
  ) => {
    let result: any = await fetchDefaultSetting(pid);
    console.log("fetchDefaultSettingData#", result);
    if (result.type === "updateDefault") {
      setDefaultGuId(result.id);
      let _result: any = await fetchFieldMapping(result.id);
      console.log("heyyy");
      console.log("fetchFieldMapping#", _result);
      if (_result?.type === "success") {
        console.log("AXFIC", result);

        const _resultData = _result?.data?.data;
        console.log("_resultDataDefaultt,", _resultData);

        const updatedData = _resultData?.filter((item: any) => {
          if (item.key === mappedField?.source) {
            return item;
          }
        });
        console.log("updated", updatedData.length);
        if (updatedData.length) {
          return { type: "updateDefault", data: updatedData[0]["value"] };
        } else {
          return { type: "updateDefault", data: [] };
        }
      } else {
        return { type: "updateDefault", data: [] };
      }
    } else if (result.type === "createDefault") {
      if (actionType) {
        const resultId = await createDevConfig("default");
        return { type: "createDefault", data: [], id: resultId };
      }
      return { type: "createDefault", data: [] };
    } else if (result.type === "error") {
      return { type: "ErrorcreateDefault", data: [] };
    }
  };

  useEffect(() => {
    let devopsWorkItemTypes = window?.parent?.devopsWorkItemTypes;
    let azureWorkItemTypeURL = window?.parent?.azureWorkItemTypeURL;
    let devopsWorkItemFields = window?.parent?.devopsWorkItemFields;
    let devopsWorkItemFieldURL = window?.parent?.devopsWorkItemFieldURL;
    console.log("devopsWorkItemTypes*", devopsWorkItemTypes);
    console.log("azureWorkItemTypeURL*", azureWorkItemTypeURL);
    console.log("devopsWorkItemFields*", devopsWorkItemFields);
    console.log("devopsWorkItemFieldURL*", devopsWorkItemFieldURL);

    let _migrate = window?.parent?.DevopsCreateWorkItem;

    console.log("_migrate", _migrate);

    getWorkItemTypesFromSurveySetting();

    //devopsWorkItemTypes && setCrmWorkItemTypes(JSON.parse(devopsWorkItemTypes));
    getConnectionDetails();
  }, []);

  const getWorkItemTypesFromSurveySetting = async () => {
    console.log(":_itemId", _itemId);

    const workItemType = await getDevopsWorkItemType(_itemId, "workItemType");
    console.log("workItemType", workItemType);
    workItemType?.length && setCrmWorkItemTypes(workItemType);
  };

  const getConnectionDetails = async () => {
    let _result: any = await fetchDevopsConnectionDetails(cusId, cbsId);

    console.log("_resultASYNC", _result);
    setConnectionSaveData(_result);
    setSequenceBy(_result?.connectionDetails?.gyde_sequenceby)
  };

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://designv2partner-fapp-uk-dv.azurewebsites.net/api/GetWorkItemTypeFields?code=wOSuVFLCEQ1_GFrvVAuk-GUg5fXs82zdZPsqhN1fSUiNAzFuBnCDRA=="
  //     )
  //     .then((res) => {
  //       console.log("ress11111", res);
  //     })
  //     .catch((e) => {
  //       console.log("errorr1", e);
  //     });
  // }, []);

  useEffect(() => {
    console.log("isLoading885", isLoading);
  }, [isLoading]);
  useEffect(() => {
    console.log("currentFeildData", currentFeildData);

    handleWorkItemAfterSaveMappng();
    // findDevopsConfigGuId(cusId, cbsId, "", false);
    // console.log("isSavedCompleteFlag***",isSavedCompleteFlag,retrieveDevopsMapping);

    // const newData = retrieveDevopsMapping?.map((item: any) => {
    //   if (item?.name == isSavedCompleteFlag?.key) {
    //     const fieldMappingValue =
    //       isSavedCompleteFlag?.value === 1 ? true : false;
    //     return { ...item, fieldMapping: fieldMappingValue };
    //   }
    //   return {
    //     ...item,
    //     fieldMapping: (item?.gyde_name == "N/A") ? true : (item?.fieldMapping) ? item?.fieldMapping : false,
    //   };
    // });

    // const validateData =  newData?.map((item:any)=>{
    //   return {
    //     ...item,
    //     gyde_name: item?.gyde_name  ==="N/A" ? "N/A" : devopsWorkItemTypes?.find((res: any) => res == item?.gyde_name)
    //   }
    // })

    // console.log("newData768*",newData);
    // console.log("validateData***",validateData);

    // setRetrieveDevopsMapping(validateData);
    // setMappedWorkItems(validateData);
    // setDraftData(validateData);
  }, [isSavedCompleteFlag]);

  console.log("retrieveDevopsMapping7415", retrieveDevopsMapping);
  const handleWorkItemAfterSaveMappng = async () => {
    findDevopsConfigGuId(cusId, cbsId, "", false);
    console.log("zero!", isSavedCompleteFlag);

    if (guId) {
      console.log(
        "isSavedCompleteFlag***",
        currentFeildData,
        isSavedCompleteFlag,
        retrieveDevopsMapping
      );
      const newData = currentFeildData?.map((item: any) => {
        if (item?.name == isSavedCompleteFlag?.key) {
          const fieldMappingValue =
            isSavedCompleteFlag?.value === 1 ? true : false;
          return { ...item, fieldMapping: fieldMappingValue };
        }
        return {
          ...item,
          fieldMapping: item?.fieldMapping ? item?.fieldMapping : false,
        };
      });

      const validateData = newData?.map((item: any) => {
        return {
          ...item,
          gyde_name:
            item?.gyde_name === "N/A"
              ? "N/A"
              : devopsWorkItemTypes?.find((res: any) => res == item?.gyde_name),
        };
      });

      console.log("newData768*", newData);
      console.log("validateData***", validateData);
      let response: any = await createMappingFile(validateData, guId);
      if (response.type === "success") {
        findDevopsConfigGuId(cusId, cbsId, "", false);
        setIsLoading(false);
        setDataAfterSave(validateData);
        notification.success({
          message: "Work Item Types mapped succesfully!",
        });
      } else if (response.type === "error") {
        setIsLoading(false);
        notification.error({
          message: "Work Item Types mapping failed!",
        });
      }
    }

    // console.log("newData768*",newData);
    // console.log("validateData***",validateData);

    // setRetrieveDevopsMapping(validateData);
    // setMappedWorkItems(validateData);
    // setDraftData(validateData);
  };

  useEffect(() => {
    if (
      currentFeildData?.length > 0 &&
      checkFinalMappingStatus(retrieveDevopsMapping, "fieldMapping") &&
      checkFinalMappingStatus(currentFeildData, "isCorrectlyMapped")
    ) {
      setConfigureSettings("devopsGenerator");
    }
    setDataAfterSave((prevState: any) => {
      if (prevState != dataAfterSave) {
        return dataAfterSave;
      } else {
        return prevState;
      }
    });
  }, [dataAfterSave, retrieveDevopsMapping]);

  const savePopupModelData = async (buttonType: any) => {
    console.log("buttonType", buttonType, defaultGuId);
    console.log("SavedMainData", dataFieldArr, taskDataArr);

    const _dataFieldArr = dataFieldArr.map((obj: any) => ({
      ...obj,
      dropdown: [],
    }));
    const _taskDataArr = taskDataArr.map((obj: any) => ({
      ...obj,
      dropdown: [],
    }));

    setIsLoading(true);
    if (dataFieldArr.length) {
      if (buttonType === "Save") {
        if (guId) {
          let _result: any = await fetchFieldMapping(guId);
          let updatedData = _dataFieldArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "saved" };
          });
          commonFieldMappingSave(
            guId,
            _result,
            mappedField,
            updatedData,
            _dataFieldArr
          );
        } else {
          notification.error({ message: "GUID Not Found" });
        }
      } else if (buttonType === "Default") {
        let updatedDefaultData: any = await fetchDefaultSettingData(_pId, true);
        console.log("defaultGuIdTag1", updatedDefaultData, defaultGuId);
        if (defaultGuId) {
          let _result: any = await fetchFieldMapping(defaultGuId);
          let updatedData = _dataFieldArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "setasDefault" };
          });
          saveDefaultMappingData(defaultGuId)
            .then((response: any) => {
              if (response.type === "success") {
                commonFieldMappingSave(
                  defaultGuId,
                  _result,
                  mappedField,
                  updatedData,
                  _dataFieldArr
                );
              } else if (response.type === "error") {
                console.error("Error:", response.error.message);
              }
            })
            .catch((error: any) => {
              console.error("Unexpected error:", error);
            });
        } else {
          let _result: any = await fetchFieldMapping(updatedDefaultData?.id);
          let updatedData = _dataFieldArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "setasDefault" };
          });
          saveDefaultMappingData(updatedDefaultData?.id)
            .then((response: any) => {
              if (response.type === "success") {
                commonFieldMappingSave(
                  updatedDefaultData?.id,
                  _result,
                  mappedField,
                  updatedData,
                  _dataFieldArr
                );
              } else if (response.type === "error") {
                console.error("Error:", response.error.message);
              }
            })
            .catch((error: any) => {
              console.error("Unexpected error:", error);
            });
          // notification.error({ message: "GUID Not found" });
        }
      }
    } else if (taskDataArr.length) {
      if (buttonType === "Save") {
        if (guId) {
          let _result: any = await fetchFieldMapping(guId);
          let updatedData = _taskDataArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "saved" };
          });
          commonFieldMappingSave(
            guId,
            _result,
            mappedField,
            updatedData,
            _taskDataArr
          );
        } else {
          notification.error({ message: "GUID Not found" });
        }
      } else if (buttonType === "Default") {
        let updatedDefaultData: any = await fetchDefaultSettingData(_pId, true);
        console.log("defaultGuIdTag1", updatedDefaultData, defaultGuId);
        if (defaultGuId) {
          let _result: any = await fetchFieldMapping(defaultGuId);
          let updatedData = _taskDataArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "setasDefault" };
          });
          saveDefaultMappingData(defaultGuId)
            .then((response: any) => {
              if (response.type === "success") {
                commonFieldMappingSave(
                  defaultGuId,
                  _result,
                  mappedField,
                  updatedData,
                  _taskDataArr
                );
              } else if (response.type === "error") {
                console.error("Error:", response.error.message);
              }
            })
            .catch((error: any) => {
              console.error("Unexpected error:", error);
            });
        } else {
          let _result: any = await fetchFieldMapping(updatedDefaultData?.id);
          let updatedData = _dataFieldArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "setasDefault" };
          });
          saveDefaultMappingData(updatedDefaultData?.id)
            .then((response: any) => {
              if (response.type === "success") {
                commonFieldMappingSave(
                  updatedDefaultData?.id,
                  _result,
                  mappedField,
                  updatedData,
                  _taskDataArr
                );
              } else if (response.type === "error") {
                console.error("Error:", response.error.message);
              }
            })
            .catch((error: any) => {
              console.error("Unexpected error:", error);
            });
        }
      }
    }
  };
  const handleConfigure = ({ target: { value } }: RadioChangeEvent) => {
    setConfigureSettings(value);
  };



  const handleMappingItemSave = async () => {
    setIsLoading(true);
    if (guId) {
      console.log("formMapp", guId);
      
      let response: any = await createMappingFile(mappedWorkItems, guId);
      console.log("mappinh handle");
      console.log("formMappresponse", response);
      if (response.type === "success") {
        findDevopsConfigGuId(cusId, cbsId, "", false);
        console.log("connectionSaveData7*", saveConnectionDetail);
        const saveConnectionResponse: any = saveConnectiondata(
          saveConnectionDetail,
          guId
        );
        if (saveConnectionResponse?.type === "success") {
          setIsLoading(false);
          notification.success({
            message: "Work Item Types mapped succesfully!",
          });
        }
        if (saveConnectionResponse?.type === "error") {
          setIsLoading(false);
          notification.error({
            message: "Work Item Types mapping failed!",
          });
        }
      } else if (response.type === "error") {
        setIsLoading(false);
        notification.error({
          message: "Work Item Types mapping failed!",
        });
      }
    } else {
      console.log("newRecordcan");

      createDevConfig("newRecord", true);
      findDevopsConfigGuId(cusId, cbsId, "", false);
      notification.success({ message: "Work Item Types mapped succesfully!" });
    }
    setDraftData([]);
    console.log("defaultGuId", defaultGuId);
    setIsLoading(false);
  };

  const createDevConfig = async (
    recordType: any,
    isCreateMapping: boolean = false
  ) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    var record: any = {};
    record.gyde_name = `gyde devOps config ${recordType}${hours}${minutes}${seconds}`;
    record["gyde_customerorpartner@odata.bind"] =
      recordType === "default" ? `/accounts(${_pId})` : `/accounts(${cusId})`; // Lookup
    recordType !== "default"
      ? (record[
          "gyde_customerbusinesssurvey@odata.bind"
        ] = `/gyde_customerbusinesssurveies(${cbsId})`)
      : ""; // Lookup
    record.gyde_defaultsetting = false;
    console.log("record1", record, recordType);
    setIsLoading(true);
    let newId = await createDevConfigApi(record);
    if (newId) {
      recordType === "default" && setDefaultGuId(newId),
        recordType === "newRecord" && setGuId(newId);
      if (isCreateMapping) {
        let response: any = await createMappingFile(mappedWorkItems, newId);
        console.log("mappinh new workitem");
        console.log("responseCrerate", response);

        if (response.type === "success") {
          setIsMappedSaved(true);
          findDevopsConfigGuId(cusId, cbsId, "", false);
          console.log("connectionSaveData*", saveConnectionDetail);

          const saveConnectionResponse: any = saveConnectiondata(
            saveConnectionDetail,
            newId
          );

          if (saveConnectionResponse?.type === "success") {
            setIsLoading(false);
            notification.success({
              message: "Work Item Types mapped succesfully!",
            });
          }
          if (saveConnectionResponse?.type === "error") {
            setIsLoading(false);
            notification.error({
              message: "Work Item Types mapping failed!",
            });
          }
        } else if (response.type === "error") {
          setIsMappedSaved(false);
          setIsLoading(false);
        }
      }
      console.log("newId", newId);
      setIsLoading(false);
      return newId;
    }
  };
  const commonFieldMappingSave = (
    guId: any,
    _result: any,
    itemKey: any,
    dataSource: any,
    _defaultDataSource: any = []
  ) => {
    console.log(
      "commonFieldMappingSave",
      guId,
      ":",
      _result,
      ":",
      itemKey,
      dataSource
    );
    console.log("_defaultDataSource$%*", _defaultDataSource);
    let _isSelectedField = _defaultDataSource.filter((f:any)=> f.devopsWorkItem !== "N/A").every(
      (field: any) => field.isSelected
    );
    console.log("=>Slected",_isSelectedField);
    
    const filteredObjects = _defaultDataSource.filter(
      (item: any) => item.pickListArr?.length > 0 || item.enable === true
    );
    console.log("filteredObjects", filteredObjects);

    let _isCompletePickList = filteredObjects.every(
      (field: any) => field.isPickListComplete
    );
    let isCompleted = _isSelectedField & _isCompletePickList;
    let mappingStatus = { key: mappedField?.source, value: isCompleted };
    console.log(
      "isCompleted:",
      mappingStatus,
      isCompleted,
      _isSelectedField,
      _isCompletePickList,
      _isSelectedField & _isCompletePickList
    );
    if (_result.type === "success") {
      const _resultData = _result?.data.data;

      console.log("_resultDataTag", _resultData, _result?.data.data);

      const updatedData = _resultData?.map((item: any) => {
        if (item.key === itemKey?.source) {
          return {
            ...item,
            key: itemKey?.source,
            targetTable: itemKey?.devOps,
            ["value"]: dataSource,
          };
        }
        return item;
      });
      if (!updatedData.some((item: any) => item.key === itemKey?.source)) {
        updatedData.push({
          key: itemKey?.source,
          targetTable: itemKey?.devOps,
          value: dataSource,
        });
      }
      console.log("updated103", updatedData);
      saveFieldmappingData(updatedData, guId, mappingStatus);
    } else if (_result.type === "error") {
      let _structureData = [
        {
          key: itemKey?.source,
          targetTable: itemKey?.devOps,
          value: dataSource,
        },
      ];
      saveFieldmappingData(_structureData, guId, mappingStatus);
    }
  };
  const checkFinalMappingStatus = (array: [], column: string) => {
    const itemQ = array.filter((item: any) => item?.gyde_name !== "N/A");
    console.log("array89", itemQ);

    console.log(
      "inside condition: ",
      array
        .filter((item: any) => item?.gyde_name !== "N/A")
        .every((element) => element[column])
    );
    console.log(
      "checktag99",
      array,
      column,
      ":",
      array
        .filter((item: any) => item?.gyde_name !== "N/A")
        .every((element) => element[column] === true)
    );
    return array
      .filter((item: any) => item?.gyde_name !== "N/A")
      .every((element) => element[column] === true);
  };

  console.log(
    "final condition ::",
    retrieveDevopsMapping,
    checkFinalMappingStatus(retrieveDevopsMapping, "fieldMapping"),
    checkFinalMappingStatus(retrieveDevopsMapping, "isCorrectlyMapped")
  );
  const saveFieldmappingData = (data: any, guId: any, mappingStatus: any) => {
    console.log("saveFieldmappingData", data);

    saveMappingData(data, guId)
      .then((result: any) => {
        console.log("saveMappingData", result);

        if (result.type === "success") {
          console.log("mappingStatus*7", mappingStatus);

          setIsSavedCompleteFlag(mappingStatus);
          setTaskDataArr([]);
          setFieldDataArr([]);
          // setRetrieveDevopsMapping([]);
          setIsLoading(false);
          setIsModalOpen(false);
          notification.success({
            message: "Work Item Fields mapped successfully!",
          });
        } else {
          console.error("Save failed with status:", result.status);
          setIsLoading(false);
          setIsModalOpen(false);
          notification.error({
            message: "Work Item Fields mapping failed!",
          });
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setIsLoading(false);
        setIsModalOpen(false);
      });
  };
  const saveConnectingDetails = (data: any) => {
    console.log("saveConnectingDetails", data);

    var record: any = {};

    record.gyde_devopsorganizationurl = data?.organizationUri;
    record.gyde_devopsprojectname = data?.projectName;
    console.log("record", record);

    setSaveConnectionDetail(record);
    //saveConnectionDetail(record);
  };
  console.log("reRenderC*", connectionSaveData, saveConnectionDetail);
const handleSelectedSequence = (value:any) => {

  console.log("handleSelectedSequence",value);
  setSaveConnectionDetail((prevRecord:any) => ({
    ...prevRecord,
    gyde_sequenceby: value,
  }));
  setSequenceBy(value)

}
const sequenceOption = [
  { value: 529870000, label: "None" },
   { value: 529870001, label: "Work Item Sequence" },
   { value: 529870002, label: "Business Process ID" },
   
 ]
  return (
    <div className="devops-container">
      {!isTreeViewVisible && connectionSaveData?.type === "success" ? (
        <Spin spinning={isLoading}>
          <h1 className="title">
            <Trans>DevOpsConfiguration_DevopsWorkitemTitle</Trans>
          </h1>
          <div className="bg-wrap">
            <h3 className="sub-title">
              <span>
                {" "}
                <Trans>DevOpsConfiguration_ConnectionDetailsTitle</Trans>
              </span>
              <span>
                {" "}
                <h5 className="sub-title2">{configurationData?.gyde_name} </h5>
              </span>
            </h3>

            <ConnectionComponent
              setWorkItemData={(res: any) => {
                setDevopsWorkItemTypes(res?.data),
                  setDevopsResult(res?.data?.length ? true : false);
              }}
              connectionFetch={(res: any) => setDevopsResult(res)}
              url={window?.parent?.azureWorkItemTypeURL}
              setLoader={setIsLoading}
              saveConnectingDetails={saveConnectingDetails}
              connectionSaveData={connectionSaveData}
              language={language}
            />

            {devopsResult && (
              <>
                <div className="devop-btn-group">
                  <div>
                  {dataAfterSave?.length > 0 &&
                    checkFinalMappingStatus(dataAfterSave, "fieldMapping") &&
                    checkFinalMappingStatus(
                      dataAfterSave,
                      "isCorrectlyMapped"
                    ) && (
                      <Radio.Group
                        options={[
                          {
                            label: <Trans>DevOps Generator</Trans>,
                            value: "devopsGenerator",
                          },
                          {
                            label: <Trans>Configure Mapping</Trans>,
                            value: "configureMapping",
                          },
                        ]}
                        onChange={handleConfigure}
                        value={configureSettings}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    )}

                    </div>

                  
<div className="devopsdrpdown-btn">
                  <a className="sequnce-title">  Sequence By: </a>   <Select
                         disabled= {dataAfterSave?.length > 0 &&
                          checkFinalMappingStatus(dataAfterSave, "fieldMapping") &&
                          checkFinalMappingStatus(dataAfterSave, "isCorrectlyMapped") &&
                          configureSettings == "devopsGenerator" ? true :false}
                         style={{width:200}}
                         defaultValue={sequenceBy ? sequenceOption?.find((element:any) => element?.value == sequenceBy)?.label : "None"}
                         onChange={handleSelectedSequence}
                         options={sequenceOption}
                       /></div>
                </div>

                <h3 className="sub-title mt-20">
                  {" "}
                  <Trans>DevOpsConfiguration_MappingWorkItemTypeTitle</Trans>
                </h3>
                <TableComponent
                  dataSource={...retrieveDevopsMapping}
                  columns={workItemColumns}
                  onMapping={() => {}}
                  size="small"
                  scroll={{ y: 300 }}
                  isModelopen={false}
                  modelAction={showModal}
                  className={
                    checkFinalMappingStatus(dataAfterSave, "fieldMapping") &&
                    checkFinalMappingStatus(
                      dataAfterSave,
                      "isCorrectlyMapped"
                    ) &&
                    configureSettings == "devopsGenerator"
                      ? "disable-table"
                      : ""
                  }
                  setDropDownValue={(data: any) => {
                    console.log("callSetDrop");
                    return setSelectedWorkItem(data);
                  }}
                  // disabled={configureSettings == "devopsGenerator" ? true : false}
                  saveMappingItems={(data: any) => setMappedWorkItems(data)}
                  setMappingType={setmMppedField}
                  isPicklistModel={false}
                  setWorkitemTypeData={setWorkitemTypeData}
                  setCurrentFeildData={setCurrentFeildData}
                  isGuid={guId ? true : false}
                  language={language}
                />

                <div className="flex-end-wrap">
                  <Button
                    className="cancel-btn mr-10"
                    type="primary"
                    htmlType="button"
                    onClick={() => {
                      window.location.href = `/${_navigateUrl}`;
                    }}
                  >
                    <Trans>DevOpsConfiguration_CancelButton</Trans>
                  </Button>
                  {dataAfterSave?.length > 0 &&
                  checkFinalMappingStatus(dataAfterSave, "fieldMapping") &&
                  checkFinalMappingStatus(dataAfterSave, "isCorrectlyMapped") &&
                  configureSettings == "devopsGenerator" ? (
                    <Button
                      type="primary"
                      htmlType="button"
                      onClick={() => setIsTreeViewVisible(true)}
                    >
                      {" "}
                      <Trans>DevOpsConfiguration_NextButton</Trans>
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="button"
                      onClick={handleMappingItemSave}
                      // disabled={
                      //   !checkFinalMappingStatus(
                      //     mappedWorkItems,
                      //     "isCorrectlyMapped"
                      //   )
                      // }
                      // className={
                      //   !checkFinalMappingStatus(
                      //     mappedWorkItems,
                      //     "isCorrectlyMapped"
                      //   )
                      //     ? "disable-save-btn"
                      //     : ""
                      // }
                    >
                      {" "}
                      <Trans>DevOpsConfiguration_SaveButton</Trans>
                    </Button>
                  )}
                </div>
              </>
            )}
            {isModalOpen && (
              <PopupComponent
                visible={isModalOpen}
                onOk={handleOk}
                onClose={handleCancel}
                buttons={[
                  {
                    title: language?.DevOpsConfiguration_CancelButton,
                    onClickHandler: handleCancel,
                  },
                  {
                    title: language?.DevOpsConfiguration_SetAsDefaultButton,
                    onClickHandler: savePopupModelData,
                  },
                  {
                    title: language?.DevOpsConfiguration_SaveButton,
                    onClickHandler: savePopupModelData,
                  },
                ]}
                language={language}
                Content={
                  <div>
                    <Spin spinning={isLoading}>
                      <TableComponent
                        dataSource={taskDataArr}
                        columns={tableColumn}
                        onMapping={() => {}}
                        size="small"
                        scroll={{ y: "max-content" }}
                        modelAction={showModal}
                        isModelopen={isModalOpen}
                        setDataArr={setDataArr}
                        setFieldDataArr={setFieldDataArr}
                        isPicklistModel={false}
                        currentPickListData={dataArr}
                        setMappingType={setmMppedField}
                        isGuid={guId ? true : false}
                        language={language}
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
                            handleCancel();
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          <Trans>DevOpsConfiguration_CancelButton</Trans>
                        </Button>
                        <Button
                          className="ant-btn-primary"
                          onClick={(e) => {
                            savePopupModelData("Default");
                            /* Handle button click */
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          <Trans>DevOpsConfiguration_SetAsDefaultButton</Trans>
                        </Button>
                        <Button
                          className="ant-btn-primary"
                          onClick={() => {
                            savePopupModelData("Save");
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          <Trans>DevOpsConfiguration_SaveButton</Trans>
                        </Button>
                      </div>
                    </Spin>
                  </div>
                }
              />
            )}
          </div>
        </Spin>
      ) : (
        <DevopsTree guid={guId} defaultGuid={defaultGuId} language={language} currentSequence = {sequenceBy ?  sequenceOption?.find((element:any) => element?.value == sequenceBy)?.label : "None"} />
      )}
    </div>
  );
}
