/*
Name of the module: Contact Section

Date of module Creation: 01/11/2021

Author of the module: Mohit Prajapati

What the module does: Sends query/suggestion email to admin

Functions supported:
1. postRequest  => Input: name, email, title, description;       Output: "Your request has been sent successfully. Thank You!"

Global variables: user id
*/

const requestsendMail = require('./requestSendMail');

const contactCtrl = {
    // send query/suggestion recieved from front end to admin via email
    postRequest: async (req, res) => {
        try {
            const { name, email, title, description } = req.body;

            const admin = "mohitprajapati11069@gmail.com"
            requestsendMail(admin,
                "Congratulations! You have received a new suggestion/query.",
                `FROM: ${name} (${email})`,
                `Title: ${title}`,
                `Description: ${description} Thank You!`
            );
 
            res.json({ msg: "Your request has been sent successfully. Thank You!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = contactCtrl;