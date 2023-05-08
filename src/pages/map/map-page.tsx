import { useEffect, useState } from 'react';
import { Canvas, hasLink, NodeData, EdgeData, Node, Edge, Port, MarkerArrow, Label, CanvasPosition } from 'reaflow';
import { FileOutlined } from '@ant-design/icons';
import { ServiceMapAPIResponse, ServiceMapEdge } from './models/ServiceMapResponse';

import MainCard from 'components/MainCard';
import { getServiceMap } from './controllers/ServiceMapAPIController';
import { Box, Checkbox, FormControl, InputLabel, LinearProgress, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { ClusterInfo } from 'types/models/ClusterInfo';
import { ClusterContext } from 'contexts/Cluster/ClusterContext';
import { isBlockedNS } from 'utils/utils';
import { getNamespaceFromSvc } from 'utils/strings';
// import { getNamespaceFromSvc } from 'utils/strings';

var nodeList = new Map<string, Array<string>>();

const getRequestor = (service: ServiceMapEdge) => {
  return service.requestor_service || service.requestor_pod || service.requestor_ip || 'Kubernetes control plane';
};

const getResponder = (service: ServiceMapEdge) => {
  return service.responder_service || service.responder_pod || service.responder_ip || 'Kubernetes control plane';
};

const getAllNamespaces = (mapdata: ServiceMapEdge[]) => {
  const req_ns = mapdata.map((svc) => getNamespaceFromSvc(svc.requestor_service) || '');
  const res_ns = mapdata.map((svc) => getNamespaceFromSvc(svc.responder_service) || '');
  const namespaces = Array.from(new Set([...req_ns, ...res_ns])).filter((ns) => !isBlockedNS(ns));
  return namespaces;
};

const prepareMap = (mapdata: ServiceMapEdge[], filterNS: string[]) => {
  let _nodes: NodeData[] = [];
  let _edges: EdgeData[] = [];
  let _namespaces: string[] = [];
  let serviceNames: string[] = [];
  let edgeIDList = new Set();

  mapdata
    ?.filter((service: ServiceMapEdge) => getRequestor(service) !== '')
    .filter((service: ServiceMapEdge) => !(isBlockedNS(service.requestor_service) || isBlockedNS(service.responder_service)))
    .filter(
      (service: ServiceMapEdge) =>
        filterNS.includes(getNamespaceFromSvc(service.requestor_service)) ||
        filterNS.includes(getNamespaceFromSvc(service.requestor_pod)) ||
        filterNS.includes(getNamespaceFromSvc(service.responder_service)) ||
        filterNS.includes(getNamespaceFromSvc(service.responder_pod))
    )
    .forEach((service: any) => {
      const prevArr = nodeList.get(getRequestor(service)) || [];
      try {
        service.responder_service = JSON.parse(getResponder(service));
      } catch (err) {}
      if (typeof getResponder(service) === 'object') {
        nodeList.set(getRequestor(service), [...prevArr, ...getResponder(service)]);
      } else if (typeof getResponder(service) === 'string') {
        nodeList.set(getRequestor(service), [...prevArr, ...[getResponder(service)]]);
      }

      serviceNames = [...serviceNames, ...[getRequestor(service)]];
      serviceNames = [...serviceNames, ...(nodeList.get(getRequestor(service)) || [])];
    });

  serviceNames = Array.from(new Set(serviceNames));
  _namespaces = Array.from(new Set(serviceNames.map((svc) => getNamespaceFromSvc(svc) || '')));
  serviceNames.forEach((serviceName) => {
    let svcItem = {
      id: serviceName,
      text: serviceName,
      data: { title: serviceName, subline: 'api.ts' }
    };
    _nodes.push(svcItem);
  });
  serviceNames.forEach((serviceName) => {
    if (_nodes.filter((node) => node.id === serviceName).length === 0) return;
    let targets = nodeList.get(serviceName) || [];
    targets.forEach((target) => {
      if (_nodes.filter((node) => node.id === target).length === 0) return;
      const edgeId = serviceName + '->' + target;
      if (edgeIDList.has(edgeId)) return;
      const edgeObj = {
        id: edgeId,
        from: serviceName,
        to: target
      };
      console.log(edgeObj);
      _edges.push(edgeObj);
      edgeIDList.add(edgeId);
    });
  });

  return {
    _nodes,
    _edges,
    _namespaces
  };
};

const ServiceMap = () => {
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [edges, setEdges] = useState<EdgeData[]>([]);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [serviceMap, setServiceMap] = useState<ServiceMapAPIResponse>({ results: [] });
  const [selectedClusterId, setSelectedClusterId] = useState('');
  const [selectedNS, setSelectedNS] = useState<null | string[]>(null);

  function fetchServiceMap(clusterId: string) {
    if (!clusterId || clusterId === '') {
      console.log(`cluster ID was '${clusterId}' (${typeof clusterId})`);
      return;
    }
    getServiceMap(clusterId).then((mapData: ServiceMapAPIResponse) => {
      setServiceMap(mapData);
      console.log('mapData = ', mapData);
      updateServiceMap(mapData);
    });
  }

  function updateServiceMap(mapData: ServiceMapAPIResponse, selectedNamespaces?: string[]) {
    if (namespaces.length === 0) {
      const allNamespaces = getAllNamespaces(mapData.results);
      setNamespaces(allNamespaces);
      selectedNamespaces = allNamespaces.filter((ns) => !['', 'kube-system'].includes(ns));
      setSelectedNS(selectedNamespaces);
    }
    const { _nodes, _edges } = prepareMap(mapData.results, selectedNamespaces || selectedNS || []);
    setNodes(_nodes);
    setEdges(_edges);
    setLoading(false);
  }

  useEffect(() => {
    if (loading === false) return;
    fetchServiceMap(selectedClusterId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  function changeListener(cluster: ClusterInfo) {
    if (cluster.id !== selectedClusterId) {
      console.log('Updating cluster ' + cluster.name + ',' + cluster.id);
      setSelectedClusterId(cluster.id);
      fetchServiceMap(cluster.id);
    }
  }

  function handleNSSelectionChange(e: any) {
    const ns = e.target.value;
    setSelectedNS(Array.from(new Set(ns)) || []);
    updateServiceMap(serviceMap, ns);
  }

  function renderNSSelector() {
    return (
      <FormControl fullWidth>
        <InputLabel>Namespaces</InputLabel>
        <Select
          multiple
          value={selectedNS || []}
          onChange={handleNSSelectionChange}
          input={<OutlinedInput placeholder="Tag" />}
          renderValue={(selected) => selected?.join(', ')}
        >
          {namespaces.map((name) => (
            <MenuItem key={name || 'Unknown'} value={name}>
              <Checkbox checked={selectedNS !== null && selectedNS.indexOf(name) > -1} />
              <ListItemText primary={name || 'Unknown'} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <ClusterContext.Consumer>
      {({ registerChangeListener, getSelectedCluster }: any) => {
        let selectedCluster = getSelectedCluster();
        if (selectedCluster && selectedCluster.id !== selectedClusterId) {
          setSelectedClusterId(selectedCluster.id);
          fetchServiceMap(selectedCluster.id);
        }
        registerChangeListener(changeListener);
        return (
          <MainCard title="Service Map" secondary={renderNSSelector()}>
            {loading ? (
              <Box sx={{ m: -3 }}>
                <LinearProgress />
              </Box>
            ) : (
              <Box sx={{ m: -2 }}>
                <div style={{ width: '100%', height: '66vh', padding: '0px' }}>
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
                  <Canvas
                    layoutOptions={{}}
                    pannable={true}
                    fit={false}
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
                  />
                </div>
              </Box>
            )}
          </MainCard>
        );
      }}
    </ClusterContext.Consumer>
  );
};

export default ServiceMap;
