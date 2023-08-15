import { Button, Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import React, { useEffect, useState } from "react";
import {
  fetchAllInternalIdsByBusinessSurveyId,
  fetchWorkItemTypes,
  fetchWorkItemsByBusinessSurveyId,
  generateDevops,
} from "../DevopsTree/DevopsTreeApi/Api";
import { fetchDefaultSetting, fetchFieldMapping } from "../Api/devopsApis";
// import { findNodeAndRelations } from "../helper/GetParentNode";

declare global {
  interface Window {
    webapi: any;
  }
}

const _AEEEE: any = [{"key":"Epic","targetTable":"Epic","value":[{"key":13,"sourceWorkItem":"Title","devopsWorkItem":"Title","dropdown":[],"mapping":"","enable":false,"defaultOptionList":[],"isText":true,"isSelected":true,"fieldReferenceName":"System.Title","isSavedType":"saved"},{"key":14,"sourceWorkItem":"Work item type","devopsWorkItem":"Work item type","dropdown":[],"mapping":"","enable":false,"defaultOptionList":[],"isText":true,"isSelected":true,"fieldReferenceName":"System.WorkItemType","isSavedType":"saved"},{"key":15,"sourceWorkItem":"Parent Work Item","devopsWorkItem":"Parent Work Item","dropdown":[],"mapping":"","enable":false,"defaultOptionList":[],"isText":true,"isSelected":true,"fieldReferenceName":"","isSavedType":"saved"},{"key":0,"sourceWorkItem":"Description","dropdown":[{"key":0,"dropdownValue":"Activated By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ActivatedBy"},{"key":1,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":2,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":3,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":4,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":5,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":6,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":7,"dropdownValue":"Closed By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ClosedBy"},{"key":8,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":9,"dropdownValue":"Description","option":[],"isPickList":false,"fieldReferenceName":"System.Description"},{"key":10,"dropdownValue":"History","option":[],"isPickList":false,"fieldReferenceName":"System.History"},{"key":11,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":12,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":13,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":14,"dropdownValue":"Resolved By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ResolvedBy"},{"key":15,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":16,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":17,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":false,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.Description"},{"key":1,"sourceWorkItem":"Build estimate (hrs)","dropdown":[{"key":0,"dropdownValue":"Area ID","option":[],"isPickList":false,"fieldReferenceName":"System.AreaId"},{"key":1,"dropdownValue":"Attached File Count","option":[],"isPickList":false,"fieldReferenceName":"System.AttachedFileCount"},{"key":2,"dropdownValue":"Comment Count","option":[],"isPickList":false,"fieldReferenceName":"System.CommentCount"},{"key":3,"dropdownValue":"External Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.ExternalLinkCount"},{"key":4,"dropdownValue":"Hyperlink Count","option":[],"isPickList":false,"fieldReferenceName":"System.HyperLinkCount"},{"key":5,"dropdownValue":"ID","option":[],"isPickList":false,"fieldReferenceName":"System.Id"},{"key":6,"dropdownValue":"Iteration ID","option":[],"isPickList":false,"fieldReferenceName":"System.IterationId"},{"key":7,"dropdownValue":"Parent","option":[],"isPickList":false,"fieldReferenceName":"System.Parent"},{"key":8,"dropdownValue":"Priority","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":9,"dropdownValue":"Related Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RelatedLinkCount"},{"key":10,"dropdownValue":"Remote Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RemoteLinkCount"},{"key":11,"dropdownValue":"Rev","option":[],"isPickList":false,"fieldReferenceName":"System.Rev"},{"key":12,"dropdownValue":"Stack Rank","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.StackRank"},{"key":13,"dropdownValue":"Watermark","option":[],"isPickList":false,"fieldReferenceName":"System.Watermark"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.AttachedFileCount","devopsWorkItem":"Attached File Count"},{"key":2,"sourceWorkItem":"Build estimate (pts)","dropdown":[{"key":0,"dropdownValue":"Area ID","option":[],"isPickList":false,"fieldReferenceName":"System.AreaId"},{"key":1,"dropdownValue":"Attached File Count","option":[],"isPickList":false,"fieldReferenceName":"System.AttachedFileCount"},{"key":2,"dropdownValue":"Comment Count","option":[],"isPickList":false,"fieldReferenceName":"System.CommentCount"},{"key":3,"dropdownValue":"External Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.ExternalLinkCount"},{"key":4,"dropdownValue":"Hyperlink Count","option":[],"isPickList":false,"fieldReferenceName":"System.HyperLinkCount"},{"key":5,"dropdownValue":"ID","option":[],"isPickList":false,"fieldReferenceName":"System.Id"},{"key":6,"dropdownValue":"Iteration ID","option":[],"isPickList":false,"fieldReferenceName":"System.IterationId"},{"key":7,"dropdownValue":"Parent","option":[],"isPickList":false,"fieldReferenceName":"System.Parent"},{"key":8,"dropdownValue":"Priority","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":9,"dropdownValue":"Related Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RelatedLinkCount"},{"key":10,"dropdownValue":"Remote Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RemoteLinkCount"},{"key":11,"dropdownValue":"Rev","option":[],"isPickList":false,"fieldReferenceName":"System.Rev"},{"key":12,"dropdownValue":"Stack Rank","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.StackRank"},{"key":13,"dropdownValue":"Watermark","option":[],"isPickList":false,"fieldReferenceName":"System.Watermark"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.HyperLinkCount","devopsWorkItem":"Hyperlink Count"},{"key":3,"sourceWorkItem":"Complexity","dropdown":[{"key":0,"dropdownValue":"Priority","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["1","2","3","4"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["Completed","Cut","Deferred","Obsolete","Moved to backlog","Started","Reactivated","Added to backlog"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["Doing","Done","To Do"]}],"isPickList":true,"fieldReferenceName":"System.State"}],"mapping":"","enable":true,"defaultOptionList":{"defaultOptionList":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["1","2","3","4","N/A"]}]},"isText":false,"isSelected":true,"isPickListComplete":true,"pickListArr":[3],"isSavedType":"saved","fieldReferenceName":"Microsoft.VSTS.Common.Priority","devopsWorkItem":"Priority"},{"key":4,"sourceWorkItem":"Design Classification","dropdown":[{"key":0,"dropdownValue":"Priority","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["1","2","3","4"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["Completed","Cut","Deferred","Obsolete","Moved to backlog","Started","Reactivated","Added to backlog"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["Doing","Done","To Do"]}],"isPickList":true,"fieldReferenceName":"System.State"}],"mapping":"","enable":true,"defaultOptionList":{"defaultOptionList":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["Doing","Done","To Do","Doing","To Do","Doing","To Do","Doing","Done"]}]},"isText":false,"isSelected":true,"isPickListComplete":true,"pickListArr":[4],"isSavedType":"saved","fieldReferenceName":"System.State","devopsWorkItem":"State"},{"key":5,"sourceWorkItem":"GapFit","dropdown":[{"key":0,"dropdownValue":"Priority","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["1","2","3","4"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["Completed","Cut","Deferred","Obsolete","Moved to backlog","Started","Reactivated","Added to backlog"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["Doing","Done","To Do"]}],"isPickList":true,"fieldReferenceName":"System.State"}],"mapping":"","enable":true,"defaultOptionList":{"defaultOptionList":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["Completed","Cut","Deferred","Obsolete"]}]},"isText":false,"isSelected":true,"isPickListComplete":true,"pickListArr":[5],"isSavedType":"saved","fieldReferenceName":"System.Reason","devopsWorkItem":"Reason"},{"key":6,"sourceWorkItem":"ISV","dropdown":[{"key":0,"dropdownValue":"Activated By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ActivatedBy"},{"key":1,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":2,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":3,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":4,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":5,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":6,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":7,"dropdownValue":"Closed By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ClosedBy"},{"key":8,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":9,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":10,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":11,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":12,"dropdownValue":"Resolved By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ResolvedBy"},{"key":13,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":14,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":15,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.BoardLane","devopsWorkItem":"Board Lane"},{"key":7,"sourceWorkItem":"Module","dropdown":[{"key":0,"dropdownValue":"Activated By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ActivatedBy"},{"key":1,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":2,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":3,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":4,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":5,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":6,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":7,"dropdownValue":"Closed By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ClosedBy"},{"key":8,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":9,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":10,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":11,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":12,"dropdownValue":"Resolved By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ResolvedBy"},{"key":13,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":14,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":15,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.AreaPath","devopsWorkItem":"Area Path"},{"key":8,"sourceWorkItem":"Priority","dropdown":[{"key":0,"dropdownValue":"Priority","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["1","2","3","4"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["Completed","Cut","Deferred","Obsolete","Moved to backlog","Started","Reactivated","Added to backlog"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["Doing","Done","To Do"]}],"isPickList":true,"fieldReferenceName":"System.State"}],"mapping":"","enable":true,"defaultOptionList":{"defaultOptionList":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["1","2","3","4"]}]},"isText":false,"isSelected":true,"isPickListComplete":true,"pickListArr":[8],"isSavedType":"saved","fieldReferenceName":"Microsoft.VSTS.Common.Priority"},{"key":9,"sourceWorkItem":"Resource","dropdown":[{"key":0,"dropdownValue":"Activated By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ActivatedBy"},{"key":1,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":2,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":3,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":4,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":5,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":6,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":7,"dropdownValue":"Closed By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ClosedBy"},{"key":8,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":9,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":10,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":11,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":12,"dropdownValue":"Resolved By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ResolvedBy"},{"key":13,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":14,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":15,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.CreatedBy","devopsWorkItem":"Created By"},{"key":10,"sourceWorkItem":"Acceptance Criteria","dropdown":[{"key":0,"dropdownValue":"Activated By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ActivatedBy"},{"key":1,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":2,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":3,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":4,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":5,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":6,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":7,"dropdownValue":"Closed By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ClosedBy"},{"key":8,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":9,"dropdownValue":"Description","option":[],"isPickList":false,"fieldReferenceName":"System.Description"},{"key":10,"dropdownValue":"History","option":[],"isPickList":false,"fieldReferenceName":"System.History"},{"key":11,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":12,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":13,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":14,"dropdownValue":"Resolved By","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Common.ResolvedBy"},{"key":15,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":16,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":17,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.ChangedBy","devopsWorkItem":"Changed By"}]},{"key":"Feature","targetTable":"Test Suite","value":[{"key":13,"sourceWorkItem":"Title","devopsWorkItem":"Title","dropdown":[],"mapping":"","enable":false,"defaultOptionList":[],"isText":true,"isSelected":true,"fieldReferenceName":"System.Title","isSavedType":"saved"},{"key":14,"sourceWorkItem":"Work item type","devopsWorkItem":"Work item type","dropdown":[],"mapping":"","enable":false,"defaultOptionList":[],"isText":true,"isSelected":true,"fieldReferenceName":"System.WorkItemType","isSavedType":"saved"},{"key":15,"sourceWorkItem":"Parent Work Item","devopsWorkItem":"Parent Work Item","dropdown":[],"mapping":"","enable":false,"defaultOptionList":[],"isText":true,"isSelected":true,"fieldReferenceName":"","isSavedType":"saved"},{"key":0,"sourceWorkItem":"Description","dropdown":[{"key":0,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":1,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":2,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":3,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":4,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":5,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":6,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":7,"dropdownValue":"Description","option":[],"isPickList":false,"fieldReferenceName":"System.Description"},{"key":8,"dropdownValue":"History","option":[],"isPickList":false,"fieldReferenceName":"System.History"},{"key":9,"dropdownValue":"Integration Build","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":10,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":11,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":12,"dropdownValue":"Query Text","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.QueryText"},{"key":13,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":14,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":15,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":16,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"},{"key":17,"dropdownValue":"Test Suite Audit","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteAudit"},{"key":18,"dropdownValue":"Test Suite Type","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.Description"},{"key":1,"sourceWorkItem":"Build estimate (hrs)","dropdown":[{"key":0,"dropdownValue":"Area ID","option":[],"isPickList":false,"fieldReferenceName":"System.AreaId"},{"key":1,"dropdownValue":"Attached File Count","option":[],"isPickList":false,"fieldReferenceName":"System.AttachedFileCount"},{"key":2,"dropdownValue":"Comment Count","option":[],"isPickList":false,"fieldReferenceName":"System.CommentCount"},{"key":3,"dropdownValue":"External Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.ExternalLinkCount"},{"key":4,"dropdownValue":"Hyperlink Count","option":[],"isPickList":false,"fieldReferenceName":"System.HyperLinkCount"},{"key":5,"dropdownValue":"ID","option":[],"isPickList":false,"fieldReferenceName":"System.Id"},{"key":6,"dropdownValue":"Iteration ID","option":[],"isPickList":false,"fieldReferenceName":"System.IterationId"},{"key":7,"dropdownValue":"Parent","option":[],"isPickList":false,"fieldReferenceName":"System.Parent"},{"key":8,"dropdownValue":"Related Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RelatedLinkCount"},{"key":9,"dropdownValue":"Remote Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RemoteLinkCount"},{"key":10,"dropdownValue":"Rev","option":[],"isPickList":false,"fieldReferenceName":"System.Rev"},{"key":11,"dropdownValue":"Test Suite Type Id","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteTypeId"},{"key":12,"dropdownValue":"Watermark","option":[],"isPickList":false,"fieldReferenceName":"System.Watermark"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.AreaId","devopsWorkItem":"Area ID"},{"key":2,"sourceWorkItem":"Build estimate (pts)","dropdown":[{"key":0,"dropdownValue":"Area ID","option":[],"isPickList":false,"fieldReferenceName":"System.AreaId"},{"key":1,"dropdownValue":"Attached File Count","option":[],"isPickList":false,"fieldReferenceName":"System.AttachedFileCount"},{"key":2,"dropdownValue":"Comment Count","option":[],"isPickList":false,"fieldReferenceName":"System.CommentCount"},{"key":3,"dropdownValue":"External Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.ExternalLinkCount"},{"key":4,"dropdownValue":"Hyperlink Count","option":[],"isPickList":false,"fieldReferenceName":"System.HyperLinkCount"},{"key":5,"dropdownValue":"ID","option":[],"isPickList":false,"fieldReferenceName":"System.Id"},{"key":6,"dropdownValue":"Iteration ID","option":[],"isPickList":false,"fieldReferenceName":"System.IterationId"},{"key":7,"dropdownValue":"Parent","option":[],"isPickList":false,"fieldReferenceName":"System.Parent"},{"key":8,"dropdownValue":"Related Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RelatedLinkCount"},{"key":9,"dropdownValue":"Remote Link Count","option":[],"isPickList":false,"fieldReferenceName":"System.RemoteLinkCount"},{"key":10,"dropdownValue":"Rev","option":[],"isPickList":false,"fieldReferenceName":"System.Rev"},{"key":11,"dropdownValue":"Test Suite Type Id","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteTypeId"},{"key":12,"dropdownValue":"Watermark","option":[],"isPickList":false,"fieldReferenceName":"System.Watermark"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.CommentCount","devopsWorkItem":"Comment Count"},{"key":3,"sourceWorkItem":"Complexity","dropdown":[{"key":0,"dropdownValue":"Integration Build","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["<None>"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["Tests in this test suite are now active and can be run","Removed from planning and test execution","Reactivating to run tests","Reactivating to planning phase","New test suite","Plan test cases for this test suite","Completed testing for this test suite"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["Completed","In Planning","In Progress"]}],"isPickList":true,"fieldReferenceName":"System.State"},{"key":3,"dropdownValue":"Test Suite Type","option":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["Query Based","Requirement Based","Static"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":true,"defaultOptionList":{"defaultOptionList":[{"crmOption":["1 - Very Low","2 - Low","3 - Medium","4 - High","5 - Very High"],"devOpsOption":["Completed","In Planning","In Progress","Completed","Completed"]}]},"isText":false,"isSelected":true,"isPickListComplete":true,"pickListArr":[3],"isSavedType":"saved","fieldReferenceName":"System.State","devopsWorkItem":"State"},{"key":4,"sourceWorkItem":"Design Classification","dropdown":[{"key":0,"dropdownValue":"Integration Build","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["<None>"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["Tests in this test suite are now active and can be run","Removed from planning and test execution","Reactivating to run tests","Reactivating to planning phase","New test suite","Plan test cases for this test suite","Completed testing for this test suite"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["Completed","In Planning","In Progress"]}],"isPickList":true,"fieldReferenceName":"System.State"},{"key":3,"dropdownValue":"Test Suite Type","option":[{"crmOption":["ISV","Requirement","Configuration","Customisation","Reporting","Integration","OOTB","Data Migration","Workflow/Flow"],"devOpsOption":["Query Based","Requirement Based","Static"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.Reason","devopsWorkItem":"N/A"},{"key":5,"sourceWorkItem":"GapFit","dropdown":[{"key":0,"dropdownValue":"Integration Build","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["<None>"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["Tests in this test suite are now active and can be run","Removed from planning and test execution","Reactivating to run tests","Reactivating to planning phase","New test suite","Plan test cases for this test suite","Completed testing for this test suite"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["Completed","In Planning","In Progress"]}],"isPickList":true,"fieldReferenceName":"System.State"},{"key":3,"dropdownValue":"Test Suite Type","option":[{"crmOption":["Gap","Fit","Partial","ISV"],"devOpsOption":["Query Based","Requirement Based","Static"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"","devopsWorkItem":"N/A"},{"key":6,"sourceWorkItem":"ISV","dropdown":[{"key":0,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":1,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":2,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":3,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":4,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":5,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":6,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":7,"dropdownValue":"Integration Build","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":8,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":9,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":10,"dropdownValue":"Query Text","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.QueryText"},{"key":11,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":12,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":13,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":14,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"},{"key":15,"dropdownValue":"Test Suite Audit","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteAudit"},{"key":16,"dropdownValue":"Test Suite Type","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"","devopsWorkItem":"N/A"},{"key":7,"sourceWorkItem":"Module","dropdown":[{"key":0,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":1,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":2,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":3,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":4,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":5,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":6,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":7,"dropdownValue":"Integration Build","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":8,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":9,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":10,"dropdownValue":"Query Text","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.QueryText"},{"key":11,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":12,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":13,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":14,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"},{"key":15,"dropdownValue":"Test Suite Audit","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteAudit"},{"key":16,"dropdownValue":"Test Suite Type","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"","devopsWorkItem":"N/A"},{"key":8,"sourceWorkItem":"Priority","dropdown":[{"key":0,"dropdownValue":"Integration Build","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["<None>"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":1,"dropdownValue":"Reason","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["Tests in this test suite are now active and can be run","Removed from planning and test execution","Reactivating to run tests","Reactivating to planning phase","New test suite","Plan test cases for this test suite","Completed testing for this test suite"]}],"isPickList":true,"fieldReferenceName":"System.Reason"},{"key":2,"dropdownValue":"State","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["Completed","In Planning","In Progress"]}],"isPickList":true,"fieldReferenceName":"System.State"},{"key":3,"dropdownValue":"Test Suite Type","option":[{"crmOption":["🟥 1","🟧 2","🟨 3","🟩 4"],"devOpsOption":["Query Based","Requirement Based","Static"]}],"isPickList":true,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"","devopsWorkItem":"N/A"},{"key":9,"sourceWorkItem":"Resource","dropdown":[{"key":0,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":1,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":2,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":3,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":4,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":5,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":6,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":7,"dropdownValue":"Integration Build","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":8,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":9,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":10,"dropdownValue":"Query Text","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.QueryText"},{"key":11,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":12,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":13,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":14,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"},{"key":15,"dropdownValue":"Test Suite Audit","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteAudit"},{"key":16,"dropdownValue":"Test Suite Type","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"","devopsWorkItem":"N/A"},{"key":10,"sourceWorkItem":"Acceptance Criteria","dropdown":[{"key":0,"dropdownValue":"Area Path","option":[],"isPickList":false,"fieldReferenceName":"System.AreaPath"},{"key":1,"dropdownValue":"Assigned To","option":[],"isPickList":false,"fieldReferenceName":"System.AssignedTo"},{"key":2,"dropdownValue":"Authorized As","option":[],"isPickList":false,"fieldReferenceName":"System.AuthorizedAs"},{"key":3,"dropdownValue":"Board Column","option":[],"isPickList":false,"fieldReferenceName":"System.BoardColumn"},{"key":4,"dropdownValue":"Board Lane","option":[],"isPickList":false,"fieldReferenceName":"System.BoardLane"},{"key":5,"dropdownValue":"Changed By","option":[],"isPickList":false,"fieldReferenceName":"System.ChangedBy"},{"key":6,"dropdownValue":"Created By","option":[],"isPickList":false,"fieldReferenceName":"System.CreatedBy"},{"key":7,"dropdownValue":"Description","option":[],"isPickList":false,"fieldReferenceName":"System.Description"},{"key":8,"dropdownValue":"History","option":[],"isPickList":false,"fieldReferenceName":"System.History"},{"key":9,"dropdownValue":"Integration Build","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.Build.IntegrationBuild"},{"key":10,"dropdownValue":"Iteration Path","option":[],"isPickList":false,"fieldReferenceName":"System.IterationPath"},{"key":11,"dropdownValue":"Node Name","option":[],"isPickList":false,"fieldReferenceName":"System.NodeName"},{"key":12,"dropdownValue":"Query Text","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.QueryText"},{"key":13,"dropdownValue":"Reason","option":[],"isPickList":false,"fieldReferenceName":"System.Reason"},{"key":14,"dropdownValue":"State","option":[],"isPickList":false,"fieldReferenceName":"System.State"},{"key":15,"dropdownValue":"Tags","option":[],"isPickList":false,"fieldReferenceName":"System.Tags"},{"key":16,"dropdownValue":"Team Project","option":[],"isPickList":false,"fieldReferenceName":"System.TeamProject"},{"key":17,"dropdownValue":"Test Suite Audit","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteAudit"},{"key":18,"dropdownValue":"Test Suite Type","option":[],"isPickList":false,"fieldReferenceName":"Microsoft.VSTS.TCM.TestSuiteType"}],"mapping":"","enable":false,"defaultOptionList":[],"isText":false,"isSelected":true,"isPickListComplete":false,"pickListArr":[],"isSavedType":"saved","fieldReferenceName":"System.AreaPath","devopsWorkItem":"Area Path"}]}]

console.log("JSONPARSE", _AEEEE);

// const treeData: DataNode[] = [
//   {
//     title: 'parent 1',
//     key: '0-0',
//     children: [
//       {
//         title: 'parent 1-0',
//         key: '0-0-0',
//         disabled: true,
//         children: [
//           {
//             title: 'leaf',
//             key: '0-0-0-0',
//             disableCheckbox: true,
//           },
//           {
//             title: 'leaf',
//             key: '0-0-0-1',
//           },
//         ],
//       },
//       {
//         title: 'parent 1-1',
//         key: '0-0-1',
//         children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
//       },
//     ],
//   },
// ];

const internalIds: any = [
  {
    internalid: "1472",
  },
  {
    internalid: "DV-439",
  },
  {
    internalid: "1472_1473",
  },
  {
    internalid: "DV-439_DV-440",
  },
  {
    internalid: "1472_1473_1474",
  },
  {
    internalid: "1472_1473_1477",
  },
  {
    internalid: "1472_1473_1478",
  },
  {
    internalid: "1472_1473_1660",
  },
  {
    internalid: "DV-439_DV-440_DV-441",
  },
];

const workItems: any = {
  results: [
    {
      Title: "RDW1",
      sequance: "1",
      sequanceid: "d605a3ed-3b2c-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "",
      Description: "RDW1",
      workitemid: "d705a3ed-3b2c-ee11-bdf4-6045bd0fcbc6",
      Priority: "🟥 1",
      Resource: "",
      "Design Classification": "Configuration",
      Module: "Test Module",
      GapFit: "Partial",
      ISV: "Insight Works",
      Complexity: "2 - Low",
      "Build estimate (pts)": "2.0000000000",
      "Build estimate (hrs)": "3.0000000000",
      "Work item type": "Epic",
      workitemtypeid: "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "AC1",
      internalid: "DV-439",
    },
    {
      Title: "RDW2",
      workitemid: "36c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "35c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "d605a3ed-3b2c-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Test",
      workitemtypeid: "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDW3",
      workitemid: "d53bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "d43bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "35c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "🟥 1",
      Resource: "",
      "Design Classification": "Customisation",
      Module: "Opportunity Management",
      GapFit: "Gap",
      ISV: "MsCrmAddOns DocumentsCorePack",
      Complexity: "2 - Low",
      "Build estimate (pts)": "5.0000000000",
      "Build estimate (hrs)": "3.0000000000",
      "Work item type": "User Story",
      workitemtypeid: "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDW4",
      workitemid: "50dd7fc9-062d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "4fdd7fc9-062d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "d43bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Task",
      workitemtypeid: "5c7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDW5",
      workitemid: "a0956bd6-062d-ee11-bdf4-6045bd0fcbc6",
      sequance: "2",
      sequanceid: "9f956bd6-062d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "d43bc8b5-062d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Requirement",
      workitemtypeid: "5b7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDW6",
      workitemid: "e53374ea-062d-ee11-bdf4-6045bd0fcbc6",
      sequance: "2",
      sequanceid: "e43374ea-062d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "",
      Description: "new",
      Priority: "🟥 1",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "2 - Low",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Epic",
      workitemtypeid: "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDW7",
      workitemid: "4c8935fe-062d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "4b8935fe-062d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "e43374ea-062d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "🟥 1",
      Resource: "",
      "Design Classification": "Customisation",
      Module: "Test Module",
      GapFit: "Gap",
      ISV: "Insight Works",
      Complexity: "2 - Low",
      "Build estimate (pts)": "2.0000000000",
      "Build estimate (hrs)": "2.0000000000",
      "Work item type": "Feature",
      workitemtypeid: "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDW8",
      workitemid: "3aad9c4d-072d-ee11-bdf4-6045bd0fcbc6",
      sequance: "3",
      sequanceid: "39ad9c4d-072d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Epic",
      workitemtypeid: "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439",
    },
    {
      Title: "RDS_WI1",
      workitemid: "54e65bb3-072d-ee11-bdf4-6045bd0fcbc6",
      sequance: "4",
      sequanceid: "53e65bb3-072d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Epic",
      workitemtypeid: "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440",
    },
    {
      Title: "RDS_WI2",
      workitemid: "0f3fd7bc-072d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "0e3fd7bc-072d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "53e65bb3-072d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Feature",
      workitemtypeid: "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440",
    },
    {
      Title: "RDS_WI3",
      workitemid: "8dae39d2-072d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "8cae39d2-072d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "0e3fd7bc-072d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "User Story",
      workitemtypeid: "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440",
    },
    {
      Title: "RDS_WI4",
      workitemid: "24b129e2-072d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "23b129e2-072d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "8cae39d2-072d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Task",
      workitemtypeid: "5c7a6e8a-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440",
    },
    {
      Title: "RDS_WI5",
      workitemid: "ddb8e001-082d-ee11-bdf4-6045bd0fcbc6",
      sequance: "2",
      sequanceid: "dcb8e001-082d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "35c5870e-3c2c-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "User Story",
      workitemtypeid: "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440",
    },
    {
      Title: "RDQ_WI1",
      workitemid: "14fdb962-082d-ee11-bdf4-6045bd0fcbc6",
      sequance: "5",
      sequanceid: "13fdb962-082d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Epic",
      workitemtypeid: "157c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440_DV-441",
    },
    {
      Title: "RDQ_WI2",
      workitemid: "3a821b71-082d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "39821b71-082d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "13fdb962-082d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "Feature",
      workitemtypeid: "187c2482-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440_DV-441",
    },
    {
      Title: "RDQ_WI3",
      workitemid: "10e7b87c-082d-ee11-bdf4-6045bd0fcbc6",
      sequance: "1",
      sequanceid: "0fe7b87c-082d-ee11-bdf4-6045bd0fcbc6",
      "Parent Work Item": "39821b71-082d-ee11-bdf4-6045bd0fcbc6",
      Description: "",
      Priority: "",
      Resource: "",
      "Design Classification": "",
      Module: "",
      GapFit: "",
      ISV: "",
      Complexity: "",
      "Build estimate (pts)": "",
      "Build estimate (hrs)": "",
      "Work item type": "User Story",
      workitemtypeid: "68f77c92-c4dc-ed11-a7c6-6045bdd0ef22",
      "Acceptance Criteria": "",
      internalid: "DV-439_DV-440_DV-441",
    },
  ],
};

workItems.results.forEach((item: any) => {
  for (const field in item) {
    if (item[field].includes("🟥")) {
      const valueParts = item[field].split(" ");
      const extractedValue = valueParts[1];
      item[field] = extractedValue;
    }
  }
});

console.log("workItemsworkItems", workItems);

interface TreeView {
  guid: any;
  defaultGuid:any;
}

const DevopsTree: React.FC<TreeView> = ({guid, defaultGuid}) => {

  const url = new URL(window.location.href);
  const queryParameters = url.searchParams;
  const _navigateUrl = queryParameters.get("returnto");
  const cbsId = queryParameters.get("cbsid");
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [dataAfterSave, setDataAfterSave] = useState([]);
  const [filteredTreeData, setFilteredTreeData] = useState([]);
  const [workItemsBySurveyId, setWorkItemsBySurveyId] = useState<any>();
  const [allInternalIdsBySurveyId, setAllInternalIdsBySurveyId] =
    useState<any>(internalIds);
  const [selectedNodes, setSelectedNodes] = useState<any>([]);
  const [halfSelectedNodes, setHalfSelectedNodes] = useState<any>([]);
  const [savedMappingFieldsData, setSavedMappingFieldsData] = useState<any>([]);
  const setAllKeysChecked = (loadedKeys: any, { event, node }: any) => {
    console.log("keys", loadedKeys);
    console.log("event...", event, node);
    // setCheckedKeys(keys);
  };

  const fetchRequestToGenerateTree = async() => {
    fetchAllInternalIdsByBusinessSurveyId(cbsId)
    .then(async (res:any) => {
      const data: any = await res?.map((item: any) => JSON.parse(item?.data));
      setAllInternalIdsBySurveyId(data?.flatMap((obj: any) => obj.results));
      const ids = data?.flatMap((obj: any) => obj.results);
      fetchWorkItemsByBusinessSurveyId(cbsId)
      .then(async(val: any,) => {
        const workItems = await val?.data;
        const jsonData = JSON.parse(workItems);
        setWorkItemsBySurveyId(jsonData?.results);
        console.log("workItems..", jsonData?.results, workItemsBySurveyId,ids);
        const internalIds = await ids?.map(
          (item: any) =>{ 
            console.log("item..@#",item?.internalid);         
            return item?.internalid ;
          }
        ); 
        const filteredData1 = await jsonData?.results?.filter((item: any) =>{
          console.log("inside filtered Data", item?.internalid, internalIds?.includes(item?.internalid),internalIds)
          return internalIds?.includes(item?.internalid)
        });

        filteredData1?.forEach((item: any) => {
          for (const field in item) {
            if (item[field].includes("🟥","🟧","🟨","🟩")) {
              const valueParts = item[field].split(" ");
              const extractedValue = valueParts[1];
              item[field] = extractedValue;
            }
          }
        });
        setFilteredTreeData(filteredData1); 
        console.log("filteredData@@", filteredData1);
      })
      .catch((err:any) => console.log("error getting work items", err));
    })
    .catch((err) => console.log("error getting all ids", err));
  
  }

  useEffect(() => {
    fetchRequestToGenerateTree();
  }, []);

  // useEffect(() => {
  //   // to be changed........
  //   const filteredData = workItemsBySurveyId?.filter((item: any) =>internalIds?.includes(item?.internalid));
  //   setFilteredTreeData(filteredData);

  // }, [workItemsBySurveyId,internalIds]);

  // useEffect(() => {

  //   console.log("filtered data....", filteredData);
  // }, [allInternalIdsBySurveyId]);

  console.log("workItemsBySurveyId", workItemsBySurveyId);
  console.log("allInternalIdsBySurveyId", allInternalIdsBySurveyId);
  console.log("filteredData", filteredTreeData);

  // const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  //   console.log('selected', selectedKeys, info.node);
  //   const nodesDetails = info?.node;
  //   if(nodesDetails){

  //   }
  // };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info?.checkedNodes, "info..", info);

    setSelectedNodes(info?.checkedNodes);
    setHalfSelectedNodes(info?.halfCheckedKeys);
  };

  const handleMigrateToDevops = async () => {
    // const checkedObj = filteredTreeData?.filter((node:any)=> selectedNodes?.includes(node?.workitemid));
    // console.log("checked objects for migration:", checkedObj);
    // // create functionality....
    // // To filter the parent nodes....
    // const parentNodes = selectedNodes?.filter((item:any)=> !item?.rest?.parentworkitem);
    // console.log("parentNodes", parentNodes);
    // console.log("halfSelectedNodes", halfSelectedNodes);
    // // To get the half checked nodes with parent.....
    // // const filteredNodes = halfSelectedNodes;
    // console.log("selectedNodes..", selectedNodes);
    // const halfCheckedData = halfSelectedNodes?.map((item:any)=>findNodeAndRelations(treeData,item));
    // console.log("half checked data..", halfCheckedData);

    console.log("XXXXX", selectedNodes);
    // generateDevops(selectedNodes, false);

    const allNodes = selectedNodes.map((item: any) => {
      let fieldsWithReferncePAth = savedMappingFieldsData?.map((_fields: any) => {
        let matchFiledArr =
          _fields?.key &&
          item?.rest["Work item type"] &&
          _fields.value?.length &&
          _fields.value.map((_item: any) => {
            let x = Object.keys(item?.rest).filter((values) => {
              if (_item?.sourceWorkItem === values) {
                console.log(
                  "_item?.sourceWorkItem ===values",
                  _item?.sourceWorkItem,
                  values
                );

                return _item?.sourceWorkItem === values;
              }
            });

            console.log("tag11", x[0], _item?.sourceWorkItem, _fields);

            if (x[0] === _item?.sourceWorkItem && _item.isPickListComplete) {
              const defaultOption =
                _item.defaultOptionList?.defaultOptionList[0];
              console.log("defaultOption", defaultOption);

              const crmOptionIndex = defaultOption?.crmOption.indexOf(
                item?.rest[_item?.sourceWorkItem]
              );
              if (crmOptionIndex !== -1) {
                // Access corresponding value in devOpsOption array
                const devOpsValue = defaultOption.devOpsOption[crmOptionIndex];
                if (
                  _item?.sourceWorkItem !== "Parent Work Item" &&
                  _item?.devopsWorkItem !== "N/A" &&
                  _item?.sourceWorkItem !== "Work item type" &&
                  _item?.fieldReferenceName !== "" &&
                  item?.rest[_item?.sourceWorkItem]
                ) {
                  return (
                    x[0] === _item?.sourceWorkItem && {
                      columnName:
                        _item?.devopsWorkItem !== undefined
                          ? _item?.devopsWorkItem
                          : _item?.sourceWorkItem,
                      referencePath:`/fields/${_item?.fieldReferenceName}`,
                      value: devOpsValue,
                    }
                  );
                }
              } else {
                if (
                  _item?.sourceWorkItem !== "Parent Work Item" &&
                  _item?.devopsWorkItem !== "N/A" &&
                  _item?.sourceWorkItem !== "Work item type" &&
                  _item?.fieldReferenceName !== "" &&
                  item?.rest[_item?.sourceWorkItem]
                ) {
                  return (
                    x[0] === _item?.sourceWorkItem && {
                      columnName:
                        _item?.devopsWorkItem !== undefined
                          ? _item?.devopsWorkItem
                          : _item?.sourceWorkItem,
                      referencePath:`/fields/${_item?.fieldReferenceName}`,
                      value: item?.rest[_item?.sourceWorkItem],
                    }
                  );
                }
              }
              console.log("crmOptionIndex", crmOptionIndex);
            } else {
              if (
                _item?.sourceWorkItem !== "Parent Work Item" &&
                _item?.devopsWorkItem !== "N/A" &&
                _item?.sourceWorkItem !== "Work item type" &&
                _item?.fieldReferenceName !== "" &&
                item?.rest[_item?.sourceWorkItem]
              ) {
                return (
                  x[0] === _item?.sourceWorkItem && {
                    columnName:
                      _item?.devopsWorkItem !== undefined
                        ? _item?.devopsWorkItem
                        : _item?.sourceWorkItem,
                    referencePath:`/fields/${_item?.fieldReferenceName}`,
                    value: item?.rest[_item?.sourceWorkItem],
                  }
                );
              }
            }
          });

        return {
          key: _fields?.key,
          targetTable: _fields?.targetTable,
          matchFiledArr,
        };
      });
      let _workItems = fieldsWithReferncePAth.filter((currentWorkItem: any) => {
        console.log(
          item?.rest?.["Work item type"],
          ":963",
          currentWorkItem.key
        );

        return item?.rest?.["Work item type"] === currentWorkItem?.key;
      });

      //return {workItemsType:}

      console.log("matchedArr", fieldsWithReferncePAth);

      console.log("_workItems", _workItems);
      return { item, workItems: _workItems };
    });
    console.log("allNodes", allNodes);

    const generateRequestBody = allNodes
      ?.map((node: any) => {
        const { workItems, item } = node;
        if (!workItems || workItems.length === 0) return null;
        console.log("tagc", item?.rest["Parent Work Item"]);
        const parentWorkItem = item?.rest["Parent Work Item"];
        const parentId = item?.rest["sequanceid"];

        const formattedParentWorkItem = parentWorkItem;
        //_workItemBody
        const _workItemBody = workItems.map((item: any) => {
          const fieldData = item.matchFiledArr
            .filter((_item: any) => _item !== undefined)
            .map((data: any) => ({
              referencePath: data?.referencePath,
              value: data?.value,
              name: data?.columnName,
            }));
            const data: string | null = localStorage.getItem("items");
            const authData: any = data && JSON.parse(data);
          return {
            organizationUri: authData?.organizationUri,
            personalAccessToken:authData?.personalAccessToken,
            projectName: authData?.projectName,
            workItemType: item.targetTable,
            fieldData,
          };
        });

        return {
          parentKey: formattedParentWorkItem
            ? formattedParentWorkItem
            : "parent",
          workItemBody: _workItemBody,
          sequenceId: parentId,
        };
      })
      .flat();

    console.log("generateRequestBody", generateRequestBody);

    function buildTree(parentId: any) {
      const children = [];
      const filterArray = generateRequestBody?.filter((item:any)=> item != null);
      console.log("filterArray",filterArray );
      for (const item of filterArray) {
        if (item.parentKey === parentId) {
          const child: any = {
            ...item,
            children: buildTree(item.sequenceId),
          };
          children.push(child);
        }
      }
      return children;
    }

    // Initialize the root nodes
    const rootNode = buildTree("parent");

    console.log("hgh", rootNode);

    async function processNode(node: any, parentUrl: any = null) {
      // Perform API call using node data
      console.log("API call for node:", node);

      if (parentUrl) {
        // Find the index of the existing field entry in fieldData array based on referencePath
        // const existingFieldIndex = node.workItemBody[0].fieldData.findIndex(
        //   function (field: any) {
        //     return field.referencePath === "/fields/System.Title";
        //   }
        // );
        const newFieldEntry = {
          referencePath: "",
          value: `${parentUrl}`,
          name: "parentworkitem",
        };

        // Replace the existing field entry with the new one
        // if (existingFieldIndex !== -1) {
        //   node.workItemBody[0].fieldData[existingFieldIndex] = newFieldEntry;
        // }
        node.workItemBody[0].fieldData?.push(newFieldEntry);
      }

      const response: any = await generateDevops(node.workItemBody[0]);
      console.log("saving", node.workItemBody[0]);

      console.log("response", response?.data?.Value.Url);
      const _parentUrl = response?.data?.Value.Url ;
      console.log("_parentUrl", _parentUrl);
      // Process child nodes recursively
      if (node.children) {
        for (const childNode of node.children) {
          processNode(childNode, _parentUrl);
        }
      }
    }

    // Loop through the tree and make API calls
    for (const node of rootNode) {
      processNode(node);
    }

    //generateDevops(generateRequestBody[0])
  };

  // Helper function to create a new node
  const createNode = (title: any, key: any, rest: any, children?: any) => {
    return { title, key, rest, children: children || [] };
  };

  // Function to construct the tree recursively
  function constructTree(data: any, parentId: any) {
    const childrenData = data.filter(
      (item: any) => item["Parent Work Item"] === parentId
    );
    console.log("childrenData", childrenData);

    const childrenNodes = childrenData.map((child: any) => {
      const { Title, workitemid, ...rest } = child;
      const newNode = createNode(Title, workitemid, child);
      newNode.children = constructTree(data, child.sequanceid);
      // Recursively construct children
      return newNode;
    });

    return childrenNodes;
  }

  const _filtertedItemArr = filteredTreeData?.filter(
    (item: any) =>savedMappingFieldsData?.some((_item:any)=> {
     return _item.key ===  (item["Work item type"])
    })
  );

  console.log("_filtertedItemArr",_filtertedItemArr);
  
  
  // Filter data to get only items without a parent (top-level nodes)
  const topLevelNodes = _filtertedItemArr?.filter(
    (item: any) => !item["Parent Work Item"]
  );
  const topLevelNodes2 = _filtertedItemArr?.filter(
    (item: any) => item["Parent Work Item"]
  );

  const filteredData = topLevelNodes2.filter((item: any) => {
    return _filtertedItemArr?.some(
      (otherItem: any) => otherItem.sequanceid === item["Parent Work Item"]
    );
  });
  console.log("topLevelNodes", topLevelNodes);
  console.log("topLevelNodes2", topLevelNodes2);

  console.log("_filtertedItem5",filteredData);

  const _dataSource = [...topLevelNodes, ...filteredData];

  const treeData = _filtertedItemArr.map((item: any) => {
    const { Title, sequanceid, ...rest } = item;
    const newNode = createNode(Title, sequanceid, item);
    console.log("newNodsee", newNode);

    newNode.children = constructTree(_filtertedItemArr, item.sequanceid);
    return newNode;
  });



  const fetchFieldMappingData = async () => {
    console.log("guid", guid, defaultGuid);
    if (guid) {
      let _result: any = await fetchFieldMapping(guid);
      if (_result.type == "success") {
        const _resultData = await JSON.parse(_result.data);
        console.log("mapping fields (saved):", _resultData);
        setSavedMappingFieldsData(_resultData);
      } else if (_result.type == "error") return [];
    }  else if (defaultGuid) {
      let _result: any = await fetchFieldMapping(defaultGuid);
      if (_result.type == "success") {
        const _resultData = await JSON.parse(_result.data);
        console.log("mapping fields (saved):", _resultData);
        setSavedMappingFieldsData(_resultData);
        // return _resultData;
      }
    }else{
      return [];
    }
  };

  console.log("treeData", treeData);

  const sequanceIds = new Set();
for (const item of treeData) {
  for (const child of item.children || []) {
    sequanceIds.add(child.rest.sequanceid);
  }
}

// Remove items with keys that match sequanceIds
const _filteredTreeData = treeData.filter((item:any) => !sequanceIds.has(item.key));

console.log("xxxxx*",_filteredTreeData);

  useEffect(() => {
    fetchWorkItemTypes()
      .then((res) => console.log("res", res))
      .catch((err: any) => console.log(err));
    const result = fetchFieldMappingData();
    console.log("field mapping data: ", result);
  }, []);

  return (
    <>
      <Tree
        checkable
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        // defaultSelectedKeys={['0-0-0', '0-0-1']}
        // defaultCheckedKeys={['0-0-0', '0-0-1']}
        // onSelect={onSelect}
        checkStrictly={true}
        selectable={false}
        onCheck={onCheck}
        treeData={_filteredTreeData}
        onLoad={setAllKeysChecked}
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

        <Button
          type="primary"
          htmlType="button"
          onClick={handleMigrateToDevops}
        >
          Migrate to DevOps
        </Button>
      </span>
    </>
  );
};

export default DevopsTree;
