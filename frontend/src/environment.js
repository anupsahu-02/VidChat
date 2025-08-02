let IS_PROD = true;

const server =  IS_PROD ?
   'https://vidchatbackend.onrender.com' :
   'http://localhost:3000/api/v1/users' 

export default server;
