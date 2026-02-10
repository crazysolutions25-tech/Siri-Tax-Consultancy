
import React from 'react';

const RulesRegulations: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">Tax Rules & Regulations</h1>
          <p className="text-slate-600">Comprehensive overview of the latest Indian tax slabs, GST rates, and compliance deadlines for the financial year 2024-25.</p>
        </div>

        <div className="grid gap-12">
          {/* Income Tax Slabs */}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-serif mb-8 flex items-center">
              <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mr-4">IT</span>
              Income Tax Slabs (AY 2025-26)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="py-4 font-bold text-slate-900">Income Range</th>
                    <th className="py-4 font-bold text-slate-900">New Regime Rate</th>
                    <th className="py-4 font-bold text-slate-900">Old Regime Rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-50">
                    <td className="py-4">Up to ₹3,00,000</td>
                    <td className="py-4 text-green-600 font-bold">Nil</td>
                    <td className="py-4 text-green-600 font-bold">Nil (up to 2.5L)</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-4">₹3,00,001 - ₹6,00,000</td>
                    <td className="py-4">5%</td>
                    <td className="py-4">5% (up to 5L)</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-4">₹6,00,001 - ₹9,00,000</td>
                    <td className="py-4">10%</td>
                    <td className="py-4">20% (from 5L+)</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-4">₹9,00,001 - ₹12,00,000</td>
                    <td className="py-4">15%</td>
                    <td className="py-4">20%</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-4">Above ₹15,00,000</td>
                    <td className="py-4 font-bold">30%</td>
                    <td className="py-4 font-bold">30% (above 10L)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* GST Slabs */}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-serif mb-8 flex items-center">
              <span className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mr-4">GS</span>
              Standard GST Rate Slabs
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { rate: '5%', desc: 'Essential Goods (Milk, Sugar, Spices)' },
                { rate: '12%', desc: 'Processed Food, Stationery' },
                { rate: '18%', desc: 'Services, Capital Goods, Industrial items' },
                { rate: '28%', desc: 'Luxury items, Sin Goods (Cars, Tobacco)' }
              ].map(slab => (
                <div key={slab.rate} className="p-6 bg-slate-50 rounded-3xl text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">{slab.rate}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{slab.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Calendar */}
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white">
            <h2 className="text-2xl font-serif mb-10">Monthly Compliance Calendar</h2>
            <div className="space-y-8">
              {[
                { date: '7th of Every Month', title: 'TDS Payment', desc: 'Deadline for depositing TDS for the previous month.' },
                { date: '11th of Every Month', title: 'GSTR-1 Filing', desc: 'Deadline for monthly GSTR-1 (Outward Supplies).' },
                { date: '20th of Every Month', title: 'GSTR-3B Filing', desc: 'Summary return and tax payment deadline.' },
                { date: '31st July', title: 'Income Tax Return (ITR)', desc: 'Annual deadline for individuals and non-audit cases.' }
              ].map(item => (
                <div key={item.title} className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
                  <div className="text-indigo-400 font-bold text-lg">{item.date}</div>
                  <div className="md:w-1/2">
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesRegulations;
