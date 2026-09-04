// High-fidelity procedural document vectors & forensic simulation layers

export const renderDocumentSVG = (preset, layer = 'standard', contrast = 100, dewarp = true) => {
  // Returns SVG components depending on ID type and active layer
  const filterStyle = `contrast(${contrast}%) ${dewarp ? '' : 'perspective(500px) rotateX(2deg) rotateY(-1deg)'}`;
  
  return {
    filterStyle,
    id: preset.id,
    type: preset.idType
  };
};

export const MOCK_PRESENTERS = {
  'preset-1': {
    name: 'Priya Sharma (Live Presenter)',
    status: 'AUTHENTIC_LIVE',
    livenessScore: 99.2,
    blinkRate: '14/min',
    depthVariance: '3.4mm (Natural 3D)',
    moiréScore: '0.01 (No screen detected)',
    deviceDetected: 'None (Physical Face)',
    faceMatchScore: 98.4,
    gender: 'Female',
    estimatedAge: '32-35',
    eyeGaze: 'Centered (0.4° deviation)',
    photoUrl: 'female_authentic'
  },
  'preset-2': {
    name: 'Subject Presenter (Mismatched)',
    status: 'SUSPICIOUS_IDENTITY',
    livenessScore: 84.0,
    blinkRate: '12/min',
    depthVariance: '2.9mm (Natural 3D)',
    moiréScore: '0.03',
    deviceDetected: 'None',
    faceMatchScore: 62.5,
    gender: 'Male',
    estimatedAge: '41-45',
    eyeGaze: 'Left 4.2°',
    photoUrl: 'male_suspect'
  },
  'preset-3': {
    name: 'Camera Presentation (Screen Replay)',
    status: 'REPLAY_ATTACK_DETECTED',
    livenessScore: 15.2,
    blinkRate: '0/min (Static Display)',
    depthVariance: '0.1mm (Flat Screen)',
    moiréScore: '0.94 (42.8Hz High Peak)',
    deviceDetected: 'iPad Air 10.9" (Liquid Retina)',
    faceMatchScore: 86.2,
    gender: 'Female',
    estimatedAge: '28-30',
    eyeGaze: 'Static 0.0°',
    photoUrl: 'female_synthetic'
  }
};
