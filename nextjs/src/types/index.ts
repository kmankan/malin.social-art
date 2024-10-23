export type CreateArtworkData = {
  title: string;
  description?: string;
  authorId: string;
  configuration: any; // Replace 'any' with a more specific type if possible
}

export type RotatingBoxesAnimationState = {
  backgroundColor: string;
  boxes: {
    id: string;
    color: string;
    speed: number;
    size: number;
    rotationAxis: 'x' | 'y';
    position: [number, number, number];
    isSelected: boolean;
  }[];
  selectedBoxId: string | null;
};

