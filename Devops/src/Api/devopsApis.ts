import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": '*',
  mode: 'no-cors'
}

const data: any = {
  
    "organizationUri": "https://dev.azure.com/SEERTEST2",
    "personalAccessToken": "bkrgotkmcf7vjq6wdq6dmh26t5lt65klid66c7mcuztql3pyrlia",
    "projectName": "SEETTEST1",
    "workItemType":"Task"

}

// {
//   organizationUri: "https://dev.azure.com/SEERTEST2",
//   personalAccessToken: "yspdehntr5yx6jbbwkwnrzkiekea44k4trp2dq63lfjvdixilisa",
//   projectName: "SEETTEST1"
// }
//dvttsdit35edsgajqqwxipnobf7r6x5g2nr337cp5ovhmiylq3za
export const fetchDevopsFeildsData = async() => {
  try {
    const result = await axios.post('https://seerv2sample2.azurewebsites.net/api/GetWorkItemTypeFields?code=CaKwbNIEMdEd1QYrcg9gXEGYcmm0age5Pg1syECCr0a3AzFuIOW6EA==', 
      // {headers: headers},
      {
        "organizationUri": "https://dev.azure.com/SEERTEST2",
        "personalAccessToken": "dvttsdit35edsgajqqwxipnobf7r6x5g2nr337cp5ovhmiylq3za",
        "projectName": "SEETTEST1",
        "workItemType":"Task"
    }
    
    );
    console.log("post req =========> ", result);

    if(result?.data?.StatusCode === 200){
      return result.data;
    }else{
      return {status:"error", data:result?.data };
  }  
   
    
  } catch (error) {
    console.log("GetWorkItemTypeFields ===========", error);
    
  }
}

export const fetchWorkItemTypesFromDevops = async() => {
  try {
    const result = 
    await axios.post('https://seerv2sample2.azurewebsites.net/api/GetWorkItemTypes?code=eZ8HwfEwRhr3EMahUUgKUz44rtzwwtaHss-lHwReYpS2AzFuDdbXow==', 
      // {headers: headers},
      {
        "organizationUri": "https://dev.azure.com/SEERTEST2",
        "personalAccessToken": "bkrgotkmcf7vjq6wdq6dmh26t5lt65klid66c7mcuztql3pyrlia",
        "projectName": "SEETTEST1"
      }
    );
      console.log("GetWorkItemTypes =========> ", result);
      if(result?.data?.StatusCode === 200){
        return {status:"success", data:result?.data };
      }else{
        return {status:"error", data:result?.data };
    }  
  } catch (error) {
    console.log("GetWorkItemTypes ===========", error);
    return {status:"error", data:error}
  }
}

export const postReq3 = async() => {
  try {
    const result = await axios.post('https://seerv2samplefunctions.azurewebsites.net/api/workitemtypes?code=Ht8huimZ3kJtn36JX6fjuFRX6fI7GqYnKbg1wJcqlVa2AzFu2nOLRQ==',
      {data},
    );
    console.log("get req =========> ", result);
  } catch (error) {
    console.log("error postReq ===========", error);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    
  }
}


export const getReqw = async() => {
  try {
    const result = await axios.get('https://seerv2samplefunctions.azurewebsites.net/api/workitemtypes?code=Ht8huimZ3kJtn36JX6fjuFRX6fI7GqYnKbg1wJcqlVa2AzFu2nOLRQ==',
      {headers: headers},
    );
    console.log("get req =========> ", result);
    return result;
  } catch (error) {
    console.log("error postReq ===========", error);
    
  }
}

export const postReqGydeDesignStudioDev = async() => {
  try {
    const result = 
    await axios.get('https://gydedesignstudiodev.powerappsportals.com/_api/$metadata#accounts');
    console.log("type 1  =========> ", result);
    
  } catch (error) {
    console.log("type 1 ===========", error);
    
  }
}

export const fetchWorkItemTypesFromCRM  = async() => {
  try {
    const result = 
    await axios.get('https://gydedesignstudiodev.powerappsportals.com/_api/gyde_workitemtypes');
    console.log("get WorkItemTypes From CRM =========> ", result);
    
  } catch (error) {
    console.log(" Error get WorkItemTypes From CRM ===========", error);
    
  }

}

export const postReq4 = async() => {
  try {
    const result = 
    await axios.get('https://seerv2sample2.azurewebsites.net/api/FetchEntityMetadata?code=OFkmhAGcuj9jL751lEKt-mFiPW9FU2bL53YUeU1iQZXAAzFuo8isRg==');
    console.log("type 3 =========> ", result);
    
  } catch (error) {
    console.log(" type 3 ===========", error);
    
  }
}

export const postReq5 = async() => {
  try {
    const result = 
    await axios.post('https://prod-40.westus.logic.azure.com:443/workflows/c4bc8b5373824bea91817ec66b1c0888/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xxG4MjY6wiYywowK6sbZLWukqntZIwkGExOSO1TS0qs');
    console.log("type 4 =========> ", result);
    
  } catch (error) {
    console.log(" type 4 ===========", error);
    
  }
}
