const mongoose = require('mongoose');

const MessageDetailsSchema = new mongoose.Schema({
        message: String,
        Chatusers: Array,
        Sender: String,
        readBy: String,
      }, { timestamps: true });
      
      const Message = mongoose.model('Message', MessageDetailsSchema);