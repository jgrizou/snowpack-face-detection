module.exports = {
  
  // see https://github.com/snowpackjs/snowpack/discussions/1234
  // WARNING, ordering seems to matter
  mount: {
    "public/models": { 
      "url": "/models", 
      "static": true, 
      "resolve": false 
    },
    "public": "/",
    "src": '/',
  },
 
  buildOptions: {
    baseUrl: '/snowpack-boilerplate',
    out: './docs',
  },
  
};