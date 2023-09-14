const messageModel = require("../model/messageModel");
const crypto = require('crypto');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const algorithm = 'aes-256-cbc';
    const password = 'a password';
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const data = await messageModel.create({
      message: { text: encrypted,iv: iv.toString('hex') },
      users: [from, to],
      sender: from,
      
    });
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await messageModel
        .find({
          users: {
            $all: [from, to],
          },
        })
        .sort({ updatedAt: 1 });
  
      const projectMessages = messages.map((msg) => {
        const algorithm = 'aes-256-cbc';
        const password = 'a password';
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const iv = Buffer.from(msg.message.iv, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
  
        let encrypted = msg.message.text;
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
  
        return {
          fromSelf: msg.sender.toString() === from,
          message: decrypted,
        };
      });
  
      res.json(projectMessages);
    } catch (ex) {
      next(ex);
    }
  };
  