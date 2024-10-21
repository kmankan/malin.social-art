'use client';
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface BoxConfig {
  id: string;
  color: string;
  speed: number;
  size: number;
  rotationAxis: 'x' | 'y';
  position: [number, number, number];
  isSelected: boolean;
}

function Box({ position, color, speed, size, rotationAxis, isSelected, onSelect }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation[rotationAxis] += speed * delta
    }
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      position={position}
      ref={ref}
      scale={clicked ? size * 1.5 : size}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        click(!clicked);
        onSelect(event);
      }}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </mesh>
  )
}

export default function RotatingBoxes() {
  const [boxes, setBoxes] = useState<BoxConfig[]>([
    { id: 'box1', color: '#00ff00', speed: 1, size: 1, rotationAxis: 'x', position: [-2, 0, 0], isSelected: false },
    { id: 'box2', color: '#00ffff', speed: 0.5, size: 1.2, rotationAxis: 'y', position: [1.2, 0, 0], isSelected: false },
  ]);
  const [selectedBox, setSelectedBox] = useState('box1');

  const handleBoxSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBox(event.target.value);
  };

  const handleColorSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setBoxes(prevBoxes => prevBoxes.map(box =>
      box.id === selectedBox ? { ...box, color: newColor } : box
    ));
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(event.target.value);
    setBoxes(prevBoxes => prevBoxes.map(box =>
      box.id === selectedBox ? { ...box, speed: newSpeed } : box
    ));
  };

  const handleFlipAxis = () => {
    setBoxes(prevBoxes => prevBoxes.map(box =>
      box.id === selectedBox ? { ...box, rotationAxis: box.rotationAxis === 'x' ? 'y' : 'x' } : box
    ));
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseFloat(event.target.value);
    setBoxes(prevBoxes => prevBoxes.map(box =>
      box.id === selectedBox ? { ...box, size: newSize } : box
    ));
  };

  const handleAddBox = () => {
    const newBoxId = `box${boxes.length + 1}`;
    const newBox: BoxConfig = {
      id: newBoxId,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 0.5 + 0.8,
      rotationAxis: Math.random() > 0.5 ? 'x' : 'y',
      position: [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2],
      isSelected: false,
    };
    setBoxes(prevBoxes => [...prevBoxes, newBox]);
    setSelectedBox(newBoxId);
  };

  const handleBoxClick = (boxId: string) => {
    setSelectedBox(boxId);
    setBoxes(prevBoxes => prevBoxes.map(box => ({
      ...box,
      isSelected: box.id === boxId
    })));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className='rotating-box flex-grow border-2'>
        <Canvas>
          <ambientLight intensity={Math.PI / 3} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          {boxes.map(box => (
            <Box
              key={box.id}
              {...box}
              isSelected={box.id === selectedBox}
              onSelect={() => handleBoxClick(box.id)}
            />
          ))}
          <OrbitControls />
        </Canvas>
      </div>
      <div className='userConfig flex-col items-center border-2 p-4'>
        <div className='addBox mb-4'>
          <label htmlFor="addBox" className='text-sm font-mono block mb-2'>Add Box:</label>
          <button id="addBox" className='w-full p-2 border rounded' onClick={handleAddBox}>Add Box</button>
        </div>
        <div className='mb-4'>
          <label htmlFor="boxSelect" className='text-sm font-mono block mb-2'>Select Box:</label>
          <select id="boxSelect" className='w-full p-2 border rounded' onChange={handleBoxSelect} value={selectedBox}>
            {boxes.map(box => (
              <option key={box.id} value={box.id}>{box.id}</option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor="colorSelect" className='text-sm font-mono block mb-2'>Color:</label>
          <div className="relative w-full h-10 rounded overflow-hidden">
            <input
              type="color"
              id="colorPicker"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={handleColorSelect}
              value={selectedBox === 'box1' ? boxes[0].color : boxes[1].color}
            />
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(to right, 
                  #FF0000, /* Red */
                  #FF7F00, /* Orange */
                  #FFFF00, /* Yellow */
                  #00FF00, /* Green */
                  #0000FF, /* Blue */
                  #8B00FF  /* Violet */
                )`,
              }}
            ></div>
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor="speedInput" className='text-sm font-mono block mb-2'>Speed:</label>
          <input
            type="range"
            id="speedInput"
            min="0"
            max="10"
            step="0.2"
            className='w-full'
            onChange={handleSpeedChange}
            value={boxes.find(box => box.id === selectedBox)?.speed || 0}
          />
        </div>
        <div>
          <label htmlFor="flipAxis" className='text-sm font-mono block mb-2'>Axis:</label>
          <button id="flipAxis" className='w-full p-2 border rounded' onClick={handleFlipAxis}>Flip</button>
        </div>
      </div>
    </div>
  );
}
