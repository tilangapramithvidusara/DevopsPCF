import React, { useEffect, useState } from "react";
import {
  Table,
  Select,
  Input,
  Button,
  Collapse,
  Form,
  Typography,
  Result,
} from "antd";
import { TableProps } from "antd/lib/table";
import LinkOutLined from "@ant-design/icons";
import PopupComponent from "./PopupComponent";

const { Text } = Typography;
// import * as Mapping from '../Images/mapping.png';
// interface CommonTableProps extends TableProps<any> {
//   dataSource: any[];
//   columns: any[];
// }

const { Option } = Select;
const { Panel } = Collapse;

interface CommonTableProps extends TableProps<any> {
  dataSource: any[];
  columns: TableColumn[];
  onMapping: any;
  modelAction: any;
  isModelopen: boolean;
  setDropDownValue?: any;
  isPicklistModel?: boolean;
  setDataArr?: any;
  setFieldDataArr?: any;
  disabled?: boolean;
  FieldDataSource?: any[];
  currentRecordKey?: any;
  pickListDataSource?: any;
  currentPickListData?: any;
  defaultPickListData?: any;
  saveMappingItems?: any;
  setMappingType?: any;
  setWorkitemTypeData?: any;
  setPickListArr?: any;
  isGuid?: any;
}

interface TableColumn {
  title: string;
  dataIndex: string;
  key: string;
  dropdownOptions?: string[];
  textField?: boolean;
  buttonField?: boolean;
  accordionContent?: string;
}
const TableComponent: React.FC<CommonTableProps> = ({
  dataSource,
  columns,
  onMapping,
  modelAction,
  isModelopen,
  setDropDownValue,
  isPicklistModel,
  setDataArr,
  FieldDataSource,
  currentRecordKey,
  setFieldDataArr,
  currentPickListData,
  pickListDataSource,
  defaultPickListData,
  disabled,
  setMappingType,
  saveMappingItems,
  setPickListArr,
  setWorkitemTypeData,
  isGuid,
  ...rest
}) => {
  const [tableData, setTableData] = useState(dataSource);
  const [tablePickListData, setTablePickData] = useState(pickListDataSource);
  const [dropdownErrors, setDropdownErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [dropDownOptions, setDropDownOptions] = useState<any>([]);
  const [isPickListModelOpen, setIsPickLisModalOpen] = useState<boolean>(false);
  const [pickListColoumn, setPickListColoumn] = useState<any>([]);
  const [pickListData, setPickListData] = useState<any>([]);
  const [pickListFlag, setPickListFlag] = useState<any>([]);
  const [currentRecord, setCurrentRecord] = useState<any>([]);
  const [defaultPickListRecord, setDefaultPickListRecord] = useState<any>([]);

  useEffect(() => {
    // Update the PCF control's context or notify changes here
    // Pass the updated tableData to the PCF framework
    // You may need to use specific PCF methods or update the control's properties/state
    console.log("dataSource ===> ", dataSource);
    //!isModelopen  || !isPicklistModel && setTableData(dataSource)
    !isModelopen && !isPicklistModel && setTableData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    console.log("dataChanged ===> ", tableData);
  }, [tableData]);

  useEffect(() => {
    if (tableData && !isModelopen) {
      const mappingFlag = tableData?.map((data: any) => {
        return {
          ...data,
          isCorrectlyMapped: data?.gyde_name ? true : false,
        };
      });
      saveMappingItems(mappingFlag);
      console.log("check mapping..", mappingFlag);
    }
  }, [tableData]);

  const renderDropdown = (
    options: string[],
    record: any,
    dataIndex: string,
    columnData: any
  ) => {
    const error = dropdownErrors[dataIndex];
    const isError = !!error;
    setDropDownOptions(options);
    console.log("record Now", record);
    console.log("isModelopen Now", isModelopen ? record : "");
    let currentValue =
      isModelopen && record?.dropdown?.length
        ? record?.dropdown?.find(
            (dropDownData: any) =>
              record.sourceWorkItem === dropDownData.dropdownValue
          )
        : "N/A";
    console.log("currentValuecurrentValue", currentValue);
    console.log("options======> ", options);
    isPicklistModel &&
      console.log("defaultData picList ===>:",record, ":|",defaultPickListData);
    let currentRecordValue =
      isPicklistModel && defaultPickListData.length
        ? defaultPickListData
            .filter((items: any) => items.crmOption === record.souruceOption)
            .map((_data: any) => _data.devOpsOption)
        : [];
    const updatedDropDown =
      isModelopen &&
      record?.dropdown.filter((item1: any) => {
        const matchingArray2Item = tableData.find(
          (item2: any) => item2.devopsWorkItem === item1.dropdownValue
        );
        return !matchingArray2Item;
      });
    const alreadySelectedValues = tableData?.map(
      (item: any) => item?.gyde_name
    );
    const dropDownFilter = options?.filter(
      (item: any) => !alreadySelectedValues?.includes(item)
    );
    console.log("tablePickListData", tablePickListData);
    const pickListDropDownArr = options.filter((option: any) => {
      if (tablePickListData) {
        const foundItem = tablePickListData.find(
          (item: any) => option === item?.devopsOption
        );
        return !foundItem; // Exclude options that have a matching devopsOption in tablePickListData
      } else {
        return true; // Keep all options when tablePickListData is not available
      }
    });
    console.log("pickListDropDownArr", pickListDropDownArr);
    return isModelopen && record?.isText ? (
      <div>
        <Text>{record?.devopsWorkItem}</Text>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {record?.fixed ? (
          <>{record[columnData.key]}</>
        ) : (
          <>
            {isModelopen ? (
              <>
                <Select
                  style={{
                    width: "100%",
                    borderColor: isError ? "red" : undefined,
                  }}
                  defaultValue={
                    isModelopen && record.isSavedType === "saved"
                      ? record?.devopsWorkItem
                        ? record?.devopsWorkItem
                        : currentValue?.dropdownValue
                        ? currentValue?.dropdownValue
                        : ""
                      : record.isSavedType === "setasDefault"
                      ? record?.devopsWorkItem
                        ? record?.devopsWorkItem
                        : currentValue?.dropdownValue
                        ? currentValue?.dropdownValue
                        : ""
                      : record.isSavedType === "default"
                      ? currentValue?.dropdownValue
                        ? currentValue?.dropdownValue
                        : record?.devopsWorkItem
                        ? record?.devopsWorkItem
                        : ""
                      : ""
                  }
                  onChange={(value) => {
                    handleFieldChange(record.key, dataIndex, value);
                  }}
                >
                  {updatedDropDown.map((_data: any, key: any) => (
                    <Option
                      key={key}
                      value={JSON.stringify({
                        value: _data.dropdownValue,
                        isPicklist: _data.isPickList,
                        option: _data.option,
                        fieldReferenceName: _data?.fieldReferenceName,
                      })}
                    >
                      {_data.dropdownValue}
                    </Option>
                  ))}
                  <Option key={"NA"} value={"N/A"}>
                    N/A
                  </Option>
                </Select>
              </>
            ) : (
              <Select
                style={{
                  width: "100%",
                  borderColor: isError ? "red" : undefined,
                }}
                value={
                  isModelopen ? currentValue?.dropdownValue : record?.gyde_name
                }
                defaultValue={
                  isPicklistModel ? currentRecordValue[0] : record?.gyde_name
                }
                onChange={(value) => {
                  handleFieldChange(record.key, dataIndex, value);
                }}
                disabled={disabled}
              >
                {isPicklistModel
                  ? pickListDropDownArr.map((option: any) => {
                      return (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      );
                    })
                  : dropDownFilter?.map((option: any) => {
                      return (
                        <Option key={option} value={option}>
                          {option}
                        </Option>
                      );
                    })}
                <Option key={"NA"} value={"N/A"}>
                  N/A
                </Option>
              </Select>
            )}
            {isError && <div style={{ color: "red" }}>{error}</div>}
          </>
        )}
      </div>
    );
  };

  const renderTextField = (record: any, dataIndex: string) => (
    <Input
      value={record[dataIndex]}
      onChange={(e) => handleFieldChange(record.key, dataIndex, e.target.value)}
    />
  );

  const renderButton = (text: string, record: any, dataIndex: string) => {
    const isEnableFlag = dropDownOptions?.some(
      (item: any) => item == record?.country
    );
    const notNull = Boolean(record?.country);
    console.log("recordBTN", record);
    let pickListCompletedFlag =
      isModelopen &&
      Object.keys(record?.defaultOptionList).length &&
      record?.defaultOptionList.defaultOptionList
        .filter((pickList: any) => pickList.devOpsOption)
        .every((f: any) => f !== undefined);
    console.log("pickListCompletedFlag", pickListCompletedFlag);
    const checkMappedStatus = () => {
      if (isModelopen) {
        if (record?.isPickListComplete) {
          return "/blue-link.png";
        } else {
          return "/black-link.png";
        }
      } else {
        if (record?.fieldMapping) {
          return "/blue-link.png";
        } else {
          return "/black-link.png";
        }
      }
    };

    return (
      <div>
        {isGuid ? (
          <>
            {record?.enable && (
              <img
                src={checkMappedStatus()}
                alt="1"
                style={{ marginLeft: 100 }}
                width={20}
                height={20}
                onClick={() => handleButtonClick(record)}
              />
            )}{" "}
          </>
        ) : (
          ""
        )}
      </div>
    );
  };

  const handleButtonClick = (record: any) => {
    console.log("Button clicked for record:", record);
    record?.name &&
      setMappingType({ devOps: record?.gyde_name, source: record?.name });
    if (!disabled) {
      isModelopen ? showPickListModal(record) : setDropDownValue(record);
      modelAction();
    }
  };

  const renderAccordion = (content: string) => (
    <Collapse>
      <Panel header="More Info" key="1">
        <p>{content}</p>
      </Panel>
    </Collapse>
  );

  const handleFieldChange = (key: string, dataIndex: string, value: any) => {
    console.log("handleFieldChange", FieldDataSource, currentRecordKey);
    if (isPicklistModel) {
      const updatedData = tablePickListData.map((item: any) => {
        if (item.key === key) {
          return value == "N/A"
            ? { ...item, [dataIndex]: value, enable: false, isSelected: true }
            : { ...item, [dataIndex]: value, enable: true, isSelected: true };
        }
        return item;
      });
      console.log("updatedData PickList", updatedData);
      setTablePickData(updatedData);
      setDataArr(updatedData);
      console.log("tablePi", tablePickListData);
    } else {
      console.log("all params :", key, dataIndex, value);
      const changedField = tableData?.find((item: any) => item?.key == key);
      let currentValue = isModelopen && value !== "N/A" && JSON.parse(value);
      console.log("Tag84", currentValue);
      const updatedData = tableData.map((item: any) => {
        if (item.key === key) {
          return value == "N/A"
            ? { ...item, [dataIndex]: value, enable: false, isSelected: true }
            : isModelopen
            ? currentValue?.isPicklist
              ? {
                  ...item,
                  [dataIndex]: currentValue.value,
                  ["defaultOptionList"]: [],
                  enable: true,
                  isSelected: true,
                  ["isPickListComplete"]: false,
                  fieldReferenceName: currentValue?.fieldReferenceName,
                }
              : {
                  ...item,
                  [dataIndex]: currentValue.value,
                  ["defaultOptionList"]: [],
                  enable: false,
                  isSelected: true,
                  ["isPickListComplete"]: false,
                  fieldReferenceName: currentValue?.fieldReferenceName,
                }
            : { ...item, [dataIndex]: value, enable: true, isSelected: true };
        }
        return item;
      });
      console.log("changedField  ===> ", changedField);
      console.log("updatedDataupdatedData", updatedData);
      setTableData(updatedData);
      isModelopen && setFieldDataArr(updatedData);
    }
  };

  const handleDropdownBlur = (dataIndex: string) => {
    const updatedErrors = { ...dropdownErrors };
    const columnData = tableData.map((item: any) => item[dataIndex]);
    console.log(
      "cococococ ===> ",
      columnData,
      new Set(columnData).size !== columnData.length
    );

    if (new Set(columnData).size !== columnData.length) {
      updatedErrors[dataIndex] = "Duplicate values are not allowed";
    } else {
      updatedErrors[dataIndex] = null;
    }
    setDropdownErrors(updatedErrors);
  };

  // ADD TYPE ACCRODING TO TYPES
  let updatedColumns = columns.map((column: any) => {
    const {
      dataIndex,
      dropdownOptions,
      textField,
      buttonField,
      accordionContent,
      ...restColumn
    } = column;

    let renderCell;
    console.log(
      "updatedColumns ===>",
      dataIndex,
      dropdownOptions,
      textField,
      buttonField,
      accordionContent
    );

    if (dropdownOptions) {
      renderCell = (text: string, record: any) =>
        renderDropdown(dropdownOptions, record, dataIndex, column);
    } else if (textField) {
      renderCell = (text: string, record: any) =>
        renderTextField(record, dataIndex);
    } else if (accordionContent) {
      renderCell = (text: string) => renderAccordion(accordionContent);
    } else if (buttonField) {
      renderCell = (text: string, record: any) =>
        renderButton(text, record, dataIndex);
    }
    return {
      dataIndex,
      render: renderCell,
      ...restColumn,
    };
  });

  /** picklist popup model */
  const workItemColumns = [
    {
      title: "SOURCE OPTION",
      dataIndex: "souruceOption",
      key: "souruceOption",
    },
    {
      title: "DEVOPS TARGET OPTION",
      dataIndex: "devopsOption",
      key: "devopsOption",
      dropdownOptions: pickListColoumn,
    },
  ];
  const showPickListModal = (record: any) => {
    console.log("picklistmodel record:", record);
    record && setCurrentRecord(record?.key);
    console.log("picklistModel current Record:", currentRecord);
    if (record.isText === false) {
      const _optionDataSource = record.dropdown
        .filter((option: any) => {
          if (record.devopsWorkItem)
            return option.dropdownValue === record?.devopsWorkItem;
          else return option.dropdownValue === record?.sourceWorkItem;
        })
        .map((item: any, key: any) => {
          let crm = item.option[0].crmOption.map((crmoption: any, key: any) => {
            return { key: key, souruceOption: crmoption };
          });
          let devops = item.option[0].devOpsOption.map((devOpsoption: any) => {
            return devOpsoption;
          });
          return { tableDataSource: crm, optionList: devops };
        });
      console.log("_optionataSource", _optionDataSource);
      setPickListData(_optionDataSource[0].tableDataSource);
      setPickListColoumn(_optionDataSource[0].optionList);

      const { crmOption = [], devOpsOption = [] } =
        Object.keys(record.defaultOptionList).length &&
        record.defaultOptionList.defaultOptionList[0];
      const result =
        crmOption.length &&
        crmOption.map((value: any, index: any) => ({
          crmOption: value,
          devOpsOption:
            devOpsOption[index] === undefined ? null : devOpsOption[index],
        }));
      console.log(result);
      console.log("defaultRecord", result);
      setDefaultPickListRecord(result);
      setIsPickLisModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsPickLisModalOpen(false);
  };

  const handleCancel = () => {
    setIsPickLisModalOpen(false);
  };

  const savePickListData = () => {
    console.log("savePickListData ==>", isPicklistModel, currentPickListData);
    if (currentPickListData.length) {
      console.log("picListDataArr", tableData, currentRecordKey);
      let devopsPickListData = currentPickListData.map(
        (f: any) => f.devopsOption
      );
      let _picklistFlag = currentPickListData.every(
        (f: any) => f.devopsOption !== undefined
      );
      let crmPickListData = currentPickListData.map(
        (f: any) => f.souruceOption
      );
      console.log("devopsPickListData", devopsPickListData);
      console.log("devopsPickListData", _picklistFlag);
      const _result = tableData
        .filter((_data) => _data.key === currentRecord)
        .map((_field) => {
          if (Object.keys(_field.defaultOptionList).length) {
            const { crmOption, devOpsOption } =
              _field.defaultOptionList.defaultOptionList[0];
            const result = crmOption.map((value: any, index: any) => ({
              crmOption: value,
              devOpsOption: devOpsOption[index],
            }));
            return result;
          } else {
            return [];
          }
        });

      console.log("savePickListData _result ==>", _result);
      if (_result[0].length) {
        const updatedR = currentPickListData.map((xObj: any) => {
          const rObj = _result[0].find(
            (rObj: any) => rObj.crmOption === xObj.souruceOption
          );
          if (rObj && xObj.devopsOption !== undefined) {
            return { ...rObj, devOpsOption: xObj.devopsOption };
          }
          return rObj;
        });

        console.log("updatedR", updatedR,updatedR?.length );

      const _isemptyPickList =   updatedR.every((item:any)=> item === undefined)

      if(_isemptyPickList) {
        console.log("#5558");
          
        setIsPickLisModalOpen(false);
      }
      else if(updatedR?.length > 0){
          let _matchDevopsPickListData = updatedR.map((f: any) => f.devOpsOption);
          let _updatedpicklistFlag = _matchDevopsPickListData.every(
            (f: any) => f !== undefined && f !== null
          );
          let matchCrmPickListData = updatedR.map((f: any) => f.crmOption);
  
          console.log(
            "tg4",
            _matchDevopsPickListData,
            matchCrmPickListData,
            _updatedpicklistFlag
          );
          let pickListItems = [
            {
              crmOption: matchCrmPickListData,
              devOpsOption: _matchDevopsPickListData,
            },
          ];
          let updateditems = tableData?.map((field: any) => {
            if (field.key == currentRecord) {
              const updatedPickListName = field.isPickListComplete
                ? [...field.isPickListComplete, currentRecord]
                : [currentRecord];
              return {
                ...field,
                ["defaultOptionList"]: { defaultOptionList: pickListItems },
                ["isPickListComplete"]: _updatedpicklistFlag,
                ["pickListArr"]: updatedPickListName,
              };
            }
            console.log("field", field);
            return field;
          });
          console.log("picklistSave", updateditems);
          setTableData(updateditems);
          setFieldDataArr(updateditems);
          setPickListFlag(_picklistFlag);
        }else {
          console.log("#555");
          
          setIsPickLisModalOpen(false);
        
        }
       
      } else {
        console.log(" default");
        let pickListItems = [
          {
            crmOption: crmPickListData,
            devOpsOption: devopsPickListData,
          },
        ];

        let updateditems = tableData?.map((field: any) => {
          if (field.key == currentRecord) {
            const updatedPickListName = field.isPickListComplete
              ? [...field.isPickListComplete, currentRecord]
              : [currentRecord];
            return {
              ...field,
              ["defaultOptionList"]: { defaultOptionList: pickListItems },
              ["isPickListComplete"]: _picklistFlag,
              ["pickListArr"]: updatedPickListName,
            };
          }
          console.log("field", field);
          return field;
        });
        console.log("picklistSave", updateditems);
        setTableData(updateditems);
        setFieldDataArr(updateditems);
        setPickListFlag(_picklistFlag);
      }
    } else {
      console.log("not default");
      let updateditems = tableData?.map((field: any) => {
        if (field.key == currentRecord) {
          return {
            ...field,
            ["defaultOptionList"]: { defaultOptionList: [] },
          };
        }
        console.log("field", field);
        return field;
      });
      console.log("picklistSave", updateditems);
      setTableData(updateditems);
      setFieldDataArr(updateditems);
    }
    setIsPickLisModalOpen(false);

  };

  return (
    <div>
      {isPickListModelOpen && (
        <PopupComponent
          visible={isPickListModelOpen}
          onOk={handleOk}
          onClose={handleCancel}
          buttons={[
            { title: "Cancel", onClickHandler: "" },
            { title: "Set as Default", onClickHandler: "" },
            { title: "Save", onClickHandler: "" },
          ]}
          Content={
            <>
              <TableComponent
                dataSource={tableData}
                pickListDataSource={pickListData}
                columns={workItemColumns}
                onMapping={() => {}}
                size="small"
                scroll={{ y: 300 }}
                modelAction={showPickListModal}
                isModelopen={false}
                isPicklistModel={true}
                FieldDataSource={tableData}
                currentRecordKey={currentRecord}
                setDataArr={setDataArr}
                currentPickListData={currentPickListData}
                defaultPickListData={defaultPickListRecord}
                saveMappingItems={() => {}}
                isGuid={isGuid}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  className="cancel-btn mr-10"
                  onClick={handleCancel}
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </Button>
                <Button
                  className="ant-btn-primary"
                  onClick={savePickListData}
                  style={{ marginLeft: "5px" }}
                >
                  Save
                </Button>
              </div>
            </>
          }
          Ispicklist={true}
        />
      )}
      {Object.entries(dropdownErrors).map(([dataIndex, error]) => (
        <div key={dataIndex}>
          {error}
          <></>
        </div>
      ))}
      <Table
        className={isModelopen ? "pop-up-Table" : ""}
        dataSource={isPicklistModel ? tablePickListData : tableData}
        columns={updatedColumns}
        pagination={false}
        {...rest}
      />
    </div>
  );
};

export default TableComponent;
