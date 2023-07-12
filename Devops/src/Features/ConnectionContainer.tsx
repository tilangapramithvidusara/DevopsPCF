import React, { useEffect, useState } from "react";
import { Button, notification, Radio, RadioChangeEvent, Spin } from "antd";
import TableComponent from "../Components/TableComponent";
import PopupComponent from "../Components/PopupComponent";
import ConnectionComponent from "../Components/ConnectionComponent";
import {
  exampleCRMData,
  exampleDevOpsData,
  workItemTypes,
} from "../Constants/Samples/sample";
import SampleModel from "../Components/SampleMode";
import { FetchCrmFields } from "../Api/crmApis";
import {
  fetchWorkItemTypesFromCRM,
  fetchWorkItemTypesFromDevops,
  fetchDevopsFeildsData,
} from "../Api/devopsApis";

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
  const DefaultSaved = [
    {
        "key": 10,
        "sourceWorkItem": "Title",
        "devopsWorkItem": "Title",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": true
    },
    {
        "key": 10,
        "sourceWorkItem": "Work item type",
        "devopsWorkItem": "Work item type",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": true
    },
    {
        "key": 10,
        "sourceWorkItem": "partner work item",
        "devopsWorkItem": "partner work item",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": true
    },
    {
        "key": 0,
        "sourceWorkItem": "Activated By",
        "dropdown": [
            {
                "key": 0,
                "dropdownValue": "Activated By",
                "option": [
                    {
                        "crmOption": [
                            1,
                            2,
                            3,
                            4
                        ],
                        "devOpsOption": [
                            1,
                            2,
                            3,
                            4
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 1,
                "dropdownValue": "Activated Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 2,
                "dropdownValue": "Activity",
                "option": [
                    {
                        "crmOption": [
                            1,
                            2,
                            3,
                            4
                        ],
                        "devOpsOption": [
                            "Deployment",
                            "Design",
                            "Development",
                            "Documentation",
                            "Requirements",
                            "Testing"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 3,
                "dropdownValue": "Area ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 4,
                "dropdownValue": "Area Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 5,
                "dropdownValue": "Assigned To",
                "option": [],
                "isPickList": false
            },
            {
                "key": 6,
                "dropdownValue": "Attached File Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 7,
                "dropdownValue": "Authorized As",
                "option": [],
                "isPickList": false
            },
            {
                "key": 8,
                "dropdownValue": "Authorized Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 9,
                "dropdownValue": "Board Column",
                "option": [],
                "isPickList": false
            },
            {
                "key": 10,
                "dropdownValue": "Board Column Done",
                "option": [],
                "isPickList": false
            },
            {
                "key": 11,
                "dropdownValue": "Board Lane",
                "option": [],
                "isPickList": false
            },
            {
                "key": 12,
                "dropdownValue": "Changed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 13,
                "dropdownValue": "Changed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 14,
                "dropdownValue": "Closed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 15,
                "dropdownValue": "Closed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 16,
                "dropdownValue": "Comment Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 17,
                "dropdownValue": "Completed Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 18,
                "dropdownValue": "Created By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 19,
                "dropdownValue": "Created Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 20,
                "dropdownValue": "Description",
                "option": [],
                "isPickList": false
            },
            {
                "key": 21,
                "dropdownValue": "External Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 22,
                "dropdownValue": "History",
                "option": [],
                "isPickList": false
            },
            {
                "key": 23,
                "dropdownValue": "Hyperlink Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 24,
                "dropdownValue": "ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 25,
                "dropdownValue": "Iteration ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 26,
                "dropdownValue": "Iteration Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 27,
                "dropdownValue": "Node Name",
                "option": [],
                "isPickList": false
            },
            {
                "key": 28,
                "dropdownValue": "Parent",
                "option": [],
                "isPickList": false
            },
            {
                "key": 29,
                "dropdownValue": "Priority",
                "option": [
                    {
                        "crmOption": [
                            1,
                            2,
                            3,
                            4
                        ],
                        "devOpsOption": [
                            "1",
                            "2",
                            "3",
                            "4"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 30,
                "dropdownValue": "Reason",
                "option": [
                    {
                        "crmOption": [
                            1,
                            2,
                            3,
                            4
                        ],
                        "devOpsOption": [
                            "Completed",
                            "Cut",
                            "Deferred",
                            "Obsolete",
                            "Moved to backlog",
                            "Started",
                            "Reactivated",
                            "Added to backlog"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 31,
                "dropdownValue": "Related Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 32,
                "dropdownValue": "Remaining Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 33,
                "dropdownValue": "Remote Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 34,
                "dropdownValue": "Resolved By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 35,
                "dropdownValue": "Resolved Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 36,
                "dropdownValue": "Rev",
                "option": [],
                "isPickList": false
            },
            {
                "key": 37,
                "dropdownValue": "Revised Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 38,
                "dropdownValue": "Stack Rank",
                "option": [],
                "isPickList": false
            },
            {
                "key": 39,
                "dropdownValue": "State",
                "option": [
                    {
                        "crmOption": [
                            1,
                            2,
                            3,
                            4
                        ],
                        "devOpsOption": [
                            "Doing",
                            "Done",
                            "To Do"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 40,
                "dropdownValue": "State Change Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 41,
                "dropdownValue": "Tags",
                "option": [],
                "isPickList": false
            },
            {
                "key": 42,
                "dropdownValue": "Team Project",
                "option": [],
                "isPickList": false
            },
            {
                "key": 43,
                "dropdownValue": "Title",
                "option": [],
                "isPickList": false
            },
            {
                "key": 44,
                "dropdownValue": "Watermark",
                "option": [],
                "isPickList": false
            },
            {
                "key": 45,
                "dropdownValue": "Work Item Type",
                "option": [
                    {
                        "crmOption": [
                            1,
                            2,
                            3,
                            4
                        ],
                        "devOpsOption": [
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
                        ]
                    }
                ],
                "isPickList": true
            }
        ],
        "mapping": "",
        "enable": true,
        "defaultOptionList": {
            "defaultOptionList": [
                {
                    "crmOption": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "devOpsOption": [
                        "Deployment",
                        "Design",
                        "Requirements",
                        "Requirements"
                    ]
                }
            ]
        },
        "isText": false,
        "isSelected": true,
        "isPickListComplete": true,
        "devopsWorkItem": "Activity"
    },
    {
        "key": 1,
        "sourceWorkItem": "Build estimate (pts)",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": true,
        "isPickListComplete": false,
        "devopsWorkItem": "N/A"
    },
    {
        "key": 2,
        "sourceWorkItem": "Complexity",
        "dropdown": [
            {
                "key": 0,
                "dropdownValue": "Activated By",
                "option": [
                    {
                        "crmOption": [
                            "1 - Very Low",
                            "2 - Low",
                            "3 - Medium",
                            "4 - High",
                            "5 - Very High"
                        ],
                        "devOpsOption": [
                            1,
                            2,
                            3,
                            4
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 1,
                "dropdownValue": "Activated Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 2,
                "dropdownValue": "Activity",
                "option": [
                    {
                        "crmOption": [
                            "1 - Very Low",
                            "2 - Low",
                            "3 - Medium",
                            "4 - High",
                            "5 - Very High"
                        ],
                        "devOpsOption": [
                            "Deployment",
                            "Design",
                            "Development",
                            "Documentation",
                            "Requirements",
                            "Testing"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 3,
                "dropdownValue": "Area ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 4,
                "dropdownValue": "Area Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 5,
                "dropdownValue": "Assigned To",
                "option": [],
                "isPickList": false
            },
            {
                "key": 6,
                "dropdownValue": "Attached File Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 7,
                "dropdownValue": "Authorized As",
                "option": [],
                "isPickList": false
            },
            {
                "key": 8,
                "dropdownValue": "Authorized Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 9,
                "dropdownValue": "Board Column",
                "option": [],
                "isPickList": false
            },
            {
                "key": 10,
                "dropdownValue": "Board Column Done",
                "option": [],
                "isPickList": false
            },
            {
                "key": 11,
                "dropdownValue": "Board Lane",
                "option": [],
                "isPickList": false
            },
            {
                "key": 12,
                "dropdownValue": "Changed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 13,
                "dropdownValue": "Changed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 14,
                "dropdownValue": "Closed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 15,
                "dropdownValue": "Closed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 16,
                "dropdownValue": "Comment Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 17,
                "dropdownValue": "Completed Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 18,
                "dropdownValue": "Created By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 19,
                "dropdownValue": "Created Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 20,
                "dropdownValue": "Description",
                "option": [],
                "isPickList": false
            },
            {
                "key": 21,
                "dropdownValue": "External Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 22,
                "dropdownValue": "History",
                "option": [],
                "isPickList": false
            },
            {
                "key": 23,
                "dropdownValue": "Hyperlink Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 24,
                "dropdownValue": "ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 25,
                "dropdownValue": "Iteration ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 26,
                "dropdownValue": "Iteration Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 27,
                "dropdownValue": "Node Name",
                "option": [],
                "isPickList": false
            },
            {
                "key": 28,
                "dropdownValue": "Parent",
                "option": [],
                "isPickList": false
            },
            {
                "key": 29,
                "dropdownValue": "Priority",
                "option": [
                    {
                        "crmOption": [
                            "1 - Very Low",
                            "2 - Low",
                            "3 - Medium",
                            "4 - High",
                            "5 - Very High"
                        ],
                        "devOpsOption": [
                            "1",
                            "2",
                            "3",
                            "4"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 30,
                "dropdownValue": "Reason",
                "option": [
                    {
                        "crmOption": [
                            "1 - Very Low",
                            "2 - Low",
                            "3 - Medium",
                            "4 - High",
                            "5 - Very High"
                        ],
                        "devOpsOption": [
                            "Completed",
                            "Cut",
                            "Deferred",
                            "Obsolete",
                            "Moved to backlog",
                            "Started",
                            "Reactivated",
                            "Added to backlog"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 31,
                "dropdownValue": "Related Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 32,
                "dropdownValue": "Remaining Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 33,
                "dropdownValue": "Remote Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 34,
                "dropdownValue": "Resolved By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 35,
                "dropdownValue": "Resolved Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 36,
                "dropdownValue": "Rev",
                "option": [],
                "isPickList": false
            },
            {
                "key": 37,
                "dropdownValue": "Revised Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 38,
                "dropdownValue": "Stack Rank",
                "option": [],
                "isPickList": false
            },
            {
                "key": 39,
                "dropdownValue": "State",
                "option": [
                    {
                        "crmOption": [
                            "1 - Very Low",
                            "2 - Low",
                            "3 - Medium",
                            "4 - High",
                            "5 - Very High"
                        ],
                        "devOpsOption": [
                            "Doing",
                            "Done",
                            "To Do"
                        ]
                    }
                ],
                "isPickList": true
            },
            {
                "key": 40,
                "dropdownValue": "State Change Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 41,
                "dropdownValue": "Tags",
                "option": [],
                "isPickList": false
            },
            {
                "key": 42,
                "dropdownValue": "Team Project",
                "option": [],
                "isPickList": false
            },
            {
                "key": 43,
                "dropdownValue": "Title",
                "option": [],
                "isPickList": false
            },
            {
                "key": 44,
                "dropdownValue": "Watermark",
                "option": [],
                "isPickList": false
            },
            {
                "key": 45,
                "dropdownValue": "Work Item Type",
                "option": [
                    {
                        "crmOption": [
                            "1 - Very Low",
                            "2 - Low",
                            "3 - Medium",
                            "4 - High",
                            "5 - Very High"
                        ],
                        "devOpsOption": [
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
                        ]
                    }
                ],
                "isPickList": true
            }
        ],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    },
    {
        "key": 3,
        "sourceWorkItem": "Design Classification",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    },
    {
        "key": 4,
        "sourceWorkItem": "GapFit",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    },
    {
        "key": 5,
        "sourceWorkItem": "ISV",
        "dropdown": [
            {
                "key": 0,
                "dropdownValue": "Activated By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 1,
                "dropdownValue": "Activated Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 2,
                "dropdownValue": "Activity",
                "option": [],
                "isPickList": false
            },
            {
                "key": 3,
                "dropdownValue": "Area ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 4,
                "dropdownValue": "Area Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 5,
                "dropdownValue": "Assigned To",
                "option": [],
                "isPickList": false
            },
            {
                "key": 6,
                "dropdownValue": "Attached File Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 7,
                "dropdownValue": "Authorized As",
                "option": [],
                "isPickList": false
            },
            {
                "key": 8,
                "dropdownValue": "Authorized Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 9,
                "dropdownValue": "Board Column",
                "option": [],
                "isPickList": false
            },
            {
                "key": 10,
                "dropdownValue": "Board Column Done",
                "option": [],
                "isPickList": false
            },
            {
                "key": 11,
                "dropdownValue": "Board Lane",
                "option": [],
                "isPickList": false
            },
            {
                "key": 12,
                "dropdownValue": "Changed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 13,
                "dropdownValue": "Changed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 14,
                "dropdownValue": "Closed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 15,
                "dropdownValue": "Closed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 16,
                "dropdownValue": "Comment Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 17,
                "dropdownValue": "Completed Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 18,
                "dropdownValue": "Created By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 19,
                "dropdownValue": "Created Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 20,
                "dropdownValue": "Description",
                "option": [],
                "isPickList": false
            },
            {
                "key": 21,
                "dropdownValue": "External Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 22,
                "dropdownValue": "History",
                "option": [],
                "isPickList": false
            },
            {
                "key": 23,
                "dropdownValue": "Hyperlink Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 24,
                "dropdownValue": "ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 25,
                "dropdownValue": "Iteration ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 26,
                "dropdownValue": "Iteration Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 27,
                "dropdownValue": "Node Name",
                "option": [],
                "isPickList": false
            },
            {
                "key": 28,
                "dropdownValue": "Parent",
                "option": [],
                "isPickList": false
            },
            {
                "key": 29,
                "dropdownValue": "Priority",
                "option": [],
                "isPickList": false
            },
            {
                "key": 30,
                "dropdownValue": "Reason",
                "option": [],
                "isPickList": false
            },
            {
                "key": 31,
                "dropdownValue": "Related Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 32,
                "dropdownValue": "Remaining Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 33,
                "dropdownValue": "Remote Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 34,
                "dropdownValue": "Resolved By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 35,
                "dropdownValue": "Resolved Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 36,
                "dropdownValue": "Rev",
                "option": [],
                "isPickList": false
            },
            {
                "key": 37,
                "dropdownValue": "Revised Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 38,
                "dropdownValue": "Stack Rank",
                "option": [],
                "isPickList": false
            },
            {
                "key": 39,
                "dropdownValue": "State",
                "option": [],
                "isPickList": false
            },
            {
                "key": 40,
                "dropdownValue": "State Change Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 41,
                "dropdownValue": "Tags",
                "option": [],
                "isPickList": false
            },
            {
                "key": 42,
                "dropdownValue": "Team Project",
                "option": [],
                "isPickList": false
            },
            {
                "key": 43,
                "dropdownValue": "Title",
                "option": [],
                "isPickList": false
            },
            {
                "key": 44,
                "dropdownValue": "Watermark",
                "option": [],
                "isPickList": false
            },
            {
                "key": 45,
                "dropdownValue": "Work Item Type",
                "option": [],
                "isPickList": false
            }
        ],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    },
    {
        "key": 6,
        "sourceWorkItem": "Module",
        "dropdown": [
            {
                "key": 0,
                "dropdownValue": "Activated By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 1,
                "dropdownValue": "Activated Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 2,
                "dropdownValue": "Activity",
                "option": [],
                "isPickList": false
            },
            {
                "key": 3,
                "dropdownValue": "Area ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 4,
                "dropdownValue": "Area Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 5,
                "dropdownValue": "Assigned To",
                "option": [],
                "isPickList": false
            },
            {
                "key": 6,
                "dropdownValue": "Attached File Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 7,
                "dropdownValue": "Authorized As",
                "option": [],
                "isPickList": false
            },
            {
                "key": 8,
                "dropdownValue": "Authorized Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 9,
                "dropdownValue": "Board Column",
                "option": [],
                "isPickList": false
            },
            {
                "key": 10,
                "dropdownValue": "Board Column Done",
                "option": [],
                "isPickList": false
            },
            {
                "key": 11,
                "dropdownValue": "Board Lane",
                "option": [],
                "isPickList": false
            },
            {
                "key": 12,
                "dropdownValue": "Changed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 13,
                "dropdownValue": "Changed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 14,
                "dropdownValue": "Closed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 15,
                "dropdownValue": "Closed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 16,
                "dropdownValue": "Comment Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 17,
                "dropdownValue": "Completed Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 18,
                "dropdownValue": "Created By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 19,
                "dropdownValue": "Created Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 20,
                "dropdownValue": "Description",
                "option": [],
                "isPickList": false
            },
            {
                "key": 21,
                "dropdownValue": "External Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 22,
                "dropdownValue": "History",
                "option": [],
                "isPickList": false
            },
            {
                "key": 23,
                "dropdownValue": "Hyperlink Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 24,
                "dropdownValue": "ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 25,
                "dropdownValue": "Iteration ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 26,
                "dropdownValue": "Iteration Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 27,
                "dropdownValue": "Node Name",
                "option": [],
                "isPickList": false
            },
            {
                "key": 28,
                "dropdownValue": "Parent",
                "option": [],
                "isPickList": false
            },
            {
                "key": 29,
                "dropdownValue": "Priority",
                "option": [],
                "isPickList": false
            },
            {
                "key": 30,
                "dropdownValue": "Reason",
                "option": [],
                "isPickList": false
            },
            {
                "key": 31,
                "dropdownValue": "Related Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 32,
                "dropdownValue": "Remaining Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 33,
                "dropdownValue": "Remote Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 34,
                "dropdownValue": "Resolved By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 35,
                "dropdownValue": "Resolved Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 36,
                "dropdownValue": "Rev",
                "option": [],
                "isPickList": false
            },
            {
                "key": 37,
                "dropdownValue": "Revised Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 38,
                "dropdownValue": "Stack Rank",
                "option": [],
                "isPickList": false
            },
            {
                "key": 39,
                "dropdownValue": "State",
                "option": [],
                "isPickList": false
            },
            {
                "key": 40,
                "dropdownValue": "State Change Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 41,
                "dropdownValue": "Tags",
                "option": [],
                "isPickList": false
            },
            {
                "key": 42,
                "dropdownValue": "Team Project",
                "option": [],
                "isPickList": false
            },
            {
                "key": 43,
                "dropdownValue": "Title",
                "option": [],
                "isPickList": false
            },
            {
                "key": 44,
                "dropdownValue": "Watermark",
                "option": [],
                "isPickList": false
            },
            {
                "key": 45,
                "dropdownValue": "Work Item Type",
                "option": [],
                "isPickList": false
            }
        ],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    },
    {
        "key": 7,
        "sourceWorkItem": "Priority",
        "dropdown": [],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    },
    {
        "key": 8,
        "sourceWorkItem": "Resource",
        "dropdown": [
            {
                "key": 0,
                "dropdownValue": "Activated By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 1,
                "dropdownValue": "Activated Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 2,
                "dropdownValue": "Activity",
                "option": [],
                "isPickList": false
            },
            {
                "key": 3,
                "dropdownValue": "Area ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 4,
                "dropdownValue": "Area Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 5,
                "dropdownValue": "Assigned To",
                "option": [],
                "isPickList": false
            },
            {
                "key": 6,
                "dropdownValue": "Attached File Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 7,
                "dropdownValue": "Authorized As",
                "option": [],
                "isPickList": false
            },
            {
                "key": 8,
                "dropdownValue": "Authorized Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 9,
                "dropdownValue": "Board Column",
                "option": [],
                "isPickList": false
            },
            {
                "key": 10,
                "dropdownValue": "Board Column Done",
                "option": [],
                "isPickList": false
            },
            {
                "key": 11,
                "dropdownValue": "Board Lane",
                "option": [],
                "isPickList": false
            },
            {
                "key": 12,
                "dropdownValue": "Changed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 13,
                "dropdownValue": "Changed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 14,
                "dropdownValue": "Closed By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 15,
                "dropdownValue": "Closed Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 16,
                "dropdownValue": "Comment Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 17,
                "dropdownValue": "Completed Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 18,
                "dropdownValue": "Created By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 19,
                "dropdownValue": "Created Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 20,
                "dropdownValue": "Description",
                "option": [],
                "isPickList": false
            },
            {
                "key": 21,
                "dropdownValue": "External Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 22,
                "dropdownValue": "History",
                "option": [],
                "isPickList": false
            },
            {
                "key": 23,
                "dropdownValue": "Hyperlink Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 24,
                "dropdownValue": "ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 25,
                "dropdownValue": "Iteration ID",
                "option": [],
                "isPickList": false
            },
            {
                "key": 26,
                "dropdownValue": "Iteration Path",
                "option": [],
                "isPickList": false
            },
            {
                "key": 27,
                "dropdownValue": "Node Name",
                "option": [],
                "isPickList": false
            },
            {
                "key": 28,
                "dropdownValue": "Parent",
                "option": [],
                "isPickList": false
            },
            {
                "key": 29,
                "dropdownValue": "Priority",
                "option": [],
                "isPickList": false
            },
            {
                "key": 30,
                "dropdownValue": "Reason",
                "option": [],
                "isPickList": false
            },
            {
                "key": 31,
                "dropdownValue": "Related Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 32,
                "dropdownValue": "Remaining Work",
                "option": [],
                "isPickList": false
            },
            {
                "key": 33,
                "dropdownValue": "Remote Link Count",
                "option": [],
                "isPickList": false
            },
            {
                "key": 34,
                "dropdownValue": "Resolved By",
                "option": [],
                "isPickList": false
            },
            {
                "key": 35,
                "dropdownValue": "Resolved Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 36,
                "dropdownValue": "Rev",
                "option": [],
                "isPickList": false
            },
            {
                "key": 37,
                "dropdownValue": "Revised Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 38,
                "dropdownValue": "Stack Rank",
                "option": [],
                "isPickList": false
            },
            {
                "key": 39,
                "dropdownValue": "State",
                "option": [],
                "isPickList": false
            },
            {
                "key": 40,
                "dropdownValue": "State Change Date",
                "option": [],
                "isPickList": false
            },
            {
                "key": 41,
                "dropdownValue": "Tags",
                "option": [],
                "isPickList": false
            },
            {
                "key": 42,
                "dropdownValue": "Team Project",
                "option": [],
                "isPickList": false
            },
            {
                "key": 43,
                "dropdownValue": "Title",
                "option": [],
                "isPickList": false
            },
            {
                "key": 44,
                "dropdownValue": "Watermark",
                "option": [],
                "isPickList": false
            },
            {
                "key": 45,
                "dropdownValue": "Work Item Type",
                "option": [],
                "isPickList": false
            }
        ],
        "mapping": "",
        "enable": false,
        "defaultOptionList": [],
        "isText": false,
        "isSelected": false,
        "isPickListComplete": false
    }
]

const _savedObj = [
  {
      "key": 11,
      "sourceWorkItem": "Title",
      "devopsWorkItem": "Title",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": true
  },
  {
      "key": 12,
      "sourceWorkItem": "Work item type",
      "devopsWorkItem": "Work item type",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": true
  },
  {
      "key": 13,
      "sourceWorkItem": "partner work item",
      "devopsWorkItem": "partner work item",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": true
  },
  {
      "key": 0,
      "sourceWorkItem": "Activated By",
      "dropdown": [
          {
              "key": 0,
              "dropdownValue": "Activated By",
              "option": [
                  {
                      "crmOption": [
                          1,
                          2,
                          3,
                          4
                      ],
                      "devOpsOption": [
                          1,
                          2,
                          3,
                          4
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 1,
              "dropdownValue": "Activated Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 2,
              "dropdownValue": "Activity",
              "option": [
                  {
                      "crmOption": [
                          1,
                          2,
                          3,
                          4
                      ],
                      "devOpsOption": [
                          "Deployment",
                          "Design",
                          "Development",
                          "Documentation",
                          "Requirements",
                          "Testing"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 3,
              "dropdownValue": "Area ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 4,
              "dropdownValue": "Area Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 5,
              "dropdownValue": "Assigned To",
              "option": [],
              "isPickList": false
          },
          {
              "key": 6,
              "dropdownValue": "Attached File Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 7,
              "dropdownValue": "Authorized As",
              "option": [],
              "isPickList": false
          },
          {
              "key": 8,
              "dropdownValue": "Authorized Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 9,
              "dropdownValue": "Board Column",
              "option": [],
              "isPickList": false
          },
          {
              "key": 10,
              "dropdownValue": "Board Column Done",
              "option": [],
              "isPickList": false
          },
          {
              "key": 11,
              "dropdownValue": "Board Lane",
              "option": [],
              "isPickList": false
          },
          {
              "key": 12,
              "dropdownValue": "Changed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 13,
              "dropdownValue": "Changed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 14,
              "dropdownValue": "Closed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 15,
              "dropdownValue": "Closed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 16,
              "dropdownValue": "Comment Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 17,
              "dropdownValue": "Completed Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 18,
              "dropdownValue": "Created By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 19,
              "dropdownValue": "Created Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 20,
              "dropdownValue": "Description",
              "option": [],
              "isPickList": false
          },
          {
              "key": 21,
              "dropdownValue": "External Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 22,
              "dropdownValue": "History",
              "option": [],
              "isPickList": false
          },
          {
              "key": 23,
              "dropdownValue": "Hyperlink Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 24,
              "dropdownValue": "ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 25,
              "dropdownValue": "Iteration ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 26,
              "dropdownValue": "Iteration Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 27,
              "dropdownValue": "Node Name",
              "option": [],
              "isPickList": false
          },
          {
              "key": 28,
              "dropdownValue": "Parent",
              "option": [],
              "isPickList": false
          },
          {
              "key": 29,
              "dropdownValue": "Priority",
              "option": [
                  {
                      "crmOption": [
                          1,
                          2,
                          3,
                          4
                      ],
                      "devOpsOption": [
                          "1",
                          "2",
                          "3",
                          "4"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 30,
              "dropdownValue": "Reason",
              "option": [
                  {
                      "crmOption": [
                          1,
                          2,
                          3,
                          4
                      ],
                      "devOpsOption": [
                          "Completed",
                          "Cut",
                          "Deferred",
                          "Obsolete",
                          "Moved to backlog",
                          "Started",
                          "Reactivated",
                          "Added to backlog"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 31,
              "dropdownValue": "Related Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 32,
              "dropdownValue": "Remaining Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 33,
              "dropdownValue": "Remote Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 34,
              "dropdownValue": "Resolved By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 35,
              "dropdownValue": "Resolved Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 36,
              "dropdownValue": "Rev",
              "option": [],
              "isPickList": false
          },
          {
              "key": 37,
              "dropdownValue": "Revised Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 38,
              "dropdownValue": "Stack Rank",
              "option": [],
              "isPickList": false
          },
          {
              "key": 39,
              "dropdownValue": "State",
              "option": [
                  {
                      "crmOption": [
                          1,
                          2,
                          3,
                          4
                      ],
                      "devOpsOption": [
                          "Doing",
                          "Done",
                          "To Do"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 40,
              "dropdownValue": "State Change Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 41,
              "dropdownValue": "Tags",
              "option": [],
              "isPickList": false
          },
          {
              "key": 42,
              "dropdownValue": "Team Project",
              "option": [],
              "isPickList": false
          },
          {
              "key": 43,
              "dropdownValue": "Title",
              "option": [],
              "isPickList": false
          },
          {
              "key": 44,
              "dropdownValue": "Watermark",
              "option": [],
              "isPickList": false
          },
          {
              "key": 45,
              "dropdownValue": "Work Item Type",
              "option": [
                  {
                      "crmOption": [
                          1,
                          2,
                          3,
                          4
                      ],
                      "devOpsOption": [
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
                      ]
                  }
              ],
              "isPickList": true
          }
      ],
      "mapping": "",
      "enable": true,
      "defaultOptionList": {
          "defaultOptionList": [
              {
                  "crmOption": [
                      1,
                      2,
                      3,
                      4
                  ],
                  "devOpsOption": [
                      "Development",
                      "Design",
                      "Requirements",
                      "Development"
                  ]
              }
          ]
      },
      "isText": false,
      "isSelected": true,
      "isPickListComplete": true,
      "devopsWorkItem": "Activity"
  },
  {
      "key": 1,
      "sourceWorkItem": "Build estimate (pts)",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": true,
      "isPickListComplete": false,
      "devopsWorkItem": "N/A"
  },
  {
      "key": 2,
      "sourceWorkItem": "Complexity",
      "dropdown": [
          {
              "key": 0,
              "dropdownValue": "Activated By",
              "option": [
                  {
                      "crmOption": [
                          "1 - Very Low",
                          "2 - Low",
                          "3 - Medium",
                          "4 - High",
                          "5 - Very High"
                      ],
                      "devOpsOption": [
                          1,
                          2,
                          3,
                          4
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 1,
              "dropdownValue": "Activated Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 2,
              "dropdownValue": "Activity",
              "option": [
                  {
                      "crmOption": [
                          "1 - Very Low",
                          "2 - Low",
                          "3 - Medium",
                          "4 - High",
                          "5 - Very High"
                      ],
                      "devOpsOption": [
                          "Deployment",
                          "Design",
                          "Development",
                          "Documentation",
                          "Requirements",
                          "Testing"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 3,
              "dropdownValue": "Area ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 4,
              "dropdownValue": "Area Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 5,
              "dropdownValue": "Assigned To",
              "option": [],
              "isPickList": false
          },
          {
              "key": 6,
              "dropdownValue": "Attached File Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 7,
              "dropdownValue": "Authorized As",
              "option": [],
              "isPickList": false
          },
          {
              "key": 8,
              "dropdownValue": "Authorized Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 9,
              "dropdownValue": "Board Column",
              "option": [],
              "isPickList": false
          },
          {
              "key": 10,
              "dropdownValue": "Board Column Done",
              "option": [],
              "isPickList": false
          },
          {
              "key": 11,
              "dropdownValue": "Board Lane",
              "option": [],
              "isPickList": false
          },
          {
              "key": 12,
              "dropdownValue": "Changed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 13,
              "dropdownValue": "Changed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 14,
              "dropdownValue": "Closed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 15,
              "dropdownValue": "Closed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 16,
              "dropdownValue": "Comment Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 17,
              "dropdownValue": "Completed Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 18,
              "dropdownValue": "Created By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 19,
              "dropdownValue": "Created Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 20,
              "dropdownValue": "Description",
              "option": [],
              "isPickList": false
          },
          {
              "key": 21,
              "dropdownValue": "External Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 22,
              "dropdownValue": "History",
              "option": [],
              "isPickList": false
          },
          {
              "key": 23,
              "dropdownValue": "Hyperlink Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 24,
              "dropdownValue": "ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 25,
              "dropdownValue": "Iteration ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 26,
              "dropdownValue": "Iteration Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 27,
              "dropdownValue": "Node Name",
              "option": [],
              "isPickList": false
          },
          {
              "key": 28,
              "dropdownValue": "Parent",
              "option": [],
              "isPickList": false
          },
          {
              "key": 29,
              "dropdownValue": "Priority",
              "option": [
                  {
                      "crmOption": [
                          "1 - Very Low",
                          "2 - Low",
                          "3 - Medium",
                          "4 - High",
                          "5 - Very High"
                      ],
                      "devOpsOption": [
                          "1",
                          "2",
                          "3",
                          "4"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 30,
              "dropdownValue": "Reason",
              "option": [
                  {
                      "crmOption": [
                          "1 - Very Low",
                          "2 - Low",
                          "3 - Medium",
                          "4 - High",
                          "5 - Very High"
                      ],
                      "devOpsOption": [
                          "Completed",
                          "Cut",
                          "Deferred",
                          "Obsolete",
                          "Moved to backlog",
                          "Started",
                          "Reactivated",
                          "Added to backlog"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 31,
              "dropdownValue": "Related Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 32,
              "dropdownValue": "Remaining Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 33,
              "dropdownValue": "Remote Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 34,
              "dropdownValue": "Resolved By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 35,
              "dropdownValue": "Resolved Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 36,
              "dropdownValue": "Rev",
              "option": [],
              "isPickList": false
          },
          {
              "key": 37,
              "dropdownValue": "Revised Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 38,
              "dropdownValue": "Stack Rank",
              "option": [],
              "isPickList": false
          },
          {
              "key": 39,
              "dropdownValue": "State",
              "option": [
                  {
                      "crmOption": [
                          "1 - Very Low",
                          "2 - Low",
                          "3 - Medium",
                          "4 - High",
                          "5 - Very High"
                      ],
                      "devOpsOption": [
                          "Doing",
                          "Done",
                          "To Do"
                      ]
                  }
              ],
              "isPickList": true
          },
          {
              "key": 40,
              "dropdownValue": "State Change Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 41,
              "dropdownValue": "Tags",
              "option": [],
              "isPickList": false
          },
          {
              "key": 42,
              "dropdownValue": "Team Project",
              "option": [],
              "isPickList": false
          },
          {
              "key": 43,
              "dropdownValue": "Title",
              "option": [],
              "isPickList": false
          },
          {
              "key": 44,
              "dropdownValue": "Watermark",
              "option": [],
              "isPickList": false
          },
          {
              "key": 45,
              "dropdownValue": "Work Item Type",
              "option": [
                  {
                      "crmOption": [
                          "1 - Very Low",
                          "2 - Low",
                          "3 - Medium",
                          "4 - High",
                          "5 - Very High"
                      ],
                      "devOpsOption": [
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
                      ]
                  }
              ],
              "isPickList": true
          }
      ],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  },
  {
      "key": 3,
      "sourceWorkItem": "Design Classification",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  },
  {
      "key": 4,
      "sourceWorkItem": "GapFit",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  },
  {
      "key": 5,
      "sourceWorkItem": "ISV",
      "dropdown": [
          {
              "key": 0,
              "dropdownValue": "Activated By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 1,
              "dropdownValue": "Activated Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 2,
              "dropdownValue": "Activity",
              "option": [],
              "isPickList": false
          },
          {
              "key": 3,
              "dropdownValue": "Area ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 4,
              "dropdownValue": "Area Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 5,
              "dropdownValue": "Assigned To",
              "option": [],
              "isPickList": false
          },
          {
              "key": 6,
              "dropdownValue": "Attached File Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 7,
              "dropdownValue": "Authorized As",
              "option": [],
              "isPickList": false
          },
          {
              "key": 8,
              "dropdownValue": "Authorized Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 9,
              "dropdownValue": "Board Column",
              "option": [],
              "isPickList": false
          },
          {
              "key": 10,
              "dropdownValue": "Board Column Done",
              "option": [],
              "isPickList": false
          },
          {
              "key": 11,
              "dropdownValue": "Board Lane",
              "option": [],
              "isPickList": false
          },
          {
              "key": 12,
              "dropdownValue": "Changed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 13,
              "dropdownValue": "Changed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 14,
              "dropdownValue": "Closed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 15,
              "dropdownValue": "Closed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 16,
              "dropdownValue": "Comment Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 17,
              "dropdownValue": "Completed Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 18,
              "dropdownValue": "Created By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 19,
              "dropdownValue": "Created Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 20,
              "dropdownValue": "Description",
              "option": [],
              "isPickList": false
          },
          {
              "key": 21,
              "dropdownValue": "External Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 22,
              "dropdownValue": "History",
              "option": [],
              "isPickList": false
          },
          {
              "key": 23,
              "dropdownValue": "Hyperlink Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 24,
              "dropdownValue": "ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 25,
              "dropdownValue": "Iteration ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 26,
              "dropdownValue": "Iteration Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 27,
              "dropdownValue": "Node Name",
              "option": [],
              "isPickList": false
          },
          {
              "key": 28,
              "dropdownValue": "Parent",
              "option": [],
              "isPickList": false
          },
          {
              "key": 29,
              "dropdownValue": "Priority",
              "option": [],
              "isPickList": false
          },
          {
              "key": 30,
              "dropdownValue": "Reason",
              "option": [],
              "isPickList": false
          },
          {
              "key": 31,
              "dropdownValue": "Related Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 32,
              "dropdownValue": "Remaining Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 33,
              "dropdownValue": "Remote Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 34,
              "dropdownValue": "Resolved By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 35,
              "dropdownValue": "Resolved Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 36,
              "dropdownValue": "Rev",
              "option": [],
              "isPickList": false
          },
          {
              "key": 37,
              "dropdownValue": "Revised Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 38,
              "dropdownValue": "Stack Rank",
              "option": [],
              "isPickList": false
          },
          {
              "key": 39,
              "dropdownValue": "State",
              "option": [],
              "isPickList": false
          },
          {
              "key": 40,
              "dropdownValue": "State Change Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 41,
              "dropdownValue": "Tags",
              "option": [],
              "isPickList": false
          },
          {
              "key": 42,
              "dropdownValue": "Team Project",
              "option": [],
              "isPickList": false
          },
          {
              "key": 43,
              "dropdownValue": "Title",
              "option": [],
              "isPickList": false
          },
          {
              "key": 44,
              "dropdownValue": "Watermark",
              "option": [],
              "isPickList": false
          },
          {
              "key": 45,
              "dropdownValue": "Work Item Type",
              "option": [],
              "isPickList": false
          }
      ],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  },
  {
      "key": 6,
      "sourceWorkItem": "Module",
      "dropdown": [
          {
              "key": 0,
              "dropdownValue": "Activated By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 1,
              "dropdownValue": "Activated Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 2,
              "dropdownValue": "Activity",
              "option": [],
              "isPickList": false
          },
          {
              "key": 3,
              "dropdownValue": "Area ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 4,
              "dropdownValue": "Area Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 5,
              "dropdownValue": "Assigned To",
              "option": [],
              "isPickList": false
          },
          {
              "key": 6,
              "dropdownValue": "Attached File Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 7,
              "dropdownValue": "Authorized As",
              "option": [],
              "isPickList": false
          },
          {
              "key": 8,
              "dropdownValue": "Authorized Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 9,
              "dropdownValue": "Board Column",
              "option": [],
              "isPickList": false
          },
          {
              "key": 10,
              "dropdownValue": "Board Column Done",
              "option": [],
              "isPickList": false
          },
          {
              "key": 11,
              "dropdownValue": "Board Lane",
              "option": [],
              "isPickList": false
          },
          {
              "key": 12,
              "dropdownValue": "Changed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 13,
              "dropdownValue": "Changed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 14,
              "dropdownValue": "Closed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 15,
              "dropdownValue": "Closed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 16,
              "dropdownValue": "Comment Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 17,
              "dropdownValue": "Completed Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 18,
              "dropdownValue": "Created By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 19,
              "dropdownValue": "Created Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 20,
              "dropdownValue": "Description",
              "option": [],
              "isPickList": false
          },
          {
              "key": 21,
              "dropdownValue": "External Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 22,
              "dropdownValue": "History",
              "option": [],
              "isPickList": false
          },
          {
              "key": 23,
              "dropdownValue": "Hyperlink Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 24,
              "dropdownValue": "ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 25,
              "dropdownValue": "Iteration ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 26,
              "dropdownValue": "Iteration Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 27,
              "dropdownValue": "Node Name",
              "option": [],
              "isPickList": false
          },
          {
              "key": 28,
              "dropdownValue": "Parent",
              "option": [],
              "isPickList": false
          },
          {
              "key": 29,
              "dropdownValue": "Priority",
              "option": [],
              "isPickList": false
          },
          {
              "key": 30,
              "dropdownValue": "Reason",
              "option": [],
              "isPickList": false
          },
          {
              "key": 31,
              "dropdownValue": "Related Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 32,
              "dropdownValue": "Remaining Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 33,
              "dropdownValue": "Remote Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 34,
              "dropdownValue": "Resolved By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 35,
              "dropdownValue": "Resolved Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 36,
              "dropdownValue": "Rev",
              "option": [],
              "isPickList": false
          },
          {
              "key": 37,
              "dropdownValue": "Revised Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 38,
              "dropdownValue": "Stack Rank",
              "option": [],
              "isPickList": false
          },
          {
              "key": 39,
              "dropdownValue": "State",
              "option": [],
              "isPickList": false
          },
          {
              "key": 40,
              "dropdownValue": "State Change Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 41,
              "dropdownValue": "Tags",
              "option": [],
              "isPickList": false
          },
          {
              "key": 42,
              "dropdownValue": "Team Project",
              "option": [],
              "isPickList": false
          },
          {
              "key": 43,
              "dropdownValue": "Title",
              "option": [],
              "isPickList": false
          },
          {
              "key": 44,
              "dropdownValue": "Watermark",
              "option": [],
              "isPickList": false
          },
          {
              "key": 45,
              "dropdownValue": "Work Item Type",
              "option": [],
              "isPickList": false
          }
      ],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  },
  {
      "key": 7,
      "sourceWorkItem": "Priority",
      "dropdown": [],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  },
  {
      "key": 8,
      "sourceWorkItem": "Resource",
      "dropdown": [
          {
              "key": 0,
              "dropdownValue": "Activated By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 1,
              "dropdownValue": "Activated Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 2,
              "dropdownValue": "Activity",
              "option": [],
              "isPickList": false
          },
          {
              "key": 3,
              "dropdownValue": "Area ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 4,
              "dropdownValue": "Area Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 5,
              "dropdownValue": "Assigned To",
              "option": [],
              "isPickList": false
          },
          {
              "key": 6,
              "dropdownValue": "Attached File Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 7,
              "dropdownValue": "Authorized As",
              "option": [],
              "isPickList": false
          },
          {
              "key": 8,
              "dropdownValue": "Authorized Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 9,
              "dropdownValue": "Board Column",
              "option": [],
              "isPickList": false
          },
          {
              "key": 10,
              "dropdownValue": "Board Column Done",
              "option": [],
              "isPickList": false
          },
          {
              "key": 11,
              "dropdownValue": "Board Lane",
              "option": [],
              "isPickList": false
          },
          {
              "key": 12,
              "dropdownValue": "Changed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 13,
              "dropdownValue": "Changed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 14,
              "dropdownValue": "Closed By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 15,
              "dropdownValue": "Closed Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 16,
              "dropdownValue": "Comment Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 17,
              "dropdownValue": "Completed Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 18,
              "dropdownValue": "Created By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 19,
              "dropdownValue": "Created Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 20,
              "dropdownValue": "Description",
              "option": [],
              "isPickList": false
          },
          {
              "key": 21,
              "dropdownValue": "External Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 22,
              "dropdownValue": "History",
              "option": [],
              "isPickList": false
          },
          {
              "key": 23,
              "dropdownValue": "Hyperlink Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 24,
              "dropdownValue": "ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 25,
              "dropdownValue": "Iteration ID",
              "option": [],
              "isPickList": false
          },
          {
              "key": 26,
              "dropdownValue": "Iteration Path",
              "option": [],
              "isPickList": false
          },
          {
              "key": 27,
              "dropdownValue": "Node Name",
              "option": [],
              "isPickList": false
          },
          {
              "key": 28,
              "dropdownValue": "Parent",
              "option": [],
              "isPickList": false
          },
          {
              "key": 29,
              "dropdownValue": "Priority",
              "option": [],
              "isPickList": false
          },
          {
              "key": 30,
              "dropdownValue": "Reason",
              "option": [],
              "isPickList": false
          },
          {
              "key": 31,
              "dropdownValue": "Related Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 32,
              "dropdownValue": "Remaining Work",
              "option": [],
              "isPickList": false
          },
          {
              "key": 33,
              "dropdownValue": "Remote Link Count",
              "option": [],
              "isPickList": false
          },
          {
              "key": 34,
              "dropdownValue": "Resolved By",
              "option": [],
              "isPickList": false
          },
          {
              "key": 35,
              "dropdownValue": "Resolved Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 36,
              "dropdownValue": "Rev",
              "option": [],
              "isPickList": false
          },
          {
              "key": 37,
              "dropdownValue": "Revised Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 38,
              "dropdownValue": "Stack Rank",
              "option": [],
              "isPickList": false
          },
          {
              "key": 39,
              "dropdownValue": "State",
              "option": [],
              "isPickList": false
          },
          {
              "key": 40,
              "dropdownValue": "State Change Date",
              "option": [],
              "isPickList": false
          },
          {
              "key": 41,
              "dropdownValue": "Tags",
              "option": [],
              "isPickList": false
          },
          {
              "key": 42,
              "dropdownValue": "Team Project",
              "option": [],
              "isPickList": false
          },
          {
              "key": 43,
              "dropdownValue": "Title",
              "option": [],
              "isPickList": false
          },
          {
              "key": 44,
              "dropdownValue": "Watermark",
              "option": [],
              "isPickList": false
          },
          {
              "key": 45,
              "dropdownValue": "Work Item Type",
              "option": [],
              "isPickList": false
          }
      ],
      "mapping": "",
      "enable": false,
      "defaultOptionList": [],
      "isText": false,
      "isSelected": false,
      "isPickListComplete": false
  }
]
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
  const [devopsResult, setDevopsResult] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [configureSettings, setConfigureSettings] =
    useState<any>("configureMapping");

  const dataSource = crmWorkItemTypes?.map((item: any, num: number) => {
    console.log("devopsWorkItemTypes[num] :", devopsWorkItemTypes[num]);
    console.log("item?.gyde_name[num] :", item?.gyde_name);
    console.log(
      "logic build :",
      devopsWorkItemTypes?.find((res: any) => res == "Epic")
    );
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
    if (selectedWorkItem?.name != undefined && selectedWorkItem?.name != null) {
      const devopsData = await fetchDevopsFeildsData(authObj);
      console.log("apiDara,", devopsData, selectedWorkItem);
      const crmData = await FetchCrmFields();
      let sameDropdownFeild: any = [];
      if (devopsData.status === "success") {
        console.log("crm", crmData);
        let tableData = exampleCRMData?.map((crm: any, key: any) => {
          let dropdownArr: any = exampleDevOpsData
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
                  (devOps.attributeType = "Guid")) ||
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
            sourceWorkItem: "Title",
            devopsWorkItem: "Title",
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
          },
          {
            key: currentLength+2,
            sourceWorkItem: "Work item type",
            devopsWorkItem: "Work item type",
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
          },
          {
            key: currentLength+3,
            sourceWorkItem: "partner work item",
            devopsWorkItem: "partner work item",
            dropdown: [],
            mapping: "",
            enable: false,
            defaultOptionList: [],
            isText: true,
            isSelected: true,
          },
          ...tableData,
        ];
        console.log("devopsData", _tableData);
        setTaskDataArr(_tableData);

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
  const tempAPI = () => {
    const tempArr = [
      {
        name: "Issue",
        country: "Epic1",
        AttributeType: "Lookup",
        hasPicklist: false,
        option: [1, 2, 4],
      },
      {
        name: "Epic",
        country: "Epic",
        AttributeType: "Lookup",
        hasPicklist: true,
        option: [1, 2, 4],
      },
      {
        name: "Test Plan",
        country: "Test Plan",
        AttributeType: "String",
        hasPicklist: true,
        option: [1, 2, 4],
      },
    ];
    const dataSourcew = [
      {
        key: "1",
        name: "Issue",
        age: 32,
        country: "N/A",
        mapping: "Mapping",
        enable: false,
        AttributeType: "Lookup",
      }, // info: 'Additional info for John Doe',
      {
        key: "2",
        name: "Epic",
        age: 28,
        country: "Epic",
        mapping: "Mapping",
        enable: true,
        AttributeType: "Lookup",
      }, // info: 'Additional info for Jane Smith'
      {
        key: "3",
        name: "Epic",
        age: 38,
        country: "Task",
        mapping: "Mapping",
        enable: true,
        AttributeType: "a",
      }, //info: 'Additional info for Jhon Smith'
      {
        key: "4",
        name: "Test Case",
        age: 38,
        country: "Test Case",
        mapping: "Mapping",
        enable: true,
        AttributeType: "String",
      },
      {
        key: "5",
        name: "Test Plan",
        age: 38,
        country: "Test Plan",
        mapping: "Mapping",
        enable: true,
        AttributeType: "String",
      },
    ];

    let tableData = exampleCRMData.map((crm, key) => {
      let dropdownArr: any = [];
      let picklistArr: any = [];
      let x: any = exampleDevOpsData
        .filter((devOps) => crm.AttributeType === devOps.attributeType)
        .map((_data) => {
          dropdownArr.push({
            dropdownValue: _data.fieldName,
            option: _data.hasPicklist ? _data.allowedValues : [],
            isPickList: _data.hasPicklist ? true : false,
          });
        });

      console.log("x5555", x, crm.SchemaName);
      return {
        key: key,
        name: crm.SchemaName,
        dropdown: [...dropdownArr],
        mapping: "",
        enable: "",
      };
    });

    let xx = dataSourcew.map((f, key) => {
      let dropdownArr: any = [];
      let picklistArr: any = [];
      let x: any = tempArr
        .filter((_f) => f.AttributeType === _f.AttributeType)
        .map((_data) => {
          //dropdownArr.push({dropdownValue:_data.country,option:_data.hasPicklist ? _data.option : [],isPickList:_data.hasPicklist ? true: false})
          return {
            dropdownValue: _data.country,
            option: _data.hasPicklist ? _data.option : [],
            isPickList: _data.hasPicklist ? true : false,
          };
        });

      console.log("x5555", x, f.name);
      return {
        key: key,
        name: f.name,
        dropdown: [...x],
        mapping: "",
        enable: "",
      };
    });

    console.log("tableData", tableData);
    console.log("_tem1_tem14", xx);
    setTaskDataArr(xx);
  };

  // console.log(" devopsWorkItemTypes :", devopsWorkItemTypes);
  // console.log("dataSource",dataSource);
  useEffect(() => {
    fetchWorkItemTypesFromCRM().then((result: any) => {
      console.log("crm work items :", result, result?.data?.value);
      setCrmWorkItemTypes(result?.data?.value);
    });
  }, []);

  const savePopupModelData = () => {

    console.log("SavedMainData",dataFieldArr,taskDataArr);

    if(dataFieldArr.length){
        console.log("API SAved");
      let _isSelected =     dataFieldArr.every((field:any)=> field.isSelected)

      setisSavedCompleteFlag(_isSelected)
      console.log("_isSelected",_isSelected);
      setIsModalOpen(false);
      
        
           }else if (taskDataArr.length){

               console.log("API Default");
           }

             // const updatedArray = dataFieldArr.map((item:any) => {
    //     return {
    //       ...item,
    //       ["isSavedType"]: "saved"
    //     };
    //   });
      
    //   console.log(updatedArray);

    // setIsSaveddataArr(updatedArray)
    
    // if (Object.keys(dataArr).length && dataFieldArr.length) {
    //   console.log("both Select");

    //   let devopsPickListData = dataArr.updatedData.map(
    //     (f: any) => f.devopsOption
    //   );
    //   let crmPickListData = dataArr.updatedData.map(
    //     (f: any) => f.souruceOption
    //   );
    //   console.log("336", devopsPickListData);
    //   let pickListItems = [
    //     {
    //       crmOption: crmPickListData,
    //       devOpsOption: devopsPickListData,
    //     },
    //   ];
    //   let updateditems = dataFieldArr?.map((field: any) => {
    //     if (field.key == dataArr?.key) {
    //       return {
    //         ...field,
    //         ["defaultOptionList"]: { defaultOptionList: pickListItems },
    //       };
    //     }
    //     console.log("field", field);

    //     return field;
    //   });
    //   console.log("9631111", dataArr, ":", dataFieldArr, updateditems);
    // } else if (dataFieldArr.length) {
    //   console.log(" Select source field");
    //   console.log("963", dataArr, dataFieldArr);
    // } else {
    //   console.log("default Data");
    //   console.log("dataSourceArr", taskDataArr);
    // }
    // console.log("963", dataArr, dataFieldArr);
    // // if (data?.length) {
    // //   let _data = data.filter((f: any) => f.isText === false);
    // //   console.log("12345", _data);
    // //   console.log(
    // //     "cvc",
    // //     _data.every((_f: any) => _f.isSelected === true)
    // //   );
    // // }
  };
  const handleConfigure = ({ target: { value } }: RadioChangeEvent) => {
    setConfigureSettings(value);
  };

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
        {devopsResult?.status && (
          <>
            <h3 className="sub-title">Mapping - Work Item Types</h3>
            <TableComponent
              dataSource={dataSource1}
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
              rowClassName={
                configureSettings == "devopsGenerator" ? "disable-table" : ""
              }
              disabled={configureSettings == "devopsGenerator" ? true : false}
            />

            <span>
              <Button
                className="cancel-btn"
                type="primary"
                htmlType="submit"
                onClick={() => {}}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" onClick={() => {}}>
                Save
              </Button>
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
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    className="ant-btn-primary"
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
                      /* Handle button click */
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Set as Default
                  </Button>
                  <Button
                    className="ant-btn-primary"
                    onClick={savePopupModelData}
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
