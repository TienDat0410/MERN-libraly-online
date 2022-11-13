const nodemailer = require('nodemailer');
const User = require('../model/User');
const dotenv = require('dotenv');

dotenv.config();

const checkemail = async options => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tiendatcheckservice@gmail.com",
            pass: "rclomymascwacuyw"
        }
    });
    // const users = await User.findById(req.params.id);
    // res.json({
    //     email: user.email,
    // });
    // let info = transporter.sendMail({
        
    //     from: "tiendatcheckservice@gmail.com", // sender address
    //     to:  req.body.to,
    //     subject: req.body.subject, // Subject line
    //     text: req.body.text, // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // });
    const message = {
        from: "tiendatcheckservice@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(message);
    if(message) {
        res.send('message sent success.');
    } else {
        res.send('err in send email!');
    };
};

module.exports = checkemail;