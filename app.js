const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/v2', createProxyMiddleware({ target: 'https://open-api.myhelsinki.fi/', changeOrigin: true }));
app.use(express.static("build"));

// start express server on port 5000
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});