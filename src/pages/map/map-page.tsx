import MainCard from 'components/MainCard';
import { useState } from 'react';
import mapdata from './mapdata.json';
import { Canvas, hasLink, NodeData, EdgeData, Node, Edge, Port, MarkerArrow, Label, CanvasPosition } from 'reaflow';
import { FileOutlined } from '@ant-design/icons';

let initialNodes: NodeData[] = [];
let initialEdges: EdgeData[] = [];
let serviceNames: string[] = [];

var nodeList = new Map<string, Array<string>>();
mapdata.results
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
  initialNodes.push({
    id: serviceName,
    text: serviceName,
    data: { title: serviceName, subline: 'api.ts' }
  });
});
serviceNames.forEach((serviceName) => {
  let targets = nodeList.get(serviceName) || [];
  targets.forEach((target) => {
    initialEdges.push({
      id: serviceName + '->' + target,
      from: serviceName,
      to: target
    });
  });
});

const ReflowMap = () => {
  const [nodes] = useState<NodeData[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeData[]>(initialEdges);

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
      </div>
    </MainCard>
  );
};

export default ReflowMap;
