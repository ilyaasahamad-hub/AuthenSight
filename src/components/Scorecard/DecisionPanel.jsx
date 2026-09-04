import React from 'react';
import { TrustGauge } from './TrustGauge';
import { ValidationCards } from './ValidationCards';
import { ActionButtons } from './ActionButtons';
import { InspectorNotes } from './InspectorNotes';

export const DecisionPanel = ({ preset, onDecision }) => {
  return (
    <div className="space-y-3">
      {/* Top Composite Trust Score Circular Gauge */}
      <TrustGauge
        score={preset.trustScore}
        category={preset.trustCategory}
        statusType={preset.statusType}
      />

      {/* 4 Itemized Forensic Validation Cards */}
      <ValidationCards checks={preset.checks} />

      {/* Adjudication Action Buttons */}
      <ActionButtons onDecision={onDecision} />

      {/* Inspector AI Summary & Digital Signoff */}
      <InspectorNotes
        summary={preset.inspectorSummary}
        caseId={`AUD-${preset.documentNumber}`}
      />
    </div>
  );
};
