import React, { useState, useRef } from 'react';
import { DocumentCanvas } from './DocumentCanvas';
import { ScanlineLaser } from './ScanlineLaser';
import { EdgeDetectionOverlay } from './EdgeDetectionOverlay';
import { LiveOCROverlay } from './LiveOCROverlay';
import { LoupeMagnifier } from './LoupeMagnifier';
import { ZoomControls } from './ZoomControls';
import { LayerToggles } from './LayerToggles';
import { BiometricSplitView } from './BiometricSplitView';
import { Play, RefreshCw, ZoomIn } from 'lucide-react';

export const ScanningViewport = ({
  preset,
  isScanning,
  scanProgress = 0,
  scanPhase = '',
  onTriggerScan,
  contrast,
  dewarp,
  activeLayer,
  setActiveLayer,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [loupeEnabled, setLoupeEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [containerRect, setContainerRect] = useState(null);

  const [splitView, setSplitView] = useState(false);
  const [showOCR, setShowOCR] = useState(true);
  const [showEdgeDetection, setShowEdgeDetection] = useState(true);

  const viewportRef = useRef(null);

  // Mouse move for loupe and pan
  const handleMouseMove = (e) => {
    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      setContainerRect(rect);
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      if (isDragging && zoom > 1) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    }
  };

  const handleMouseDown = (e) => {
    if (zoom > 1 && !loupeEnabled) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMousePos({ x: -100, y: -100 });
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col h-full space-y-2.5">
      {/* Layer Toggles Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <LayerToggles activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
      </div>

      {/* Main Viewport Window */}
      <div
        ref={viewportRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`relative flex-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner forensic-grid flex items-center justify-center p-2 sm:p-3 select-none transition-colors ${
          zoom > 1 && !loupeEnabled ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
        style={{ minHeight: '480px' }}
      >
        {/* Split View or Single View */}
        {splitView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-full">
            {/* Left Pane: Document */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/80 dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-700 p-2">
              <div
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <DocumentCanvas
                  preset={preset}
                  activeLayer={activeLayer}
                  contrast={contrast}
                  dewarp={dewarp}
                  isScanning={isScanning}
                />
                <ScanlineLaser
                  isScanning={isScanning}
                  scanProgress={scanProgress}
                  scanPhase={scanPhase}
                />
                <EdgeDetectionOverlay enabled={showEdgeDetection} isScanning={isScanning} />
                <LiveOCROverlay boxes={preset.ocrBoxes} isScanning={isScanning} showOCR={showOCR} />
              </div>
            </div>

            {/* Right Pane: Live Presenter Biometric View */}
            <div className="relative w-full h-full">
              <BiometricSplitView preset={preset} />
            </div>
          </div>
        ) : (
          /* Single Document View */
          <div
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <DocumentCanvas
              preset={preset}
              activeLayer={activeLayer}
              contrast={contrast}
              dewarp={dewarp}
              isScanning={isScanning}
            />

            {/* Optical Laser Scanline Sweep with multi-phase HUD */}
            <ScanlineLaser
              isScanning={isScanning}
              scanProgress={scanProgress}
              scanPhase={scanPhase}
            />

            {/* Lime Auto-crop & perspective boundary pins */}
            <EdgeDetectionOverlay enabled={showEdgeDetection} isScanning={isScanning} />

            {/* Live OCR parsing bounding boxes */}
            <LiveOCROverlay boxes={preset.ocrBoxes} isScanning={isScanning} showOCR={showOCR} />
          </div>
        )}

        {/* 4x Loupe Magnifier */}
        {!splitView && loupeEnabled && (
          <LoupeMagnifier
            enabled={loupeEnabled}
            mousePos={mousePos}
            containerRect={containerRect}
            preset={preset}
          />
        )}

        {/* Viewport Info Watermark */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1 flex items-center gap-2 text-[10px] font-mono text-slate-600 dark:text-slate-300 shadow-sm pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="font-bold">FRAME: {preset.idType?.toUpperCase()}</span>
          <span>•</span>
          <span className="text-cyan-700 dark:text-cyan-400 font-bold">{preset.documentNumber}</span>
          {zoom > 1 && (
            <>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{zoom.toFixed(1)}x Zoom</span>
            </>
          )}
        </div>

        {/* Quick Trigger Scan Floating Button inside Viewport */}
        <div className="absolute top-3 right-3 pointer-events-auto">
          <button
            onClick={onTriggerScan}
            disabled={isScanning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-md transition-all ${
              isScanning
                ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-500 cursor-not-allowed'
                : 'bg-cyan-700 hover:bg-cyan-800 text-white border border-cyan-500/50 hover:shadow-laser'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'SCANNING...' : 'SCAN VIEWPORT'}</span>
          </button>
        </div>
      </div>

      {/* Multi-Level Zoom & Navigation Controls */}
      <ZoomControls
        zoom={zoom}
        setZoom={setZoom}
        loupeEnabled={loupeEnabled}
        setLoupeEnabled={setLoupeEnabled}
        onResetView={handleResetView}
        splitView={splitView}
        setSplitView={setSplitView}
        showOCR={showOCR}
        setShowOCR={setShowOCR}
        showEdgeDetection={showEdgeDetection}
        setShowEdgeDetection={setShowEdgeDetection}
      />
    </div>
  );
};
