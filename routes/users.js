var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

// send mail using node mailer
const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tmangukiya48@gmail.com",
    pass: "5139@tushar",
  },
});

// Image upload using multer
const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })

/* GET users listing. */
router.get('/', async(req, res, next) => {
  var users = await userModel.find({isDeleted: false})
  res.send({
    message: "All users",
    users
  })
});

// Add user
router.post('/', upload.single('image'), async (req, res) => {
  console.log("file : ", req.file);
  var user = new userModel({
    name: req.body.name,
    email: req.body.email,
    image: req.file.filename
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'tmangukiya48@gmail.com', // sender address
    to: "tmangukiya47@gmail.com", // list of receivers
    subject: "Hello for tushat ✔", // Subject line
    text: "new user added successfully", // plain text body
    html: "<b>Hello from tushar?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  await user.save().then(data => {
    res.send({
      message: "user added.",
      user
    })
  }).catch((error) => {
    res.status(500).send({
      message: error.message || 'Error while adding user.'
    })
  })
})

// Edit user
router.put('/:id', async (req, res) => {
  let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body)
  res.send({
    message: "user updated.",
    updatedUser
  })
})

// Delete user
// Edit user
router.delete('/:id', async (req, res) => {
  let deletedUser = await userModel.findByIdAndUpdate(req.params.id, {isDeleted: true}).then((user) => {
    res.send({
      message: "user deleted.",
      user
    })
  }) 
})


module.exports = router;
