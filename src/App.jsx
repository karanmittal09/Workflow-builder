// import React, { useState, useCallback, useMemo } from "react";
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
//   Position
// } from "reactflow";
// import "reactflow/dist/style.css";

// /* Custom Node */
// const CustomNode = ({ data, id }) => {
//   const getNodeStyle = (type) => {
//     const styles = {
//       message: { background: "#00c2ff", color: "#000" },
//       question: { background: "#8b5cf6", color: "#fff" },
//       condition: { background: "#f59e0b", color: "#000" },
//       api: { background: "#10b981", color: "#000" },
//       end: { background: "#ef4444", color: "#fff" }
//     };

//     return {
//       padding: "10px",
//       borderRadius: "8px",
//       border: "2px solid #333",
//       width: 140,
//       textAlign: "center",
//       ...styles[type]
//     };
//   };

//   return (
//     <div
//       onClick={(e) => {
//         e.stopPropagation(); // 👈 important
//         data.onClick(id);    // 👈 pass only id now
//       }}
//       style={getNodeStyle(data.nodeType)}
//     >
//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Right} />
//       <Handle type="source" position={Position.Bottom} />

//       <div>{data.label}</div>
//     </div>
//   );
// };

// export default function App() {
//   const [selectedNodeId, setSelectedNodeId] = useState(null);

//   const onNodeClick = (id) => {
//     setSelectedNodeId(id);
//   };

//   const [nodes, setNodes] = useState([
//     {
//       id: "1",
//       type: "custom",
//       position: { x: 100, y: 100 },
//       data: { label: "Node 1", nodeType: "message", onClick: onNodeClick }
//     },
//     {
//       id: "2",
//       type: "custom",
//       position: { x: 300, y: 100 },
//       data: { label: "Node 2", nodeType: "api", onClick: onNodeClick }
//     }
//   ]);

//   const [edges, setEdges] = useState([]);

//   // ✅ memoized nodeTypes (IMPORTANT)
//   const nodeTypes = useMemo(() => ({
//     custom: CustomNode
//   }), []);

//   const nodeTypesList = [
//     { type: "message", label: "Message", color: "#00c2ff" },
//     { type: "question", label: "Question", color: "#8b5cf6" },
//     { type: "condition", label: "Condition", color: "#f59e0b" },
//     { type: "api", label: "API Call", color: "#10b981" },
//     { type: "end", label: "End", color: "#ef4444" }
//   ];

//   const onNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   // ✅ derive selected node from state
//   const selectedNode = useMemo(() => {
//     return nodes.find((n) => n.id === selectedNodeId) || null;
//   }, [nodes, selectedNodeId]);

//   // ✅ controlled update
//   const updateNodeLabel = (value) => {
//     setNodes((nds) =>
//       nds.map((n) =>
//         n.id === selectedNodeId
//           ? {
//               ...n,
//               data: { ...n.data, label: value, onClick: onNodeClick }
//             }
//           : n
//       )
//     );
//   };

//   const addNode = (type = "message") => {
//     const id = Date.now().toString();

//     const newNode = {
//       id,
//       type: "custom",
//       position: {
//         x: 150 + nodes.length * 50,
//         y: 150 + nodes.length * 30
//       },
//       data: {
//         label: type.toUpperCase(),
//         nodeType: type,
//         onClick: onNodeClick
//       }
//     };

//     setNodes((nds) => [...nds, newNode]);
//   };

//   const onEdgeClick = (event, edge) => {
//     setEdges((eds) => eds.filter((e) => e.id !== edge.id));
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
      
//       {/* Sidebar */}
//       <div
//         style={{
//           width: "200px",
//           height: "35%",
//           background: "#302c2c",
//           color: "#fff",
//           padding: "10px",
//           borderRadius: "10px",
//         }}
//       >
//         <h4>NODES</h4>

//         {nodeTypesList.map((item) => (
//           <div
//             key={item.type}
//             onClick={() => addNode(item.type)}
//             style={{
//               padding: "10px",
//               marginBottom: "8px",
//               background: "#170a0a",
//               borderLeft: `4px solid ${item.color}`,
//               borderRadius: "5px",
//               cursor: "pointer"
//             }}
//           >
//             {item.label}
//           </div>
//         ))}
//       </div>

//       {/* Canvas */}
//       <div style={{ flexGrow: 1 }}>
//         <ReactFlow
//           nodeTypes={nodeTypes}
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onEdgeClick={onEdgeClick}
//           defaultEdgeOptions={{ type: "smoothstep", animated: true }}
//           fitView
//         >
//           <Background />
//           <Controls />
//         </ReactFlow>
//       </div>

//       {/* ✅ Right Panel */}
//       {selectedNode && (
//         <div
//           style={{
//             width: "260px",
//             height: "70%",
//             background: "#111",
//             color: "#fff",
//             padding: "15px",
//             borderLeft: "1px solid #333",
//             zIndex: 10,
//             borderRadius: "10px"
//           }}
//         >
//           <h3>Node Properties</h3>

//           <label>Label:</label>
//           <input
//             value={selectedNode.data.label}
//             onChange={(e) => updateNodeLabel(e.target.value)}
//             style={{
//               width: "100%",
//               marginTop: "5px",
//               marginBottom: "10px"
//             }}
//           />

//           <button onClick={() => setSelectedNodeId(null)}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }






// cld

// import React, { useState, useCallback, useEffect, useRef } from "react";
// import ReactFlow, {
//   addEdge, Background, Controls, MiniMap,
//   applyNodeChanges, applyEdgeChanges,
//   Handle, Position, MarkerType
// } from "reactflow";
// import "reactflow/dist/style.css";

// const NODE_META = {
//   message:   { color: "#378ADD", bg: "#0C447C", icon: "M", label: "Message" },
//   question:  { color: "#7F77DD", bg: "#3C3489", icon: "Q", label: "Question" },
//   condition: { color: "#EF9F27", bg: "#633806", icon: "C", label: "Condition" },
//   api:       { color: "#1D9E75", bg: "#085041", icon: "A", label: "API Call" },
//   transfer:  { color: "#D4537E", bg: "#72243E", icon: "T", label: "Transfer" },
//   wait:      { color: "#888780", bg: "#444441", icon: "W", label: "Wait" },
//   playmedia: { color: "#5DCAA5", bg: "#0F6E56", icon: "P", label: "Play Media" },
//   fallback:  { color: "#D85A30", bg: "#712B13", icon: "F", label: "Fallback" },
//   end:       { color: "#E24B4A", bg: "#791F1F", icon: "E", label: "End" },
// };

// const PERSONAS = [
//   { id: "p1", name: "Professional Agent", tone: { friendliness: 65, assertiveness: 70, formality: 80, empathy: 60 }, approved: true },
//   { id: "p2", name: "Friendly Assistant", tone: { friendliness: 90, assertiveness: 40, formality: 45, empathy: 85 }, approved: true },
//   { id: "p3", name: "Sales Expert",       tone: { friendliness: 75, assertiveness: 85, formality: 60, empathy: 55 }, approved: true },
//   { id: "p4", name: "Support Specialist", tone: { friendliness: 80, assertiveness: 50, formality: 55, empathy: 90 }, approved: true },
// ];

// const INDUSTRY_TEMPLATES = {
//   BFSI: [
//     {
//       id: "bfsi-loan", name: "Loan Qualification", regulated: true, description: "Lead qualification for home/personal loans",
//       nodes: [
//         { id:"n1", type:"custom", position:{x:300,y:30},  data:{label:"Greeting",       nodeType:"message",   promptText:"<speak>Good morning! I'm calling from <emphasis>Premier Bank</emphasis>. Am I speaking with {{lead_name}}?</speak>",      persona:"p1", tone:{friendliness:75,assertiveness:55,formality:75,empathy:65}, voice:{rate:1,pitch:1}, tags:["consent"], compliance:{consent:true,record:true}, retries:2 }},
//         { id:"n2", type:"custom", position:{x:300,y:140}, data:{label:"Consent Capture", nodeType:"question",  promptText:"<speak>Before we proceed, I'd like to confirm you consent to this call being recorded for quality purposes. Do you agree?</speak>", persona:"p1", tone:{friendliness:70,assertiveness:60,formality:80,empathy:65}, voice:{rate:1,pitch:1}, tags:["compliance"], compliance:{consent:true,record:true}, retries:2 }},
//         { id:"n3", type:"custom", position:{x:175,y:260}, data:{label:"Loan Interest",   nodeType:"question",  promptText:"<speak>Great! Are you currently looking for a home loan or a personal loan?</speak>",                                          persona:"p1", tone:{friendliness:75,assertiveness:60,formality:70,empathy:65}, voice:{rate:1,pitch:1}, tags:[], compliance:{}, retries:2 }},
//         { id:"n4", type:"custom", position:{x:450,y:260}, data:{label:"Not Interested",  nodeType:"end",       promptText:"<speak>Completely understood. Have a great day!</speak>",                                                                       persona:"p1", tone:{friendliness:80,assertiveness:30,formality:65,empathy:85}, voice:{rate:1,pitch:1}, tags:[], compliance:{}, retries:1 }},
//         { id:"n5", type:"custom", position:{x:175,y:380}, data:{label:"Income Check",    nodeType:"condition", promptText:"income >= 500000 && income <= 5000000",                                                                                        persona:"p1", tone:{friendliness:70,assertiveness:65,formality:75,empathy:60}, voice:{rate:1,pitch:1}, tags:[], compliance:{}, retries:1 }},
//         { id:"n6", type:"custom", position:{x:60,y:500},  data:{label:"Qualified Pitch", nodeType:"message",   promptText:"<speak>Excellent! Based on your profile, you qualify for our <emphasis>Premier Home Loan</emphasis> at competitive rates.</speak>",persona:"p3", tone:{friendliness:85,assertiveness:75,formality:65,empathy:60}, voice:{rate:1,pitch:1}, tags:["cta"], compliance:{}, retries:1 }},
//         { id:"n7", type:"custom", position:{x:320,y:500}, data:{label:"Alt Products",    nodeType:"message",   promptText:"<speak>I understand. We have flexible options starting at lower income brackets. Shall I share those?</speak>",                persona:"p2", tone:{friendliness:85,assertiveness:50,formality:60,empathy:80}, voice:{rate:1,pitch:1}, tags:[], compliance:{}, retries:2 }},
//         { id:"n8", type:"custom", position:{x:60,y:620},  data:{label:"Schedule Call",   nodeType:"question",  promptText:"<speak>Would you like to schedule a call with our loan officer?</speak>",                                                       persona:"p1", tone:{friendliness:80,assertiveness:65,formality:70,empathy:65}, voice:{rate:1,pitch:1}, tags:["cta"], compliance:{}, retries:2 }},
//         { id:"n9", type:"custom", position:{x:60,y:740},  data:{label:"Update CRM",      nodeType:"api",       promptText:"POST /crm/leads { lead_id: {{lead_id}}, status: 'qualified', product: {{loan_type}} }",                                         persona:"p1", tone:{friendliness:60,assertiveness:55,formality:75,empathy:60}, voice:{rate:1,pitch:1}, tags:["crm"], compliance:{}, retries:1 }},
//         { id:"n10",type:"custom", position:{x:60,y:860},  data:{label:"Confirmation",    nodeType:"message",   promptText:"<speak>Perfect! Our loan officer will call you at {{preferred_time}}. Thank you!</speak>",                                      persona:"p2", tone:{friendliness:90,assertiveness:45,formality:65,empathy:75}, voice:{rate:1,pitch:1}, tags:[], compliance:{}, retries:1 }},
//         { id:"n11",type:"custom", position:{x:300,y:860}, data:{label:"End Call",        nodeType:"end",       promptText:"<speak>Thank you for your time. Have a wonderful day!</speak>",                                                                 persona:"p1", tone:{friendliness:85,assertiveness:40,formality:70,empathy:75}, voice:{rate:1,pitch:1}, tags:[], compliance:{}, retries:1 }},
//       ],
//       edges: [
//         {id:"e1",source:"n1",target:"n2",type:"smoothstep",animated:true},
//         {id:"e2",source:"n2",target:"n3",type:"smoothstep",animated:true,label:"Agreed"},
//         {id:"e2b",source:"n2",target:"n4",sourceHandle:"right",type:"smoothstep",animated:true,label:"Declined"},
//         {id:"e3",source:"n3",target:"n5",type:"smoothstep",animated:true},
//         {id:"e4",source:"n5",target:"n6",type:"smoothstep",animated:true,label:"Qualified"},
//         {id:"e4b",source:"n5",target:"n7",sourceHandle:"right",type:"smoothstep",animated:true,label:"Below range"},
//         {id:"e5",source:"n6",target:"n8",type:"smoothstep",animated:true},
//         {id:"e6",source:"n8",target:"n9",type:"smoothstep",animated:true,label:"Yes"},
//         {id:"e7",source:"n9",target:"n10",type:"smoothstep",animated:true},
//         {id:"e8",source:"n10",target:"n11",type:"smoothstep",animated:true},
//         {id:"e9",source:"n7",target:"n11",sourceHandle:"right",type:"smoothstep",animated:true},
//         {id:"e10",source:"n8",target:"n11",sourceHandle:"right",type:"smoothstep",animated:true,label:"No"},
//       ]
//     },
//     {
//       id: "bfsi-collection", name: "Collections Reminder", regulated: true, description: "EMI due / failed payment recovery",
//       nodes: [
//         { id:"c1",type:"custom",position:{x:300,y:30},  data:{label:"Reminder Opening",nodeType:"message",  promptText:"<speak>Hello {{customer_name}}, this is a reminder about your EMI due on {{due_date}}.</speak>",persona:"p1",tone:{friendliness:65,assertiveness:70,formality:75,empathy:65},voice:{rate:1,pitch:1},tags:["compliance"],compliance:{consent:true,record:true},retries:1}},
//         { id:"c2",type:"custom",position:{x:300,y:140}, data:{label:"Payment Intent",  nodeType:"question", promptText:"<speak>Will you be able to make the payment by {{due_date}}?</speak>",                          persona:"p1",tone:{friendliness:65,assertiveness:75,formality:75,empathy:65},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         { id:"c3",type:"custom",position:{x:160,y:260}, data:{label:"Payment Link",    nodeType:"api",      promptText:"POST /payments/send-link { customer_id: {{id}}, amount: {{emi_amount}} }",                       persona:"p1",tone:{friendliness:70,assertiveness:60,formality:70,empathy:65},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         { id:"c4",type:"custom",position:{x:400,y:260}, data:{label:"Hardship Check",  nodeType:"question", promptText:"<speak>I understand. Are you facing any financial difficulty we should be aware of?</speak>",    persona:"p2",tone:{friendliness:75,assertiveness:50,formality:65,empathy:85},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         { id:"c5",type:"custom",position:{x:160,y:380}, data:{label:"Confirm & Close", nodeType:"end",      promptText:"<speak>Payment link sent to {{mobile}}. Thank you!</speak>",                                    persona:"p1",tone:{friendliness:80,assertiveness:45,formality:70,empathy:70},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         { id:"c6",type:"custom",position:{x:400,y:380}, data:{label:"Transfer Agent",  nodeType:"transfer", promptText:"<speak>Let me transfer you to our support team who can help.</speak>",                          persona:"p4",tone:{friendliness:80,assertiveness:50,formality:65,empathy:85},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//       ],
//       edges:[
//         {id:"ce1",source:"c1",target:"c2",type:"smoothstep",animated:true},
//         {id:"ce2",source:"c2",target:"c3",type:"smoothstep",animated:true,label:"Yes"},
//         {id:"ce2b",source:"c2",target:"c4",sourceHandle:"right",type:"smoothstep",animated:true,label:"No / Maybe"},
//         {id:"ce3",source:"c3",target:"c5",type:"smoothstep",animated:true},
//         {id:"ce4",source:"c4",target:"c6",type:"smoothstep",animated:true,label:"Yes - hardship"},
//         {id:"ce4b",source:"c4",target:"c3",sourceHandle:"right",type:"smoothstep",animated:true,label:"No"},
//       ]
//     }
//   ],
//   "Real Estate": [
//     {
//       id: "re-demo", name: "Property Demo Booking", regulated: false, description: "Qualify and book site visits",
//       nodes: [
//         {id:"r1",type:"custom",position:{x:300,y:30},  data:{label:"Greeting",          nodeType:"message",  promptText:"<speak>Good morning! This is Priya from Premier Properties. Am I speaking with <emphasis>{{lead_name}}</emphasis>?</speak>",persona:"p2",tone:{friendliness:85,assertiveness:55,formality:60,empathy:70},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"r2",type:"custom",position:{x:300,y:140}, data:{label:"Confirm Identity",   nodeType:"question", promptText:"<speak>Great! I have some exciting properties matching your profile. Are you still looking?</speak>",                        persona:"p2",tone:{friendliness:85,assertiveness:60,formality:60,empathy:70},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         {id:"r3",type:"custom",position:{x:175,y:260}, data:{label:"Budget Discovery",   nodeType:"question", promptText:"<speak>To match the right property, may I know your budget range?</speak>",                                                persona:"p2",tone:{friendliness:85,assertiveness:55,formality:55,empathy:70},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         {id:"r4",type:"custom",position:{x:450,y:260}, data:{label:"Not Interested",     nodeType:"end",      promptText:"<speak>Completely understood! Feel free to call us anytime. Goodbye!</speak>",                                             persona:"p2",tone:{friendliness:85,assertiveness:30,formality:55,empathy:85},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"r5",type:"custom",position:{x:175,y:380}, data:{label:"Budget Range Check", nodeType:"condition",promptText:"budget >= 11000000 && budget <= 20000000",                                                                                persona:"p1",tone:{friendliness:70,assertiveness:65,formality:70,empathy:60},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"r6",type:"custom",position:{x:50,y:500},  data:{label:"In-Budget Pitch",    nodeType:"message",  promptText:"<speak>Excellent! We have a <emphasis>3BHK</emphasis> ready to move in, perfectly matching your budget.</speak>",         persona:"p3",tone:{friendliness:90,assertiveness:75,formality:60,empathy:65},voice:{rate:1,pitch:1},tags:["cta"],compliance:{},retries:1}},
//         {id:"r7",type:"custom",position:{x:330,y:500}, data:{label:"Alternative Options",nodeType:"message",  promptText:"<speak>I understand. We have flexible options. Shall I share what's available in a slightly broader range?</speak>",       persona:"p2",tone:{friendliness:85,assertiveness:50,formality:55,empathy:80},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         {id:"r8",type:"custom",position:{x:50,y:620},  data:{label:"Schedule Visit",     nodeType:"question", promptText:"<speak>When would you like to visit our site?</speak>",                                                                   persona:"p2",tone:{friendliness:85,assertiveness:60,formality:60,empathy:70},voice:{rate:1,pitch:1},tags:["cta"],compliance:{},retries:2}},
//         {id:"r9",type:"custom",position:{x:330,y:620}, data:{label:"Transfer to Sales",  nodeType:"transfer", promptText:"<speak>Let me connect you with our senior sales manager.</speak>",                                                        persona:"p3",tone:{friendliness:80,assertiveness:70,formality:65,empathy:65},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"r10",type:"custom",position:{x:50,y:740}, data:{label:"Update CRM",         nodeType:"api",      promptText:"POST /crm/visits { lead_id: {{lead_id}}, date: {{visit_date}}, status: 'scheduled' }",                                   persona:"p1",tone:{friendliness:60,assertiveness:55,formality:75,empathy:60},voice:{rate:1,pitch:1},tags:["crm"],compliance:{},retries:1}},
//         {id:"r11",type:"custom",position:{x:50,y:860}, data:{label:"Confirmation",       nodeType:"message",  promptText:"<speak>Perfect! Your site visit is booked for {{visit_date}}. See you then!</speak>",                                     persona:"p2",tone:{friendliness:90,assertiveness:45,formality:60,empathy:75},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"r12",type:"custom",position:{x:300,y:860},data:{label:"End Call",           nodeType:"end",      promptText:"<speak>Thank you for your time! Have a wonderful day!</speak>",                                                           persona:"p2",tone:{friendliness:88,assertiveness:40,formality:60,empathy:75},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//       ],
//       edges:[
//         {id:"re1",source:"r1",target:"r2",type:"smoothstep",animated:true},
//         {id:"re2",source:"r2",target:"r3",type:"smoothstep",animated:true,label:"Interested"},
//         {id:"re2b",source:"r2",target:"r4",sourceHandle:"right",type:"smoothstep",animated:true,label:"Not now"},
//         {id:"re3",source:"r3",target:"r5",type:"smoothstep",animated:true},
//         {id:"re4",source:"r5",target:"r6",type:"smoothstep",animated:true,label:"In range"},
//         {id:"re4b",source:"r5",target:"r7",sourceHandle:"right",type:"smoothstep",animated:true,label:"Out of range"},
//         {id:"re5",source:"r6",target:"r8",type:"smoothstep",animated:true},
//         {id:"re6",source:"r7",target:"r9",type:"smoothstep",animated:true},
//         {id:"re7",source:"r8",target:"r10",type:"smoothstep",animated:true,label:"Date given"},
//         {id:"re7b",source:"r8",target:"r9",sourceHandle:"right",type:"smoothstep",animated:true,label:"Needs more info"},
//         {id:"re8",source:"r10",target:"r11",type:"smoothstep",animated:true},
//         {id:"re9",source:"r11",target:"r12",type:"smoothstep",animated:true},
//         {id:"re10",source:"r9",target:"r12",type:"smoothstep",animated:true},
//       ]
//     }
//   ],
//   Retail: [
//     {
//       id: "retail-reorder", name: "Reorder Reminder", regulated: false, description: "Outbound reorder nudge for frequent buyers",
//       nodes: [
//         {id:"rt1",type:"custom",position:{x:300,y:30},  data:{label:"Greeting",      nodeType:"message",  promptText:"<speak>Hi {{name}}! This is Maya from FreshMart. Your usual order of {{product}} is due for reorder.</speak>",persona:"p2",tone:{friendliness:90,assertiveness:55,formality:45,empathy:70},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"rt2",type:"custom",position:{x:300,y:140}, data:{label:"Reorder Intent", nodeType:"question", promptText:"<speak>Would you like us to place the order and deliver it by {{delivery_date}}?</speak>",                persona:"p2",tone:{friendliness:90,assertiveness:60,formality:45,empathy:70},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         {id:"rt3",type:"custom",position:{x:160,y:260}, data:{label:"Place Order",    nodeType:"api",      promptText:"POST /orders { customer_id: {{id}}, product: {{product}}, qty: {{qty}} }",                              persona:"p1",tone:{friendliness:70,assertiveness:60,formality:60,empathy:65},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"rt4",type:"custom",position:{x:400,y:260}, data:{label:"Upsell",         nodeType:"question", promptText:"<speak>No problem! While I have you, we have a new organic range you might enjoy. Interested?</speak>",   persona:"p3",tone:{friendliness:85,assertiveness:70,formality:45,empathy:65},voice:{rate:1,pitch:1},tags:["cta"],compliance:{},retries:2}},
//         {id:"rt5",type:"custom",position:{x:160,y:380}, data:{label:"Confirmation",   nodeType:"message",  promptText:"<speak>Your order is placed! Delivery by {{delivery_date}}. Thank you!</speak>",                        persona:"p2",tone:{friendliness:90,assertiveness:45,formality:50,empathy:75},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"rt6",type:"custom",position:{x:400,y:380}, data:{label:"End Call",       nodeType:"end",      promptText:"<speak>Great! Have a wonderful day!</speak>",                                                           persona:"p2",tone:{friendliness:90,assertiveness:35,formality:45,empathy:80},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//       ],
//       edges:[
//         {id:"rte1",source:"rt1",target:"rt2",type:"smoothstep",animated:true},
//         {id:"rte2",source:"rt2",target:"rt3",type:"smoothstep",animated:true,label:"Yes"},
//         {id:"rte2b",source:"rt2",target:"rt4",sourceHandle:"right",type:"smoothstep",animated:true,label:"No"},
//         {id:"rte3",source:"rt3",target:"rt5",type:"smoothstep",animated:true},
//         {id:"rte4",source:"rt5",target:"rt6",type:"smoothstep",animated:true},
//         {id:"rte5",source:"rt4",target:"rt6",type:"smoothstep",animated:true},
//       ]
//     }
//   ],
//   Healthcare: [
//     {
//       id: "hc-appointment", name: "Appointment Reminder", regulated: true, description: "Appointment confirmation and rescheduling",
//       nodes: [
//         {id:"h1",type:"custom",position:{x:300,y:30},  data:{label:"Reminder",          nodeType:"message",  promptText:"<speak>Hello {{patient_name}}, this is a reminder of your appointment with Dr. {{doctor}} on {{appt_date}}.</speak>",persona:"p4",tone:{friendliness:80,assertiveness:55,formality:70,empathy:85},voice:{rate:1,pitch:1},tags:["compliance"],compliance:{consent:false,record:true},retries:1}},
//         {id:"h2",type:"custom",position:{x:300,y:140}, data:{label:"Confirm Attendance", nodeType:"question", promptText:"<speak>Will you be able to make it to the appointment?</speak>",                                                       persona:"p4",tone:{friendliness:80,assertiveness:55,formality:70,empathy:85},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         {id:"h3",type:"custom",position:{x:160,y:260}, data:{label:"Confirm & Log",      nodeType:"api",      promptText:"PATCH /appointments/{{appt_id}} { status: 'confirmed' }",                                                             persona:"p1",tone:{friendliness:70,assertiveness:60,formality:75,empathy:65},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"h4",type:"custom",position:{x:400,y:260}, data:{label:"Reschedule",         nodeType:"question", promptText:"<speak>I understand. Would you like to reschedule for a later date?</speak>",                                         persona:"p4",tone:{friendliness:80,assertiveness:50,formality:70,empathy:90},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:2}},
//         {id:"h5",type:"custom",position:{x:160,y:380}, data:{label:"Confirmed",          nodeType:"end",      promptText:"<speak>Great! We look forward to seeing you. Please arrive 10 minutes early. Take care!</speak>",                     persona:"p4",tone:{friendliness:85,assertiveness:40,formality:70,empathy:80},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"h6",type:"custom",position:{x:400,y:380}, data:{label:"Book New Slot",      nodeType:"api",      promptText:"POST /appointments/reschedule { appt_id: {{appt_id}}, preferred: {{new_date}} }",                                    persona:"p1",tone:{friendliness:70,assertiveness:60,formality:75,empathy:65},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//         {id:"h7",type:"custom",position:{x:400,y:500}, data:{label:"New Confirmation",   nodeType:"end",      promptText:"<speak>Your appointment is rescheduled. We'll send a confirmation SMS. Take care!</speak>",                           persona:"p4",tone:{friendliness:85,assertiveness:40,formality:70,empathy:80},voice:{rate:1,pitch:1},tags:[],compliance:{},retries:1}},
//       ],
//       edges:[
//         {id:"he1",source:"h1",target:"h2",type:"smoothstep",animated:true},
//         {id:"he2",source:"h2",target:"h3",type:"smoothstep",animated:true,label:"Yes"},
//         {id:"he2b",source:"h2",target:"h4",sourceHandle:"right",type:"smoothstep",animated:true,label:"No"},
//         {id:"he3",source:"h3",target:"h5",type:"smoothstep",animated:true},
//         {id:"he4",source:"h4",target:"h6",type:"smoothstep",animated:true,label:"Reschedule"},
//         {id:"he4b",source:"h4",target:"h5",sourceHandle:"right",type:"smoothstep",animated:true,label:"Cancel"},
//         {id:"he5",source:"h6",target:"h7",type:"smoothstep",animated:true},
//       ]
//     }
//   ]
// };

// const SIMULATOR_SCENARIOS = {
//   happy: "Happy path — user agrees to all prompts",
//   silent: "Silent user — no response after 5s",
//   low_confidence: "Low NLU confidence — ambiguous answers",
//   hostile: "Hostile tone — user pushes back",
// };

// function CustomNode({ data, selected }) {
//   const meta = NODE_META[data.nodeType] || NODE_META.message;
//   return (
//     <div style={{
//       padding:"10px 13px", borderRadius:8, minWidth:155, maxWidth:200,
//       background: selected ? "#1e2a3a" : "#141920",
//       border: selected ? `2px solid ${meta.color}` : `1.5px solid ${meta.color}40`,
//       cursor:"pointer", fontSize:12,
//     }}>
//       <Handle type="target" position={Position.Top} style={{background:meta.color,width:8,height:8}} />
//       <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
//         <div style={{width:20,height:20,borderRadius:4,background:meta.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",flexShrink:0}}>{meta.icon}</div>
//         <span style={{fontWeight:600,color:"#e0e6ef",fontSize:12,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{data.label}</span>
//       </div>
//       {data.promptText && <div style={{fontSize:10,color:"#6b8090",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:170}}>{data.promptText.replace(/<[^>]*>/g,"")}</div>}
//       {(data.tags||[]).length > 0 && (
//         <div style={{display:"flex",gap:3,marginTop:5,flexWrap:"wrap"}}>
//           {data.tags.map(t=><span key={t} style={{fontSize:9,padding:"1px 5px",borderRadius:10,background:meta.color+"22",color:meta.color,border:`0.5px solid ${meta.color}66`}}>{t}</span>)}
//         </div>
//       )}
//       {data.compliance?.consent && <div style={{marginTop:3,fontSize:9,color:"#f59e0b"}}>⚠ consent required</div>}
//       <Handle type="source" position={Position.Bottom} style={{background:meta.color,width:8,height:8}} />
//       <Handle type="source" id="right" position={Position.Right} style={{background:meta.color,width:8,height:8}} />
//     </div>
//   );
// }

// const NODE_TYPES_REACT = { custom: CustomNode };

// const BLANK_NODE_DATA = () => ({
//   label:"New Node", nodeType:"message",
//   promptText:"", persona:"p1",
//   tone:{friendliness:70,assertiveness:55,formality:65,empathy:65},
//   voice:{rate:1,pitch:1}, tags:[], compliance:{consent:false,record:false},
//   retries:2, condition:"", slotName:"", slotType:"text"
// });

// const SS = (s) => ({...s});

// export default function App() {
//   const [view, setView] = useState("builder");
//   const [industry, setIndustry] = useState(null);
//   const [template, setTemplate] = useState(null);
//   const [nodes, setNodes] = useState([]);
//   const [edges, setEdges] = useState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [panelTab, setPanelTab] = useState("content");
//   const [personas, setPersonas] = useState(PERSONAS);
//   const [agentName, setAgentName] = useState("Untitled Agent");
//   const [agentVersion, setAgentVersion] = useState(1);
//   const [simStep, setSimStep] = useState(0);
//   const [simScenario, setSimScenario] = useState("happy");
//   const [simLog, setSimLog] = useState([]);
//   const [simRunning, setSimRunning] = useState(false);
//   const [showTemplateModal, setShowTemplateModal] = useState(false);
//   const [showPersonaModal, setShowPersonaModal] = useState(false);
//   const [analyticsTab, setAnalyticsTab] = useState("funnel");
//   const simRef = useRef(null);

//   const onNodesChange = useCallback(c => setNodes(n=>applyNodeChanges(c,n)),[]);
//   const onEdgesChange = useCallback(c => setEdges(e=>applyEdgeChanges(c,e)),[]);
//   const onConnect     = useCallback(p => setEdges(e=>addEdge({...p,type:"smoothstep",animated:true,markerEnd:{type:MarkerType.ArrowClosed,color:"#378ADD"}},e)),[]);
//   const onEdgeClick   = useCallback((_,edge)=>setEdges(es=>es.filter(e=>e.id!==edge.id)),[]);
//   const onNodeClick   = useCallback((_,node)=>{ setSelectedNode(node); setPanelTab("content"); },[]);
//   const onPaneClick   = useCallback(()=>setSelectedNode(null),[]);

//   useEffect(()=>{
//     if(!selectedNode) return;
//     const l = nodes.find(n=>n.id===selectedNode.id);
//     if(l) setSelectedNode(l);
//   },[nodes]);

//   const loadTemplate = (ind, tmpl) => {
//     setIndustry(ind); setTemplate(tmpl);
//     setNodes(tmpl.nodes); setEdges(tmpl.edges);
//     setAgentName(tmpl.name); setAgentVersion(1);
//     setSelectedNode(null); setSimLog([]); setSimStep(0);
//     setShowTemplateModal(false); setView("builder");
//   };

//   const updateNodeData = (field, val) => {
//     setNodes(ns=>ns.map(n=>n.id===selectedNode.id?{...n,data:{...n.data,[field]:val}}:n));
//   };
//   const updateTone = (k,v) => {
//     setNodes(ns=>ns.map(n=>n.id===selectedNode.id?{...n,data:{...n.data,tone:{...n.data.tone,[k]:v}}}:n));
//   };
//   const updateVoice = (k,v) => {
//     setNodes(ns=>ns.map(n=>n.id===selectedNode.id?{...n,data:{...n.data,voice:{...n.data.voice,[k]:v}}}:n));
//   };
//   const updateCompliance = (k,v) => {
//     setNodes(ns=>ns.map(n=>n.id===selectedNode.id?{...n,data:{...n.data,compliance:{...n.data.compliance,[k]:v}}}:n));
//   };

//   const addNode = (type) => {
//     const id = Date.now().toString();
//     const data = BLANK_NODE_DATA(); data.nodeType=type; data.label=NODE_META[type].label;
//     setNodes(ns=>[...ns,{id,type:"custom",position:{x:200+Math.random()*200,y:100+Math.random()*200},data}]);
//   };
//   const deleteNode = () => {
//     if(!selectedNode) return;
//     setNodes(ns=>ns.filter(n=>n.id!==selectedNode.id));
//     setEdges(es=>es.filter(e=>e.source!==selectedNode.id&&e.target!==selectedNode.id));
//     setSelectedNode(null);
//   };
//   const duplicateNode = () => {
//     if(!selectedNode) return;
//     const id=Date.now().toString();
//     setNodes(ns=>[...ns,{...selectedNode,id,position:{x:selectedNode.position.x+40,y:selectedNode.position.y+40}}]);
//   };

//   const exportJSON = () => {
//     const agent = { name:agentName, version:agentVersion, industry, personas, nodes:nodes.map(n=>({...n,data:{...n.data}})), edges };
//     const blob = new Blob([JSON.stringify(agent,null,2)],{type:"application/json"});
//     const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`${agentName.replace(/\s/g,"_")}_v${agentVersion}.json`; a.click();
//   };
//   const importJSON = (e) => {
//     const file=e.target.files[0]; if(!file) return;
//     const reader=new FileReader();
//     reader.onload=ev=>{ try{ const d=JSON.parse(ev.target.result); setNodes(d.nodes||[]); setEdges(d.edges||[]); setAgentName(d.name||"Imported Agent"); setAgentVersion((d.version||1)+1); setSelectedNode(null); }catch(err){alert("Invalid JSON");} };
//     reader.readAsText(file);
//   };

//   const runSimulator = () => {
//     setSimRunning(true); setSimLog([]); setSimStep(0);
//     const orderedNodes = [...nodes];
//     let step=0;
//     const log=[];
//     const interval = setInterval(()=>{
//       if(step>=orderedNodes.length){ clearInterval(interval); setSimRunning(false); return; }
//       const n=orderedNodes[step];
//       const meta=NODE_META[n.data.nodeType]||NODE_META.message;
//       const text=n.data.promptText.replace(/<[^>]*>/g,"").replace(/\{\{[^}]*\}\}/g,"[variable]");
//       let userResp="";
//       if(simScenario==="happy") userResp=n.data.nodeType==="question"?"Yes, confirmed.":n.data.nodeType==="condition"?"[evaluates to true]":"";
//       if(simScenario==="silent") userResp=n.data.nodeType==="question"?"[no response — 5s timeout]":"";
//       if(simScenario==="low_confidence") userResp=n.data.nodeType==="question"?"Hmm, maybe, I'm not sure...":"";
//       if(simScenario==="hostile") userResp=n.data.nodeType==="question"?"Why are you asking this?":"";
//       log.push({ step:step+1, node:n.data.label, type:n.data.nodeType, color:meta.color, agent:text||"[action executed]", user:userResp, event:`node_enter:${n.id}` });
//       setSimLog([...log]); setSimStep(step+1);
//       step++;
//     },700);
//     simRef.current=interval;
//   };

//   const stopSim = () => { if(simRef.current) clearInterval(simRef.current); setSimRunning(false); };

//   const sd = selectedNode?.data || {};
//   const tone = sd.tone || {friendliness:70,assertiveness:55,formality:65,empathy:65};
//   const voice = sd.voice || {rate:1,pitch:1};
//   const compliance = sd.compliance || {};

//   const inp = { background:"#0f1419", border:"1px solid #2a3a4a", borderRadius:6, color:"#d0dce8", padding:"6px 10px", fontSize:12, width:"100%", boxSizing:"border-box", outline:"none" };
//   const btn = (active, color="#378ADD") => ({ padding:"5px 10px", borderRadius:5, border:`1px solid ${active?color:"#2a3a4a"}`, background:active?color+"22":"transparent", color:active?color:"#6b8090", cursor:"pointer", fontSize:11, fontWeight:active?600:400 });
//   const navBtn = (v) => ({ padding:"7px 14px", borderRadius:6, border:"none", background:view===v?"#378ADD22":"transparent", color:view===v?"#378ADD":"#6b8090", cursor:"pointer", fontSize:12, fontWeight:view===v?600:400 });

//   const FAKE_FUNNEL = nodes.slice(0,6).map((n,i)=>({ label:n.data.label, pct:Math.round(100-i*12), drop:i>0?Math.round(12+Math.random()*5):0 }));
//   const FAKE_CONFIDENCE = [85,72,90,65,78,82,55,91];

//   return (
//     <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#0a0f15",fontFamily:"system-ui,sans-serif",color:"#c8d8e8"}}>

//       {/* Top Bar */}
//       <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 16px",height:48,background:"#0d1520",borderBottom:"1px solid #1a2a3a",flexShrink:0}}>
//         <div style={{display:"flex",alignItems:"center",gap:8,marginRight:10}}>
//           <div style={{width:26,height:26,borderRadius:6,background:"#378ADD",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff"}}>V</div>
//           <input value={agentName} onChange={e=>setAgentName(e.target.value)} style={{background:"transparent",border:"none",color:"#d0dce8",fontSize:14,fontWeight:600,outline:"none",width:180}}/>
//           <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#1a2a3a",color:"#6b8090"}}>v{agentVersion}</span>
//           {template?.regulated && <span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#f59e0b22",color:"#f59e0b",border:"0.5px solid #f59e0b66"}}>regulated</span>}
//         </div>

//         <div style={{display:"flex",gap:2}}>
//           {["builder","simulator","analytics","personas"].map(v=><button key={v} style={navBtn(v)} onClick={()=>setView(v)}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>)}
//         </div>

//         <div style={{marginLeft:"auto",display:"flex",gap:6}}>
//           <button onClick={()=>setShowTemplateModal(true)} style={{...btn(false),borderColor:"#7F77DD",color:"#7F77DD"}}>Templates</button>
//           <label style={{...btn(false),borderColor:"#1D9E75",color:"#1D9E75",cursor:"pointer"}}>Import<input type="file" accept=".json" onChange={importJSON} style={{display:"none"}}/></label>
//           <button onClick={exportJSON} style={{...btn(false),borderColor:"#1D9E75",color:"#1D9E75"}}>Export JSON</button>
//           <button style={{...btn(true,"#378ADD"),padding:"5px 14px"}}>Deploy ›</button>
//         </div>
//       </div>

//       {/* Template Modal */}
//       {showTemplateModal && (
//         <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
//           <div style={{background:"#0d1520",border:"1px solid #1a2a3a",borderRadius:12,width:640,maxHeight:"80vh",overflowY:"auto",padding:24}}>
//             <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
//               <span style={{fontSize:15,fontWeight:600,color:"#d0dce8"}}>Industry Templates</span>
//               <button onClick={()=>setShowTemplateModal(false)} style={{background:"none",border:"none",color:"#6b8090",cursor:"pointer",fontSize:18}}>✕</button>
//             </div>
//             {Object.entries(INDUSTRY_TEMPLATES).map(([ind,tmplList])=>(
//               <div key={ind} style={{marginBottom:16}}>
//                 <div style={{fontSize:11,letterSpacing:"0.08em",color:"#378ADD",marginBottom:8,fontWeight:600}}>{ind.toUpperCase()}</div>
//                 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
//                   {tmplList.map(t=>(
//                     <div key={t.id} onClick={()=>loadTemplate(ind,t)} style={{padding:"12px 14px",background:"#141920",border:"1px solid #1a2a3a",borderRadius:8,cursor:"pointer",transition:"border-color 0.15s"}}
//                       onMouseEnter={e=>e.currentTarget.style.borderColor="#378ADD"}
//                       onMouseLeave={e=>e.currentTarget.style.borderColor="#1a2a3a"}>
//                       <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
//                         <span style={{fontSize:13,fontWeight:600,color:"#c8d8e8"}}>{t.name}</span>
//                         {t.regulated && <span style={{fontSize:9,padding:"2px 5px",borderRadius:3,background:"#f59e0b22",color:"#f59e0b"}}>regulated</span>}
//                       </div>
//                       <div style={{fontSize:11,color:"#6b8090",marginTop:3}}>{t.description}</div>
//                       <div style={{fontSize:10,color:"#4a6070",marginTop:6}}>{t.nodes.length} nodes · {t.edges.length} connections</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//             <button onClick={()=>{setNodes([]);setEdges([]);setAgentName("Untitled Agent");setShowTemplateModal(false);}} style={{marginTop:8,width:"100%",padding:"9px",background:"#141920",border:"1px dashed #2a3a4a",borderRadius:8,color:"#6b8090",cursor:"pointer",fontSize:12}}>Start from scratch</button>
//           </div>
//         </div>
//       )}

//       {/* Main content */}
//       <div style={{flex:1,display:"flex",overflow:"hidden"}}>

//         {/* BUILDER */}
//         {view==="builder" && <>
//           {/* Node Palette */}
//           <div style={{width:160,background:"#0d1520",borderRight:"1px solid #1a2a3a",padding:"12px 8px",flexShrink:0,overflowY:"auto"}}>
//             <div style={{fontSize:10,letterSpacing:"0.1em",color:"#4a6070",marginBottom:8,fontWeight:600,paddingLeft:4}}>NODES</div>
//             {Object.entries(NODE_META).map(([type,meta])=>(
//               <div key={type} onClick={()=>addNode(type)} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 8px",marginBottom:4,background:"#141920",borderLeft:`3px solid ${meta.color}`,borderRadius:5,cursor:"pointer",fontSize:12,color:"#b0c8d8"}}
//                 onMouseEnter={e=>e.currentTarget.style.background="#1a2535"}
//                 onMouseLeave={e=>e.currentTarget.style.background="#141920"}>
//                 <div style={{width:16,height:16,borderRadius:3,background:meta.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff",flexShrink:0}}>{meta.icon}</div>
//                 {meta.label}
//               </div>
//             ))}
//             <div style={{marginTop:16,borderTop:"1px solid #1a2a3a",paddingTop:12}}>
//               <div style={{fontSize:10,letterSpacing:"0.08em",color:"#4a6070",marginBottom:6,fontWeight:600,paddingLeft:4}}>LEGEND</div>
//               {Object.entries(NODE_META).filter(([t])=>["message","question","condition","api","end"].includes(t)).map(([type,meta])=>(
//                 <div key={type} style={{display:"flex",alignItems:"center",gap:5,marginBottom:4,fontSize:10,color:"#6b8090"}}>
//                   <div style={{width:8,height:8,borderRadius:2,background:meta.color,flexShrink:0}}/>
//                   {meta.label}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Canvas */}
//           <div style={{flex:1,position:"relative"}}>
//             {nodes.length===0 && (
//               <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:5}}>
//                 <div style={{textAlign:"center"}}>
//                   <div style={{fontSize:32,marginBottom:8,color:"#1a2a3a"}}>⬡</div>
//                   <div style={{fontSize:14,color:"#4a6070",marginBottom:8}}>No nodes yet</div>
//                   <div style={{fontSize:12,color:"#3a5060"}}>Click a node type on the left to add it,<br/>or load an industry template</div>
//                 </div>
//               </div>
//             )}
//             <ReactFlow nodeTypes={NODE_TYPES_REACT} nodes={nodes} edges={edges}
//               onNodeClick={onNodeClick} onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange} onConnect={onConnect}
//               onEdgeClick={onEdgeClick} onPaneClick={onPaneClick}
//               defaultEdgeOptions={{type:"smoothstep",animated:true,style:{stroke:"#378ADD66"}}}
//               fitView>
//               <Background color="#1a2535" gap={24} size={1}/>
//               <Controls style={{background:"#0d1520",border:"1px solid #1a2a3a"}}/>
//               <MiniMap style={{background:"#0d1520",border:"1px solid #1a2a3a"}} nodeColor={n=>NODE_META[n.data?.nodeType]?.color||"#378ADD"}/>
//             </ReactFlow>
//           </div>

//           {/* Properties Panel */}
//           {selectedNode && (
//             <div style={{width:280,background:"#0d1520",borderLeft:"1px solid #1a2a3a",display:"flex",flexDirection:"column",flexShrink:0}}>
//               {/* Panel header */}
//               <div style={{padding:"12px 14px",borderBottom:"1px solid #1a2a3a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
//                 <div>
//                   <div style={{fontSize:13,fontWeight:600,color:"#d0dce8"}}>Node Properties</div>
//                   <div style={{fontSize:10,color:NODE_META[sd.nodeType]?.color||"#378ADD",marginTop:1}}>{NODE_META[sd.nodeType]?.label||"Node"}</div>
//                 </div>
//                 <div style={{display:"flex",gap:6}}>
//                   <button onClick={duplicateNode} title="Duplicate" style={{background:"none",border:"none",color:"#4a6070",cursor:"pointer",fontSize:14}}>⎘</button>
//                   <button onClick={deleteNode} title="Delete" style={{background:"none",border:"none",color:"#E24B4A",cursor:"pointer",fontSize:14}}>🗑</button>
//                   <button onClick={()=>setSelectedNode(null)} style={{background:"none",border:"none",color:"#4a6070",cursor:"pointer",fontSize:16}}>✕</button>
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div style={{display:"flex",borderBottom:"1px solid #1a2a3a"}}>
//                 {["content","persona","branching","actions","compliance"].map(t=>(
//                   <button key={t} onClick={()=>setPanelTab(t)} style={{flex:1,padding:"7px 0",fontSize:10,border:"none",background:"transparent",color:panelTab===t?"#378ADD":"#4a6070",borderBottom:panelTab===t?"2px solid #378ADD":"2px solid transparent",cursor:"pointer",fontWeight:panelTab===t?600:400,letterSpacing:"0.03em"}}>
//                     {t.toUpperCase()}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               <div style={{flex:1,overflowY:"auto",padding:14}}>

//                 {panelTab==="content" && <>
//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Label</label>
//                   <input value={sd.label||""} onChange={e=>updateNodeData("label",e.target.value)} style={{...inp,marginBottom:12}}/>

//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Node type</label>
//                   <select value={sd.nodeType||"message"} onChange={e=>updateNodeData("nodeType",e.target.value)} style={{...inp,marginBottom:12,cursor:"pointer"}}>
//                     {Object.entries(NODE_META).map(([t,m])=><option key={t} value={t}>{m.label}</option>)}
//                   </select>

//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Prompt Text (SSML)</label>
//                   <textarea value={sd.promptText||""} onChange={e=>updateNodeData("promptText",e.target.value)} rows={5} style={{...inp,resize:"vertical",lineHeight:1.5,marginBottom:12}}/>

//                   {sd.nodeType==="condition" && <>
//                     <label style={{fontSize:11,color:"#f59e0b",display:"block",marginBottom:4}}>Condition expression</label>
//                     <input value={sd.condition||sd.promptText||""} onChange={e=>updateNodeData("condition",e.target.value)} placeholder="budget >= 1500000 && intent == 'buy'" style={{...inp,marginBottom:12,fontFamily:"monospace",fontSize:11}}/>
//                   </>}

//                   {sd.nodeType==="question" && <>
//                     <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Slot name</label>
//                     <input value={sd.slotName||""} onChange={e=>updateNodeData("slotName",e.target.value)} placeholder="e.g. budget, intent" style={{...inp,marginBottom:6}}/>
//                     <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Slot type</label>
//                     <select value={sd.slotType||"text"} onChange={e=>updateNodeData("slotType",e.target.value)} style={{...inp,marginBottom:12,cursor:"pointer"}}>
//                       {["text","number","yes/no","choice","date","phone"].map(t=><option key={t}>{t}</option>)}
//                     </select>
//                   </>}

//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Max retries</label>
//                   <input type="number" min={0} max={5} value={sd.retries??2} onChange={e=>updateNodeData("retries",Number(e.target.value))} style={{...inp,marginBottom:12,width:70}}/>

//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Tags (comma-separated)</label>
//                   <input value={(sd.tags||[]).join(",")} onChange={e=>updateNodeData("tags",e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} placeholder="cta, compliance, crm" style={{...inp}}/>
//                 </>}

//                 {panelTab==="persona" && <>
//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Persona</label>
//                   <select value={sd.persona||"p1"} onChange={e=>updateNodeData("persona",e.target.value)} style={{...inp,marginBottom:16,cursor:"pointer"}}>
//                     {personas.map(p=><option key={p.id} value={p.id}>{p.name}{p.approved?" ✓":""}</option>)}
//                   </select>

//                   <div style={{fontSize:11,color:"#6b8090",marginBottom:10,letterSpacing:"0.05em"}}>TONE SLIDERS</div>
//                   {[["friendliness","#1D9E75"],["assertiveness","#378ADD"],["empathy","#7F77DD"],["formality","#EF9F27"]].map(([k,c])=>(
//                     <div key={k} style={{marginBottom:12}}>
//                       <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
//                         <span style={{fontSize:11,color:"#6b8090",textTransform:"capitalize"}}>{k}</span>
//                         <span style={{fontSize:11,color:c,fontWeight:600}}>{tone[k]}</span>
//                       </div>
//                       <input type="range" min={0} max={100} step={1} value={tone[k]||50} onChange={e=>updateTone(k,Number(e.target.value))} style={{width:"100%",accentColor:c}}/>
//                     </div>
//                   ))}

//                   <div style={{fontSize:11,color:"#6b8090",margin:"16px 0 10px",letterSpacing:"0.05em"}}>VOICE</div>
//                   <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
//                     {["rate","pitch"].map(k=>(
//                       <div key={k}>
//                         <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4,textTransform:"capitalize"}}>{k}</label>
//                         <input type="number" min={0.5} max={2} step={0.1} value={voice[k]} onChange={e=>updateVoice(k,Number(e.target.value))} style={{...inp}}/>
//                       </div>
//                     ))}
//                   </div>
//                 </>}

//                 {panelTab==="branching" && <>
//                   <div style={{fontSize:11,color:"#6b8090",marginBottom:10}}>Outgoing edges from this node are shown below. Click an edge on the canvas to delete it.</div>
//                   {edges.filter(e=>e.source===selectedNode.id).map(e=>{
//                     const tgt=nodes.find(n=>n.id===e.target);
//                     return (
//                       <div key={e.id} style={{padding:"8px 10px",background:"#141920",borderRadius:6,marginBottom:6,fontSize:11,border:"1px solid #1a2a3a"}}>
//                         <div style={{color:"#d0dce8",marginBottom:2}}>→ {tgt?.data?.label||e.target}</div>
//                         {e.label && <div style={{color:"#f59e0b",fontSize:10}}>Condition: {e.label}</div>}
//                         <button onClick={()=>setEdges(es=>es.filter(x=>x.id!==e.id))} style={{marginTop:4,fontSize:10,color:"#E24B4A",background:"none",border:"none",cursor:"pointer",padding:0}}>Remove edge</button>
//                       </div>
//                     );
//                   })}
//                   {edges.filter(e=>e.source===selectedNode.id).length===0 && <div style={{color:"#3a5060",fontSize:11}}>No outgoing edges. Drag from a handle to another node to connect.</div>}
//                 </>}

//                 {panelTab==="actions" && <>
//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>API endpoint / payload</label>
//                   <textarea value={sd.promptText||""} onChange={e=>updateNodeData("promptText",e.target.value)} rows={4} placeholder={"POST /crm/leads\n{ lead_id: {{id}}, status: 'qualified' }"} style={{...inp,resize:"vertical",lineHeight:1.5,marginBottom:12,fontFamily:"monospace",fontSize:11}}/>
//                   <div style={{fontSize:11,color:"#6b8090",marginBottom:8}}>Emit telemetry event</div>
//                   <input value={sd.eventName||""} onChange={e=>updateNodeData("eventName",e.target.value)} placeholder="e.g. lead_qualified" style={{...inp,marginBottom:12}}/>
//                   <div style={{fontSize:11,color:"#6b8090",marginBottom:6}}>QA sampling</div>
//                   <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:12,color:"#b0c8d8"}}>
//                     <input type="checkbox" checked={!!sd.qaSample} onChange={e=>updateNodeData("qaSample",e.target.checked)} style={{accentColor:"#378ADD"}}/>
//                     Flag calls hitting this node for QA review
//                   </label>
//                 </>}

//                 {panelTab==="compliance" && <>
//                   <div style={{fontSize:11,color:"#6b8090",marginBottom:10}}>Compliance controls for this node</div>
//                   {[["consent","Require consent capture"],["record","Enable call recording"]].map(([k,lbl])=>(
//                     <label key={k} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:12,color:"#b0c8d8",marginBottom:10}}>
//                       <input type="checkbox" checked={!!compliance[k]} onChange={e=>updateCompliance(k,e.target.checked)} style={{accentColor:"#f59e0b"}}/>
//                       {lbl}
//                     </label>
//                   ))}
//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>Legal text injection</label>
//                   <textarea value={sd.legalText||""} onChange={e=>updateNodeData("legalText",e.target.value)} rows={3} placeholder="This call is being recorded for quality..." style={{...inp,resize:"vertical",lineHeight:1.5,marginBottom:12}}/>
//                   <label style={{fontSize:11,color:"#6b8090",display:"block",marginBottom:4}}>PII fields to redact</label>
//                   <input value={sd.piiFields||""} onChange={e=>updateNodeData("piiFields",e.target.value)} placeholder="name, phone, aadhaar" style={{...inp}}/>
//                 </>}

//               </div>
//             </div>
//           )}
//         </>}

//         {/* SIMULATOR */}
//         {view==="simulator" && (
//           <div style={{flex:1,display:"flex",flexDirection:"column",padding:24,gap:16,overflowY:"auto"}}>
//             <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
//               <span style={{fontSize:13,fontWeight:600,color:"#d0dce8"}}>Test scenario</span>
//               {Object.entries(SIMULATOR_SCENARIOS).map(([k,v])=>(
//                 <button key={k} onClick={()=>setSimScenario(k)} style={btn(simScenario===k,"#378ADD")}>{k.replace("_"," ")}</button>
//               ))}
//               <div style={{marginLeft:"auto",display:"flex",gap:8}}>
//                 <button onClick={runSimulator} disabled={simRunning||nodes.length===0} style={{...btn(!simRunning,"#1D9E75"),padding:"6px 16px",opacity:simRunning||nodes.length===0?0.4:1}}>
//                   {simRunning?"Running…":"Run simulation"}
//                 </button>
//                 {simRunning && <button onClick={stopSim} style={{...btn(true,"#E24B4A"),padding:"6px 16px"}}>Stop</button>}
//               </div>
//             </div>

//             <div style={{fontSize:11,color:"#4a6070",background:"#141920",padding:"8px 12px",borderRadius:6,border:"1px solid #1a2a3a"}}>
//               {SIMULATOR_SCENARIOS[simScenario]}
//             </div>

//             {simLog.length>0 && (
//               <div style={{display:"flex",flexDirection:"column",gap:6}}>
//                 {simLog.map((entry,i)=>(
//                   <div key={i} style={{background:"#0d1520",border:`1px solid ${entry.color}33`,borderRadius:8,padding:"10px 14px"}}>
//                     <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
//                       <span style={{width:20,height:20,borderRadius:4,background:entry.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff",flexShrink:0}}>{entry.step}</span>
//                       <span style={{fontSize:12,fontWeight:600,color:entry.color}}>{entry.node}</span>
//                       <span style={{fontSize:10,padding:"1px 6px",borderRadius:3,background:entry.color+"22",color:entry.color}}>{entry.type}</span>
//                       <span style={{marginLeft:"auto",fontSize:10,color:"#3a5060",fontFamily:"monospace"}}>{entry.event}</span>
//                     </div>
//                     {entry.agent && <div style={{fontSize:12,color:"#a0b8c8",marginBottom:4,paddingLeft:28}}>🤖 {entry.agent}</div>}
//                     {entry.user  && <div style={{fontSize:12,color:"#6b9070",paddingLeft:28}}>👤 {entry.user}</div>}
//                   </div>
//                 ))}
//                 {!simRunning && simLog.length>0 && (
//                   <div style={{padding:"10px 14px",background:"#1D9E7522",border:"1px solid #1D9E7566",borderRadius:8,fontSize:12,color:"#1D9E75"}}>
//                     Simulation complete — {simLog.length} nodes traversed · Scenario: {simScenario.replace("_"," ")}
//                   </div>
//                 )}
//               </div>
//             )}

//             {nodes.length===0 && <div style={{color:"#4a6070",fontSize:13,textAlign:"center",marginTop:40}}>Load a template or build a flow first.</div>}
//           </div>
//         )}

//         {/* ANALYTICS */}
//         {view==="analytics" && (
//           <div style={{flex:1,padding:24,overflowY:"auto"}}>
//             <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:12,marginBottom:20}}>
//               {[["Calls today","1,284"],["Completion rate","68%"],["Avg call length","2m 34s"],["Escalation rate","8%"]].map(([l,v])=>(
//                 <div key={l} style={{background:"#141920",borderRadius:8,padding:"12px 14px",border:"1px solid #1a2a3a"}}>
//                   <div style={{fontSize:11,color:"#4a6070",marginBottom:6}}>{l}</div>
//                   <div style={{fontSize:22,fontWeight:500,color:"#d0dce8"}}>{v}</div>
//                 </div>
//               ))}
//             </div>

//             <div style={{display:"flex",gap:8,marginBottom:16}}>
//               {["funnel","confidence","disposition"].map(t=>(
//                 <button key={t} onClick={()=>setAnalyticsTab(t)} style={btn(analyticsTab===t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
//               ))}
//             </div>

//             {analyticsTab==="funnel" && (
//               <div style={{background:"#0d1520",border:"1px solid #1a2a3a",borderRadius:10,padding:16}}>
//                 <div style={{fontSize:12,color:"#6b8090",marginBottom:12}}>Node-level funnel (simulated)</div>
//                 {(nodes.length>0?nodes.slice(0,7):INDUSTRY_TEMPLATES["Real Estate"][0].nodes.slice(0,7)).map((n,i)=>{
//                   const pct=Math.max(10,100-i*13);
//                   const meta=NODE_META[n.data?.nodeType]||NODE_META.message;
//                   return (
//                     <div key={n.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
//                       <div style={{fontSize:11,color:"#6b8090",width:130,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{n.data?.label}</div>
//                       <div style={{flex:1,height:12,background:"#141920",borderRadius:6,overflow:"hidden"}}>
//                         <div style={{height:"100%",width:`${pct}%`,background:meta.color,borderRadius:6,transition:"width 0.5s"}}/>
//                       </div>
//                       <div style={{fontSize:11,color:"#d0dce8",width:36,textAlign:"right"}}>{pct}%</div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {analyticsTab==="confidence" && (
//               <div style={{background:"#0d1520",border:"1px solid #1a2a3a",borderRadius:10,padding:16}}>
//                 <div style={{fontSize:12,color:"#6b8090",marginBottom:12}}>NLU confidence distribution (simulated)</div>
//                 <div style={{display:"flex",alignItems:"flex-end",gap:6,height:120}}>
//                   {FAKE_CONFIDENCE.map((v,i)=>(
//                     <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
//                       <div style={{fontSize:10,color:"#6b8090"}}>{v}%</div>
//                       <div style={{width:"100%",height:`${v*1.2}px`,background:v>75?"#1D9E75":v>50?"#f59e0b":"#E24B4A",borderRadius:"3px 3px 0 0"}}/>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {analyticsTab==="disposition" && (
//               <div style={{background:"#0d1520",border:"1px solid #1a2a3a",borderRadius:10,padding:16}}>
//                 <div style={{fontSize:12,color:"#6b8090",marginBottom:12}}>Call disposition breakdown (simulated)</div>
//                 {[["Completed — CTA achieved","42%","#1D9E75"],["Transferred to human","18%","#378ADD"],["Dropped — no response","14%","#E24B4A"],["Callback scheduled","16%","#7F77DD"],["Other / unknown","10%","#888780"]].map(([l,p,c])=>(
//                   <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
//                     <div style={{width:10,height:10,borderRadius:2,background:c,flexShrink:0}}/>
//                     <div style={{fontSize:12,color:"#b0c8d8",flex:1}}>{l}</div>
//                     <div style={{fontSize:12,fontWeight:600,color:c}}>{p}</div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* PERSONAS */}
//         {view==="personas" && (
//           <div style={{flex:1,padding:24,overflowY:"auto"}}>
//             <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
//               <span style={{fontSize:14,fontWeight:600,color:"#d0dce8"}}>Persona library</span>
//               <button onClick={()=>setPersonas(ps=>[...ps,{id:"p"+Date.now(),name:"New Persona",tone:{friendliness:70,assertiveness:55,formality:65,empathy:65},approved:false}])} style={{...btn(false,"#378ADD"),borderColor:"#378ADD",color:"#378ADD"}}>+ Add persona</button>
//             </div>
//             <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
//               {personas.map((p,pi)=>(
//                 <div key={p.id} style={{background:"#0d1520",border:"1px solid #1a2a3a",borderRadius:10,padding:16}}>
//                   <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
//                     <div>
//                       <input value={p.name} onChange={e=>setPersonas(ps=>ps.map((x,i)=>i===pi?{...x,name:e.target.value}:x))} style={{background:"transparent",border:"none",color:"#d0dce8",fontSize:13,fontWeight:600,outline:"none",padding:0,width:"100%"}}/>
//                       <div style={{fontSize:10,color:p.approved?"#1D9E75":"#f59e0b",marginTop:2}}>{p.approved?"approved":"pending approval"}</div>
//                     </div>
//                     <button onClick={()=>setPersonas(ps=>ps.map((x,i)=>i===pi?{...x,approved:!x.approved}:x))} style={{fontSize:10,padding:"3px 7px",borderRadius:4,background:p.approved?"#1D9E7522":"#f59e0b22",color:p.approved?"#1D9E75":"#f59e0b",border:`0.5px solid ${p.approved?"#1D9E75":"#f59e0b"}`,cursor:"pointer"}}>
//                       {p.approved?"Revoke":"Approve"}
//                     </button>
//                   </div>
//                   {[["friendliness","#1D9E75"],["assertiveness","#378ADD"],["empathy","#7F77DD"],["formality","#EF9F27"]].map(([k,c])=>(
//                     <div key={k} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
//                       <span style={{fontSize:10,color:"#4a6070",width:80,textTransform:"capitalize"}}>{k}</span>
//                       <div style={{flex:1,height:4,background:"#141920",borderRadius:2,overflow:"hidden"}}>
//                         <div style={{height:"100%",width:`${p.tone[k]}%`,background:c,borderRadius:2}}/>
//                       </div>
//                       <span style={{fontSize:10,color:c,width:24,textAlign:"right"}}>{p.tone[k]}</span>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



//gem
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

const BFSI_LOAN_TEMPLATE = [
  { 
    id: "node_1", 
    type: "custom", 
    position: { x: 100, y: 100 }, 
    data: { 
      label: "Welcome", 
      nodeType: "message", 
      prompt: "Hello, thanks for calling Global Bank. Are you interested in a loan?", 
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
      prompt: "To help you better, what is your approximate annual income?", 
      variable: "annual_income" 
    } 
  },
];

// --- 2. CUSTOM VOICE NODE COMPONENT ---
const VoiceNode = ({ data, selected }) => {
  const themeColor = NODE_TYPES_CONFIG[data.nodeType]?.color || "#333";
  
  return (
    <div style={{
      padding: "12px",
      borderRadius: "8px",
      background: "#fff",
      border: selected ? `2px solid ${themeColor}` : "1px solid #d1d5db",
      width: 180,
      boxShadow: selected ? "0 0 10px rgba(0,0,0,0.1)" : "0 2px 4px rgba(0,0,0,0.05)",
      fontFamily: "Inter, sans-serif"
    }}>
      <Handle type="target" position={Position.Top} style={{ background: "#9ca3af" }} />
      
      <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: themeColor, marginRight: "6px" }} />
        <span style={{ fontSize: "10px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase" }}>
          {data.nodeType}
        </span>
      </div>
      
      <div style={{ fontWeight: "600", fontSize: "13px", color: "#111827" }}>{data.label}</div>
      <div style={{ fontSize: "10px", color: "#6b7280", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {data.prompt || "No content set..."}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: "#9ca3af" }} />
    </div>
  );
};

// --- 3. MAIN STUDIO APPLICATION ---
export default function VoiceFlowStudio() {
  const [nodes, setNodes] = useState(BFSI_LOAN_TEMPLATE);
  const [edges, setEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const nodeTypes = useMemo(() => ({ custom: VoiceNode }), []);

  // Find the selected node object
  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId),
    [nodes, selectedNodeId]
  );

  // Handlers
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
        persona: { friendliness: 0.5, assertiveness: 0.5 } 
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
    <div style={{ 
      display: "flex", 
      width: "98vw", 
      height: "100vh", 
      overflow: "hidden", 
      background: "#f3f4f6",
      fontFamily: "Inter, sans-serif"
    }}>
      
      {/* LEFT SIDEBAR: Palette */}
      <aside style={{ 
        width: "260px", 
        background: "#1f2937", 
        color: "#fff", 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column",
        zIndex: 5
      }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>Voice Studio</h2>
        
        <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "10px", fontWeight: "600" }}>DRAG & DROP NODES</p>
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
                fontSize: "13px"
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
              cursor: "pointer" 
            }}
          >
            Export JSON
          </button>
        </div>
      </aside>

      {/* CANVAS AREA */}
      <main style={{ flexGrow: 1, height: "100%", position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </main>

      {/* RIGHT PANEL: Properties (Overflow-handled) */}
      {selectedNode && (
        <aside style={{ 
          width: "320px", 
          height: "100%", 
          background: "#fff", 
          borderLeft: "1px solid #e5e7eb", 
          display: "flex",
          flexDirection: "column",
          zIndex: 5
        }}>
          {/* Internal scrollable area for properties */}
          <div style={{ padding: "24px", overflowY: "auto", flexGrow: 1 }}>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>Node Settings</h3>
            <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "20px" }}>ID: {selectedNode.id}</p>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Display Label</label>
              <input 
                style={inputStyle} 
                value={selectedNode.data.label} 
                onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })} 
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Prompt (TTS Content)</label>
              <textarea 
                style={{ ...inputStyle, height: "100px", resize: "none" }} 
                value={selectedNode.data.prompt || ""} 
                onChange={(e) => updateNodeData(selectedNode.id, { prompt: e.target.value })} 
              />
            </div>

            {/* Persona Section */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "20px" }}>
              <h4 style={{ fontSize: "14px", marginBottom: "15px" }}>Persona Sliders</h4>
              
              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                  <span>Friendliness</span>
                  <span>{Math.round((selectedNode.data.persona?.friendliness || 0.5) * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  style={{ width: "100%", cursor: "pointer" }}
                  value={(selectedNode.data.persona?.friendliness || 0.5) * 100}
                  onChange={(e) => updateNodeData(selectedNode.id, { persona: { ...selectedNode.data.persona, friendliness: e.target.value / 100 } })}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                  <span>Assertiveness</span>
                  <span>{Math.round((selectedNode.data.persona?.assertiveness || 0.5) * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  style={{ width: "100%", cursor: "pointer" }}
                  value={(selectedNode.data.persona?.assertiveness || 0.5) * 100}
                  onChange={(e) => updateNodeData(selectedNode.id, { persona: { ...selectedNode.data.persona, assertiveness: e.target.value / 100 } })}
                />
              </div>
            </div>

            {/* Logic Section */}
            {selectedNode.data.nodeType === "condition" && (
              <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "10px" }}>
                <label style={labelStyle}>Branching Condition</label>
                <input 
                  style={{ ...inputStyle, background: "#fffbeb", borderColor: "#fde68a" }} 
                  placeholder="e.g. score > 700"
                  value={selectedNode.data.condition || ""}
                  onChange={(e) => updateNodeData(selectedNode.id, { condition: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Fixed Footer for Property Panel */}
          <div style={{ padding: "15px", borderTop: "1px solid #e5e7eb", background: "#f9fafb" }}>
            <button 
              onClick={() => setSelectedNodeId(null)}
              style={{ width: "100%", padding: "10px", background: "#fff", border: "1px solid #d1d5db", borderRadius: "6px", cursor: "pointer" }}
            >
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