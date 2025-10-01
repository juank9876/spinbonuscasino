'use client'
import React, { useMemo } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Panel,
    Handle,
    Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FileText, Tag, TrendingUp } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    post_count: string;
    parent_id: string | null;
}

interface CategoryHierarchyProps {
    categories: Category[];
}

// Generate random colors for categories
const getRandomColor = (id: string) => {
    const colors = [
        'from-red-500 to-red-600',
        'from-blue-500 to-blue-600',
        'from-green-500 to-green-600',
        'from-purple-500 to-purple-600',
        'from-yellow-500 to-yellow-600',
        'from-pink-500 to-pink-600',
        'from-indigo-500 to-indigo-600',
        'from-teal-500 to-teal-600',
        'from-orange-500 to-orange-600',
        'from-cyan-500 to-cyan-600'
    ];
    // Use ID to consistently assign same color to same category
    const hash = id.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
};

const CustomNode = ({ data }: { data: Category & { color?: string } }) => {
    const colorClass = data.color || 'from-gray-500 to-gray-600';
    
    return (
        <div className="relative">
            <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-500" />
            <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-500" />
            <div className={`bg-gradient-to-br ${colorClass} rounded-xl shadow-lg p-3 w-[240px] h-[140px] border-2 border-white/20 transition-all hover:scale-105 hover:shadow-2xl flex flex-col`}>
                <div className="flex items-start gap-2 flex-1">
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
                        <Tag className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h3 className="text-white font-bold text-sm mb-1 line-clamp-2 leading-tight">{data.name}</h3>
                        <p className="text-white/80 text-[10px] mb-2 line-clamp-2 leading-tight">{data.description}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between text-white/90 text-[10px] mt-auto pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
                        <FileText className="w-3 h-3" />
                        <span className="font-semibold">{data.post_count}</span>
                    </div>
                    <div className="flex items-center gap-1 truncate max-w-[120px]">
                        <TrendingUp className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate opacity-75">{data.slug}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define nodeTypes outside component to prevent re-creation on each render
const nodeTypes = {
    custom: CustomNode,
};

export function CategoryHierarchy({ categories }: CategoryHierarchyProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useMemo(() => {
        if (!categories || categories.length === 0) return;

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        // Debug: Log the categories data structure
        console.log('Categories received:', categories);

        // Ensure all categories have valid IDs and convert to strings
        const validCategories = categories.filter(cat => cat && cat.id).map(cat => ({
            ...cat,
            id: String(cat.id),
            parent_id: cat.parent_id ? String(cat.parent_id) : null,
            color: getRandomColor(String(cat.id))
        }));

        console.log('Valid categories after processing:', validCategories);

        // Separar categorías por nivel
        const rootCategories = validCategories.filter(cat => !cat.parent_id);
        const childCategories = validCategories.filter(cat => cat.parent_id);

        // Layout configuration for horizontal arrangement
        const horizontalSpacing = 280; // Space between nodes horizontally
        const verticalSpacing = 200;   // Space between levels vertically
        const startX = 100;            // Starting X position
        const startY = 100;            // Starting Y position for root categories

        // Position root categories horizontally
        rootCategories.forEach((category, index) => {
            const x = startX + index * horizontalSpacing;
            const y = startY;

            newNodes.push({
                id: category.id,
                type: 'custom',
                position: { x, y },
                data: category,
            });
        });

        // Position child categories below their parents
        const categoryChildren = new Map<string, typeof validCategories>();
        childCategories.forEach(child => {
            if (!categoryChildren.has(child.parent_id!)) {
                categoryChildren.set(child.parent_id!, []);
            }
            categoryChildren.get(child.parent_id!)!.push(child);
        });

        categoryChildren.forEach((children, parentId) => {
            const parentNode = newNodes.find(n => n.id === parentId);
            if (parentNode) {
                children.forEach((child, childIndex) => {
                    // Calculate position: center children below parent
                    const childrenCount = children.length;
                    const totalWidth = (childrenCount - 1) * horizontalSpacing;
                    const startChildX = parentNode.position.x - totalWidth / 2;
                    const x = startChildX + childIndex * horizontalSpacing;
                    const y = parentNode.position.y + verticalSpacing;

                    newNodes.push({
                        id: child.id,
                        type: 'custom',
                        position: { x, y },
                        data: child,
                    });

                    // Create edge from parent to child
                    newEdges.push({
                        id: `${parentId}-${child.id}`,
                        source: parentId,
                        target: child.id,
                        type: 'smoothstep',
                        animated: true,
                        style: {
                            stroke: '#94a3b8',
                            strokeWidth: 2,
                        },
                    });
                });
            }
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [categories, setNodes, setEdges]);

    const totalPosts = useMemo(() => {
        if (!categories) return 0;
        return categories.reduce((acc, cat) => acc + parseInt(cat.post_count || '0'), 0);
    }, [categories]);

    if (!categories || categories.length === 0) {
        return (
            <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <p className="text-xl">No hay categorías disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            >
                <Background color="#475569" gap={20} size={1} />
                <Controls className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg" />
                <MiniMap
                    nodeColor={(node: Node) => {
                        return node.id === 'root' ? '#64748b' : '#3b82f6';
                    }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg"
                />
                <Panel position="top-left" className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="text-white">
                        <h2 className="text-xl font-bold mb-2">Jerarquía de Categorías</h2>
                        <div className="space-y-1 text-sm">
                            <p className="text-white/80">Total de categorías: <span className="font-semibold text-white">{categories.length}</span></p>
                            <p className="text-white/80">Total de posts: <span className="font-semibold text-white">{totalPosts}</span></p>
                        </div>
                    </div>
                </Panel>
                <Panel position="top-right" className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 max-w-xs">
                    <div className="text-white text-xs space-y-2">
                        <p className="font-semibold mb-2">💡 Controles:</p>
                        <ul className="space-y-1 text-white/80">
                            <li>🖱️ Arrastra para mover nodos</li>
                            <li>🔍 Scroll para zoom</li>
                            <li>👆 Click en nodos para interactuar</li>
                        </ul>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}