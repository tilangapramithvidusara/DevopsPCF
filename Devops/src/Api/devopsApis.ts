import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": '*',
  mode: 'no-cors'
}

const data: any = {
  organizationUri: "https://dev.azure.com/SEERTEST2",
  personalAccessToken: "yspdehntr5yx6jbbwkwnrzkiekea44k4trp2dq63lfjvdixilisa",
  projectName: "SEETTEST1",
}

// {
//   organizationUri: "https://dev.azure.com/SEERTEST2",
//   personalAccessToken: "yspdehntr5yx6jbbwkwnrzkiekea44k4trp2dq63lfjvdixilisa",
//   projectName: "SEETTEST1"
// }
export const postReq = async() => {
  try {
    const result = await axios.post('https://seerv2samplefunctions.azurewebsites.net/api/workitemtypes?code=Ht8huimZ3kJtn36JX6fjuFRX6fI7GqYnKbg1wJcqlVa2AzFu2nOLRQ==', 
      // {headers: headers},
      data,
    );
    console.log("post req =========> ", result);
    
  } catch (error) {
    console.log("error postReq ===========", error);
    
  }
}

export const getReq = async() => {
  try {
    const result = await axios.get('https://seerv2samplefunctions.azurewebsites.net/api/workitemtypes?code=Ht8huimZ3kJtn36JX6fjuFRX6fI7GqYnKbg1wJcqlVa2AzFu2nOLRQ==',
      {headers: headers, params: data},
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
  } catch (error) {
    console.log("error postReq ===========", error);
    
  }
}