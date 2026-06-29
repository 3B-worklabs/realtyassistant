import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TableProps {
  headers: string[];
  rows: ReactNode[][];
  className?: string;
}

export function Table({ headers, rows, className }: TableProps) {
  return (
    <div className={cn('overflow-hidden rounded-[28px] border border-border bg-white shadow-card', className)}>
      <table className="min-w-full divide-y divide-border text-left">
        <thead className="bg-background">
          <tr>
            {headers.map((header) => (
              <th key={header} className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="transition-colors duration-150 hover:bg-background/60">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-nowrap px-6 py-4 text-sm text-text">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
