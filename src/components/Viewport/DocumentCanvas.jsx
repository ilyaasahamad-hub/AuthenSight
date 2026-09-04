import React from 'react';

export const DocumentCanvas = ({
  preset,
  activeLayer = 'standard',
  contrast = 100,
  dewarp = true,
  isScanning = false,
  showLoupeDetail = false,
}) => {
  const isCustomUpload = Boolean(preset.customImageUrl);
  const isPassport = preset.idType === 'passport' && !isCustomUpload;
  const isAadhaar = preset.idType === 'aadhaar' && !isCustomUpload;
  const isDL = preset.idType === 'driving_license' && !isCustomUpload;

  // Contrast filter style
  const filterStyle = {
    filter: `contrast(${contrast}%) brightness(${contrast > 100 ? 102 : 100}%)`,
    transform: dewarp ? 'none' : 'perspective(600px) rotateX(2.5deg) rotateY(-1.8deg) scale(0.97)',
    transition: 'transform 0.4s ease, filter 0.2s ease',
  };

  return (
    <div
      className="relative w-full h-full select-none flex items-center justify-center p-2 sm:p-3"
      style={filterStyle}
    >
      {/* BASE DOCUMENT CONTAINER */}
      <div className="relative w-full max-w-[640px] aspect-[1.42/1] rounded-lg shadow-forensic-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
        
        {/* =========================================================
            CUSTOM UPLOADED OR CAMERA CAPTURED DOCUMENT IMAGE
           ========================================================= */}
        {isCustomUpload && (
          <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
            <img
              src={preset.customImageUrl}
              alt="Ingested Document"
              className="w-full h-full object-contain"
            />

            {/* Hardware Telemetry Badge */}
            <div className="absolute top-2 left-2 bg-slate-900/90 text-cyan-400 font-mono text-[9px] px-2 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>INGESTED FRAME: {preset.name || 'ACTIVE CAPTURE'}</span>
            </div>

            <div className="absolute bottom-2 right-2 bg-slate-900/90 text-slate-300 font-mono text-[8px] px-2 py-0.5 rounded border border-slate-700">
              CIS 300 DPI • RAW SENSOR STREAM
            </div>
          </div>
        )}

        {/* =========================================================
            DOCUMENT 1: INDIAN PASSPORT BIODATA PAGE
           ========================================================= */}
        {isPassport && (
          <div className="relative w-full h-full bg-[#FAF9F5] text-slate-900 font-mono text-[11px] p-4 flex flex-col justify-between overflow-hidden">
            {/* Guilloché security pattern background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="guilloche-p" width="80" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0,20 C20,0 20,40 40,20 C60,0 60,40 80,20" fill="none" stroke="#0E7490" strokeWidth="0.5" />
                  <path d="M0,20 C20,40 20,0 40,20 C60,40 60,0 80,20" fill="none" stroke="#D97706" strokeWidth="0.5" />
                  <path d="M0,10 Q40,30 80,10" fill="none" stroke="#059669" strokeWidth="0.3" strokeDasharray="1,1" />
                  <path d="M0,30 Q40,10 80,30" fill="none" stroke="#0E7490" strokeWidth="0.3" strokeDasharray="1,1" />
                </pattern>
                <pattern id="microtext-p" width="120" height="8" patternUnits="userSpaceOnUse">
                  <text x="0" y="6" fontSize="4.5" fill="#0E7490" opacity="0.6" fontFamily="sans-serif" letterSpacing="1">
                    REPUBLIC OF INDIA • भारत गणराज्य • PASSPORT
                  </text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#guilloche-p)" />
              <rect x="0" y="78" width="100%" height="8" fill="url(#microtext-p)" />
              <rect x="0" y="220" width="100%" height="8" fill="url(#microtext-p)" />
            </svg>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-slate-300 pb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-11 flex-shrink-0">
                  <svg viewBox="0 0 100 120" className="w-full h-full fill-amber-700">
                    <circle cx="50" cy="24" r="14" fill="#0E7490" />
                    <rect x="36" y="42" width="28" height="34" rx="4" fill="#0E7490" />
                    <path d="M30 80 L70 80 L62 100 L38 100 Z" fill="#D97706" />
                    <circle cx="50" cy="90" r="6" fill="#FFFFFF" stroke="#0E7490" strokeWidth="2" />
                    <text x="50" y="112" fontSize="9" textAnchor="middle" fill="#0F172A" fontFamily="sans-serif" fontWeight="bold">सत्यमेव जयते</text>
                  </svg>
                </div>
                <div>
                  <div className="text-[12px] font-bold tracking-wider text-slate-900 font-sans">
                    भारत गणराज्य / REPUBLIC OF INDIA
                  </div>
                  <div className="text-[9px] text-slate-600 font-sans tracking-tight">
                    PASSPORT / पारपत्र • TYPE: P • COUNTRY CODE: IND
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-slate-500 font-sans">PASSPORT NO. / पारपत्र संख्या</div>
                <div className="text-sm font-extrabold text-slate-900 tracking-widest font-mono bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  {preset.documentNumber}
                </div>
              </div>
            </div>

            {/* Body Info & Photos */}
            <div className="relative z-10 grid grid-cols-12 gap-3 my-auto pt-2">
              {/* Primary Holder Photo */}
              <div className="col-span-3 flex flex-col items-center">
                <div className="relative w-28 h-36 rounded border-2 border-slate-300 overflow-hidden bg-slate-200 shadow-sm">
                  <svg viewBox="0 0 120 150" className="w-full h-full bg-gradient-to-b from-sky-100 to-sky-200">
                    <circle cx="60" cy="52" r="26" fill="#FBD5B5" />
                    <path d="M34 44 C34 26 86 26 86 44 C86 52 82 58 76 60 C68 46 52 46 44 60 C38 58 34 52 34 44 Z" fill="#261C14" />
                    <circle cx="51" cy="52" r="3" fill="#1E293B" />
                    <circle cx="69" cy="52" r="3" fill="#1E293B" />
                    <path d="M56 65 Q60 69 64 65" stroke="#BE123C" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M22 135 C24 96 96 96 98 135 Z" fill="#0E7490" />
                    <path d="M45 102 L60 124 L75 102 Z" fill="#FFFFFF" />
                  </svg>
                  <div className="absolute inset-0 hologram-shimmer opacity-40 pointer-events-none" />
                </div>
                <div className="text-[8px] text-slate-500 mt-1 font-sans">SIGNATURE / हस्ताक्षर</div>
                <div className="font-serif italic font-bold text-slate-700 text-xs tracking-wider -mt-0.5">
                  Priya Sharma
                </div>
              </div>

              {/* Data fields */}
              <div className="col-span-6 grid grid-cols-2 gap-y-1.5 gap-x-2 text-[10px] font-sans">
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Surname / उपनाम</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{preset.holderName?.split(' ')[1] || 'SHARMA'}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Given Name(s) / दिया गया नाम</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{preset.holderName?.split(' ')[0] || 'PRIYA'}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Nationality / राष्ट्रीयता</span>
                  <span className="font-semibold text-slate-800 font-mono">INDIAN</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Sex / लिंग</span>
                  <span className="font-semibold text-slate-800 font-mono">{preset.gender || 'F'}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Date of Birth / जन्म तिथि</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{preset.dob}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Place of Birth / जन्म स्थान</span>
                  <span className="font-semibold text-slate-800 font-mono text-[9.5px]">{preset.placeOfBirth}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Date of Issue / जारी करने की तिथि</span>
                  <span className="font-semibold text-slate-800 font-mono">{preset.issueDate}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block uppercase">Date of Expiry / समाप्ति की तिथि</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{preset.expiryDate}</span>
                </div>
              </div>

              {/* Ghost Portrait & Hologram Patch */}
              <div className="col-span-3 flex flex-col items-center justify-between border-l border-slate-200 pl-2">
                <div className="relative w-16 h-20 rounded border border-slate-200 overflow-hidden bg-slate-100 opacity-60">
                  <svg viewBox="0 0 120 150" className="w-full h-full filter grayscale contrast-125">
                    <circle cx="60" cy="52" r="26" fill="#D1D5DB" />
                    <path d="M34 44 C34 26 86 26 86 44 C86 52 82 58 76 60 C68 46 52 46 44 60 C38 58 34 52 34 44 Z" fill="#6B7280" />
                    <path d="M22 135 C24 96 96 96 98 135 Z" fill="#9CA3AF" />
                  </svg>
                  <div className="absolute inset-0 bg-amber-200/20 mix-blend-multiply" />
                </div>
                <div className="w-14 h-14 rounded-full border border-cyan-400 hologram-shimmer flex items-center justify-center p-1 shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-cyan-800 fill-none" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="text-[7.5px] font-bold text-emerald-800 uppercase tracking-tight">
                  ICAO 9303 COMPLIANT
                </div>
              </div>
            </div>

            {/* MRZ Zone */}
            <div className="relative z-10 bg-white/90 rounded border border-slate-300 p-2 font-mono text-[11px] font-bold tracking-[0.22em] leading-relaxed text-slate-900 select-all">
              <div>{preset.mrz?.[0] || 'P<INDSHARMA<<PRIYA<<<<<<<<<<<<<<<<<<<<<<<<<<'}</div>
              <div>{preset.mrz?.[1] || 'Z9482104<8IND9108154F3112282<<<<<<<<<<<<<<02'}</div>
            </div>
          </div>
        )}

        {/* =========================================================
            DOCUMENT 2: AADHAAR CARD (SPLICED DATE IN PRESET-2)
           ========================================================= */}
        {isAadhaar && (
          <div className="relative w-full h-full bg-[#FAF9F6] text-slate-900 font-sans p-3 flex flex-col justify-between overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50%" cy="50%" r="90" fill="none" stroke="#0E7490" strokeWidth="1" strokeDasharray="3,3" />
              <circle cx="50%" cy="50%" r="70" fill="none" stroke="#D97706" strokeWidth="0.8" />
            </svg>

            {/* Aadhaar Tricolor Header */}
            <div className="relative z-10 border-b border-slate-200 pb-1">
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600 rounded mb-1" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs">
                    🇮🇳
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-900">
                      भारत का विशिष्ट पहचान प्राधिकरण
                    </div>
                    <div className="text-[8px] text-slate-600 tracking-tight font-medium">
                      Unique Identification Authority of India
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-semibold">
                    GOVT OF INDIA
                  </span>
                </div>
              </div>
            </div>

            {/* Aadhaar Body */}
            <div className="relative z-10 grid grid-cols-12 gap-3 my-auto py-1">
              <div className="col-span-3 flex flex-col items-center">
                <div className={`relative w-24 h-32 rounded border-2 overflow-hidden bg-slate-100 shadow-sm ${preset.checks?.biometric?.status === 'fail' ? 'border-rose-400 ring-2 ring-rose-300' : 'border-slate-300'}`}>
                  <svg viewBox="0 0 120 150" className="w-full h-full bg-gradient-to-b from-amber-50 to-amber-100">
                    <circle cx="60" cy="50" r="26" fill="#E2A77E" />
                    <path d="M34 46 C34 26 86 26 86 46 C86 52 82 58 76 60 C68 46 52 46 44 60 C38 58 34 52 34 46 Z" fill="#1C1917" />
                    <circle cx="50" cy="50" r="3" fill="#0F172A" />
                    <circle cx="70" cy="50" r="3" fill="#0F172A" />
                    <rect x="42" y="58" width="36" height="6" rx="2" fill="#292524" />
                    <path d="M22 135 C24 94 96 94 98 135 Z" fill="#1E3A8A" />
                  </svg>
                  {preset.statusType === 'forged' && (
                    <div className="absolute inset-0 border-2 border-dashed border-rose-500/60 pointer-events-none" />
                  )}
                </div>
                <span className="text-[8px] font-mono text-slate-500 mt-1">UIDAI SECURE</span>
              </div>

              {/* Personal Details */}
              <div className="col-span-6 flex flex-col justify-center space-y-2 text-xs">
                <div>
                  <div className="text-[11px] font-bold text-slate-900">{preset.holderNameHindi}</div>
                  <div className="text-sm font-extrabold text-slate-900 tracking-wide">{preset.holderName}</div>
                </div>

                {/* SPLICED DOB BLOCK IN PRESET 2 */}
                <div className={`p-1 rounded transition-all ${preset.statusType === 'forged' ? 'bg-rose-50 border border-rose-300' : 'bg-transparent'}`}>
                  <div className="text-[9px] text-slate-600 font-medium">
                    जन्म तिथि / DOB:
                    {preset.statusType === 'forged' ? (
                      <span className="ml-1 font-sans font-black text-rose-700 underline decoration-wavy decoration-rose-500 text-[13px] tracking-tight bg-white px-1 py-0.5 rounded shadow-xs">
                        {preset.dob}
                      </span>
                    ) : (
                      <span className="ml-1 font-mono font-bold text-slate-900 text-xs">{preset.dob}</span>
                    )}
                  </div>
                  {preset.statusType === 'forged' && (
                    <div className="text-[7.5px] text-rose-600 font-semibold font-mono mt-0.5">
                      ⚠️ Spliced font: Arial substituted (+2.1px baseline offset)
                    </div>
                  )}
                </div>

                <div className="text-[11px] font-semibold text-slate-800">
                  लिंग / Gender: {preset.gender === 'M' ? 'MALE / पुरुष' : 'FEMALE / महिला'}
                </div>
              </div>

              <div className="col-span-3 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-white p-1 border border-slate-300 rounded shadow-xs flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="40" y="10" width="10" height="20" />
                    <rect x="40" y="40" width="20" height="20" />
                    <rect x="70" y="40" width="20" height="10" />
                    <rect x="70" y="60" width="10" height="30" />
                    <rect x="40" y="70" width="20" height="20" />
                  </svg>
                </div>
                <span className="text-[7.5px] text-slate-500 font-mono mt-1">SECURE QR CODE</span>
              </div>
            </div>

            <div className={`relative z-10 text-center py-1.5 px-3 rounded-md border ${preset.statusType === 'forged' ? 'bg-rose-50 border-rose-300' : 'bg-slate-100 border-slate-200'}`}>
              <div className="text-[17px] font-mono font-extrabold tracking-[0.25em] text-slate-900">
                {preset.documentNumber}
              </div>
              <div className="text-[9px] text-slate-600 font-medium">
                मेरा आधार, मेरी पहचान (आधार आम आदमी का अधिकार)
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            DOCUMENT 3: DRIVING LICENSE (SYNTHETIC / REPLAY IN PRESET-3)
           ========================================================= */}
        {isDL && (
          <div className="relative w-full h-full bg-[#F4F6F9] text-slate-900 font-sans p-3 flex flex-col justify-between overflow-hidden">
            <div className="relative z-10 border-b border-slate-300 pb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-cyan-700 flex items-center justify-center text-white text-xs font-bold">
                  MH
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-slate-900 tracking-wide">
                    UNION OF INDIA • DRIVING LICENCE
                  </div>
                  <div className="text-[8px] text-slate-600 font-semibold uppercase">
                    MAHARASHTRA STATE MOTOR VEHICLES DEPT
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-mono text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                  SARATHI 4.0
                </span>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-12 gap-2 my-auto py-1">
              <div className="col-span-3 flex flex-col items-center">
                <div className="relative w-24 h-32 rounded border-2 border-slate-300 overflow-hidden bg-slate-200 shadow-sm">
                  <svg viewBox="0 0 120 150" className="w-full h-full bg-slate-100">
                    <circle cx="60" cy="50" r="26" fill="#F3C6A5" />
                    <path d="M36 44 C36 28 84 28 84 44 C84 56 80 62 74 64 C66 48 54 48 46 64 C40 62 36 56 36 44 Z" fill="#4B2C20" />
                    <circle cx="50" cy="50" r="3" fill="#1E293B" />
                    <circle cx="70" cy="50" r="3" fill="#1E293B" />
                    <path d="M54 64 Q60 68 66 64" stroke="#DC2626" strokeWidth="2" fill="none" />
                    <path d="M22 135 C24 96 96 96 98 135 Z" fill="#047857" />
                  </svg>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:3px_3px] pointer-events-none opacity-40" />
                </div>
                <div className="text-[8px] font-mono text-rose-600 font-bold mt-1">
                  SCREEN MOIRÉ (42.8Hz)
                </div>
              </div>

              <div className="col-span-6 grid grid-cols-2 gap-y-1.5 text-[10px] font-sans">
                <div className="col-span-2">
                  <span className="text-[7.5px] text-slate-500 block uppercase">DL Number</span>
                  <span className="font-mono font-bold text-slate-900 text-xs">{preset.documentNumber}</span>
                </div>
                <div>
                  <span className="text-[7.5px] text-slate-500 block uppercase">Holder Name</span>
                  <span className="font-bold text-slate-900">{preset.holderName}</span>
                </div>
                <div>
                  <span className="text-[7.5px] text-slate-500 block uppercase">Date of Birth</span>
                  <span className="font-mono font-bold text-slate-900">{preset.dob}</span>
                </div>
                <div>
                  <span className="text-[7.5px] text-slate-500 block uppercase">Issue Date</span>
                  <span className="font-mono font-semibold text-slate-800">{preset.issueDate}</span>
                </div>
                <div>
                  <span className="text-[7.5px] text-slate-500 block uppercase">Validity (NT)</span>
                  <span className="font-mono font-bold text-slate-900">{preset.expiryDate}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[7.5px] text-slate-500 block uppercase">Authorisation To Drive</span>
                  <span className="font-mono font-bold text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded border border-cyan-200">
                    MCWG, LMV-NT
                  </span>
                </div>
              </div>

              <div className="col-span-3 flex flex-col items-center justify-between">
                <div className="w-12 h-10 rounded bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-600 p-1 flex flex-col justify-between shadow-xs">
                  <div className="h-0.5 w-full bg-amber-700/60" />
                  <div className="flex justify-between">
                    <div className="w-2 h-4 border border-amber-700/60 rounded-xs" />
                    <div className="w-2 h-4 border border-amber-700/60 rounded-xs" />
                  </div>
                  <div className="h-0.5 w-full bg-amber-700/60" />
                </div>
                <div className="w-full text-center">
                  <div className="text-[7.5px] font-mono font-bold text-slate-600">RTO MUMBAI (W)</div>
                  <div className="text-[7.5px] font-mono text-slate-500">MH-02</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-slate-300 pt-1 flex items-center justify-between text-[8px] font-mono text-slate-600">
              <span>SARATHI VERIFIED CLASS 4A</span>
              <span className="tracking-widest">||| | |||| || ||| |||| | |||</span>
            </div>
          </div>
        )}

        {/* =========================================================
            FORENSIC LAYER 2: ERROR LEVEL ANALYSIS (ELA)
           ========================================================= */}
        {activeLayer === 'ela' && (
          <div className="absolute inset-0 bg-[#0B0F19]/90 z-20 pointer-events-none flex flex-col justify-between p-4 mix-blend-screen">
            <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:6px_6px] opacity-25" />
            
            <div className="flex justify-between items-center text-xs font-mono text-fuchsia-300 z-10">
              <span className="flex items-center gap-1.5 bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-500/50">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
                ELA COMPRESSION DISCONTINUITY ANALYSIS (8-BIT DCT)
              </span>
              <span className="text-[10px] text-fuchsia-400">Tolerance: ±12 LSB</span>
            </div>

            {preset.statusType === 'forged' ? (
              <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="absolute top-[48%] left-[34%] w-40 h-10 rounded border-2 border-fuchsia-400 bg-fuchsia-500/40 shadow-[0_0_25px_8px_rgba(217,70,239,0.7)] flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-white font-mono uppercase bg-fuchsia-900/90 px-1 rounded">
                    ELA SPIKE: 88.4%
                  </span>
                  <span className="text-[8px] text-fuchsia-200 font-mono">Resaved at Quality 72 (Splice)</span>
                </div>

                <div className="absolute top-[28%] left-[7%] w-28 h-36 rounded border-2 border-fuchsia-400 bg-fuchsia-500/20 shadow-[0_0_20px_5px_rgba(217,70,239,0.4)] flex items-center justify-center">
                  <span className="text-[8.5px] font-bold text-white font-mono uppercase bg-fuchsia-900/80 px-1 rounded">
                    Boundary Splice
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="bg-slate-900/80 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded text-xs font-mono">
                  ✓ Uniform compression gradient. Max deviation: 3.8% (CLEARED)
                </div>
              </div>
            )}

            <div className="text-[9px] font-mono text-fuchsia-400/80 z-10">
              Scale: 0 LSB (Black) to 255 LSB (Hot Magenta). High frequency DCT discrepancies indicate secondary editing.
            </div>
          </div>
        )}

        {/* =========================================================
            FORENSIC LAYER 3: GRAD-CAM SPLICING HEATMAP
           ========================================================= */}
        {activeLayer === 'heatmap' && (
          <div className="absolute inset-0 bg-[#0F172A]/80 z-20 pointer-events-none flex flex-col justify-between p-4">
            <div className="flex justify-between items-center text-xs font-mono text-amber-300 z-10">
              <span className="flex items-center gap-1.5 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/50">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                TRUFOR-V2 NEURAL SPLICING HEATMAP (GRAD-CAM)
              </span>
              <span className="text-[10px] text-rose-300">ResNet-50 Attention</span>
            </div>

            {preset.statusType === 'forged' ? (
              <div className="relative z-10 flex-1">
                <div className="absolute top-[46%] left-[32%] w-44 h-12 rounded-lg bg-gradient-to-r from-amber-500/60 via-rose-600/80 to-rose-700/90 border-2 border-rose-500 shadow-[0_0_30px_10px_rgba(225,29,72,0.6)] flex items-center justify-center">
                  <div className="bg-rose-950/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-rose-400">
                    TAMPER CLUSTER #1 (Attn: 0.94)
                  </div>
                </div>

                <div className="absolute top-[26%] left-[5%] w-32 h-40 rounded-lg bg-gradient-to-b from-amber-500/40 via-rose-600/60 to-transparent border-2 border-dashed border-rose-400 flex items-end justify-center pb-2">
                  <span className="bg-rose-950/90 text-rose-200 font-mono text-[8px] px-1 rounded">
                    Paste Edge (Attn: 0.81)
                  </span>
                </div>
              </div>
            ) : preset.statusType === 'attack' ? (
              <div className="relative z-10 flex-1">
                <div className="absolute top-[24%] left-[6%] w-28 h-36 rounded-lg bg-gradient-to-tr from-amber-500/70 via-rose-600/80 to-rose-700/90 border-2 border-rose-500 shadow-[0_0_25px_8px_rgba(225,29,72,0.6)] flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-[8px] font-bold text-white font-mono bg-rose-950/90 px-1 rounded">
                    REPLAY ATTACK
                  </span>
                  <span className="text-[7.5px] text-rose-200 font-mono mt-1">42.8Hz Screen Grid</span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="bg-slate-900/80 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded text-xs font-mono">
                  ✓ TruFor-v2 attention baseline clean. Zero splicing anomalies detected.
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300 z-10">
              <span>Attention Range: Low (Cyan/Blue) → High Tamper Probability (Amber → Crimson Rose)</span>
            </div>
          </div>
        )}

        {/* =========================================================
            FORENSIC LAYER 4: UV 365nm SECURITY SIMULATION
           ========================================================= */}
        {activeLayer === 'uv' && (
          <div className="absolute inset-0 bg-[#140826]/95 z-20 pointer-events-none flex flex-col justify-between p-4 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 30 Q65 45 60 70" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.8" filter="drop-shadow(0 0 4px #10B981)" />
              <path d="M120 180 Q130 195 150 190" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.8" filter="drop-shadow(0 0 4px #06B6D4)" />
              <path d="M450 60 Q440 90 470 100" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.8" filter="drop-shadow(0 0 4px #F59E0B)" />
              <path d="M380 200 Q400 215 420 195" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.8" filter="drop-shadow(0 0 4px #10B981)" />
              <path d="M220 90 Q240 70 260 85" stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.8" filter="drop-shadow(0 0 4px #06B6D4)" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border-2 border-emerald-400/40 flex items-center justify-center p-4 shadow-[0_0_50px_15px_rgba(16,185,129,0.25)]">
                <div className="text-center font-serif text-emerald-400/70">
                  <div className="text-4xl mb-1">☸</div>
                  <div className="text-[11px] font-bold tracking-widest font-mono">GOVERNMENT OF INDIA</div>
                  <div className="text-[9px] tracking-wider font-mono">365nm UV SECURITY EMBLEM</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-emerald-300 z-10">
              <span className="flex items-center gap-1.5 bg-purple-950/80 px-2 py-0.5 rounded border border-emerald-500/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                UV 365nm BLACKLIGHT & OPTICAL VARIABLE INK (OVI)
              </span>
              <span className="text-[10px] text-cyan-300">Fluorescence Active</span>
            </div>

            <div className="text-[9px] font-mono text-emerald-300/80 z-10 flex justify-between">
              <span>Reveals embedded trivalent phosphor fibers, invisible stamp ink, and security threads.</span>
              <span className="text-amber-300 font-bold">
                {isCustomUpload ? 'INGESTED UV ANALYSIS' : isPassport ? 'PASSPORT SEAL VERIFIED' : isAadhaar ? 'UIDAI THREAD VERIFIED' : 'DL UV CHECK INCOMPLETE'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
