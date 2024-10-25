'use client'
import { useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Box } from './CreateRotatingBoxes'
import { RotatingBoxesCanvasProps } from '@/types/index';

export function RotatingBoxesCanvas({
  initialBoxes,
  initialSelectedBox = '',
  initialBackgroundColor = '#FFB3E3'
}: RotatingBoxesCanvasProps) {
  const [selectedBox, setSelectedBox] = useState(initialSelectedBox);

  return (
    <div className='rotating-box border-2 h-full'>
      <Canvas>
        <color attach="background" args={[initialBackgroundColor]} />
        <ambientLight intensity={Math.PI / 3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {initialBoxes.map(box => (
          <Box
            key={box.id}
            {...box}
            isSelected={box.id === selectedBox}
            onSelect={() => setSelectedBox(box.id)}
          />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  )
}
