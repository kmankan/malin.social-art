import { useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { Box } from './CreateRotatingBoxes'
import { BoxConfig, RotatingBoxesCanvasProps, AnimationState, BoxesCanvas } from '@/types/index';

export function RotatingBoxesCanvas({
  initialBoxes,
  initialSelectedBox = '',
  initialBackgroundColor = '#FFB3E3'
}: RotatingBoxesCanvasProps) {
  const [boxes, setBoxes] = useState<BoxConfig[]>(initialBoxes);
  const [selectedBox, setSelectedBox] = useState(initialSelectedBox);
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor); // Sky blue default

  return (
    <div className='rotating-box border-2 h-3/6'>
      <Canvas>
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={Math.PI / 3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {boxes.map(box => (
          <Box
            key={box.id}
            {...box}
            isSelected={box.id === selectedBox}
            onSelect={() => { }}
          />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )

}



