//case3
import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
  Position,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

// --- 1. CONFIGURATION & STYLES ---
const NODE_TYPES_CONFIG = {
  message: { color: "#00c2ff", label: "Message" },
  question: { color: "#8b5cf6", label: "Question" },
  condition: { color: "#f59e0b", label: "Condition" },
  api: { color: "#10b981", label: "API Call" },
  end: { color: "#ef4444", label: "End Session" },
};

const example = [
  { 
    id: "node_1", 
    type: "custom", 
    position: { x: 100, y: 100 }, 
    data: { 
      label: "Welcome", 
      nodeType: "message", 
      prompt: "Loan?", 
      persona: { friendliness: 0.8, assertiveness: 0.2 } 
    } 
  },
  { 
    id: "node_2", 
    type: "custom", 
    position: { x: 100, y: 250 }, 
    data: { 
      label: "Check Income", 
      nodeType: "question", 
      prompt: "What is your annual income?", 
      variable: "annual_income" 
    } 
  },
];

const VoiceNode = ({ id, data, selected, deleteNode }) => {
  const themeColor = NODE_TYPES_CONFIG[data.nodeType]?.color || "#333";

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        background: "#fff",
        border: selected
          ? `2px solid ${themeColor}`
          : "1px solid #d1d5db",
        width: 180,
        boxShadow: selected
          ? "0 0 10px rgba(0,0,0,0.1)"
          : "0 2px 4px rgba(0,0,0,0.05)",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* DELETE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteNode(id);
        }}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          width: "18px",
          height: "18px",
          border: "none",
          background: "#ef4444",
          color: "#fff",
          fontSize: "12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>

      <Handle id="top" type="target" position={Position.Top} style={{ background: "#9ca3af", zIndex: 10 }} />
      <Handle id="right" type="source" position={Position.Right} style={{ background: "#9ca3af", zIndex: 10 }} />

      <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: themeColor,
            marginRight: "6px",
          }}
        />
        <span style={{ fontSize: "10px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase" }}>
          {data.nodeType}
        </span>
      </div>

      <div style={{ fontWeight: "600", fontSize: "13px", color: "#111827" }}>
        {data.label}
      </div>

      <div
        style={{
          fontSize: "10px",
          color: "#6b7280",
          marginTop: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {data.prompt || "No content set..."}
      </div>

      <Handle id="bottom" type="source" position={Position.Bottom} style={{ background: "#9ca3af", zIndex: 10 }} />
    </div>
  );
};


// --- MAIN APP ---
export default function VoiceFlowStudio() {
  const [nodes, setNodes] = useState(example);
  const [edges, setEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // ✅ DELETE FUNCTION
  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));

    setEdges((eds) =>
      eds.filter((e) => e.source !== id && e.target !== id)
    );

    setSelectedNodeId((prev) => (prev === id ? null : prev));
  }, []);

  // ✅ PASS deleteNode TO NODE
  const nodeTypes = useMemo(
    () => ({
      custom: (props) => <VoiceNode {...props} deleteNode={deleteNode} />,
    }),
    [deleteNode]
  );

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  const onNodesChange = useCallback((chs) => setNodes((nds) => applyNodeChanges(chs, nds)), []);
  const onEdgesChange = useCallback((chs) => setEdges((eds) => applyEdgeChanges(chs, eds)), []);
  const onConnect = useCallback((p) => setEdges((eds) => addEdge({ ...p, animated: true }, eds)), []);

  const updateNodeData = (id, updates) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...updates } } : n)));
  };

  const addNode = (type) => {
    const id = `node_${Date.now()}`;
    const newNode = {
      id,
      type: "custom",
      position: { x: 50, y: 50 },
      data: {
        label: `New ${type}`,
        nodeType: type,
        prompt: "",
        persona: { friendliness: 0.5, assertiveness: 0.5 },
      },
    };
    setNodes((nds) => [newNode, ...nds]);
  };

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ nodes, edges }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "voice_flow_agent.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div style={{ display: "flex", width: "98vw", height: "97vh", overflow: "hidden", background: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      
      <aside style={{ width: "260px", background: "#1f2937", color: "#fff", padding: "20px", display: "flex", flexDirection: "column", zIndex: 5 }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>Voice Studio</h2>

        <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "10px", fontWeight: "600" }}>NODES</p>

        <div style={{ display: "grid", gap: "10px" }}>
          {Object.keys(NODE_TYPES_CONFIG).map((type) => (
            <button
              key={type}
              onClick={() => addNode(type)}
              style={{
                background: "#374151",
                border: `1px solid ${NODE_TYPES_CONFIG[type].color}`,
                color: "#fff",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "13px",
              }}
            >
              + {NODE_TYPES_CONFIG[type].label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={downloadJSON}
            style={{
              width: "100%",
              padding: "12px",
              background: "#10b981",
              border: "none",
              color: "#fff",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Export JSON
          </button>
        </div>
      </aside>

      <main style={{ flexGrow: 1, height: "100%", position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{ type: "smoothstep" }}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 3 }}
        >
          <Background variant="lines" gap={12} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </main>

      {selectedNode && (
        <aside style={{ width: "320px", height: "100%", background: "#fff", borderLeft: "1px solid #e5e7eb", display: "flex", flexDirection: "column", zIndex: 5 }}>
          <div style={{ padding: "24px", overflowY: "auto", flexGrow: 1 }}>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>Node Settings</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "20px" }}>ID: {selectedNode.id}</p>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Display Label</label>
              <input style={inputStyle} value={selectedNode.data.label} onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Prompt</label>
              <textarea style={{ ...inputStyle, height: "100px" }} value={selectedNode.data.prompt || ""} onChange={(e) => updateNodeData(selectedNode.id, { prompt: e.target.value })} />
            </div>
          </div>

          <div style={{ padding: "15px", borderTop: "1px solid #e5e7eb" }}>
            <button onClick={() => setSelectedNodeId(null)} style={{ width: "100%", padding: "10px" }}>
              Close Panel
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}


// --- CSS-IN-JS HELPERS ---
const labelStyle = { 
  display: "block", 
  fontSize: "12px", 
  fontWeight: "700", 
  color: "#374151", 
  marginBottom: "6px" 
};

const inputStyle = { 
  width: "100%", 
  padding: "10px", 
  border: "1px solid #d1d5db", 
  borderRadius: "6px", 
  fontSize: "13px",
  boxSizing: "border-box" 
};