import React, { useState, useEffect, useRef } from 'react';
import { PRESETS, ID_TYPES } from './types/presets';
import { TopNav } from './components/TopNav';
import { IngestionPanel } from './components/IngestionPanel/IngestionPanel';
import { ScanningViewport } from './components/Viewport/ScanningViewport';
import { DecisionPanel } from './components/Scorecard/DecisionPanel';
import { DossierModal } from './components/Modals/DossierModal';
import { ToastContainer } from './components/Modals/ToastContainer';
import { forensicAudio } from './utils/audioSynthesizer';

export function App() {
  // Theme state: default to 'dark' for sleek cyber-forensic experience
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Active document and preset
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [selectedType, setSelectedType] = useState('passport');

  // Scanner parameters
  const [activeMode, setActiveMode] = useState('flatbed');
  const [dpi, setDpi] = useState(300);
  const [contrastBalance, setContrastBalance] = useState(true);
  const [edgeDewarping, setEdgeDewarping] = useState(true);

  // Viewport & Layer state
  const [activeLayer, setActiveLayer] = useState('standard');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const scanIntervalRef = useRef(null);

  // Modals & Toasts
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [toasts, setToasts] = useState([
    {
      id: 1,
      type: 'info',
      title: 'AuthenSight Node Active',
      message: 'Forensic screening workstation initialized. High-res optical sensors online.',
    },
  ]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Multi-Phase Optical Scan Sweep Engine
  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanPhase('Acquiring optical frame from hardware sensor...');
    forensicAudio.playScanSweep(2.0);

    addToast({
      type: 'info',
      title: 'Optical Acquisition Started',
      message: `Scanning at ${dpi} DPI resolution with CIS laser sensor...`,
    });

    let currentProgress = 0;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    scanIntervalRef.current = setInterval(() => {
      currentProgress += 4;
      if (currentProgress > 100) currentProgress = 100;

      setScanProgress(currentProgress);

      if (currentProgress < 25) {
        setScanPhase('[Phase 1/4] Optical Sensor Calibration & Auto-Dewarping...');
      } else if (currentProgress < 50) {
        setScanPhase('[Phase 2/4] Neural OCR & ICAO Doc 9303 Checksum Extraction...');
      } else if (currentProgress < 75) {
        setScanPhase('[Phase 3/4] TruFor-v2 Splicing & ELA Discontinuity Analysis...');
      } else if (currentProgress < 100) {
        setScanPhase('[Phase 4/4] ArcFace 512d Biometric Matching & Liveness PAD...');
      } else {
        clearInterval(scanIntervalRef.current);
        setTimeout(() => {
          setIsScanning(false);
          setScanProgress(0);

          if (selectedPreset.statusType === 'authentic') {
            forensicAudio.playBeepSuccess();
            addToast({
              type: 'success',
              title: 'Forensic Scan Cleared',
              message: `All security layers passed. Trust Score: ${selectedPreset.trustScore}/100.`,
            });
          } else {
            forensicAudio.playAlertWarning();
            addToast({
              type: 'error',
              title: 'Forensic Alert Flagged',
              message: `${selectedPreset.statusTag} — Immediate inspection required.`,
            });
          }
        }, 300);
      }
    }, 60);
  };

  // Swapping preset
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setSelectedType(preset.idType);
    setActiveLayer('standard');

    triggerScan();

    addToast({
      type: 'info',
      title: 'Preset Swapped',
      message: `Loaded: ${preset.shortName} (${preset.documentNumber})`,
    });
  };

  // Handle Real Document Upload / Camera Capture
  const handleUploadDocument = (customDoc) => {
    setSelectedPreset(customDoc);
    setSelectedType(customDoc.idType);
    setActiveLayer('standard');

    triggerScan();

    addToast({
      type: 'success',
      title: 'Document Ingested into Viewport',
      message: `Image loaded: ${customDoc.name}. Optical inspection triggered.`,
    });
  };

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
    const match = PRESETS.find((p) => p.idType === typeId);
    if (match) {
      setSelectedPreset(match);
      triggerScan();
    }
  };

  const handleDecision = (decisionType) => {
    if (decisionType === 'APPROVED') {
      addToast({
        type: 'success',
        title: 'Subject Approved & Cleared',
        message: `Case ${selectedPreset.documentNumber} marked CLEARED by INSP-4091.`,
      });
    } else if (decisionType === 'SECONDARY_REVIEW') {
      addToast({
        type: 'warning',
        title: 'Routed to Secondary Review',
        message: `Case ${selectedPreset.documentNumber} dispatched to Officer Interview.`,
      });
    } else if (decisionType === 'REJECTED_FORGERY') {
      addToast({
        type: 'error',
        title: 'Document Rejected & Logged',
        message: `Tamper incident registered in MHA Central Fraud Database.`,
      });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-[#0B0F19] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'} flex flex-col font-sans selection:bg-cyan-500/20 transition-colors`}>
      {/* 1. Top Navigation & Telemetry Bar */}
      <TopNav
        dpi={dpi}
        isScanning={isScanning}
        onTriggerScan={triggerScan}
        onOpenDossier={() => setIsDossierOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main 3-Column Dashboard Workspace */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          
          {/* Column 1: Left Ingestion & Scanner Controls (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <IngestionPanel
              activeMode={activeMode}
              setActiveMode={setActiveMode}
              dpi={dpi}
              setDpi={setDpi}
              contrastBalance={contrastBalance}
              setContrastBalance={setContrastBalance}
              edgeDewarping={edgeDewarping}
              setEdgeDewarping={setEdgeDewarping}
              selectedType={selectedType}
              setSelectedType={handleSelectType}
              selectedPreset={selectedPreset}
              onSelectPreset={handleSelectPreset}
              onTriggerScan={triggerScan}
              onUploadDocument={handleUploadDocument}
            />
          </div>

          {/* Column 2: Center Interactive Scanning Viewport (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <ScanningViewport
              preset={selectedPreset}
              isScanning={isScanning}
              scanProgress={scanProgress}
              scanPhase={scanPhase}
              onTriggerScan={triggerScan}
              contrast={contrastBalance ? 112 : 100}
              dewarp={edgeDewarping}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
            />
          </div>

          {/* Column 3: Right AI Forensic Scorecard & Decision Panel (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <DecisionPanel
              preset={selectedPreset}
              onDecision={handleDecision}
            />
          </div>

        </div>
      </main>

      {/* Printable / Downloadable Audit Dossier Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        preset={selectedPreset}
      />

      {/* Forensic Action Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
