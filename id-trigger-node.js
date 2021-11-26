module.exports = function (RED) {
    function IdTrigger(n) {
        RED.nodes.createNode(this, n);
        this.triggerid = n.triggerid;
        this.name = n.name;
        //this.payload = n.payload;
        var node = this;
        console.log("*****************N************", JSON.stringify(n))
        RED.events.on("id_trigger", function(event){
            if (event.triggerid === node.triggerid) {
                console.log("*****************EMIT EVENT************", JSON.stringify(event))
                node.emit("input",{payload: event.payload} || {});
            } else {
                console.log("*************no match check: "+ event.triggerid + "==" + node.triggerid)
            }
        })
        this.on("input",function(msg,send) {
            console.log("****************** ON INPUT*****************", JSON.stringify(msg))
            send(msg)
        })
        
        
        // this.on('close', function (done) {
        //     node.status({fill: "red", shape: "dot", text: "Job stopped"});
        //     done();
        // });
        // node.status({fill: "blue", shape: "dot", text: "Job deployed"});
        
        
    }
    RED.nodes.registerType("id-trigger", IdTrigger);
};
