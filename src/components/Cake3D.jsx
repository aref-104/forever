import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Cake() {
  const meshRef = useRef(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const cakeColor = useMemo(() => new THREE.Color('#ffb6c1'), []);
  const frostingColor = useMemo(() => new THREE.Color('#ff69b4'), []);
  const candleColor = useMemo(() => new THREE.Color('#ffd700'), []);
  const flameColor = useMemo(() => new THREE.Color('#ff4500'), []);

  return (
    <group ref={meshRef} scale={[0.5, 0.5, 0.5]}>
      {/* Cake Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 1.5, 32]} />
        <meshStandardMaterial color={cakeColor} />
      </mesh>
      
      {/* Frosting Layer */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 0.3, 32]} />
        <meshStandardMaterial color={frostingColor} />
      </mesh>
      
      {/* Top Layer */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 1, 32]} />
        <meshStandardMaterial color={cakeColor} />
      </mesh>
      
      {/* Top Frosting */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.3, 32]} />
        <meshStandardMaterial color={frostingColor} />
      </mesh>
      
      {/* Candle */}
      <mesh position={[0, 2.6, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color={candleColor} />
      </mesh>
      
      {/* Flame */}
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={flameColor} 
          emissive={flameColor}
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Decorations */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;
        return (
          <mesh key={i} position={[x, 0.8, z]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color={`hsl(${i * 45}, 70%, 60%)`} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Cake3D() {
  return (
    <div style={{ width: '100%', height: '350px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas
        camera={{ position: [0, 3, 5], fov: 50 }}
        style={{ background: 'transparent', width: '100%', height: '280px' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Cake />
      </Canvas>
      <div style={{
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '16px',
        animation: 'fadeInUp 1s ease-out'
      }}>
        <p style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#ec4899',
          margin: '0',
          letterSpacing: '0.5px',
          fontFamily: 'serif'
        }}>
          Happy Birthday My Future
        </p>
        <p style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#db2777',
          margin: '4px 0 0 0',
          letterSpacing: '0.5px',
          fontFamily: 'serif'
        }}>
          Future Lawyer ❤️
        </p>
      </div>
    </div>
  );
}
