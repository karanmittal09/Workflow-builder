import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges
} from "reactflow";
import "reactflow/dist/style.css";

export default function App() {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Ask Budget", nodeType: "message" },
      style: getNodeStyle("message")
    },
    {
      id: "2",
      position: { x: 300, y: 100 },
      data: { label: "Call", nodeType: "api" },
      style: getNodeStyle("api")
    }
  ]);

  const [edges, setEdges] = useState([]);

  function getNodeStyle(type) {
    const styles = {
      message: { background: "#00c2ff", color: "#000" },
      question: { background: "#8b5cf6", color: "#fff" },
      condition: { background: "#f59e0b", color: "#000" },
      api: { background: "#10b981", color: "#000" },
      end: { background: "#ef4444", color: "#fff" }
    };

    return {
      padding: "10px",
      borderRadius: "8px",
      border: "2px solid #333",
      width: 140,
      textAlign: "center",
      ...styles[type]
    };
  }

  const nodeTypesList = [
    { type: "message", label: "Message", color: "#00c2ff" },
    { type: "question", label: "Question", color: "#8b5cf6" },
    { type: "condition", label: "Condition", color: "#f59e0b" },
    { type: "api", label: "API Call", color: "#10b981" },
    { type: "end", label: "End", color: "#ef4444" }
  ];

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = (event, node) => {
    const newLabel = prompt("Enter new name:", node.data.label);

    if (newLabel) {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? { ...n, data: { ...n.data, label: newLabel } }
            : n
        )
      );
    }
  };

  const addNode = (type = "message") => {
    const id = Date.now().toString();

    const newNode = {
      id,
      position: {
        x: 150 + nodes.length * 50,
        y: 150 + nodes.length * 30
      },
      data: {
        label: type.toUpperCase(),
        nodeType: type
      },
      style: getNodeStyle(type)
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onEdgeClick = (event, edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          height: "35%",
          background: "#302c2c",
          color: "#fff",
          padding: "10px",
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        <h4 style={{ marginBottom: "10px" }}>NODES</h4>

        {nodeTypesList.map((item) => (
          <div
            key={item.type}
            onClick={() => addNode(item.type)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              background: "#170a0a",
              borderLeft: `4px solid ${item.color}`,
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          defaultEdgeOptions={{ type: "smoothstep", animated: true }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}