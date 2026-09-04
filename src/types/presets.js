export const ID_TYPES = [
  { id: 'passport', name: 'Indian Passport', code: 'P-IND', standard: 'ICAO Doc 9303' },
  { id: 'aadhaar', name: 'Aadhaar Card', code: 'UIDAI', standard: 'Verhoeff Algorithm' },
  { id: 'driving_license', name: 'Driving License', code: 'DL-SARATHI', standard: 'MoRTH Vahan/Sarathi' },
  { id: 'voter_id', name: 'Voter ID (EPIC)', code: 'ECI-EPIC', standard: 'Election Commission' },
  { id: 'pan_card', name: 'PAN Card', code: 'ITD-PAN', standard: 'Income Tax Dept NSDL' },
];

export const PRESETS = [
  {
    id: 'preset-1',
    name: 'Preset 1: Authentic Indian Passport (Pass)',
    shortName: 'Authentic Indian Passport',
    statusTag: 'PASS',
    statusType: 'authentic',
    idType: 'passport',
    trustScore: 96,
    trustCategory: 'AUTHENTIC & CLEARED',
    documentNumber: 'Z9482104',
    holderName: 'PRIYA SHARMA',
    holderNameHindi: 'प्रिया शर्मा',
    dob: '15/08/1991',
    gender: 'F',
    issueDate: '29/12/2021',
    expiryDate: '28/12/2031',
    placeOfBirth: 'NEW DELHI, INDIA',
    placeOfIssue: 'DELHI',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    mrz: [
      'P<INDSHARMA<<PRIYA<<<<<<<<<<<<<<<<<<<<<<<<<<',
      'Z9482104<8IND9108154F3112282<<<<<<<<<<<<<<02'
    ],
    checks: {
      checksum: {
        status: 'pass',
        score: '100%',
        title: 'ICAO Doc 9303 Check Digit Engine',
        subtitle: 'All 4 Check Digits Validated',
        details: [
          { label: 'Doc Number Check Digit', value: '8 (Matched)', pass: true },
          { label: 'Date of Birth Check Digit', value: '4 (Matched)', pass: true },
          { label: 'Expiry Date Check Digit', value: '2 (Matched)', pass: true },
          { label: 'Composite Checksum', value: '02 (Verified 731 weight)', pass: true },
        ],
        explanation: 'Mathematical 7-3-1 weight sum check digit verification passed with zero discrepancies across MRZ zones 1 and 2.'
      },
      typography: {
        status: 'pass',
        score: '99.2%',
        title: 'Typography & Layout Integrity',
        subtitle: 'Official ISP Font & Microtext Match',
        details: [
          { label: 'Micro-font Kerning', value: '< 0.02 mm deviation', pass: true },
          { label: 'Baseline Curvature', value: 'Exact alignment', pass: true },
          { label: 'Microtext Security Line', value: 'REPUBLICOFINDIA 0.2pt Intact', pass: true },
          { label: 'Guilloché Wave Pattern', value: 'Continuous sinusoidal integrity', pass: true },
        ],
        explanation: 'Security background pattern shows zero moiré distortion or digital rasterization gaps. Microtext remains crisp under 16x zoom.'
      },
      biometric: {
        status: 'pass',
        score: '98.4%',
        title: 'Face Match & 3D Liveness',
        subtitle: 'ArcFace 512d Match + Physical Subject',
        details: [
          { label: 'ArcFace Cosine Similarity', value: '98.4% (Threshold > 80%)', pass: true },
          { label: '3D Presentation Attack (PAD)', value: 'Live Subject Verified', pass: true },
          { label: 'Screen Replay Artifact', value: '0.01 (No moiré detected)', pass: true },
          { label: 'Natural Micro-Tremor', value: 'Normal biometric micro-saccades', pass: true },
        ],
        explanation: 'Deep metric ArcFace embedding demonstrates positive identity match against live presenter camera with physical skin reflectance.'
      },
      metadata: {
        status: 'pass',
        score: '98.0%',
        title: 'Metadata & Quantization Audit',
        subtitle: 'Raw Hardware Stream - No Manipulation',
        details: [
          { label: 'Acquisition Source', value: 'Flatbed CIS Optical Unit (300 DPI)', pass: true },
          { label: 'Editing Signatures', value: 'None (Clean hardware EXIF)', pass: true },
          { label: 'DCT Quantization Table', value: 'Uniform single-compression', pass: true },
          { label: 'ELA Variance', value: '< 4.2% (Natural optical sensor)', pass: true },
        ],
        explanation: 'No software re-saving artifacts found. Discrete Cosine Transform (DCT) coefficients follow natural optical sensor distribution.'
      }
    },
    ocrBoxes: [
      { id: 'b1', label: 'Passport No.', text: 'Z9482104', confidence: '99.8%', x: 62, y: 18, w: 28, h: 6 },
      { id: 'b2', label: 'Given Names', text: 'PRIYA', confidence: '99.6%', x: 38, y: 32, w: 26, h: 5 },
      { id: 'b3', label: 'Surname', text: 'SHARMA', confidence: '99.7%', x: 38, y: 40, w: 30, h: 5 },
      { id: 'b4', label: 'Date of Birth', text: '15/08/1991', confidence: '99.9%', x: 38, y: 48, w: 24, h: 5 },
      { id: 'b5', label: 'Place of Birth', text: 'NEW DELHI, INDIA', confidence: '99.3%', x: 38, y: 56, w: 40, h: 5 },
      { id: 'b6', label: 'MRZ Line 1', text: 'P<INDSHARMA<<PRIYA<<<<<<<<<<<<<<<<<<<<<<<<<<', confidence: '99.9%', x: 6, y: 82, w: 88, h: 6 },
      { id: 'b7', label: 'MRZ Line 2', text: 'Z9482104<8IND9108154F3112282<<<<<<<<<<<<<<02', confidence: '99.9%', x: 6, y: 89, w: 88, h: 6 },
    ],
    tamperZones: [],
    inspectorSummary: 'All forensic and biometric criteria satisfied. Official Security Press Guilloché pattern verified. ICAO Doc 9303 check digit calculation is mathematically authentic. Subject cleared for automated entry.',
    recommendation: 'CLEAR & APPROVE'
  },
  {
    id: 'preset-2',
    name: 'Preset 2: Forged Aadhaar — Spliced Date & Checksum Failure (Fail)',
    shortName: 'Forged Aadhaar (Spliced DOB)',
    statusTag: 'TAMPER DETECTED',
    statusType: 'forged',
    idType: 'aadhaar',
    trustScore: 18,
    trustCategory: 'HIGH FORGERY RISK',
    documentNumber: '8492 1048 3921',
    holderName: 'ROHAN CHOUDHARY',
    holderNameHindi: 'रोहन चौधरी',
    dob: '12/04/2002', // Tampered from 1982
    dobOriginal: '12/04/1982',
    gender: 'M',
    issueDate: '14/06/2019',
    expiryDate: 'N/A (LIFETIME)',
    placeOfBirth: 'JAIPUR, RAJASTHAN',
    placeOfIssue: 'UIDAI',
    sha256: 'a4f18c89b912ecf048d0e7681c2018274a108b98124976cda1098e910248a341',
    mrz: [
      'UIDAI<<849210483921<<<<<<<<<<<<<<<<<<<<<<<<<',
      'CHOUDHARY<<ROHAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
    ],
    checks: {
      checksum: {
        status: 'fail',
        score: '12%',
        title: 'Verhoeff Checksum Algorithm',
        subtitle: 'UID Digit Checksum Failure',
        details: [
          { label: 'Verhoeff Check Digit', value: 'Calculated: 7 | Actual: 1 (FAILED)', pass: false },
          { label: 'Aadhaar 12-Digit Structure', value: 'D8 Dihedral Group Mismatch', pass: false },
          { label: 'QR Payload Cryptographic Sign', value: 'UIDAI Public Key Mismatch', pass: false },
          { label: 'State Sub-code Hash', value: 'Corrupted state prefix mapping', pass: false },
        ],
        explanation: 'CRITICAL: The 12-digit Aadhaar UID fails Verhoeff check-digit permutation calculations. Modulo 10 dihedral check yields invalid remainder.'
      },
      typography: {
        status: 'fail',
        score: '24%',
        title: 'Typography & Layout Integrity',
        subtitle: 'Font Substitution & Baseline Shift',
        details: [
          { label: 'Date of Birth Font Family', value: 'Arial Regular (Expected UIDAI font)', pass: false },
          { label: 'Baseline Vertical Shift', value: '+2.1 px displacement detected', pass: false },
          { label: 'Digit Anti-Aliasing Edge', value: 'Resampled edge blur on "2002"', pass: false },
          { label: 'UIDAI Micro-Emblem', value: 'Distorted rasterization artifact', pass: false },
        ],
        explanation: 'High-magnification analysis reveals font substitution. The year "2002" was spliced over original date with misaligned baseline and mismatched anti-aliasing.'
      },
      biometric: {
        status: 'warning',
        score: '62.5%',
        title: 'Face Match & 3D Liveness',
        subtitle: 'Low Facial Match Confidence',
        details: [
          { label: 'ArcFace Cosine Similarity', value: '62.5% (Borderline / Discrepancy)', pass: false },
          { label: 'Photo Splicing Boundary', value: 'Sharp rectangular edge artifact', pass: false },
          { label: 'Presenter Eye Gaze', value: 'Consistent with camera', pass: true },
          { label: '3D Mesh Alignment', value: 'Present, but ID photo aged/spliced', pass: false },
        ],
        explanation: 'Facial vector distance shows elevated variance. Bounding perimeter around passport-style photo shows pixel-level cutting and pasting discontinuity.'
      },
      metadata: {
        status: 'fail',
        score: '08%',
        title: 'Metadata & Quantization Audit',
        subtitle: 'Photoshop Signature & ELA Spike',
        details: [
          { label: 'Software Metadata Tag', value: 'Adobe Photoshop 24.5 (Macintosh)', pass: false },
          { label: 'ELA Error Discontinuity', value: '88.4% variance in DOB zone', pass: false },
          { label: 'DCT Double Compression', value: 'Severe ghosting in high frequencies', pass: false },
          { label: 'XMP ModifyDate Trace', value: 'Manipulated 18 mins prior to scan', pass: false },
        ],
        explanation: 'Severe Error Level Analysis (ELA) spike in the Date of Birth and photo bounding perimeter. Photoshop software remnants present in EXIF header.'
      }
    },
    ocrBoxes: [
      { id: 'b1', label: 'Aadhaar UID', text: '8492 1048 3921', confidence: '94.2%', x: 28, y: 74, w: 46, h: 8, tampered: true },
      { id: 'b2', label: 'Name', text: 'ROHAN CHOUDHARY', confidence: '98.5%', x: 36, y: 26, w: 48, h: 6 },
      { id: 'b3', label: 'DOB (Spliced)', text: '12/04/2002', confidence: '82.1%', x: 36, y: 36, w: 32, h: 6, tampered: true },
      { id: 'b4', label: 'Gender', text: 'MALE / पुरुष', confidence: '99.1%', x: 36, y: 46, w: 26, h: 6 },
    ],
    tamperZones: [
      { id: 't1', label: 'Spliced Date of Birth', x: 35, y: 35, w: 34, h: 8, reason: 'Font mismatch & +2.1px baseline displacement. ELA 88.4% spike.' },
      { id: 't2', label: 'Verhoeff Checksum Failure', x: 27, y: 73, w: 48, h: 10, reason: 'Modulo 10 check digit failed. UID sequence mathematically forged.' },
      { id: 't3', label: 'Photo Border Splice', x: 8, y: 20, w: 24, h: 42, reason: 'Sharp rectangular paste boundary detected in TruFor-v2 neural attention.' },
    ],
    inspectorSummary: 'CRITICAL FRAUD ALERT: Aadhaar UID fails Verhoeff algorithm verification. Date of Birth spliced from 1982 to 2002 using Adobe Photoshop. TruFor-v2 neural attention and ELA compression discontinuity confirm intentional tampering.',
    recommendation: 'REJECT & LOG FORGERY'
  },
  {
    id: 'preset-3',
    name: 'Preset 3: Synthetic Driving License — Liveness Attack Detected (Fail)',
    shortName: 'Synthetic Driving License (Replay Attack)',
    statusTag: 'LIVENESS ATTACK',
    statusType: 'attack',
    idType: 'driving_license',
    trustScore: 31,
    trustCategory: 'PRESENTATION ATTACK',
    documentNumber: 'DL-1420110049281',
    holderName: 'KAVITA MEHTA',
    holderNameHindi: 'कविता मेहता',
    dob: '08/11/1995',
    gender: 'F',
    issueDate: '10/02/2016',
    expiryDate: '07/11/2035',
    placeOfBirth: 'MUMBAI, MAHARASHTRA',
    placeOfIssue: 'MH-02 RTO MUMBAI WEST',
    sha256: '7f9c2d1b8492041285e68b9192408a284c1092841b9487c0249814c810294821',
    mrz: [
      'DL<IND1420110049281<<<<<<<<<<<<<<<<<<<<<<<<<',
      'MEHTA<<KAVITA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
    ],
    checks: {
      checksum: {
        status: 'warning',
        score: '58%',
        title: 'Sarathi DL Registry Check',
        subtitle: 'Syntax Valid but Revoked / Unregistered',
        details: [
          { label: 'DL Format Syntax', value: 'Valid MH-02 Structure', pass: true },
          { label: 'Sarathi Central DB Hash', value: 'Unregistered Record', pass: false },
          { label: 'Scannable PDF417 Barcode', value: 'Checksum Failure in Barcode', pass: false },
          { label: 'Smart Card Chip Emulation', value: 'Missing Cryptographic Signature', pass: false },
        ],
        explanation: 'The state license syntax complies with general templates, but cryptographic hash validation against MoRTH Sarathi returns unregistered status.'
      },
      typography: {
        status: 'pass',
        score: '84%',
        title: 'Typography & Layout Integrity',
        subtitle: 'Laser Engraved Font Simulation',
        details: [
          { label: 'Micro-font Kerning', value: 'Consistent template geometry', pass: true },
          { label: 'State Emblem Vectorization', value: 'Flat color artifact (Missing embossing)', pass: false },
          { label: 'Optical Variable Hologram', value: 'Missing 3D chromatic shift', pass: false },
          { label: 'Thermal Dye Diffused Text', value: 'Standard inkjet dot pattern', pass: false },
        ],
        explanation: 'Card lacks physical laser engraving tactile depth. State Ashoka emblem lacks the required optical depth and holographic reflection.'
      },
      biometric: {
        status: 'fail',
        score: '15.2%',
        title: 'Face Match & 3D Liveness',
        subtitle: 'Screen Replay Attack Detected',
        details: [
          { label: 'Presentation Attack Detection (PAD)', value: 'REPLAY ATTACK (Screen display)', pass: false },
          { label: 'Moiré Frequency Analysis', value: '42.8 Hz peak (OLED screen grid)', pass: false },
          { label: 'Specular Reflection Analysis', value: 'Flat glass polarizer glare detected', pass: false },
          { label: 'Blink / Micro-Motion Rate', value: '0 blinks in 10s (Static presentation)', pass: false },
        ],
        explanation: 'CRITICAL SECURITY EVENT: Live presenter camera feed is pointing at an electronic tablet/smartphone screen. 42.8Hz sub-pixel grid and zero corneal reflection confirm presentation attack.'
      },
      metadata: {
        status: 'warning',
        score: '45%',
        title: 'Metadata & Quantization Audit',
        subtitle: 'AI Synthetic Portrait Artifacts',
        details: [
          { label: 'Generative GAN Artifacts', value: 'High asymmetry in earlobes & background', pass: false },
          { label: 'Camera EXIF Data', value: 'Stripped / Web capture stream', pass: false },
          { label: 'Spectral Lighting Consistency', value: 'Shadow angle mismatch on face', pass: false },
          { label: 'Resolution & DPI', value: '150 DPI re-sampled', pass: false },
        ],
        explanation: 'Portrait demonstrates typical StyleGAN frequency anomalies along the hairline. Lighting vector on portrait conflicts with background card lighting.'
      }
    },
    ocrBoxes: [
      { id: 'b1', label: 'DL Number', text: 'DL-1420110049281', confidence: '96.4%', x: 22, y: 16, w: 48, h: 6 },
      { id: 'b2', label: 'Holder Name', text: 'KAVITA MEHTA', confidence: '98.8%', x: 38, y: 28, w: 40, h: 6 },
      { id: 'b3', label: 'DOB', text: '08/11/1995', confidence: '97.2%', x: 38, y: 38, w: 28, h: 6 },
      { id: 'b4', label: 'Valid Till (NT)', text: '07/11/2035', confidence: '96.5%', x: 38, y: 48, w: 32, h: 6 },
      { id: 'b5', label: 'Issuing Authority', text: 'RTO MUMBAI WEST MH-02', confidence: '94.0%', x: 18, y: 72, w: 58, h: 6 },
    ],
    tamperZones: [
      { id: 't1', label: 'Screen Replay Moiré Pattern', x: 8, y: 18, w: 26, h: 48, reason: '42.8 Hz pixel grid artifact from OLED screen presentation.' },
      { id: 't2', label: 'Missing Holographic OVI', x: 74, y: 48, w: 18, h: 24, reason: 'Printed static yellow emblem instead of dynamic color-shifting foil.' },
    ],
    inspectorSummary: 'PRESENTATION ATTACK BLOCKED: 3D biometric liveness engine detected an active screen replay attack. The presenter is displaying a synthetic AI-generated portrait on an electronic tablet display (42.8Hz moiré peak). Immediate biometric reject.',
    recommendation: 'REJECT & LOG FORGERY'
  }
];
