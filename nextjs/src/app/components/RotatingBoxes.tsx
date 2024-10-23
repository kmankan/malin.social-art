'use client';
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createArtwork } from '@/lib/api/createArtwork';
// import types
import { AnimationState, BoxConfig, CreateArtworkData } from '@/types/index';


function Box({ position, color, speed, size, rotationAxis, isSelected, onSelect }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
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
      scale={isSelected ? size * 1.5 : size}
      onClick={(event: ThreeEvent<MouseEvent>) => {
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
  //console.log('checking for Local storage:', localStorage.getItem('animationState'));

  const [boxes, setBoxes] = useState<BoxConfig[]>([
    { id: 'box1', color: '#00ff00', speed: 1, size: 1, rotationAxis: 'x', position: [-2, 0, 0], isSelected: false },
    { id: 'box2', color: '#00ffff', speed: 0.5, size: 1.2, rotationAxis: 'y', position: [1.2, 0, 0], isSelected: false },
  ]);
  const [selectedBox, setSelectedBox] = useState('box1');
  const [backgroundColor, setBackgroundColor] = useState('#FFB3E3'); // Sky blue default
  const [savedState, setSavedState] = useState<AnimationState | null>(null);

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
      position: [Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3],
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

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
  };

  const handleSubmit = async () => {
    const state = saveAnimationState()
    //localStorage.setItem('animationState', JSON.stringify(state));
    const artworkData: CreateArtworkData = {
      title: "Rotating Boxes",
      authorId: "cm2l7szil00005z1olbmvf1rl", // You might want to replace this with actual user ID
      state: state
    };
    try {
      const createdArtwork = await createArtwork(artworkData);
      if (createdArtwork) {
        console.log('Artwork created successfully:', createdArtwork);
        setSavedState(state);
      } else {
        console.error('Failed to create artwork');
      }
    } catch (error) {
      console.error('Error creating artwork:', error);
    }

    console.log('Animation state saved locally:', state);
    //console.log('Local storage:', localStorage.getItem('animationState'));
  };

  // Helper functions to save and load state
  const saveAnimationState = (): AnimationState => {
    // Get current state from your component
    const state: AnimationState = {
      backgroundColor: backgroundColor,
      boxes: boxes.map(box => ({
        id: box.id,
        color: box.color,
        speed: box.speed,
        size: box.size,
        rotationAxis: box.rotationAxis,
        position: box.position,
        isSelected: box.isSelected
      })),
      selectedBoxId: selectedBox
    };
    return state;
  };

  // Function to load saved state
  const handleLoadAnimationState = (savedState: AnimationState) => {
    if (savedState) {
      setBackgroundColor(savedState.backgroundColor);
      setBoxes(savedState.boxes);
      setSelectedBox(savedState.selectedBoxId);
    } else {
      console.error('No saved state found');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-rose-50">
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl font-mono'>rotating boxes</h1>
        <button
          className='text-sm font-mono'
          onClick={() => localStorage.getItem('animationState') && handleLoadAnimationState(JSON.parse(localStorage.getItem('animationState') || '{}'))}
        >
          load saved animation
        </button>
      </div>
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
              onSelect={() => handleBoxClick(box.id)}
            />
          ))}
          <OrbitControls />
        </Canvas>
      </div>
      <div className='userConfig flex-col items-center border-2 p-4'>
        <div className='mb-4'>
          <label htmlFor="backgroundColorSelect" className='text-sm font-mono block mb-2'>Background Color:</label>
          <input
            type="color"
            id="backgroundColorSelect"
            className="w-full h-10 rounded cursor-pointer"
            onChange={handleBackgroundColorChange}
            value={backgroundColor}
          />
        </div>
        <div className='addBox mb-4'>
          <button id="addBox" className='w-full p-2 border rounded text-sm font-mono bg-[#ACE1AF] hover:bg-green-300 transition-colors duration-200 shadow-sm' onClick={handleAddBox}>add another box</button>
        </div>
        <div className='mb-4'>
          <label htmlFor="boxSelect" className='text-sm font-mono block mb-2'>Select Box:</label>
          <select id="boxSelect" className='w-full p-2 border rounded text-sm font-mono' onChange={handleBoxSelect} value={selectedBox}>
            {boxes.map(box => (
              <option key={box.id} value={box.id}>{box.id}</option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor="boxColorSelect" className='text-sm font-mono block mb-2'>Color:</label>
          <div className="relative w-full h-10 rounded overflow-hidden">
            <input
              type="color"
              id="boxColorPicker"
              className="w-full h-10 rounded cursor-pointer"
              onChange={handleColorSelect}
              value={selectedBox === 'box1' ? boxes[0].color : boxes[1].color}
            />
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
            className="w-full appearance-none bg-gray-200 h-2 rounded-full"
            style={{
              background: `linear-gradient(to right, #93c5fd 0%, #93c5fd ${(boxes.find(box => box.id === selectedBox)?.speed || 0) * 10}%, #e5e7eb ${(boxes.find(box => box.id === selectedBox)?.speed || 0) * 10}%, #e5e7eb 100%)`
            }}
            onChange={(e) => {
              handleSpeedChange(e);
              e.target.style.background = `linear-gradient(to right, #93c5fd 0%, #93c5fd ${e.target.value * 10}%, #e5e7eb ${e.target.value * 10}%, #e5e7eb 100%)`;
            }}
            value={boxes.find(box => box.id === selectedBox)?.speed || 0}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="flipAxis" className='text-sm font-mono block mb-2'>Axis:</label>
          <button id="flipAxis" className='w-full p-2 border rounded text-sm font-mono bg-blue-100 hover:bg-blue-200 transition-colors duration-200 shadow-sm' onClick={handleFlipAxis}>flip</button>
        </div>
        <div>
          <button
            className="w-full p-2 mt-4 bg-rose-100 text-sm font-mono rounded-md hover:bg-pink-400 hover:border-green-300 border-2 transition duration-300 ease-in-out"
            onClick={handleSubmit}>
            save my animation
          </button>
        </div>
        <div>
          {savedState ? JSON.stringify(savedState, null, 2) : null}
        </div>
      </div>
    </div>
  );
}
