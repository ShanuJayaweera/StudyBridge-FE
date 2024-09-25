interface Config {
    apiUrl: string;
}
  
  const config: Config = {
    apiUrl: process.env.REACT_APP_API_URL || ''
  };
  
  export default config;