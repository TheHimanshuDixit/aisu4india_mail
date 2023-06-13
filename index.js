const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config()

const app = express();
const server = http.Server(app);
const port = 3000;

app.set("port", port);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views/index.html")));
app.use(express.static("asset"));

// Routing
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
})

app.post("/send_email", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var gender = req.body.gender;
    var dob = req.body.dob;
    var contact = req.body.contact;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var university = req.body.university;
    var whyAISU = req.body.whyAISU;
    var hearAISU = req.body.hearAISU;
    var howAISU = req.body.howAISU;


    // Email Template
    const output = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>
        <div style="text-align: center;">
            <img src="https://aisu4india.in/wp-content/uploads/2023/06/AISU.png" alt="" style="height: 4rem; width: 4rem;"> <br>
            <img src="https://images.freeimages.com/images/large-previews/449/welcome-1639515.png" alt="" style="height: 3rem;">
        </div>
        <div>
            <h2 style="color: #fc8c35;">
                Welcome!!
            </h2>
            <p>
                Hello <b>${name}</b>,<br>
                Thank you for your interest in joining our community. we are always looking for talented and motivated
                individuals who are passionate about what they do and who are commited to helping our organization reach
                its goal.
            </p>
            <h3 style="color: #fc8c35;">
                <u>Your Details :</u>
            </h3>
            <p>
                <b>Name:</b> <span style="color: cornflowerblue;">${name}</span> <br>
                <b>Email:</b> <span style="color: cornflowerblue;">${email}</span> <br>
                <b>Gender:</b> <span style="color: cornflowerblue;">${gender}</span> <br>
                <b>DOB:</b> <span style="color: cornflowerblue;">${dob}</span> <br>
                <b>Contact:</b> <span style="color: cornflowerblue;">${contact}</span> <br>
                <b>Address:</b> <span style="color: cornflowerblue;">${address}</span> <br>
                <b>City:</b> <span style="color: cornflowerblue;">${city}</span> <br>
                <b>State:</b> <span style="color: cornflowerblue;">${state}</span> <br>
                <b>Pincode:</b> <span style="color: cornflowerblue;">${pincode}</span> <br>
                <b>University:</b> <span style="color: cornflowerblue;">${university}</span> <br>
                <b>Why do you want to join the AISU? </b> <span style="color: cornflowerblue;">${whyAISU}</span> <br>
                <b>How did you hear about us?</b> <span style="color: cornflowerblue;">${hearAISU}</span> <br>
                <b>How would you like to contribute to the AlSU?</b> <span
                    style="color: cornflowerblue;">${howAISU}</span> <br>
            </p>
            <p style="color: red;">
                Thanks & Regards <br>
                AISU
            </p>
            <p><b>Contact us:</b> support@aisu4india.in</p>
        </div>
    </div>
</body>

</html>
`;
    // Instantiate the SMTP server
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    // Specify what the email will look like
    var mailOption = {
        from: 'aisu4india@gmail.com',                       //Sender mail
        to: email,					                        // Recever mail
        subject: 'Thank You',
        html: output
    }

    // Send mail with defined transport object
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            res.send('<h1 style="color:red" > Something Wrong. </h1>');
        }
        else {
            res.send('<h1 style="color: green" >Thank You, Message has been Sent.');
        }
    })
})


// initialize web server 
app.listen(port, function () {
    console.log('Server is running on port ' + port);
})