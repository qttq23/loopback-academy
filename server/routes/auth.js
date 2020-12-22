const utils = require('./utils.js')

const app = require('../server.js');
const router = app.loopback.Router();
const model = app.models.account;

module.exports = router;


router.post('/register', async function(req, res) {

  console.log(req.body)
  let credentials = req.body

  // encrypt password
  credentials.password = await utils.hash(credentials.password)
  console.log('password encrypted');

  // save database
  try {
    let result = await model.create(credentials);
    return res.json(result)

  } catch (e) {
    return res.json(e)

  }
})



router.post('/login', async function(req, res) {

  console.log(req.body)
  let credentials = req.body

  // get user
  let list = await model.find({ "where": { "email": credentials.email } });
  if (!list || list.length == 0) {
    // return error not found user
    return res.status(400).json({ 'error': 'account not found' })
  }

  // check password
  let isValid = await utils.compare(credentials.password, list[0].password)
  if (!isValid) {
    return res.status(400).json({ 'error': 'authentication failed' })
  }
  // if(list[0].password != credentials.password){
  // 	// return error not found user
  // 	return res.status(400).json({'error': 'account not found'})

  // }

  // if all ok, generate access token
  // generate access token, refresh token
  let accessToken = await utils.signJWT({
      userId: list[0].id
    },
    "abcdef",
    3000)

  // return
  res.status(200).json({
    accessToken
  })

  // let token = 'abcdef';
  // return res.json({token});

})
