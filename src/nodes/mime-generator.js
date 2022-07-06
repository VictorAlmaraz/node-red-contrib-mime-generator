const { createMimeMessage } =  require("mimetext")

module.exports = function(RED) {
    function MIMEGenerator(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            this.subject = msg.subject ?? config.subject;
            this.from = msg.from ?? config.from;
            this.to = msg.to ?? config.to;
            this.cc = msg.cc ?? config.cc;
            this.bcc = msg.bcc ?? config.bcc;

const email = createMimeMessage();

try {

email.setSender(this.from);

if(this.subject)
    email.setSubject(this.subject);


if(this.to)
    email.setTo(this.to);
if(this.cc)
    email.setCc(this.cc);

if(this.bcc)
    email.setBcc(this.bcc);

if(typeof msg.payload == 'string') {
    this.warn('simple string', msg.payload);
    email.setMessage('text/plain', msg.payload);
} else {
    this.warn(`complex object ${JSON.stringify(msg.payload)}`);
    const keys = Object.keys(msg.payload);
    keys.forEach((key, index) => {
        email.setMessage(key, msg.payload[key]);
    })
}

msg.payload = email.asRaw();
this.status({});
            node.send(msg);
            
            
} catch(err) {
    this.error(err);
                    this.status({fill:'red', shape:'ring',text:err});
}
        });
    }
    RED.nodes.registerType("MIME Generator",MIMEGenerator);
}