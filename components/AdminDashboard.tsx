
import React, { useState, useEffect } from 'react';
import { MockAPI } from '../services/api';

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'leads' | 'users'>('leads');

  const fetchData = async () => {
    setLoading(true);
    const leadsRes = await MockAPI.leads.getAll();
    const usersRes = await MockAPI.auth.getAllUsers();
    
    if (leadsRes.success) setLeads(leadsRes.data || []);
    if (usersRes.success) setUsers(usersRes.data || []);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    await MockAPI.leads.updateStatus(id, newStatus);
    fetchData();
  };

  const filteredLeads = leads.filter(l => filter === 'All' || l.status === filter);

  const stats = {
    total: leads.length,
    pending: leads.filter(l => l.status === 'Pending').length,
    resolved: leads.filter(l => l.status === 'Resolved').length,
    totalUsers: users.length
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-2">Backend Management</h1>
            <p className="text-slate-500 text-sm">Monitor inquiries and manage registered users.</p>
          </div>
          <button 
            onClick={fetchData}
            className="w-full lg:w-auto px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>Refresh Database</span>
          </button>
        </div>

        {/* Analytics Mini-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {[
            { label: 'Total Inquiries', val: stats.total, color: 'indigo' },
            { label: 'Pending Action', val: stats.pending, color: 'amber' },
            { label: 'Resolved Success', val: stats.resolved, color: 'emerald' },
            { label: 'Registered Users', val: stats.totalUsers, color: 'slate' }
          ].map(stat => (
            <div key={stat.label} className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
              <div className={`text-3xl sm:text-4xl font-serif text-${stat.color}-600 mt-2`}>{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-200 rounded-2xl mb-8 w-fit">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'leads' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Service Inquiries
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Registered Users
          </button>
        </div>

        {activeTab === 'leads' ? (
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg sm:text-xl text-slate-900">Recent Inquiries</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Pending', 'Contacted', 'Resolved'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                      <th className="px-8 py-4">Client</th>
                      <th className="px-8 py-4">Requested Service</th>
                      <th className="px-8 py-4">Submitted Date</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan={5} className="text-center py-20 text-slate-400 italic">Syncing with Backend...</td></tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-20 text-slate-400">No leads match your criteria.</td></tr>
                    ) : filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-xs text-slate-400">{lead.email}</div>
                          {lead.pan && <div className="text-[10px] font-mono text-indigo-500 mt-1">PAN: {lead.pan}</div>}
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold uppercase">{lead.service}</span>
                        </td>
                        <td className="px-8 py-6 text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            lead.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 
                            lead.status === 'Contacted' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <select 
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="bg-slate-50 border border-slate-100 text-indigo-600 font-bold text-[10px] outline-none cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded"
                          >
                            <option value="Pending">Set Pending</option>
                            <option value="Contacted">Set Contacted</option>
                            <option value="Resolved">Set Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg sm:text-xl text-slate-900">User Directory</h3>
              <p className="text-xs text-slate-400">Total registered profiles: {users.length}</p>
            </div>
            
            <div className="relative">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                      <th className="px-8 py-4">User Details</th>
                      <th className="px-8 py-4">Tax Identifiers</th>
                      <th className="px-8 py-4">Phone</th>
                      <th className="px-8 py-4">Role</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan={4} className="text-center py-20 text-slate-400 italic">Fetching user data...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-20 text-slate-400">No registered users found.</td></tr>
                    ) : users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{user.name}</div>
                              <div className="text-xs text-slate-400">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">PAN: <span className="text-slate-700 font-mono tracking-normal ml-1">{user.pan || 'N/A'}</span></div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Aadhaar: <span className="text-slate-700 tracking-normal ml-1">{user.aadhaar || 'N/A'}</span></div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-slate-700">
                          {user.phone || 'N/A'}
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            user.role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
