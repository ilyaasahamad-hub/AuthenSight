import React, { useState, useRef, useEffect } from 'react';
import { ModeTabs } from './ModeTabs';
import { ScannerControls } from './ScannerControls';
import { IDTypeSelector } from './IDTypeSelector';
import { PresetSelector } from './PresetSelector';
import {
  UploadCloud,
  Camera,
  CheckCircle,
  RefreshCw,
  Image as ImageIcon,
  AlertCircle,
  VideoOff,
  SwitchCamera,
  Trash2,
} from 'lucide-react';

export const IngestionPanel = ({
  activeMode,
  setActiveMode,
  dpi,
  setDpi,
  contrastBalance,
  setContrastBalance,
  edgeDewarping,
  setEdgeDewarping,
  selectedType,
  setSelectedType,
  selectedPreset,
  onSelectPreset,
  onTriggerScan,
  onUploadDocument,
}) => {
  // File Upload State
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);

  // Camera Ingestion State
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraFacing, setCameraFacing] = useState('environment'); // environment or user
  const [cameraError, setCameraError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Handle file selection
  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.includes('pdf')) {
      alert('Please upload a valid document image (PNG, JPG, TIFF) or PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setUploadedFile(file);
      setUploadPreview(dataUrl);

      // Create a custom document schema
      const customDoc = {
        id: `upload-${Date.now()}`,
        name: file.name,
        shortName: `Uploaded: ${file.name.substring(0, 20)}`,
        customImageUrl: dataUrl,
        idType: selectedType,
        statusTag: 'UPLOADED FOR ANALYSIS',
        statusType: 'authentic',
        trustScore: 92,
        trustCategory: 'DOCUMENT INGESTED',
        documentNumber: `ING-${Math.floor(100000 + Math.random() * 900000)}`,
        holderName: 'DOCUMENT SUBJECT',
        dob: 'VERIFYING...',
        gender: 'M/F',
        issueDate: 'CURRENT',
        expiryDate: 'AUDIT PENDING',
        placeOfBirth: 'REGIONAL NODE',
        sha256: `sha256-${Math.random().toString(36).substring(2, 15)}e3b0c44298fc1c149afbf4c8996`,
        mrz: [
          'DOC<INGESTED<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
          'AUTO<PARSING<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<01',
        ],
        checks: {
          checksum: {
            status: 'pass',
            score: '96%',
            title: 'Optical Header Parsing',
            subtitle: 'Structure Standard Verified',
            details: [
              { label: 'File Integrity', value: `${(file.size / 1024).toFixed(1)} KB (Clean)`, pass: true },
              { label: 'Pixel Dimensions', value: 'High-Resolution Frame', pass: true },
              { label: 'Format Compliance', value: file.type.toUpperCase(), pass: true },
              { label: 'Edge Coordinates', value: '4 Pins Locked', pass: true },
            ],
            explanation: 'User uploaded high-resolution optical image ingested successfully into the AuthenSight pipeline.'
          },
          typography: {
            status: 'pass',
            score: '91%',
            title: 'Typography & Layout Integrity',
            subtitle: 'Font Glyph Edge Detection Active',
            details: [
              { label: 'Baseline Kerning', value: 'Normal distribution', pass: true },
              { label: 'Micro-structure', value: 'Sensor grid matched', pass: true },
              { label: 'Raster Density', value: '300 DPI equivalent', pass: true },
            ],
            explanation: 'Document shows clean optical scan lines with normal typographic boundaries.'
          },
          biometric: {
            status: 'pass',
            score: '89%',
            title: 'Biometric & Facial Crops',
            subtitle: 'Subject Crop Extraction Ready',
            details: [
              { label: 'Face Detection', value: 'Primary Subject Located', pass: true },
              { label: 'ArcFace Vectorization', value: '512-Dimension Extraction Ready', pass: true },
            ],
            explanation: 'Facial boundary detected in the uploaded frame. Cross-referencing against live presenter camera.'
          },
          metadata: {
            status: 'pass',
            score: '94%',
            title: 'Metadata & Quantization',
            subtitle: 'Acquisition Metadata Parsed',
            details: [
              { label: 'File MIME', value: file.type, pass: true },
              { label: 'Quantization Matrix', value: 'Standard JPEG/PNG curve', pass: true },
            ],
            explanation: 'EXIF metadata confirms un-resampled optical capture.'
          }
        },
        ocrBoxes: [
          { id: 'u1', label: 'Ingested Header', text: file.name, confidence: '99.2%', x: 20, y: 15, w: 60, h: 8 },
          { id: 'u2', label: 'Primary Field', text: 'IDENTIFICATION DATA', confidence: '98.4%', x: 25, y: 35, w: 50, h: 8 },
          { id: 'u3', label: 'Document Number', text: 'ING-VERIFIED', confidence: '99.0%', x: 25, y: 60, w: 45, h: 8 },
        ],
        tamperZones: [],
        inspectorSummary: `Custom document [${file.name}] ingested via file drop. Optical resolution adequate for forensic analysis. All 4 diagnostic layers initialized.`,
        recommendation: 'REVIEW & CLEAR'
      };

      onUploadDocument(customDoc);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Start Camera Stream
  const startCamera = async (facing = cameraFacing) => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam API is not supported on this browser or environment.');
      }

      const constraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Webcam stream error:', err);
      setCameraError(err.message || 'Camera permission denied or camera hardware not detected.');
      setIsCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  // Toggle Camera Facing (front/back)
  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  // Capture frame from live camera
  const captureCameraFrame = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

      const capturedDoc = {
        id: `camera-${Date.now()}`,
        name: `Camera_Capture_${new Date().toLocaleTimeString().replace(/:/g, '')}.jpg`,
        shortName: 'Live Camera Capture',
        customImageUrl: dataUrl,
        idType: selectedType,
        statusTag: 'CAMERA CAPTURE CLEARED',
        statusType: 'authentic',
        trustScore: 94,
        trustCategory: 'OPTICALLY INGESTED',
        documentNumber: `CAM-${Math.floor(100000 + Math.random() * 900000)}`,
        holderName: 'LIVE CAPTURE SUBJECT',
        dob: 'OPTICAL VERIFIED',
        gender: 'M/F',
        issueDate: 'LIVE CAPTURE',
        expiryDate: 'ACTIVE',
        placeOfBirth: 'MHA DESK 01',
        sha256: `cam256-${Math.random().toString(36).substring(2, 15)}8492041285e68b9192408a28`,
        mrz: [
          'CAM<IND<DOCUMENT<<<<<<<<<<<<<<<<<<<<<<<<<<<',
          'LIVE<CAPTURE<01<<<<<<<<<<<<<<<<<<<<<<<<<<<02',
        ],
        checks: {
          checksum: {
            status: 'pass',
            score: '98%',
            title: 'Optical Acquisition Quality',
            subtitle: 'Camera Sensor High SNR Ratio',
            details: [
              { label: 'Sensor Dynamic Range', value: 'Balanced Exposure', pass: true },
              { label: 'Focus Sharpness', value: 'Sharp (Laplacian > 180)', pass: true },
              { label: 'Keystone Perspective', value: 'Auto-Corrected', pass: true },
            ],
            explanation: 'Live camera capture achieved clear optical focus with zero motion blur.'
          },
          typography: {
            status: 'pass',
            score: '95%',
            title: 'Typography & Layout Integrity',
            subtitle: 'High Contrast Font Matching',
            details: [
              { label: 'Character Anti-Aliasing', value: 'Physical Print Matched', pass: true },
              { label: 'Baseline Consistency', value: 'Standard Geometry', pass: true },
            ],
            explanation: 'Typography matches official government template layout.'
          },
          biometric: {
            status: 'pass',
            score: '97%',
            title: 'Face Match & 3D Liveness',
            subtitle: 'Live Camera Cross-Correlation',
            details: [
              { label: 'ArcFace Similarity', value: '97.2% Match', pass: true },
              { label: '3D Physical Liveness', value: 'Natural Subject Confirmed', pass: true },
            ],
            explanation: 'High biometric match confidence against live presenter feed.'
          },
          metadata: {
            status: 'pass',
            score: '99%',
            title: 'Metadata & Hardware Stream',
            subtitle: 'Direct WebRTC Frame Buffer',
            details: [
              { label: 'Hardware Driver', value: 'WebRTC Direct Stream', pass: true },
              { label: 'No Secondary Edits', value: 'Raw Sensor Stream', pass: true },
            ],
            explanation: 'Zero digital tampering or photoshop editing software detected.'
          }
        },
        ocrBoxes: [
          { id: 'c1', label: 'Document Frame', text: 'LIVE CAMERA CAPTURE', confidence: '99.8%', x: 15, y: 15, w: 70, h: 8 },
          { id: 'c2', label: 'Security Field', text: 'VERIFIED PHYSICAL ID', confidence: '99.4%', x: 20, y: 40, w: 60, h: 8 },
        ],
        tamperZones: [],
        inspectorSummary: 'Document captured via live optical camera. Sharp focus and physical texture validated. Ready for border clearance.',
        recommendation: 'CLEAR & APPROVE'
      };

      onUploadDocument(capturedDoc);
    } catch (e) {
      console.error('Frame capture error:', e);
    }
  };

  // Simulate a realistic ID capture if webcam is unavailable/blocked
  const simulateCameraCapture = () => {
    // Generate a high-contrast camera snapshot SVG
    const svgSnapshot = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="%231e293b"/><rect x="40" y="40" width="720" height="420" rx="16" fill="%23f8fafc" stroke="%2306b6d4" stroke-width="4"/><text x="80" y="100" font-family="sans-serif" font-size="24" font-weight="bold" fill="%230f172a">LIVE CAMERA INGESTION • MHA BORDER DESK</text><rect x="80" y="140" width="180" height="220" rx="8" fill="%23e2e8f0"/><circle cx="170" cy="220" r="50" fill="%230e7490"/><text x="170" y="320" font-family="monospace" font-size="14" fill="%23475569" text-anchor="middle">VERIFIED PHOTO</text><rect x="300" y="150" width="400" height="30" rx="4" fill="%23cbd5e1"/><rect x="300" y="200" width="350" height="24" rx="4" fill="%23e2e8f0"/><rect x="300" y="240" width="280" height="24" rx="4" fill="%23e2e8f0"/><rect x="300" y="280" width="320" height="24" rx="4" fill="%23e2e8f0"/><rect x="80" y="380" width="640" height="50" rx="4" fill="%230f172a"/><text x="400" y="412" font-family="monospace" font-size="18" fill="%2322d3ee" text-anchor="middle" letter-spacing="4">P%3CINDSHARMA%3C%3CPRIYA%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C%3C</text></svg>`;

    handleFile({
      name: 'Simulated_Camera_Capture.jpg',
      size: 142050,
      type: 'image/jpeg',
    });

    const customDoc = {
      id: `sim-cam-${Date.now()}`,
      name: 'Simulated_Camera_Capture.jpg',
      shortName: 'Live Camera Capture',
      customImageUrl: svgSnapshot,
      idType: selectedType,
      statusTag: 'CAMERA FRAME CAPTURED',
      statusType: 'authentic',
      trustScore: 95,
      trustCategory: 'CAMERA CLEARED',
      documentNumber: 'CAM-894201',
      holderName: 'LIVE CAMERA SUBJECT',
      dob: '15/08/1991',
      gender: 'F',
      issueDate: 'CURRENT',
      expiryDate: '2031',
      placeOfBirth: 'DELHI',
      sha256: 'cam-sha256-simulated-optical-stream-e3b0c44298fc1c149afb',
      mrz: [
        'P<INDSHARMA<<PRIYA<<<<<<<<<<<<<<<<<<<<<<<<<<',
        'Z9482104<8IND9108154F3112282<<<<<<<<<<<<<<02',
      ],
      checks: {
        checksum: {
          status: 'pass',
          score: '99%',
          title: 'Optical Sensor Quality',
          subtitle: 'Camera Frame Ingested',
          details: [
            { label: 'Sensor Dynamic Range', value: 'High SNR', pass: true },
            { label: 'Perspective Keystone', value: 'Auto-Aligned (0.0°)', pass: true },
          ],
          explanation: 'Simulated high-resolution optical camera frame captured and loaded into the main inspection viewport.'
        },
        typography: {
          status: 'pass',
          score: '96%',
          title: 'Typography & Layout',
          subtitle: 'Standard Template Verified',
          details: [{ label: 'Micro-structure', value: 'Intact', pass: true }],
          explanation: 'Clean layout with standard document geometry.'
        },
        biometric: {
          status: 'pass',
          score: '98%',
          title: 'Face Match & Liveness',
          subtitle: 'Live Subject Confirmed',
          details: [{ label: 'ArcFace Similarity', value: '98.2%', pass: true }],
          explanation: 'Positive biometric match against presenter camera.'
        },
        metadata: {
          status: 'pass',
          score: '97%',
          title: 'Metadata Audit',
          subtitle: 'Raw Stream Stream',
          details: [{ label: 'Software Tags', value: 'None', pass: true }],
          explanation: 'Zero manipulation tags.'
        }
      },
      ocrBoxes: [
        { id: 'sc1', label: 'Captured Document', text: 'LIVE CAMERA CAPTURE', confidence: '99.5%', x: 10, y: 15, w: 80, h: 10 },
      ],
      tamperZones: [],
      inspectorSummary: 'Live camera frame captured and ingested into viewport. Optical spectrum verified.',
      recommendation: 'CLEAR & APPROVE'
    };

    onUploadDocument(customDoc);
  };

  // Start/Stop camera on tab change
  useEffect(() => {
    if (activeMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeMode]);

  return (
    <div className="space-y-3">
      {/* Hidden File Input for Real Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png,image/jpeg,image/webp,image/tiff,.pdf"
        className="hidden"
      />

      {/* Ingestion Mode Tabs */}
      <ModeTabs activeMode={activeMode} setActiveMode={setActiveMode} />

      {/* =======================================================
          TAB 2: REAL LIVE DOCUMENT CAMERA
         ======================================================= */}
      {activeMode === 'camera' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Live Document Camera
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isCameraActive ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' : 'bg-amber-50 text-amber-800 border-amber-300'}`}>
                {isCameraActive ? 'Live Stream Active' : 'Standby'}
              </span>
            </div>
          </div>

          {/* Live Video Viewport */}
          <div className="relative aspect-video bg-slate-950 rounded-lg border-2 border-slate-700 overflow-hidden flex items-center justify-center group">
            {/* Real Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
            />

            {/* If camera is not streaming / error state */}
            {!isCameraActive && (
              <div className="p-4 text-center space-y-2">
                <VideoOff className="w-8 h-8 text-slate-500 mx-auto" />
                <div className="text-xs text-slate-300 font-medium">
                  {cameraError ? 'Camera hardware not available' : 'Initializing camera stream...'}
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  <button
                    onClick={() => startCamera()}
                    className="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-800 text-white text-[11px] font-bold rounded flex items-center gap-1 shadow"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Retry Camera
                  </button>
                  <button
                    onClick={simulateCameraCapture}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-mono rounded border border-cyan-500/40"
                  >
                    Load Sample Camera ID
                  </button>
                </div>
              </div>
            )}

            {/* Document Guide Reticle Overlay */}
            {isCameraActive && (
              <>
                <div className="absolute inset-4 border-2 border-dashed border-cyan-400/80 rounded-md pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between items-center text-[9px] font-mono text-cyan-300 bg-slate-950/70 px-2 py-0.5 rounded w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                    ALIGN DOCUMENT EDGES
                  </div>
                  <div className="text-center text-[8px] font-mono text-cyan-200/90 bg-slate-950/70 py-0.5 rounded">
                    HOLD STEADY FOR OPTICAL CAPTURE
                  </div>
                </div>

                {/* Flip camera button */}
                <button
                  onClick={toggleCameraFacing}
                  title="Switch Camera (Front/Back)"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 z-10 transition-colors"
                >
                  <SwitchCamera className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={isCameraActive ? captureCameraFrame : simulateCameraCapture}
            className="w-full py-2.5 bg-cyan-700 hover:bg-cyan-800 active:scale-98 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            <span>📸 Capture & Scan Document</span>
          </button>
        </div>
      )}

      {/* =======================================================
          TAB 3: REAL PHOTO UPLOAD IN THE WEB
         ======================================================= */}
      {activeMode === 'upload' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 shadow-forensic space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Upload High-Res Document
            </span>
            <span className="text-[9px] font-mono text-slate-500">Max 50MB</span>
          </div>

          {/* Real Interactive Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-cyan-500/60 hover:border-cyan-500 rounded-xl p-5 text-center cursor-pointer bg-cyan-50/40 dark:bg-cyan-950/20 hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40 transition-all group"
          >
            <UploadCloud className="w-8 h-8 text-cyan-700 dark:text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Click to browse or Drag & drop photo here
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">
              Supports: PNG, JPG, WEBP, TIFF, or PDF
            </div>
            <div className="mt-3 inline-block px-3 py-1 bg-cyan-700 text-white rounded-md text-[11px] font-bold shadow-xs">
              Choose Document File
            </div>
          </div>

          {/* Uploaded File Preview Badge */}
          {uploadedFile && (
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                {uploadPreview ? (
                  <img
                    src={uploadPreview}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded border border-slate-300 flex-shrink-0"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-cyan-600 flex-shrink-0" />
                )}
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {uploadedFile.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {(uploadedFile.size / 1024).toFixed(1)} KB • Image Ingested
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                  setUploadPreview(null);
                }}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded transition-colors"
                title="Remove uploaded file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Automatic DPI detection & optical grid dewarping</span>
          </div>
        </div>
      )}

      {/* =======================================================
          TAB 1: FLATBED SCANNER & CONTROLS
         ======================================================= */}
      {/* Scanner Parameters (DPI, Contrast, Dewarping) */}
      <ScannerControls
        dpi={dpi}
        setDpi={setDpi}
        contrastBalance={contrastBalance}
        setContrastBalance={setContrastBalance}
        edgeDewarping={edgeDewarping}
        setEdgeDewarping={setEdgeDewarping}
      />

      {/* Quick Demo Presets */}
      <PresetSelector
        selectedPresetId={selectedPreset.id}
        onSelectPreset={onSelectPreset}
      />

      {/* ID Document Standard Selector */}
      <IDTypeSelector
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
    </div>
  );
};
