import { driver, process as gprocess, structure } from "gremlin";
const Graph = structure.Graph;

export function connect_neptune(endpoint: string):{g:gprocess.GraphTraversalSource,conn:driver.DriverRemoteConnection} {
  let conn: driver.DriverRemoteConnection;
  let g: gprocess.GraphTraversalSource;

  const getConnectionDetails = () => {
    const database_url = "wss://" + endpoint + ":8182/gremlin";

    return { url: database_url, headers: {} };
  };

  const createRemoteConnection = () => {
    const { url, headers } = getConnectionDetails();

    return new driver.DriverRemoteConnection(url, {
      mimeType: "application/vnd.gremlin-v2.0+json",
      pingEnabled: false,
      headers: headers,
    });
  };

  conn = createRemoteConnection();
  const graph = new Graph();
  g = graph.traversal().withRemote(conn);

  return { g: g, conn: conn };
}