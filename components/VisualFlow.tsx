import React from 'react';
import { FlowNode } from '../types';
import { ArrowRight, CornerDownRight, GitFork } from 'lucide-react';

interface VisualFlowProps {
  nodes: FlowNode[];
  type: 'linear' | 'branching';
}

const NodeCard: React.FC<{ node: FlowNode }> = ({ node }) => (
  <div 
    className="relative flex flex-col items-center justify-center p-4 rounded-lg shadow-lg text-white w-40 h-24 text-center text-sm font-semibold transition-transform hover:scale-105"
    style={{ backgroundColor: node.color }}
  >
    <span className="uppercase tracking-wider text-[10px] opacity-80 mb-1">{node.type}</span>
    {node.label}
  </div>
);

export const VisualFlow: React.FC<VisualFlowProps> = ({ nodes, type }) => {
  
  if (type === 'branching') {
    // Hardcoded logic for specific branching structure in M4 for simplicity
    // Node 0 -> Node 1 (Decision) -> [Node 2, Node 3]
    const root = nodes[0];
    const decision = nodes[1];
    const branchA = nodes[2];
    const branchB = nodes[3];

    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 overflow-x-auto w-full">
        <NodeCard node={root} />
        <ArrowRight className="text-gray-400 w-8 h-8 flex-shrink-0 rotate-90 md:rotate-0" />
        <NodeCard node={decision} />
        
        <div className="flex flex-col gap-8 ml-0 md:ml-4 relative">
             {/* Branch Connectors Visual Hack */}
             <div className="hidden md:block absolute top-1/2 -left-8 w-8 h-[1px] bg-gray-300"></div>
             <div className="hidden md:block absolute top-12 -left-8 w-1 h-[100px] border-l-2 border-dashed border-gray-300 transform -translate-y-1/2"></div>

             <div className="flex items-center gap-2">
                <CornerDownRight className="text-gray-400 w-6 h-6 hidden md:block" />
                <ArrowRight className="text-gray-400 w-6 h-6 md:hidden rotate-90" />
                <NodeCard node={branchA} />
             </div>
             <div className="flex items-center gap-2">
                <CornerDownRight className="text-gray-400 w-6 h-6 hidden md:block" />
                <ArrowRight className="text-gray-400 w-6 h-6 md:hidden rotate-90" />
                <NodeCard node={branchB} />
             </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 py-8">
      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          <NodeCard node={node} />
          {index < nodes.length - 1 && (
            <ArrowRight className="text-gray-400 w-8 h-8 flex-shrink-0 rotate-90 md:rotate-0" />
          )}
        </React.Fragment>
      ))}
      {/* Ghost arrow for M1 to show flow continues conceptually */}
      {nodes.length === 1 && (
         <ArrowRight className="text-gray-300 w-8 h-8 flex-shrink-0 opacity-50 rotate-90 md:rotate-0" />
      )}
    </div>
  );
};