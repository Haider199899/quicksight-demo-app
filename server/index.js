const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config')
const AWS = require('aws-sdk')
const credentials = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
}
AWS.config.update(credentials)
const quicksightClient = new AWS.QuickSight({
  apiConfig: require('aws-sdk/apis/quicksight-2018-04-01.min.json'),
  region: 'us-east-1',
})
const app = express()
app.use(cors())
app.use(bodyParser.json())
const generateDashboardUrl = async () => {
  let userArn = ''
  const user = await quicksightClient
    .listUsers({
      AwsAccountId: process.env.AWS_ACCOUNT_ID,
      Namespace: 'default',
    })
    .promise()
  user.UserList.pop() //Removing last user
  userArn = user.UserList[0]?.Arn
  if (!user.UserList.length) {
    const registeredUser = await quicksightClient
      .registerUser({
        AwsAccountId: process.env.AWS_ACCOUNT_ID,
        IdentityType: 'IAM',
        Email: process.env.IAM_USER_EMAIL,
        UserRole: 'READER',
        Namespace: 'default',
        IamArn: `arn:aws:iam::${process.env.AWS_ACCOUNT_ID}:role/qs-user-role`,
        SessionName: `iam-user`,
      })
      .promise()
    userArn = registeredUser.User.Arn
  }
  const url = await quicksightClient
    .getDashboardEmbedUrl({
      AwsAccountId: process.env.AWS_ACCOUNT_ID,
      Namespace: 'default',
      DashboardId: process.env.DASHBOARD_ID,
      IdentityType: 'QUICKSIGHT',
      UserArn: userArn,
      SessionLifetimeInMinutes: 100,
    })
    .promise()
  return url.EmbedUrl
}

const user = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (user.username === username && user.password === password) {
    const url = await generateDashboardUrl();
    res.json({
      success : true,
      url : url
    })
    
  } else {
    res.json({ success: false, message: 'Invalid username or password' })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
