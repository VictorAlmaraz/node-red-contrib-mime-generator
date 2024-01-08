const { createMimeMessage } = require("mimetext");

module.exports = function (RED) {
  function MIMEGenerator(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg, send, done) {
      this.subject = msg.subject ?? config.subject;
      this.from = msg.from ?? config.from;
      this.to = msg.to ?? config.to;
      this.cc = msg.cc ?? config.cc;
      this.bcc = msg.bcc ?? config.bcc;
      this.replyTo = msg.replyTo ?? config.replyTo;

      const email = createMimeMessage();

      try {
        email.setSender(this.from);

        if (this.subject) email.setSubject(this.subject);

        if (this.to) email.setTo(this.to);
        if (this.cc) email.setCc(this.cc);

        if (this.bcc) email.setBcc(this.bcc);

        if (this.replyTo && this.replyTo != "")
          email.setHeader("Reply-To", this.replyTo);

        if (typeof msg.payload == "string") {
          email.setMessage("text/plain", msg.payload);
        } else {
          const keys = Object.keys(msg.payload);
          keys.forEach((key, index) => {
            email.setMessage(key, msg.payload[key]);
          });
        }

        msg.payload = email.asRaw();
        this.status({});
        node.send(msg);
      } catch (err) {
        if (done) {
          done(err);
        } else {
          this.error(err);
        }
        this.status({ fill: "red", shape: "ring", text: err });
      }
    });
  }
  RED.nodes.registerType("MIME Generator", MIMEGenerator);
};
