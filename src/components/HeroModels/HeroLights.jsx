import React from 'react'

const HeroLights = () => {
  return (
    <>
      <spotLight 
      position={[5,2,4 ] }
      angle={1}
      intensity={40}
      penumbra={.1}
      color="white"
      />  
      <spotLight 
      position={[3,7,5 ] }
      angle={.1}
      intensity={100}
      penumbra={.2}
      color="white"
      />  
      <spotLight 
      position={[4,5,4 ] }
      angle={.3}
      intensity={40}
      penumbra={.5}
      color="4fcc9f0"
      />  
      <spotLight 
      position={[-3,5,5 ] }
      angle={.4}
      intensity={60}
      penumbra={1}
      color="9D4EDD"
      />  

      <pointLight 
        position={[0,1,0]}
        intensity={10}
        color='7209b7'
      />
      

      <pointLight 
        position={[1,1,-2]}
        intensity={10}
        color='0d00a4'
      />
      
      <pointLight 
        position={[1,-1,-4]}
        intensity={10}
        penumbra={1}
        color='#9D4EDD'
      />
      
 

    </>
  )
}

export default HeroLights
