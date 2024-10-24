export type CreateArtworkData = {
  title: string;
  description?: string;
  authorId: string;
  state: AnimationState; // Replace 'any' with a more specific type if possible
}

export type BoxConfig = {
  id: string;
  color: string;
  speed: number;
  size: number;
  rotationAxis: 'x' | 'y';
  position: [number, number, number];
  isSelected: boolean;
}

// Types for saving animation state
export type AnimationState = {
  backgroundColor: string;
  boxes: BoxConfig[];
  selectedBoxId: string;
}