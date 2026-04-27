import { useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './index.css';

type QRItem = {
  table: number;
  url: string;
};

export default function App() {
  const [baseUrl, setBaseUrl] = useState('https://full-restaurant-r7rr.vercel.app/');
  const [startTable, setStartTable] = useState('1');
  const [endTable, setEndTable] = useState('10');

  const qrItems = useMemo<QRItem[]>(() => {
    const start = Number(startTable);
    const end = Number(endTable);

    if (!baseUrl.trim() || !Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
      return [];
    }

    const items: QRItem[] = [];
    for (let table = start; table <= end; table += 1) {
      items.push({
        table,
        url: `${baseUrl.replace(/\/$/, '')}/?table=${table}`,
      });
    }
    return items;
  }, [baseUrl, startTable, endTable]);

  const downloadAll = () => {
    window.print();
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Restaurant QR Generator</h1>
        <p>Generate QR codes that open your restaurant form with table number automatically.</p>

        <label>Restaurant website URL</label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://your-restaurant-site.com"
        />

        <div className="row">
          <div>
            <label>Start Table</label>
            <input
              type="number"
              value={startTable}
              onChange={(e) => setStartTable(e.target.value)}
              min="1"
            />
          </div>

          <div>
            <label>End Table</label>
            <input
              type="number"
              value={endTable}
              onChange={(e) => setEndTable(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <button type="button" onClick={downloadAll}>
          Print / Download as PDF
        </button>

        <div className="grid">
          {qrItems.length === 0 ? (
            <p className="hint">Enter a valid URL and table range.</p>
          ) : (
            qrItems.map((item) => (
              <div key={item.table} className="qrCard">
                <QRCodeSVG value={item.url} size={180} />
                <div className="label">Table {item.table}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
