
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
      <h2 className="text-2xl font-bold mb-4">DMARC Tag Explanations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Tag</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {dmarcTags.map((tag, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border px-4 py-2 font-semibold">{tag.tag}</td>
                <td className="border px-4 py-2">{tag.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DmarcTagExplanation;
