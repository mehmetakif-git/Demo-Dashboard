import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, DollarSign, Plus, Eye, Pencil } from 'lucide-react';
import { PageHeader, Avatar, Modal } from '@/components/common';
import { departments, getEmployeesByDepartment } from '@/data/hrData';
import { profileImages } from '@/utils/profileImages';

export const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDepartment = (deptId: number) => {
    setSelectedDepartment(deptId);
    setShowModal(true);
  };

  const selectedDeptData = selectedDepartment
    ? departments.find((d) => d.id === selectedDepartment)
    : null;
  const deptEmployees = selectedDeptData
    ? getEmployeesByDepartment(selectedDeptData.name)
    : [];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Departments"
        subtitle={`${departments.length} departments in your organization`}
        icon={Building2}
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] hover:opacity-90 text-white font-medium rounded-lg transition-opacity cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Department
          </button>
        }
      />

      {/* Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-[#2e2e3e] transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${dept.color}20` }}
                >
                  <Building2 className="w-6 h-6" style={{ color: dept.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{dept.name}</h3>
                  <p className="text-xs text-white/40">Department</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleViewDepartment(dept.id)}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-white/40 hover:text-[#547792] hover:bg-[#547792]/10 transition-colors cursor-pointer">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Head */}
            <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-white/[0.02]">
              <Avatar name={dept.head} src={profileImages[dept.head]} size="sm" />
              <div>
                <p className="text-sm text-white">{dept.head}</p>
                <p className="text-xs text-white/40">Department Head</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-white/[0.02]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-[#547792]" />
                  <span className="text-xl font-bold text-white">{dept.employeeCount}</span>
                </div>
                <p className="text-xs text-white/40">Employees</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/[0.02]">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-[#10b981]" />
                  <span className="text-xl font-bold text-white">
                    {(dept.budget / 1000000).toFixed(1)}M
                  </span>
                </div>
                <p className="text-xs text-white/40">Budget</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Department Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedDeptData?.name || 'Department'}
      >
        {selectedDeptData && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-[#1a1a24]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${selectedDeptData.color}20` }}
              >
                <Building2 className="w-6 h-6" style={{ color: selectedDeptData.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedDeptData.name}</h3>
                <p className="text-sm text-white/60">Head: {selectedDeptData.head}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/40 text-xs mb-1">Employees</p>
                <p className="text-2xl font-bold text-white">{selectedDeptData.employeeCount}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#1a1a24]">
                <p className="text-white/40 text-xs mb-1">Budget</p>
                <p className="text-2xl font-bold text-white">
                  ${selectedDeptData.budget.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-white mb-3">Team Members</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {deptEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24]"
                  >
                    <Avatar name={emp.name} src={profileImages[emp.name]} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{emp.name}</p>
                      <p className="text-xs text-white/40">{emp.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
