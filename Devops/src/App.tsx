import React from 'react';
import ConnectionContainer from './Features/ConnectionContainer';

export interface AppConfig {
  apiKey: string;
  apiEndpoint: string;
}

interface AppProps {
  config: AppConfig;
}

const App: React.FC<AppProps> = ({ config }) => {
  console.log("configv ======> ", config);

  const url = new URL(window.location.href);
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

  // const componentShift = () => {
  //   if(window.pa){
  //     return <ConnectionContainer/>;
  //   }else {
  //     return <DevopsTree/>;
  //   }
  // }
  
  return (
    <div>
      <ConnectionContainer/>
    </div>
  )
};

export default App;
