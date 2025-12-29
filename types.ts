export interface FlowNode {
  id: string;
  label: string;
  type: 'trigger' | 'action' | 'decision' | 'result';
  color: string;
}

export interface MiniExercise {
  prompt: string;
  expected_answer: string | string[] | { trigger: string; actions: string[]; business_result?: string };
  placeholder?: string;
}

export interface ModuleData {
  id: string;
  title: string;
  key_message: string;
  simple_explanation: string;
  analogy: string;
  business_example: string;
  mini_exercise: MiniExercise;
  nodes: FlowNode[];
  connectionType: 'linear' | 'branching';
  additional_info?: string[];
}

export const BrandColors = {
  trigger: '#0F2A24',
  action: '#1F4D3F',
  result: '#6FBF9C',
  bg: '#F4F6F5',
  white: '#FFFFFF'
};