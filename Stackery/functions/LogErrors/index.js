module.exports = function handler(message, context, callback) {
    console.log(`Error in node ${message.stackery.node.name} - ${message.class} - ${message.message} - stack trace: ${message.stack}`);
    callback (null, {});
}