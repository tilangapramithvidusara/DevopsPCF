import axios from "axios";

export const FetchCrmFields = async() => {
    try {
      const result = await axios.get('https://prod-17.uksouth.logic.azure.com:443/workflows/76dd770f7f744391be83d6d38efbff50/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Qc3zVpUjFzDWIERQzIPQELXuF1-sO94-1pAqkIb254M', 
    // {headers: headers},
      );
      if(result?.status === 200){
        return result.data;
      }else{
        return {status:"error", data:result?.data };
    }  
      
    } catch (error) {
      console.log("error postReq ===========", error);
      
    }
  }
  