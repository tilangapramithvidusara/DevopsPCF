import React from 'react';
import {  BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import ConnectionContainer from './Features/ConnectionContainer';
// import configProperties from '../config.properties';

export interface AppConfig {
  apiKey: string;
  apiEndpoint: string;
}

interface AppProps {
  config: AppConfig;
}

const App: React.FC<AppProps> = ({ config }) => {
  console.log("configv ======> ", config);
  const baseUrl = new URL(window.location.href);
  const updatedPathname = baseUrl.pathname.replace("/devops/", "/devops-migrate/");
  const updatedUrl = `${baseUrl.protocol}//${baseUrl.hostname}${updatedPathname}${baseUrl.search}${baseUrl.hash}`;
  // const fetchProperties = async () => {
  //   const response = await fetch(configProperties);
  //   const fileContent = await response.text();
  
  //   const properties = {};
  //   fileContent.split('\n').forEach(line => {
  //     const [key, value] = line.split('=');
  //     properties[key.trim()] = value.trim();
  //   });
  
  //   return properties;
  // };

  // useEffect(() => {
  //   fetchProperties()
  //     .then(properties => {
  //       const myValue = properties.myKey;
  //       console.log(myValue); // Outputs: Hello World
  //     })
  //     .catch(error => {
  //       console.error('Failed to fetch properties:', error);
  //     });
  // }, []);
  console.log("url => ", baseUrl,updatedPathname, updatedUrl);
  
  return (
    <div>
       <Router>
        <Routes>
          {/* <ConnectionContainer/> */}
          <Route path={`${baseUrl}`}  element={<ConnectionContainer/>} />
          <Route path={`${updatedUrl}`} element={""} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;
