import React, { useEffect, useState } from "react";
import { Table, Select, Input, Button, Collapse, Form } from "antd";
import { TableProps } from "antd/lib/table";
import LinkOutLined from "@ant-design/icons";
import PopupComponent from "./PopupComponent";
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
  ...rest
}) => {
  const [tableData, setTableData] = useState(dataSource);
  const [dropdownErrors, setDropdownErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [dropDownOptions, setDropDownOptions] = useState<any>([]);
  const [isPickListModelOpen,setIsPickLisModalOpen] = useState<boolean>(false);
  const [pickListColoumn,setPickListColoumn] = useState<any>([]);
  const [pickListData,setPickListData] = useState<any>([]);
  useEffect(() => {
    // Update the PCF control's context or notify changes here
    // Pass the updated tableData to the PCF framework
    // You may need to use specific PCF methods or update the control's properties/state
    console.log("data ===> ", tableData);
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

    return (
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
              onChange={(value) => {
                handleFieldChange(record.key, dataIndex, value);
              }}
              // onBlur={() => handleDropdownBlur(dataIndex)}
            >
              {options.map((option: any) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}

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
      </div>
    );
  };

  const handleButtonClick = (record: any) => {
    console.log("Button clicked for record:", record);
    isModelopen ?  showPickListModal(record) :  setDropDownValue(record);  modelAction()
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
    console.log("all params :", key, dataIndex, value);
    console.log("come field change =======> ", key, dataIndex, value);
    const changedField = tableData?.find((item: any) => item?.key == key);
    // const updatedData = tableData.map((item: any) => {
    //   if (item.key === key) {
    //     return value =="N/A" ? { ...item, [dataIndex]: value,enable:false }:
    //     console.log("item11",item.dropdown.isPickList),
    //     {...item, [dataIndex]: value, enable:true};
    //   }
    //   return item;
    // });
    let currentValue = isModelopen && value !== "N/A" && JSON.parse(value);
    console.log("come field change =======> ", key, dataIndex, value);

    const updatedData = tableData.map((item: any) => {
      if (item.key === key) {
        return value == "N/A"
          ? { ...item, [dataIndex]: value, enable: false,isSelected:true }
          : isModelopen
          ? currentValue?.isPicklist
            ? { ...item, [dataIndex]: currentValue.value, enable: true, isSelected:true }
            : { ...item, [dataIndex]: currentValue.value, enable: false,isSelected:true }
          : { ...item, [dataIndex]: value, enable: true ,isSelected:true};
      }
      return item;
    });
    console.log("changedField  ===> ", changedField);
    console.log("updatedDataupdatedData",updatedData);
    
    setTableData(updatedData);
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

  const dataSource1 = [
    { key: '1', name: 'Issue', gyde_name: 'N/A', mapping: "Mapping", enable: false  }, // info: 'Additional info for John Doe',
    { key: '2', name: 'Epic', gyde_name: 'Epic', mapping: "Mapping", enable: true }, // info: 'Additional info for Jane Smith'
    { key: '3', name: 'Task', gyde_name: 'Task', mapping: "Mapping", enable: true  }, //info: 'Additional info for Jhon Smith'
    { key: '4', name: 'Test Case', gyde_name: 'Test Case', mapping: "Mapping", enable: true  },
    { key: '5', name: 'Test Plan', gyde_name: 'Test Plan', mapping: "Mapping", enable: true  },
    { key: '6', name: 'Test Suite', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '7', name: 'Shared Steps', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '8', name: 'Shared Parameter', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '9', name: 'Code Review Request', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '10', name: 'Code Review Response', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '11', name: 'Feedback Request', gyde_name: '', mapping: "Mapping", enable: false  },
    { key: '12', name: 'Feedback Response', gyde_name: '', mapping: "Mapping", enable: false  },
  ];
const option1 = [ "A","B","C","D"]
  const workItemColumns = [
    { title: 'SOURCE OPTION', dataIndex: 'souruceOption', key: 'souruceOption' },
    { title: 'DEVOPS TARGET OPTION', dataIndex: 'devopsOption', key: 'devopsOption', dropdownOptions: pickListColoumn },
    
  ];
  const showPickListModal = (record:any) => { 
    console.log("11222");

    const found = record?.defaultOptionList.defaultOptionList.map((option:any) => {
  
      return option.crmOption.map((crmoption:any,key:any) => {
        return {key:key,souruceOption:crmoption,option:option.devOpsOption}
      })
   
  } );
  console.log("11222",found);
  setPickListData(found[0])
  const found2 = record?.defaultOptionList.defaultOptionList.map((option:any) => {
  
    return option.devOpsOption.map((devOpsOption:any) => {
      return devOpsOption;
    })
 
} );
setPickListColoumn(found2[0])
  
  console.log("q250",found2[0]);
    setIsPickLisModalOpen(true);
    
  };

  const handleOk = () => {
    setIsPickLisModalOpen(false);
  };

  const handleCancel = () => {    
    setIsPickLisModalOpen(false);
    
  };

  return (
    <div>
       {isPickListModelOpen  &&  <PopupComponent 
        visible={isPickListModelOpen} onOk={handleOk} onClose={handleCancel}
         buttons={[{title: "Cancel", onClickHandler: ""}, {title: "Set as Default", onClickHandler: ""} ,{title: "Save", onClickHandler: ""}]} 
         Content={ <TableComponent 
                    dataSource={pickListData}  
                    columns={workItemColumns} 
                    onMapping={() => {}}   
                    size='small'scroll={{ y: 300 }} 
                    modelAction={showPickListModal} 
                    isModelopen= {false}
                    isPicklistModel ={true}
                  />} 
      /> }
      {Object.entries(dropdownErrors).map(([dataIndex, error]) => (
        <div key={dataIndex}>
          {error}
          <></>
        </div>
      ))}
      <Table
        className={isModelopen ? "pop-up-Table" : ""}
        dataSource={tableData}
        columns={updatedColumns}
        pagination={false}
        {...rest}
      />
    </div>
  );
};

export default TableComponent;
