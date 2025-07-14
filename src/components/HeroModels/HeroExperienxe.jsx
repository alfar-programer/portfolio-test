import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { Room } from './Room'
import HeroLights from './HeroLights'
import Particles from './Particles'

const HeroExperienxe = () => {
  const isTablet = useMediaQuery({query: '(max-width:1028px)'})
  const isPhone = useMediaQuery({query: '(max-width:768px )' })

  return (
    <Canvas camera={{position:[0,0,15],fov:45 } }>
    
        <OrbitControls
          enableZoom={!isTablet}
          enablePan={false}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
          />
          <HeroLights 
          />
          <Particles count={100} />
          <group
            scale={!isPhone?.7 : 1 }
            position={[0, -3.5,0 ]}
            rotation={[0 , -Math.PI/4 ,0]}
            >
          <Room />
          </group>
        
    </Canvas>
  )
}

export default HeroExperienxe
