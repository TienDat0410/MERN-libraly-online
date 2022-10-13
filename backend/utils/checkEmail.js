const nodemailer = require('nodemailer');
const User = require('../model/User');

const checkemail = async (res, req)  => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tiendatcheckservice@gmail.com",
            pass: "wycuiuaxidosopnc"
        }
    });
    // const users = await User.findById(req.params.id);
    // res.json({
    //     email: user.email,
    // });
    let info = transporter.sendMail({
        
        from: "tiendatcheckservice@gmail.com", // sender address
        to:  req.body.to,
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    if(info) {
        res.send('message sent success.');
    } else {
        res.send('err in send email!');
    };
};

module.exports = checkemail;