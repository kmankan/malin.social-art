export type CreateArtworkData = {
  title: string;
  description?: string;
  authorId: string;
  state: AnimationState; // Replace 'any' with a more specific type if possible
}

export type BoxConfig = {
  id: string;
  color: string;  // Can be hex (#00ff00) or hsl format
  speed: number;
  size: number;
  rotationAxis: 'x' | 'y';
  position: [number, number, number];  // 3D position array
  isSelected: boolean;
}

// Types for saving animation state
export type AnimationState = {
  backgroundColor: string;  // Hex color format
  boxes: BoxConfig[];
  selectedBoxId: string;  // Always matches one of the box IDs
}

export type RotatingBoxesCanvasProps = {
  initialBoxes: BoxConfig[];
  initialSelectedBox?: string;
  initialBackgroundColor?: string;
}

export type BoxesCanvas = {
  state: AnimationState;
}
