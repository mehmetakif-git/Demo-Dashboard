import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Scan,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  QrCode,
  Download,
  RefreshCw,
  ArrowUpRight,
  Eye,
  Clock,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  qrCodes,
  formatNumber,
  getTypeColor,
  getTypeLabel,
} from '@/data/qrCodeData';

export const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedQRCode, setSelectedQRCode] = useState<string>('all');

  const stats = useMemo(() => ({
    totalScans: qrCodes.reduce((sum, q) => sum + q.scans, 0),
    uniqueScans: qrCodes.reduce((sum, q) => sum + q.uniqueScans, 0),
    activeQRCodes: qrCodes.filter(q => q.status === 'active').length,
    avgScansPerQR: Math.round(qrCodes.reduce((sum, q) => sum + q.scans, 0) / qrCodes.length),
  }), []);

  // Mock analytics data
  const scansByDay = useMemo(() => [
    { date: '2024-01-01', scans: 120, unique: 95 },
    { date: '2024-01-02', scans: 145, unique: 112 },
    { date: '2024-01-03', scans: 98, unique: 78 },
    { date: '2024-01-04', scans: 167, unique: 134 },
    { date: '2024-01-05', scans: 189, unique: 156 },
    { date: '2024-01-06', scans: 234, unique: 189 },
    { date: '2024-01-07', scans: 178, unique: 145 },
    { date: '2024-01-08', scans: 156, unique: 128 },
    { date: '2024-01-09', scans: 198, unique: 165 },
    { date: '2024-01-10', scans: 223, unique: 189 },
    { date: '2024-01-11', scans: 267, unique: 221 },
    { date: '2024-01-12', scans: 189, unique: 156 },
    { date: '2024-01-13', scans: 234, unique: 198 },
    { date: '2024-01-14', scans: 256, unique: 212 },
  ], []);

  const deviceData = [
    { device: 'Mobile', percentage: 68, icon: Smartphone, color: '#3b82f6' },
    { device: 'Desktop', percentage: 22, icon: Monitor, color: '#10b981' },
    { device: 'Tablet', percentage: 10, icon: Tablet, color: '#f59e0b' },
  ];

  const topLocations = [
    { country: 'United States', scans: 4250, percentage: 35 },
    { country: 'Germany', scans: 2180, percentage: 18 },
    { country: 'United Kingdom', scans: 1820, percentage: 15 },
    { country: 'Turkey', scans: 1450, percentage: 12 },
    { country: 'France', scans: 980, percentage: 8 },
    { country: 'Other', scans: 1520, percentage: 12 },
  ];

  const topQRCodes = useMemo(() =>
    [...qrCodes]
      .sort((a, b) => b.scans - a.scans)
      .slice(0, 5),
  []);

  const hourlyData = [
    { hour: '00:00', scans: 12 },
    { hour: '03:00', scans: 8 },
    { hour: '06:00', scans: 25 },
    { hour: '09:00', scans: 89 },
    { hour: '12:00', scans: 145 },
    { hour: '15:00', scans: 178 },
    { hour: '18:00', scans: 156 },
    { hour: '21:00', scans: 67 },
  ];

  const maxScans = Math.max(...scansByDay.map(d => d.scans));
  const maxHourlyScans = Math.max(...hourlyData.map(d => d.scans));

  return (
    <div className="space-y-6">
      <PageHeader
        title="QR Code Analytics"
        subtitle="Track performance and scan statistics for your QR codes"
        actions={
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>
            <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
              Refresh
            </Button>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export Report
            </Button>
          </div>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Scans"
          value={formatNumber(stats.totalScans)}
          subtitle="+12.5% from last period"
          icon={Scan}
          iconColor="#547792"
        />
        <StatsCard
          title="Unique Visitors"
          value={formatNumber(stats.uniqueScans)}
          subtitle="+8.3% from last period"
          icon={Users}
          iconColor="#10b981"
        />
        <StatsCard
          title="Active QR Codes"
          value={stats.activeQRCodes.toString()}
          icon={QrCode}
          iconColor="#f59e0b"
        />
        <StatsCard
          title="Avg. Scans per QR"
          value={formatNumber(stats.avgScansPerQR)}
          icon={BarChart3}
          iconColor="#94B4C1"
        />
      </div>

      {/* QR Code Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-text-secondary">Filter by QR Code:</label>
          <select
            value={selectedQRCode}
            onChange={(e) => setSelectedQRCode(e.target.value)}
            className="px-3 py-2 bg-white/[0.05] border border-white/[0.08] rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-primary"
          >
            <option value="all">All QR Codes</option>
            {qrCodes.map(qr => (
              <option key={qr.id} value={qr.id}>{qr.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Scan Trend</h3>
              <p className="text-sm text-text-secondary">Total and unique scans over time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-accent-primary" />
                <span className="text-sm text-text-secondary">Total Scans</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500" />
                <span className="text-sm text-text-secondary">Unique Scans</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2">
            {scansByDay.map((day, index) => (
              <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col gap-0.5" style={{ height: 200 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.scans / maxScans) * 100}%` }}
                    transition={{ delay: index * 0.03, duration: 0.5 }}
                    className="w-full bg-accent-primary/30 rounded-t relative"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.unique / day.scans) * 100}%` }}
                      transition={{ delay: index * 0.03 + 0.2, duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t"
                    />
                  </motion.div>
                </div>
                <span className="text-xs text-text-muted">{day.date.slice(-2)}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Device Breakdown</h3>
            <div className="space-y-4">
              {deviceData.map((device) => (
                <div key={device.device}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <device.icon size={18} style={{ color: device.color }} />
                      <span className="text-sm text-text-secondary">{device.device}</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{device.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Top Locations</h3>
              <Globe size={20} className="text-text-muted" />
            </div>
            <div className="space-y-3">
              {topLocations.map((location, index) => (
                <div key={location.country} className="flex items-center justify-between p-2 hover:bg-white/[0.05] rounded transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-xs text-text-muted">
                      {index + 1}
                    </span>
                    <span className="text-sm text-text-primary">{location.country}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-text-primary">{formatNumber(location.scans)}</span>
                    <span className="text-xs text-text-muted ml-2">({location.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Peak Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Peak Hours</h3>
              <Clock size={20} className="text-text-muted" />
            </div>
            <div className="h-40 flex items-end gap-2">
              {hourlyData.map((hour, index) => (
                <div key={hour.hour} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(hour.scans / maxHourlyScans) * 100}%` }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="w-full bg-accent-primary rounded-t"
                    style={{ minHeight: 4 }}
                  />
                  <span className="text-[10px] text-text-muted">{hour.hour.slice(0, 2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-white/[0.03] backdrop-blur-xl rounded-lg">
              <p className="text-xs text-text-muted">Best performing hour</p>
              <p className="text-lg font-semibold text-text-primary">3:00 PM - 6:00 PM</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing QR Codes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Top Performing QR Codes</h3>
              <p className="text-sm text-text-secondary">QR codes with the most scans</p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">QR Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Total Scans</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Unique Scans</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {topQRCodes.map((qr, index) => {
                  const typeColor = getTypeColor(qr.type);
                  const trend = index % 2 === 0 ? 'up' : 'down';
                  const trendValue = Math.floor(Math.random() * 20) + 5;

                  return (
                    <tr key={qr.id} className="hover:bg-white/[0.05] transition-colors">
                      <td className="py-3 px-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                          index === 1 ? 'bg-slate-500/20 text-slate-400' :
                          index === 2 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-white/[0.05] text-text-muted'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: qr.style.backgroundColor,
                              border: `1px solid ${qr.style.foregroundColor}`,
                            }}
                          >
                            <QrCode size={18} style={{ color: qr.style.foregroundColor }} />
                          </div>
                          <div>
                            <span className="font-medium text-text-primary">{qr.name}</span>
                            <p className="text-xs text-text-muted">{qr.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                        >
                          {getTypeLabel(qr.type)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-text-primary">{formatNumber(qr.scans)}</td>
                      <td className="py-3 px-4 text-sm text-text-secondary">{formatNumber(qr.uniqueScans)}</td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          <span className="text-sm font-medium">{trendValue}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Scan Rate</h3>
              <ArrowUpRight size={18} className="text-green-400" />
            </div>
            <p className="text-3xl font-bold text-text-primary mb-2">2.4K</p>
            <p className="text-sm text-text-secondary">Average daily scans</p>
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp size={14} />
                <span className="text-sm font-medium">+18.2% vs last month</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Engagement Rate</h3>
              <Eye size={18} className="text-accent-primary" />
            </div>
            <p className="text-3xl font-bold text-text-primary mb-2">68.5%</p>
            <p className="text-sm text-text-secondary">Unique vs total scans</p>
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp size={14} />
                <span className="text-sm font-medium">+5.3% vs last month</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Growth Rate</h3>
              <BarChart3 size={18} className="text-[#94B4C1]" />
            </div>
            <p className="text-3xl font-bold text-text-primary mb-2">+24.8%</p>
            <p className="text-sm text-text-secondary">Month over month growth</p>
            <div className="mt-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp size={14} />
                <span className="text-sm font-medium">On track for goals</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
