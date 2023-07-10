import React, { useEffect, useState } from "react";
import { Table, Select, Input, Button, Collapse, Form ,Typography, Result} from "antd";
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
  isPicklistModel?:boolean;
  setDataArr?:any;
  setFieldDataArr?:any;
  disabled?:boolean;
  FieldDataSource?:any[];
  currentRecordKey?:any;
  pickListDataSource?:any
  currentPickListData?:any;
  defaultPickListData?:any;
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

// const dataSource = [
//   { key: '1', name: 'John Doe', age: 32, country: 'USA', info: 'Additional info for John Doe' },
//   { key: '2', name: 'Jane Smith', age: 28, country: 'Canada', info: 'Additional info for Jane Smith' },
// ];

// const columns = [
//   { title: 'Name', dataIndex: 'name', key: 'name' },
//   { title: 'Age', dataIndex: 'age', key: 'age', textField: true },
//   { title: 'Country', dataIndex: 'country', key: 'country', dropdownOptions: ['USA', 'Canada', 'UK'] },
//   { title: 'Info', dataIndex: 'info', key: 'info', accordionContent: 'Additional info' },
// ];

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
  
  ...rest
}) => {
  const [tableData, setTableData] = useState(dataSource);
  const [tablePickListData, setTablePickData] = useState(pickListDataSource);
  const [dropdownErrors, setDropdownErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [dropDownOptions, setDropDownOptions] = useState<any>([]);
  const [isPickListModelOpen,setIsPickLisModalOpen] = useState<boolean>(false);
  const [pickListColoumn,setPickListColoumn] = useState<any>([]);
  const [pickListData,setPickListData] = useState<any>([]);
  const [pickListFlag,setPickListFlag] = useState<any>([]);
  const [currentRecord,setCurrentRecord] = useState<any>([]);
  const [defaultPickListRecord,setDefaultPickListRecord] = useState<any>([]);
  
  useEffect(() => {
    // Update the PCF control's context or notify changes here
    // Pass the updated tableData to the PCF framework
    // You may need to use specific PCF methods or update the control's properties/state
    console.log("data ===> ", tableData);
    console.log("pickListFlag",pickListFlag);
    
  
    console.log("isPicklist",isPickListModelOpen);
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
    console.log("isModelopen Now", isModelopen ? record : "");
    let currentValue = isModelopen
      ? record?.dropdown.find(
          (dropDownData: any) =>
            record.sourceWorkItem === dropDownData.dropdownValue
        )
      : record[dataIndex];
    console.log("currentValuecurrentValue", currentValue);
    console.log("options======> ", options);

  
    isPicklistModel && console.log("defaultData1:",record,":|",defaultPickListData);
     let currentRecordValue =  isPicklistModel  && defaultPickListData.length ? defaultPickListData.filter((items:any) => items.crmOption === record.souruceOption).map((_data:any) => _data.devOpsOption ) : []
console.log("ZZZZZZZZZZZZZZ",currentRecordValue);

    return isModelopen && record?.isText  ?  <div>
   <Text>{record?.devopsWorkItem}</Text>
    
    </div>   :(

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
                  defaultValue={isModelopen && currentValue?.dropdownValue}
                  onChange={(value) => {
                    handleFieldChange(record.key, dataIndex, value);
                  }}
                  // onBlur={() => handleDropdownBlur(dataIndex)}
                >
                  {record?.dropdown.map((_data: any, key: any) => (
                    <Option
                      key={key}
                      value={JSON.stringify({
                        value: _data.dropdownValue,
                        isPicklist: _data.isPickList,
                        option: _data.option,
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
               value={isModelopen ? currentValue?.dropdownValue : currentValue}
              defaultValue= {isPicklistModel ? currentRecordValue[0]:""}
              onChange={(value) => {
                handleFieldChange(record.key, dataIndex, value);
              }}
              disabled={disabled}
              // onBlur={() => handleDropdownBlur(dataIndex)}
            >
              {options.map((option: any) => {
               
              // console.log("CCCCC",record?.souruceOption)
          //      let _value =  defaultPickListData?.length && defaultPickListData.find((defaultValue:any) => defaultValue=== option) 
          //  console.log("_value1",_value);
         
                return (
                  <Option key={option} value={option} >
                  {option}
                </Option>
                )
              }
                
                
              )}

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
    const isEnable = dropDownOptions?.some(
      (item: any) => item == record?.country
    );
    const notNull = Boolean(record?.country);
    console.log("qqqqq", text);
    console.log("recordBTN", record);

    let pickListCompletedFlag =  isModelopen && Object.keys(record?.defaultOptionList).length && record?.defaultOptionList.defaultOptionList.filter((pickList:any)=>pickList.devOpsOption).every((f:any) => f !==  undefined)
   console.log("pickListCompletedFlag",pickListCompletedFlag);
   

    return (
      <div>
        {record?.enable && (
          <img
            src="https://orgd6396d1b.crm11.dynamics.com//WebResources/gyde_mapping.png"
            alt="1"
            style={{ marginLeft: 100 }}
            width={20}
            height={20}
            onClick={() => handleButtonClick(record)}
          />
        )}
        {isModelopen && record?.isPickListComplete&& <h1>hiii</h1>}
      </div>
    );
  };

  const handleButtonClick = (record: any) => {
    console.log("Button clicked for record:", record);
    if(!disabled){
        isModelopen ?  showPickListModal(record) :  setDropDownValue(record);  modelAction()
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
    // handleDropdownBlur(dataIndex);
  console.log("qqqwq",FieldDataSource,currentRecordKey);
 if(isPicklistModel){
  let currentValue = isModelopen && value !== "N/A" && JSON.parse(value);
  const updatedData = tablePickListData.map((item: any) => {
    console.log("OTem,",item);
    
    if (item.key === key) {
      return value == "N/A"
        ? { ...item, [dataIndex]: value, enable: false,isSelected:true }
        : { ...item, [dataIndex]:value, enable: true ,isSelected:true};
    }
    return item;
    
  });
  

  console.log("updatedData PickList",updatedData);
  console.log("qqqwq",FieldDataSource,currentRecordKey,updatedData,isPicklistModel)
  setTablePickData(updatedData)
  setDataArr(updatedData)
  console.log("tablePi",tablePickListData);
  

 }
 else {
  console.log("all params :", key, dataIndex, value);
  console.log("come field change =======> ", key, dataIndex, value);
  const changedField = tableData?.find((item: any) => item?.key == key);
  let currentValue = isModelopen && value !== "N/A" && JSON.parse(value);
  console.log("come field change =======> ", key, dataIndex, value);

  const updatedData = tableData.map((item: any) => {
    if (item.key === key) {
      return value == "N/A"
        ? { ...item, [dataIndex]: value, enable: false,isSelected:true }
        : isModelopen
        ? currentValue?.isPicklist
          ? { ...item, [dataIndex]: currentValue.value,  ["defaultOptionList"]: [],enable: true, isSelected:true }
          : { ...item, [dataIndex]: currentValue.value, ["defaultOptionList"]: [],enable: false,isSelected:true }
        : { ...item, [dataIndex]: value, enable: true ,isSelected:true};
    }
    return item;
  });
  console.log("changedField  ===> ", changedField);
  console.log("updatedDataupdatedData",updatedData);

  setTableData(updatedData);
  setFieldDataArr(updatedData)
 }
   
    // isPicklistModel === false &&  setFieldDataArr(updatedData)

    
    //savePopupModelData(updatedData)
    
   
    
    // handleDropdownBlur(dataIndex);
    
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
    console.log("xxcccc",dataIndex,
    dropdownOptions,
    textField,
    buttonField,
    accordionContent,);
    
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
    console.log("aq", dataIndex, renderCell);

    return {
      dataIndex,
      render: renderCell,
      ...restColumn,
    };
  });

  /** picklist popup model */
  const workItemColumns = [
    { title: 'SOURCE OPTION', dataIndex: 'souruceOption', key: 'souruceOption' },
    { title: 'DEVOPS TARGET OPTION', dataIndex: 'devopsOption', key: 'devopsOption', dropdownOptions: pickListColoumn },
  ];
  const showPickListModal = (record:any) => { 
    console.log("picklistmodel record:",record);
    record &&  setCurrentRecord(record?.key)
    console.log("picklistModel current Record:",currentRecord);
    
 
    if(record.isText === false){
  
       const _optionDataSource = record.dropdown.filter((option:any)=> {
        if(record.devopsWorkItem) return option.dropdownValue === record?.devopsWorkItem
        else  return option.dropdownValue === record?.sourceWorkItem
       }).map((item:any,key:any)=> {
       let crm =   item.option[0].crmOption.map((crmoption:any,key:any) => {
          return {key:key,souruceOption:crmoption}
        } )
        let devops =   item.option[0].devOpsOption.map((devOpsoption:any) => {
          return devOpsoption;
        } )
        return  {tableDataSource:crm,optionList:devops}
      })
      console.log("_optionataSource",_optionDataSource);
      setPickListData(_optionDataSource[0].tableDataSource)
      setPickListColoumn(_optionDataSource[0].optionList)

      

      const { crmOption =[], devOpsOption =[] } =  Object.keys(record.defaultOptionList).length && record.defaultOptionList.defaultOptionList[0];
     const result =crmOption.length && crmOption.map((value:any, index:any) => ({ crmOption: value, devOpsOption: devOpsOption[index] === undefined ? null: devOpsOption[index]}));
     
     console.log(result);
     
      
        console.log("defaultRecord",result);
        setDefaultPickListRecord(result)
      setIsPickLisModalOpen(true);


    }
    //else{
    //   const _defaultOptionDataSource = record?.defaultOptionList.defaultOptionList.map((option:any) => {
    //     let crm =     option.crmOption.map((crmoption:any,key:any) => {
    //       return {key:key,souruceOption:crmoption,option:option.devOpsOption}
    //     })
    //     let devops =     option.devOpsOption.map((devOpsOption:any) => {
    //       return devOpsOption;
    //     })
    //     return  {tableDataSource:crm,optionList:devops}
    // } );
    // console.log("11222",_defaultOptionDataSource);
    // setPickListData(_defaultOptionDataSource[0].tableDataSource)
    // setPickListColoumn(_defaultOptionDataSource[0].optionList)
    //   setIsPickLisModalOpen(true);
    //   console.log("open",isPickListModelOpen);
      
    // } 
    
  };

  const handleOk = () => {
    setIsPickLisModalOpen(false);
  };

  const handleCancel = () => {    
    setIsPickLisModalOpen(false);
    
  };

  const savePickListData = () =>{
    console.log("click",isPicklistModel, currentPickListData)
    if(currentPickListData.length){
    console.log("picListDataArr",tableData,currentRecordKey)
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
    
      const _result = tableData.filter((_data)=> _data.key === currentRecord
      ).map((_field)=>{
            if(Object.keys(_field.defaultOptionList).length){
              const { crmOption, devOpsOption } =   _field.defaultOptionList.defaultOptionList[0]    
              const result = crmOption.map((value:any, index:any) => ({ crmOption: value, devOpsOption: devOpsOption[index] }));
       return result;
      
            } else {
              return [];
            }     
      })
      console.log("RRRRR",_result);
      
if(_result[0].length){
        const updatedR = currentPickListData.map((xObj:any) => {
          const rObj = _result[0].find((rObj:any) => rObj.crmOption === xObj.souruceOption);
          if (rObj && xObj.devopsOption !== undefined) {
              return { ...rObj, devOpsOption: xObj.devopsOption };
          }
          return rObj;
      });

      console.log("updatedR",currentRecord,currentPickListData,_result,updatedR);


      let _matchDevopsPickListData = updatedR.map(
        (f: any) => f.devOpsOption
      );
      let _updatedpicklistFlag = updatedR.every(
        (f: any) => f.devOpsOption !== undefined
      );
      let matchCrmPickListData = updatedR.map(
        (f: any) => f.crmOption
      );

      let pickListItems = [
        {
          crmOption: matchCrmPickListData,
          devOpsOption: _matchDevopsPickListData,
        },
      ];

      let updateditems = tableData?.map((field: any) => {
        if (field.key == currentRecord) {
          return {
            ...field,
            ["defaultOptionList"]: { defaultOptionList: pickListItems },
            ["isPickListComplete"]:_updatedpicklistFlag
          };
        }
        console.log("field", field);

        return field;
      });
      console.log("picklistSave",updateditems);

      setTableData(updateditems)
      setFieldDataArr(updateditems)
      setPickListFlag(_picklistFlag)
}else {
  console.log(" default");
  
          let pickListItems = [
            {
              crmOption: crmPickListData,
              devOpsOption: devopsPickListData,
            },
          ];
          
          let updateditems = tableData?.map((field: any) => {
            if (field.key == currentRecord) {
              return {
                ...field,
                ["defaultOptionList"]: { defaultOptionList: pickListItems },
                ["isPickListComplete"]:_picklistFlag
              };
            }
            console.log("field", field);

            return field;
          });
          console.log("picklistSave",updateditems);

          setTableData(updateditems)
          setFieldDataArr(updateditems)
          setPickListFlag(_picklistFlag)
}
  

     // setDataArr({key:currentRecordKey,updatedData})
    }else{
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
      console.log("picklistSave",updateditems);

      setTableData(updateditems)
      setFieldDataArr(updateditems)

    }
    //console.log("pickListSavedData",pickListSavedData);
    
  }


  return (
    <div>
       {isPickListModelOpen  &&  <PopupComponent 
        visible={isPickListModelOpen} onOk={handleOk} onClose={handleCancel}
         buttons={[{title: "Cancel", onClickHandler: ""}, {title: "Set as Default", onClickHandler: ""} ,{title: "Save", onClickHandler: ""}]} 
         Content={ <>
         <TableComponent 
                    dataSource={tableData} 
                    pickListDataSource ={pickListData}
                    columns={workItemColumns} 
                    onMapping={() => {}}   
                    size='small'scroll={{ y: 300 }} 
                    modelAction={showPickListModal} 
                    isModelopen= {false}
                    isPicklistModel ={true}
                     FieldDataSource ={tableData}
                     currentRecordKey ={currentRecord}
                     setDataArr={setDataArr}
                     currentPickListData={currentPickListData}
                     defaultPickListData={defaultPickListRecord}
                     
                  />
                
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <Button className='ant-btn-primary'  onClick={(e) => { /* Handle button click */ }} style={{marginLeft:'5px'}}>
                  Cancel
                    </Button>
                    <Button className='ant-btn-primary'  onClick={savePickListData} style={{marginLeft:'5px'}}>
                    Save
                    </Button>
                    </div>
         
         </>}
                  Ispicklist={400}
      /> }
      {Object.entries(dropdownErrors).map(([dataIndex, error]) => (
        <div key={dataIndex}>
          {error}
          <></>
        </div>
      ))}
      <Table
        className={isModelopen ? "pop-up-Table" : ""}
        dataSource={isPicklistModel ? tablePickListData :tableData}
        columns={updatedColumns}
        pagination={false}
        {...rest}
      />
    </div>
  );
};

export default TableComponent;
