
import React from 'react';

const dmarcTags = [
  { tag: 'v', description: 'Version tag. Must be "DMARC1". Record is ignored if incorrect or missing.' },
  { tag: 'p', description: 'Policy for the domain. Values: "none" (no action), "quarantine" (mark as suspicious), "reject" (block).' },
  { tag: 'rua', description: 'URI for aggregate report delivery. Optional, but necessary for receiving reports.' },
  { tag: 'ruf', description: 'URI for forensic report delivery. Optional, but necessary for receiving failure reports.' },
  { tag: 'sp', description: 'Policy for subdomains. Inherits from "p" if not specified. Values same as "p".' },
  { tag: 'adkim', description: 'DKIM alignment. "r" (relaxed, default) allows partial match, "s" (strict) requires exact match.' },
  { tag: 'aspf', description: 'SPF alignment. "r" (relaxed, default) allows partial match, "s" (strict) requires exact match.' },
  { tag: 'fo', description: 'Forensic reporting options. Values: "0" (default), "1", "d", "s". Affects when reports are generated.' },
  { tag: 'rf', description: 'Reporting format for failure reports. Values: "afrf", "iodef".' },
  { tag: 'pct', description: 'Percentage of messages subject to filtering. Applies to "quarantine" or "reject" policies.' },
  { tag: 'ri', description: 'Reporting interval in seconds. Default is 86400 (daily). Actual delivery may vary.' },
];

const DmarcTagExplanation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-amber-500 mb-6">DMARC Tag Explanations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dmarcTags.map((tag, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 shadow transition-all duration-300 hover:shadow-md hover:bg-gray-100">
            <span className="font-bold text-amber-600">{tag.tag}</span>
            <p className="text-gray-700 mt-1">{tag.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DmarcTagExplanation;
