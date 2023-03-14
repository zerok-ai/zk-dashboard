import { useEffect, useState } from 'react';
import { Canvas, hasLink, NodeData, EdgeData, Node, Edge, Port, MarkerArrow, Label, CanvasPosition } from 'reaflow';
import { FileOutlined } from '@ant-design/icons';
import { ServiceMapEdge } from './models/ServiceMapResponse';

import MainCard from 'components/MainCard';
import { getServiceMap } from './controllers/ServiceMapAPIController';
import { Box, LinearProgress } from '@mui/material';
import ClusterInfo from 'types/models/ClusterInfo';
import { ClusterContext } from 'contexts/Cluster/ClusterContext';

const prepareMap = (mapdata: ServiceMapEdge[]) => {
  let _nodes: NodeData[] = [];
  let _edges: EdgeData[] = [];
  let serviceNames: string[] = [];
  let edgeIDList = new Set();

  var nodeList = new Map<string, Array<string>>();
  mapdata
    .filter((service: any) => service.requester_service !== '')
    .forEach((service: any) => {
      const prevArr = nodeList.get(service.requester_service) || [];
      try {
        service.responder_service = JSON.parse(service.responder_service);
      } catch (err) {}
      if (typeof service.responder_service === 'object') {
        nodeList.set(service.requester_service, [...prevArr, ...service.responder_service]);
      } else if (typeof service.responder_service === 'string') {
        nodeList.set(service.requester_service, [...prevArr, ...[service.responder_service]]);
      }

      serviceNames = [...serviceNames, ...[service.requester_service]];
      serviceNames = [...serviceNames, ...(nodeList.get(service.requester_service) || [])];
    });

  serviceNames = Array.from(new Set(serviceNames));
  serviceNames.forEach((serviceName) => {
    _nodes.push({
      id: serviceName,
      text: serviceName,
      data: { title: serviceName, subline: 'api.ts' }
    });
  });
  serviceNames.forEach((serviceName) => {
    let targets = nodeList.get(serviceName) || [];
    targets.forEach((target) => {
      const edgeId = serviceName + '->' + target;
      if (edgeIDList.has(edgeId)) return;
      _edges.push({
        id: edgeId,
        from: serviceName,
        to: target
      });
      edgeIDList.add(edgeId);
    });
  });

  return {
    _nodes,
    _edges
  };
};

const ServiceMap = () => {
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [selectedClusterId, setSelectedClusterId] = useState('');

  function updateServiceMap(clusterId: string) {
    if (!clusterId) {
      console.log('cluster ID was null');
      return;
    }
    getServiceMap(selectedClusterId).then((mapData) => {
      const { _nodes, _edges } = prepareMap(mapData.results);
      setNodes(_nodes);
      setEdges(_edges);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (loading === false) return;
    updateServiceMap(selectedClusterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeListener(cluster: ClusterInfo) {
    if (cluster.cluster_id !== selectedClusterId) {
      console.log('Updating cluster ' + cluster.cluster_name + ',' + cluster.cluster_id);
      setSelectedClusterId(cluster.cluster_id);
      updateServiceMap(cluster.cluster_id);
    }
  }

  return (
    <ClusterContext.Consumer>
      {({ registerChangeListener, getSelectedCluster }: any) => {
        let selectedCluster = getSelectedCluster();
        if (selectedCluster && selectedCluster.cluster_id !== selectedClusterId) {
          setSelectedClusterId(selectedCluster.cluster_id);
          updateServiceMap(selectedCluster.cluster_id);
        }
        registerChangeListener(changeListener);
        return (
          <MainCard title="Service Map">
            <div style={{ width: '100%', height: '60vh' }}>
              <style>
                {`
            .node {
              max-width: none;
            }
            .edge {
              stroke: #b1b1b7;
              stroke-dasharray: 5;
              animation: dashdraw .5s linear infinite;
              stroke-width: 1;
            }
            @keyframes dashdraw {
              0% { stroke-dashoffset: 10; }
            }
        `}
              </style>
              {loading ? (
                <Box sx={{ m: -3 }}>
                  <LinearProgress />
                </Box>
              ) : (
                <Canvas
                  pannable={false}
                  nodes={nodes}
                  edges={edges}
                  defaultPosition={CanvasPosition.TOP}
                  direction="RIGHT"
                  onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
                    return !hasLink(edges, from, to);
                  }}
                  node={
                    <Node
                      style={{ strokeWidth: 1, maxWidth: 'auto' }}
                      icon={<FileOutlined />}
                      draggable={false}
                      label={<Label style={{ fill: 'white', fontSize: '0.85em' }} />}
                      port={<Port style={{ fill: 'blue', stroke: 'white' }} rx={20} ry={20} />}
                    />
                  }
                  arrow={<MarkerArrow style={{ fill: '#b1b1b7' }} />}
                  edge={<Edge className="edge" />}
                  onNodeLink={(_event, from, to) => {
                    const id = `${from.id}-${to.id}`;
                    setEdges([
                      ...edges,
                      {
                        id,
                        from: from.id,
                        to: to.id
                      }
                    ]);
                  }}
                />
              )}
            </div>
          </MainCard>
        );
      }}
    </ClusterContext.Consumer>
  );
};

export default ServiceMap;
