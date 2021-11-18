"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gremlin_1 = require("gremlin");
var Graph = gremlin_1.structure.Graph;
function initializeGremlinClient(endpoint) {
    var conn;
    var g;
    var getConnectionDetails = function () {
        var database_url = "wss://" + endpoint + ":8182/gremlin";
        return { url: database_url, headers: {} };
    };
    var createRemoteConnection = function () {
        var _a = getConnectionDetails(), url = _a.url, headers = _a.headers;
        console.log("creating remote connection");
        return new gremlin_1.driver.DriverRemoteConnection(url, {
            mimeType: "application/vnd.gremlin-v2.0+json",
            pingEnabled: false,
            headers: headers,
        });
    };
    conn = createRemoteConnection();
    var graph = new Graph();
    g = graph.traversal().withRemote(conn);
    return { g: g, conn: conn };
}
exports.default = initializeGremlinClient;
