import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  User,
  DollarSign,
  Pencil,
  UserX,
  FileText,
  Download,
  Eye,
} from 'lucide-react';
import { Avatar, StatusBadge, Tabs } from '@/components/common';
import { getEmployeeById, leaveRequests, payrollRecords, performanceReviews } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'documents', label: 'Documents' },
  { id: 'leave', label: 'Leave History' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'performance', label: 'Performance' },
];

const mockDocuments = [
  { id: 1, name: 'Employment Contract', type: 'PDF', uploadDate: '2021-03-15', size: '245 KB' },
  { id: 2, name: 'ID Copy', type: 'PDF', uploadDate: '2021-03-15', size: '1.2 MB' },
  { id: 3, name: 'Degree Certificate', type: 'PDF', uploadDate: '2021-03-20', size: '890 KB' },
  { id: 4, name: 'Tax Form W-4', type: 'PDF', uploadDate: '2021-03-15', size: '156 KB' },
];

export const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const employee = getEmployeeById(id || '');

  if (!employee) {
    return (
      <div className="p-6">
        <div className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-12 text-center">
          <p className="text-white/60">Employee not found</p>
          <button
            onClick={() => navigate('/dashboard/hr/employees')}
            className="mt-4 text-[#6366f1] hover:underline cursor-pointer"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const employeeLeaves = leaveRequests.filter((l) => l.employee === employee.name);
  const employeePayroll = payrollRecords.filter((p) => p.employee === employee.name);
  const employeeReviews = performanceReviews.filter((r) => r.employee === employee.name);

  return (
    <div className="p-6 space-y-6">
      {/* Back Button & Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => navigate('/dashboard/hr/employees')}
          className="p-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-white/60 hover:text-white hover:border-[#2e2e3e] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{employee.name}</h1>
          <p className="text-white/60">{employee.position}</p>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={employee.name} src={profileImages[employee.name]} size="xl" />
            <div>
              <h2 className="text-xl font-semibold text-white">{employee.name}</h2>
              <p className="text-white/60">{employee.position}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    color: '#6366f1',
                  }}
                >
                  {employee.department}
                </span>
                <StatusBadge status={employee.status} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#6366f1]/10 text-[#6366f1] rounded-lg hover:bg-[#6366f1]/20 transition-colors cursor-pointer">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer">
              <UserX className="w-4 h-4" />
              Deactivate
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#6366f1]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Email</p>
                  <p className="text-sm text-white">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Phone</p>
                  <p className="text-sm text-white">{employee.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Location</p>
                  <p className="text-sm text-white">{employee.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Start Date</p>
                  <p className="text-sm text-white">
                    {new Date(employee.startDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Job Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Job Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[#6366f1]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Department</p>
                  <p className="text-sm text-white">{employee.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Manager</p>
                  <p className="text-sm text-white">{employee.manager}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Annual Salary</p>
                  <p className="text-sm text-white">
                    ${employee.salary.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-xs text-white/40">Employment Type</p>
                  <p className="text-sm text-white capitalize">{employee.type}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                <p className="text-xs text-[#10b981] mb-1">Leave Balance</p>
                <p className="text-2xl font-bold text-white">12 days</p>
                <p className="text-xs text-white/40">remaining this year</p>
              </div>
              <div className="p-4 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20">
                <p className="text-xs text-[#6366f1] mb-1">Attendance Rate</p>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-xs text-white/40">last 30 days</p>
              </div>
              <div className="p-4 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                <p className="text-xs text-[#f59e0b] mb-1">Performance Score</p>
                <p className="text-2xl font-bold text-white">4.5/5</p>
                <p className="text-xs text-white/40">Q4 2024 review</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'documents' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a24]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Document Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Upload Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="border-t border-[#1e1e2e] hover:bg-[#1a1a24]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#6366f1]" />
                      <span className="text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white/60">{doc.type}</td>
                  <td className="px-4 py-4 text-white/60">
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-white/60">{doc.size}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-white/40 hover:text-[#6366f1] hover:bg-[#6366f1]/10 transition-colors cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === 'leave' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a24]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Start Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">End Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Days</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Reason</th>
              </tr>
            </thead>
            <tbody>
              {employeeLeaves.length > 0 ? (
                employeeLeaves.map((leave) => (
                  <tr key={leave.id} className="border-t border-[#1e1e2e]">
                    <td className="px-4 py-4 text-white">{leave.type}</td>
                    <td className="px-4 py-4 text-white/60">{leave.startDate}</td>
                    <td className="px-4 py-4 text-white/60">{leave.endDate}</td>
                    <td className="px-4 py-4 text-white/60">{leave.days}</td>
                    <td className="px-4 py-4"><StatusBadge status={leave.status} /></td>
                    <td className="px-4 py-4 text-white/60">{leave.reason}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/40">
                    No leave history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === 'payroll' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a24]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Month</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Base Salary</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Bonus</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Deductions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Net Salary</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-[#64748b]">Status</th>
              </tr>
            </thead>
            <tbody>
              {employeePayroll.length > 0 ? (
                employeePayroll.map((record) => (
                  <tr key={record.id} className="border-t border-[#1e1e2e]">
                    <td className="px-4 py-4 text-white">{record.month}</td>
                    <td className="px-4 py-4 text-white/60">${record.baseSalary.toLocaleString()}</td>
                    <td className="px-4 py-4 text-emerald-400">+${record.bonus.toLocaleString()}</td>
                    <td className="px-4 py-4 text-red-400">-${record.deductions.toLocaleString()}</td>
                    <td className="px-4 py-4 text-white font-medium">${record.netSalary.toLocaleString()}</td>
                    <td className="px-4 py-4"><StatusBadge status={record.status} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-white/40">
                    No payroll records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === 'performance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {employeeReviews.length > 0 ? (
            employeeReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#12121a] border border-[#1e1e2e] rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-white">{review.period}</h4>
                  <StatusBadge status={review.status} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Reviewer</span>
                    <span className="text-white text-sm">{review.reviewer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Rating</span>
                    <div className="flex items-center gap-1">
                      {review.rating ? (
                        <>
                          <span className="text-white font-medium">{review.rating}</span>
                          <span className="text-white/40">/5</span>
                        </>
                      ) : (
                        <span className="text-white/40">N/A</span>
                      )}
                    </div>
                  </div>
                  {review.completedDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Completed</span>
                      <span className="text-white text-sm">
                        {new Date(review.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-[#12121a] border border-[#1e1e2e] rounded-xl p-12 text-center">
              <p className="text-white/40">No performance reviews found</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
