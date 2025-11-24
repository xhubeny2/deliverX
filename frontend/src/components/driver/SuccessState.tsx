'use client';
import { IconTrophy } from '@tabler/icons-react';

type SuccessStateProps = { deliveredCount: number; failedCount: number };

export default function SuccessState({ deliveredCount, failedCount }: SuccessStateProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center mb-6 animate-in zoom-in-95 duration-500">
      <div className="bg-green-100 size-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-4 ring-green-50">
        <IconTrophy className="size-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">Run Completed!</h2>
      <p className="text-green-700 mb-6">You have finished all stops for this run.</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
          <div className="text-3xl font-bold text-slate-900">{deliveredCount}</div>
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
            Delivered
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-green-100 shadow-sm">
          <div className="text-3xl font-bold text-slate-900">{failedCount}</div>
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
            Failed
          </div>
        </div>
      </div>
    </div>
  );
}
