
import React, { useState, useEffect } from 'react';

const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('1000');
  const [rate, setRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [results, setResults] = useState({
    gstAmount: 0,
    totalAmount: 0,
    cgst: 0,
    sgst: 0,
    basePrice: 0
  });

  const calculate = () => {
    const val = parseFloat(amount) || 0;
    let gstAmount = 0;
    let total = 0;
    let base = 0;

    if (isInclusive) {
      base = (val * 100) / (100 + rate);
      gstAmount = val - base;
      total = val;
    } else {
      base = val;
      gstAmount = (val * rate) / 100;
      total = val + gstAmount;
    }

    setResults({
      gstAmount,
      totalAmount: total,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      basePrice: base
    });
  };

  useEffect(() => {
    calculate();
  }, [amount, rate, isInclusive]);

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          <div className="p-8 sm:p-12 md:w-1/2 bg-indigo-600 text-white">
            <h2 className="text-2xl sm:text-3xl font-serif mb-4 sm:mb-6 text-center md:text-left">GST Calculator</h2>
            <p className="text-indigo-100 mb-8 sm:mb-10 text-xs sm:text-sm text-center md:text-left">Calculate GST inclusive or exclusive amounts instantly with Indian tax slabs.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 opacity-80">Initial Amount (₹)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-indigo-500/50 border border-indigo-400 rounded-xl sm:rounded-2xl px-5 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-white transition-all text-xl sm:text-2xl font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 opacity-80 text-center md:text-left">GST Rate (%)</label>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {[5, 12, 18, 28].map(r => (
                    <button 
                      key={r}
                      onClick={() => setRate(r)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex-1 min-w-[60px] max-w-[80px] ${rate === r ? 'bg-white text-indigo-600' : 'bg-indigo-500/30 text-white hover:bg-indigo-500/50'}`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <button 
                  onClick={() => setIsInclusive(false)}
                  className={`flex-1 py-3.5 rounded-xl text-[10px] sm:text-xs font-bold border transition-all ${!isInclusive ? 'bg-white text-indigo-600 border-white' : 'border-indigo-400 text-indigo-100'}`}
                >
                  Exclusive
                </button>
                <button 
                  onClick={() => setIsInclusive(true)}
                  className={`flex-1 py-3.5 rounded-xl text-[10px] sm:text-xs font-bold border transition-all ${isInclusive ? 'bg-white text-indigo-600 border-white' : 'border-indigo-400 text-indigo-100'}`}
                >
                  Inclusive
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 md:w-1/2 flex flex-col justify-center space-y-8">
            <div className="text-center pb-8 border-b border-slate-100">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Total Amount</span>
              <div className="text-4xl sm:text-5xl font-serif text-slate-900 mt-2">₹{results.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Base Price</span>
                <span className="text-base sm:text-lg font-bold text-slate-700">₹{results.basePrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total GST</span>
                <span className="text-base sm:text-lg font-bold text-indigo-600">₹{results.gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">CGST ({(rate/2)}%)</span>
                <span className="text-xs sm:text-sm font-medium text-slate-600">₹{results.cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">SGST ({(rate/2)}%)</span>
                <span className="text-xs sm:text-sm font-medium text-slate-600">₹{results.sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GstCalculator;
