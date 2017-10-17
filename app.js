import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// Router
import router from './route/route'
import routerProtect from './route/router.protect'
import routerAdmin from './route/router.admin';
import routerAdminProtect from './route/router.admin.protect';

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    next();
});

app.use('/api', router)

app.use('/api/user', function(req, res, next) {
  const authorization = req.headers['authorization'];
  const bearer = 'bearer'

  if ( authorization != undefined ) {
    const prefixToken = authorization.split(' ') // Get prefix token (should be bearer)

    if ( prefixToken[0].toLowerCase() == bearer.toLowerCase() && prefixToken[1] != undefined) // bearer == bearer and token must be defined
      next();
    else
      res.status(400).json({ success: false, data: 'TOKEN_NOT_PROVIDED' })
  } else {
    res.status(400).json({ success: false, data: 'TOKEN_NOT_PROVIDED' })
  }
})
app.use('/api/user', routerProtect)

app.use('/api/admin', routerAdmin) // Use for admin

app.use('/api/admin/protect', function(req, res, next) {
  const authorization = req.headers['authorization'];
  const bearer = 'bearer'

  if ( authorization != undefined ) {
    const prefixToken = authorization.split(' ') // Get prefix token (should be bearer)

    if ( prefixToken[0].toLowerCase() == bearer.toLowerCase() && prefixToken[1] != undefined) // bearer == bearer and token must be defined
      next();
    else
      res.status(400).json({ success: false, data: 'TOKEN_NOT_PROVIDED' })
  } else {
    res.status(400).json({ success: false, data: 'TOKEN_NOT_PROVIDED' })
  }
})

app.use('/api/admin/protect', routerAdminProtect) // Use for admin using token (after logged in)

app.get('/*', function (req, res) {
  res.status(404).send('NOT FOUND')
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

