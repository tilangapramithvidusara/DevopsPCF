import React, { useEffect, useState } from "react";
import { Button, notification, Radio, RadioChangeEvent, Spin } from "antd";
// import $ from 'jquery';
import TableComponent from "../Components/TableComponent";
import PopupComponent from "../Components/PopupComponent";
import ConnectionComponent from "../Components/ConnectionComponent";
import {
  exampleCRMData,
  exampleDevOpsData,
  savedMappedData,
  workItemTypes,
} from "../Constants/Samples/sample";
import SampleModel from "../Components/SampleMode";
import { FetchCrmFields } from "../Api/crmApis";
import {
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
    devopsWorkItemTypes: any;
    azureWorkItemTypeURL: any;
    devopsWorkItemFields: any;
    devopsWorkItemFieldURL: any;
  }
}

export default function ConnectionContainer() {
  const dataSource1 = [
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
    source: "Parent item type",
    devOps: "Parent item type",
  });
  const [title, SetTitle]: any = useState("Title");
  const [mappingType, setMappingType]: any = useState("");
  const [mappedField, setmMppedField] = useState<any>("");
  const [isEnablePopUp, setIsEnablePopUp] = useState<boolean>(false);
  const [configurationData, setConfigurationData] = useState<any>();
  // const [loading, setLoading] = useState<boolean>(false);
  // const [visibleButton, setVisibleButton] = useState<boolean>(false);
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
  // Get the URLSearchParams object from the URL
  const queryParameters = url.searchParams;
  console.log("queryParameters", queryParameters);

  const cusId = queryParameters.get("cusid");
  const cbsId = queryParameters.get("cbsid");
  const _pId = queryParameters.get("pid");
  const _itemId = queryParameters.get("id");
  const _navigateUrl = queryParameters.get("returnto");

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
    //tempAPI();
    const data: string | null = localStorage.getItem("items");
    const authData: any = data ? JSON.parse(data) : null;
    console.log("authData... parse", authData);
    apiRequest(authData);
  }, [selectedWorkItem]);

  const apiRequest = async (authData: any) => {
    setIsLoading(true);
    const authObj = {
      organizationUri: authData?.organizationUri,
      personalAccessToken: authData?.personalAccessToken,
      projectName: authData?.projectName,
      workItemType: selectedWorkItem?.name,
    };
    let devopsWorkItemFieldURL = window?.parent?.devopsWorkItemFieldURL;
    let devopsWorkItemFields = window?.parent?.devopsWorkItemFields;
    if (selectedWorkItem?.name != undefined && selectedWorkItem?.name != null) {
      const devopsData = await fetchDevopsFeildsData(
        authObj,
        devopsWorkItemFieldURL
      );
      console.log("apiDara,", devopsData, selectedWorkItem);
      let sameDropdownFeild: any = [];
      if (devopsData.status === "success") {
        const crmData = JSON.parse(devopsWorkItemFields);
        console.log("CCCW", crmData);
        let tableData = crmData?.map((crm: any, key: any) => {
          let dropdownArr: any = devopsData.data?.Value.filter(
            (devOps: any) =>
              devOps.fieldName !== "Work Item Type" &&
              devOps.fieldName !== "Title" &&
              (((crm.AttributeType === "Memo" ||
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
                  devOps.attributeType === "defaultGuId") ||
                (crm.AttributeType === "Boolean" &&
                  devOps.attributeType === "Boolean") ||
                (crm?.Options != undefined &&
                  crm?.Options?.length &&
                  devOps?.hasPicklist === true))
          ).map((_data: any, key: any) => {
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
            isPickListComplete: false,
            pickListArr: [],
            isSavedType: "default",
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
          },
          ...tableData,
        ];

        let updatedSavedData: any = await fetchFieldMappingData(mappedField);
        let updatedDefaultData: any = await fetchDefaultSettingData(_pId);

        console.log("updatedSavedData====*", updatedSavedData, updatedDefaultData);
        if (updatedSavedData?.length) {
          setTaskDataArr(updatedSavedData[0]["value"]);
        } else if (updatedDefaultData?.length) {
          setTaskDataArr(updatedDefaultData);
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
          },
          {
            title: "FIELD MAPPINGS",
            dataIndex: "mapping",
            key: "mapping",
            buttonField: true,
          },
        ];
        setColumns(columns);
        setIsModalOpen(true);
        setIsLoading(false);
      } else if (devopsData.status === "error") {
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

  useEffect(() => {
    console.log("cbs******", cbsId, cusId, _pId);
    findDevopsConfigGuId(cusId, cbsId);
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
        console.log("33", _result.data);
        const _resultData = JSON.parse(_result.data);
        console.log("fieldMAppQ", itemKey);
        const updatedData = _resultData.filter((item: any) => {
          console.log("12", item.key, itemKey);
          return item.key === itemKey;
        });
        console.log("upppp", updatedData);
        return updatedData;
      } else if (_result.type == "error") return [];
    } else {
      return [];
    }
  };

  const findDevopsConfigGuId = async (cusId: any, bId: any) => {
    let _result: any = await fetchDevopsConfig(cusId, bId);
    console.log("devOpsCOnfig", _result);
    if (_result.type === "updateConfig") {
      setGuId(_result.id);
      let result: any = await fetchDevOpsMappingField(_result.id);
      if (result.type == "success") {
        let JsonMappedData = convertByteArrayToJson(result.data);
        console.log(
          "JsonDataFirst",
          "load when saved data retrieving.....",
          JsonMappedData
        );
        setRetrieveDevopsMapping(JsonMappedData);
        setDataAfterSave(JsonMappedData);
        console.log("JsonMappedData", JsonMappedData);
        setIsLoading(false);
        console.log("savedFilteredData...!@#", savedFilteredData);
      } else if (result.type === "error") {
        return [];
      }
    } else if (_result.type === "createDefault") {
      setGuId("");
      createDevConfig("newRecord");
      setIsLoading(false);
    }
  };
  const fetchDefaultSettingData = async (pid: any) => {
    let result: any = await fetchDefaultSetting(pid);
    console.log("fetchSEtting", result);
    if (result.type === "updateDefault") {
      setDefaultGuId(result.id);
      let _result: any = await fetchFieldMapping(result.id);
      console.log("RRRDF", _result);

      if (_result?.type === "success") {
        const _resultData = JSON.parse(_result.data);
        const updatedData = _resultData?.filter((item: any) => {
          if (item.key === mappedField) {
            return item;
          }
        });
        console.log("updated", updatedData.length);
        if (updatedData.length) {
          return updatedData[0]["value"];
        } else {
          return [];
        }
      } else {
        return [];
      }
    } else if (result.type === "createDefault") {
      createDevConfig("default");
      return [];
    } else if (result.type === "error") {
      return [];
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
    devopsWorkItemTypes && setCrmWorkItemTypes(JSON.parse(devopsWorkItemTypes));
  }, []);

  useEffect(() => {
    const newData = retrieveDevopsMapping?.map((item: any) => {
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
    setRetrieveDevopsMapping(newData);
    setMappedWorkItems(newData);
    setDraftData(newData);
  }, [isSavedCompleteFlag]);

  useEffect(() => {
    if (
      dataAfterSave?.length > 0 &&
      checkFinalMappingStatus(retrieveDevopsMapping, "fieldMapping") &&
      checkFinalMappingStatus(retrieveDevopsMapping, "isCorrectlyMapped")
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
    console.log("configurationData", configureSettings);
  }, [dataAfterSave, retrieveDevopsMapping]);

  const savePopupModelData = async (buttonType: any) => {
    console.log("buttonType", buttonType, defaultGuId);
    console.log("SavedMainData", dataFieldArr, taskDataArr);
    setIsLoading(true);
    if (dataFieldArr.length) {
      if (buttonType === "Save") {
        if (guId) {
          let _result: any = await fetchFieldMapping(guId);
          let updatedData = dataFieldArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "saved" };
          });
          commonFieldMappingSave(
            guId,
            _result,
            mappedField,
            updatedData,
            dataFieldArr
          );
        } else {
          notification.error({ message: "GUID Not found" });
        }
      } else if (buttonType === "Default") {
        if (defaultGuId) {
          let _result: any = await fetchFieldMapping(defaultGuId);
          let updatedData = dataFieldArr.map((item: any) => {
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
                  dataFieldArr
                );
              } else if (response.type === "error") {
                console.error("Error:", response.error.message);
              }
            })
            .catch((error: any) => {
              console.error("Unexpected error:", error);
            });
        } else {
          notification.error({ message: "GUID Not found" });
        }
      }
    } else if (taskDataArr.length) {
      if (buttonType === "Save") {
        if (guId) {
          let _result = await fetchFieldMapping(guId);
          let updatedData = taskDataArr.map((item: any) => {
            return { ...item, ["isSavedType"]: "saved" };
          });
          commonFieldMappingSave(
            guId,
            _result,
            mappedField,
            updatedData,
            taskDataArr
          );
        } else {
          notification.error({ message: "GUID Not found" });
        }
      } else if (buttonType === "Default") {
        if (defaultGuId) {
          let _result = await fetchFieldMapping(defaultGuId);
          let updatedData = taskDataArr.map((item: any) => {
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
                  taskDataArr
                );
              } else if (response.type === "error") {
                console.error("Error:", response.error.message);
              }
            })
            .catch((error: any) => {
              console.error("Unexpected error:", error);
            });
        } else {
          notification.error({ message: "GUID Not found" });
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
      let response: any = await createMappingFile(mappedWorkItems, guId);
      if (response.type === "success") {
        findDevopsConfigGuId(cusId, cbsId);
        setIsLoading(false);
      } else if (response.type === "error") {
        setIsLoading(false);
      }
    } else {
      createDevConfig("newRecord", true);
    }
    setDraftData([]);
    console.log("defaultGuId", defaultGuId);
    setIsLoading(false);
  };

  const createDevConfig = async (
    recordType: any = "newRecord",
    isCreateMapping: boolean = false
  ) => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    var record: any = {};
    record.gyde_name = `react config ${recordType}${hours}${minutes}${seconds}`;
    record["gyde_customerorpartner@odata.bind"] =
      recordType === "default" ? `/accounts(${_pId})` : `/accounts(${cusId})`; // Lookup
    record[
      "gyde_customerbusinesssurvey@odata.bind"
    ] = `/gyde_customerbusinesssurveies(${cbsId})`; // Lookup
    //add  name default true;
    console.log("record1", record);
    setIsLoading(true);
    let newId = await createDevConfigApi(record);
    if (newId) {
      recordType === "default" && setDefaultGuId(newId),
        saveDefaultMappingData(newId)
          .then((response: any) => {
            if (response.type === "success") {
              console.log("success");
              setIsLoading(false);
            } else if (response.type === "error") {
              console.error("Error:", response.error.message);
              setIsLoading(false);
            }
          })
          .catch((error: any) => {
            console.error("Unexpected error:", error);
            setIsLoading(false);
          });
      recordType === "newRecord" && setGuId(newId);
      if (isCreateMapping) {
        let response: any = await createMappingFile(mappedWorkItems, newId);

        if (response.type === "success") {
          setIsMappedSaved(true);
          setIsLoading(false);
        } else if (response.type === "error") {
          setIsMappedSaved(false);
          setIsLoading(false);
        }
      }
      console.log("newId", newId);
      setIsLoading(false);
    }
  };
  const commonFieldMappingSave = (
    guId: any,
    _result: any,
    itemKey: any,
    dataSource: any,
    _defaultDataSource: any = []
  ) => {
    console.log("result101", guId, ":", _result, ":", itemKey, dataSource);
    console.log(
      "tag33:",
      _defaultDataSource,
      _defaultDataSource.every((field: any) => {
        console.log("A12", field.isSelected);
        return field.isSelected === true;
      })
    );
    let _isSelectedField = _defaultDataSource.every(
      (field: any) => field.isSelected
    );
    const filteredObjects = _defaultDataSource.filter(
      (item: any) => item.pickListArr?.length > 0 || item.enable === true
    );
    console.log("filterOv", filteredObjects);

    let _isCompletePickList = filteredObjects.every(
      (field: any) => field.isPickListComplete
    );
    let isCompleted = _isSelectedField & _isCompletePickList;
    let mappingStatus = { key: mappedField, value: isCompleted };
    console.log(
      "isCompleted:",
      mappingStatus,
      isCompleted,
      _isSelectedField,
      _isCompletePickList,
      _isSelectedField & _isCompletePickList
    );
    if (_result.type === "success") {
      const _resultData = JSON.parse(_result.data);
      const updatedData = _resultData.map((item: any) => {
        if (item.key === itemKey) {
          return { ...item, ["value"]: dataSource };
        }
        return item;
      });
      if (!updatedData.some((item: any) => item.key === itemKey)) {
        updatedData.push({ key: itemKey, value: dataSource });
      }
      console.log("updated103", updatedData);
      saveFieldmappingData(updatedData, guId, mappingStatus);
    } else if (_result.type === "error") {
      console.log("ABCCALLERR");
      let _structureData = [{ key: itemKey, value: dataSource }];
      saveFieldmappingData(_structureData, guId, mappingStatus);
    }
  };
  // condition to Enable Final devops button to connect..
  const checkFinalMappingStatus = (array: [], column: string) => {
    console.log(
      "inside condition: ",
      array.every((element) => element[column])
    );
    return array.every((element) => element[column] === true);
  };

  useEffect(() => {
    console.log("tag700", retrieveDevopsMapping, draftData);
  }, [retrieveDevopsMapping, draftData]);
  useEffect(() => {
    console.log("tg71", devopsResult, dataAfterSave);
  }, [devopsResult, dataAfterSave]);
  console.log(
    "final condition ::",
    checkFinalMappingStatus(retrieveDevopsMapping, "fieldMapping"),
    checkFinalMappingStatus(retrieveDevopsMapping, "isCorrectlyMapped")
  );
  console.log("caal Iit", devopsResult, dataAfterSave);

  const saveFieldmappingData = (data: any, guId: any, mappingStatus: any) => {
    saveMappingData(data, guId)
      .then((result: any) => {
        if (result.type === "success") {
          setIsSavedCompleteFlag(mappingStatus);
          setIsLoading(false);
          setIsModalOpen(false);
        } else {
          console.error("Save failed with status:", result.status);
          setIsLoading(false);
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        setIsLoading(false);
        setIsModalOpen(false);
      });
  };

  return (
    <div className="devops-container">
      <Spin spinning={isLoading}>
        <h1 className="title">DevOps Work Items</h1>
        <div className="bg-wrap">
          <h3 className="sub-title">
            <span>Connection Details</span>
            <span>
              {" "}
              <h5 className="sub-title2">{configurationData?.gyde_name} </h5>
            </span>
          </h3>
          <ConnectionComponent
            setWorkItemData={(res: any) => {
              setDevopsWorkItemTypes(res?.data?.Value),
                setDevopsResult(res?.data?.Value ? true : false);
            }}
            connectionFetch={(res: any) => setDevopsResult(res)}
          />
          <div className="text-left mb-20"></div>
          {devopsResult && (
            <>
              {dataAfterSave?.length > 0 &&
                checkFinalMappingStatus(dataAfterSave, "fieldMapping") &&
                checkFinalMappingStatus(dataAfterSave, "isCorrectlyMapped") && (
                  <Radio.Group
                    options={[
                      { label: "DevOps Generator", value: "devopsGenerator" },
                      { label: "Configure Mapping", value: "configureMapping" },
                    ]}
                    onChange={handleConfigure}
                    value={configureSettings}
                    optionType="button"
                    buttonStyle="solid"
                  />
                )}

              <h3 className="sub-title">Mapping - Work Item Types</h3>
              <TableComponent
                dataSource={...retrieveDevopsMapping}
                columns={workItemColumns}
                onMapping={() => {}}
                size="small"
                scroll={{ y: 300 }}
                isModelopen={false}
                modelAction={showModal}
                className={
                  checkFinalMappingStatus(dataAfterSave, "isCorrectlyMapped") &&
                  configureSettings == "devopsGenerator"
                    ? "disable-table"
                    : ""
                }
                setDropDownValue={(data: any) => setSelectedWorkItem(data)}
                // disabled={configureSettings == "devopsGenerator" ? true : false}
                saveMappingItems={(data: any) => setMappedWorkItems(data)}
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
                    window.location.href = `/${_navigateUrl}`;
                  }}
                >
                  Cancel
                </Button>

                {dataAfterSave?.length > 0 &&
                checkFinalMappingStatus(dataAfterSave, "fieldMapping") &&
                checkFinalMappingStatus(dataAfterSave, "isCorrectlyMapped") &&
                configureSettings == "devopsGenerator" ? (
                  <Button type="primary" htmlType="button" onClick={() => ""}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={handleMappingItemSave}
                    // disabled={checkFinalMappingStatus(mappedWorkItems, "isCorrectlyMapped")}
                  >
                    Save
                  </Button>
                )}
              </span>
            </>
          )}
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
                  <Spin spinning={isLoading}>
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
                      currentPickListData={dataArr}
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
                          handleCancel();
                        }}
                        style={{ marginLeft: "5px" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="ant-btn-primary"
                        onClick={(e) => {
                          savePopupModelData("Default");
                          /* Handle button click */
                        }}
                        style={{ marginLeft: "5px" }}
                      >
                        Set as Default
                      </Button>
                      <Button
                        className="ant-btn-primary"
                        onClick={() => {
                          savePopupModelData("Save");
                        }}
                        style={{ marginLeft: "5px" }}
                      >
                        Save
                      </Button>
                    </div>
                  </Spin>
                </div>
              }
            />
          )}
        </div>
      </Spin>
    </div>
  );
}
