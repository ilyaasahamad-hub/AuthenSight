import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search, Split, Eye, Grid } from 'lucide-react';

export const ZoomControls = ({
  zoom = 1,
  setZoom,
  loupeEnabled,
  setLoupeEnabled,
  onResetView,
  splitView,
  setSplitView,
  showOCR,
  setShowOCR,
  showEdgeDetection,
  setShowEdgeDetection,
}) => {
  const stepZooms = [1, 2, 4, 8, 16];

  const handleSliderChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-forensic text-xs font-sans transition-colors">
      {/* Zoom Level Indicators & Step Buttons */}
      <div className="flex items-center gap-1">
        <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] font-semibold mr-1">Scale:</span>
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md border border-slate-200 dark:border-slate-700">
          {stepZooms.map((step) => (
            <button
              key={step}
              onClick={() => setZoom(step)}
              className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors ${
                Math.round(zoom) === step
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700'
              }`}
            >
              {step}x
            </button>
          ))}
        </div>
      </div>

      {/* Continuous Zoom Slider */}
      <div className="flex items-center gap-2 flex-1 max-w-[200px] min-w-[120px] px-2">
        <ZoomOut className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="range"
          min="1"
          max="16"
          step="0.5"
          value={zoom}
          onChange={handleSliderChange}
          className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
        />
        <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 w-10 text-right font-bold">
          {zoom.toFixed(1)}x
        </span>
      </div>

      {/* Viewport Action Toggles */}
      <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2">
        {/* Reset View */}
        <button
          onClick={onResetView}
          title="Reset Zoom and Pan (1x)"
          className="p-1.5 rounded text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1 text-[11px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* 4x Loupe Toggle */}
        <button
          onClick={() => setLoupeEnabled(!loupeEnabled)}
          title="Toggle 4x Loupe Magnifier"
          className={`p-1.5 rounded border transition-colors flex items-center gap-1 text-[11px] font-medium ${
            loupeEnabled
              ? 'bg-cyan-50 dark:bg-cyan-950/80 border-cyan-400 dark:border-cyan-600 text-cyan-800 dark:text-cyan-200 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Loupe</span>
        </button>

        {/* OCR Overlay Toggle */}
        <button
          onClick={() => setShowOCR(!showOCR)}
          title="Toggle OCR Bounding Boxes"
          className={`p-1.5 rounded border transition-colors flex items-center gap-1 text-[11px] font-medium ${
            showOCR
              ? 'bg-cyan-50 dark:bg-cyan-950/80 border-cyan-400 dark:border-cyan-600 text-cyan-800 dark:text-cyan-200 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>OCR</span>
        </button>

        {/* Edge / Auto-Crop Pins Toggle */}
        <button
          onClick={() => setShowEdgeDetection(!showEdgeDetection)}
          title="Toggle Auto-Crop Pins"
          className={`p-1.5 rounded border transition-colors flex items-center gap-1 text-[11px] font-medium ${
            showEdgeDetection
              ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Crop</span>
        </button>

        {/* Biometric Split View Toggle */}
        <button
          onClick={() => setSplitView(!splitView)}
          title="Toggle Side-by-Side Biometric Split View"
          className={`p-1.5 rounded border transition-colors flex items-center gap-1 text-[11px] font-medium ${
            splitView
              ? 'bg-cyan-700 border-cyan-600 text-white font-bold shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Split className="w-3.5 h-3.5" />
          <span className="font-semibold">Split View</span>
        </button>
      </div>
    </div>
  );
};
