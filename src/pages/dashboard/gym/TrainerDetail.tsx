import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Mail,
  Phone,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Award,
  Edit,
  MessageSquare,
} from 'lucide-react';
import { Card, Button, Tabs } from '@/components/common';
import {
  trainers,
  gymMembers,
  gymClasses,
  ptSessions,
  formatCurrency,
  formatDate,
} from '@/data/gym/gymData';
import { ROUTES } from '@/utils/constants';
import { profileImages } from '@/utils/profileImages';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const TrainerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('schedule');

  const trainer = trainers.find((t) => t.id === id);
  const trainerClients = gymMembers.filter((m) => m.assignedTrainerId === id);
  const trainerClasses = gymClasses.filter((c) => c.instructorId === id);
  const trainerSessions = ptSessions.filter((s) => s.trainerId === id);

  if (!trainer) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Trainer not found</h2>
          <Button onClick={() => navigate(ROUTES.gym.trainers)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Trainers
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'schedule', label: 'Schedule' },
    { id: 'clients', label: 'Clients' },
    { id: 'classes', label: 'Classes' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(ROUTES.gym.trainers)}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Trainers</span>
      </button>

      {/* Header */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {profileImages[trainer.name] ? (
                <img
                  src={profileImages[trainer.name]}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                trainer.name.split(' ').map((n) => n[0]).join('')
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">{trainer.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-text-primary font-semibold">{trainer.rating}</span>
                </div>
                <span className="text-text-secondary">({trainer.reviewCount} reviews)</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trainer.status === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-gray-500/10 text-gray-400'
                  }`}
                >
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trainer.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-accent-primary/10 text-accent-primary"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => console.log('Edit trainer')}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" onClick={() => console.log('Message trainer')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button onClick={() => console.log('Schedule with trainer')}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-accent-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Hourly Rate</p>
              <p className="text-text-primary font-semibold">{formatCurrency(trainer.hourlyRate)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active Clients</p>
              <p className="text-text-primary font-semibold">{trainer.activeClients}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Sessions</p>
              <p className="text-text-primary font-semibold">{trainer.totalSessions.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Experience</p>
              <p className="text-text-primary font-semibold">{trainer.experience} years</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-text-muted" />
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="text-text-primary">{trainer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-text-muted" />
              <div>
                <p className="text-sm text-text-secondary">Phone</p>
                <p className="text-text-primary">{trainer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-text-muted" />
              <div>
                <p className="text-sm text-text-secondary">Joined</p>
                <p className="text-text-primary">{formatDate(trainer.joinDate)}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-text-primary mb-4">About</h2>
          <p className="text-text-secondary mb-4">{trainer.bio}</p>
          <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
            <Award className="h-4 w-4 text-accent-primary" />
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {trainer.certifications.map((cert, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-background-tertiary text-text-primary"
              >
                {cert}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'schedule' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Weekly Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {DAYS.map((day) => {
              const availability = trainer.availability[day as keyof typeof trainer.availability];
              return (
                <div key={day} className="text-center">
                  <p className="text-sm font-semibold text-text-primary capitalize mb-2">{day}</p>
                  {availability && availability.length > 0 ? (
                    <div className="space-y-1">
                      {availability.map((slot, index) => (
                        <div
                          key={index}
                          className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs"
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-2 py-1 rounded bg-gray-500/10 text-gray-400 text-xs">
                      Off
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="text-lg font-semibold text-text-primary mt-8 mb-4">Upcoming Sessions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Client
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Time
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {trainerSessions.filter((s) => s.status === 'scheduled').length > 0 ? (
                  trainerSessions
                    .filter((s) => s.status === 'scheduled')
                    .map((session) => (
                      <tr key={session.id} className="border-b border-border-default">
                        <td className="py-3 px-4 text-text-primary">{session.memberName}</td>
                        <td className="py-3 px-4 text-text-secondary">{formatDate(session.date)}</td>
                        <td className="py-3 px-4 text-text-secondary">
                          {session.startTime} - {session.endTime}
                        </td>
                        <td className="py-3 px-4 text-text-secondary">{session.type}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                            Scheduled
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-text-secondary">
                      No upcoming sessions
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'clients' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Active Clients ({trainerClients.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainerClients.map((client) => (
              <div
                key={client.id}
                className="p-4 bg-background-tertiary rounded-lg flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-medium overflow-hidden">
                  {profileImages[`${client.firstName} ${client.lastName}`] ? (
                    <img
                      src={profileImages[`${client.firstName} ${client.lastName}`]}
                      alt={`${client.firstName} ${client.lastName}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>{client.firstName[0]}{client.lastName[0]}</>
                  )}
                </div>
                <div>
                  <p className="font-medium text-text-primary">
                    {client.firstName} {client.lastName}
                  </p>
                  <p className="text-sm text-text-secondary">{client.membershipPlan}</p>
                </div>
              </div>
            ))}
            {trainerClients.length === 0 && (
              <p className="text-text-secondary col-span-full text-center py-8">
                No active clients assigned
              </p>
            )}
          </div>
        </Card>
      )}

      {activeTab === 'classes' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Classes Taught ({trainerClasses.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainerClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-4 rounded-lg border-l-4"
                style={{ backgroundColor: `${cls.color}10`, borderLeftColor: cls.color }}
              >
                <h3 className="font-semibold text-text-primary">{cls.name}</h3>
                <p className="text-sm text-text-secondary mb-2">{cls.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
                  <span>{cls.duration} min</span>
                  <span>•</span>
                  <span>{cls.room}</span>
                  <span>•</span>
                  <span>{cls.currentEnrollment}/{cls.maxCapacity} enrolled</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {cls.schedule.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs bg-background-tertiary text-text-secondary"
                    >
                      {s.day} {s.time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {trainerClasses.length === 0 && (
              <p className="text-text-secondary col-span-full text-center py-8">
                No classes assigned
              </p>
            )}
          </div>
        </Card>
      )}

      {activeTab === 'reviews' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Reviews</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(trainer.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-text-primary font-semibold">{trainer.rating}</span>
                <span className="text-text-secondary">({trainer.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Mock Reviews */}
          <div className="space-y-4">
            {[
              {
                name: 'Alex T.',
                rating: 5,
                date: '2024-12-15',
                comment: 'Mike is an excellent trainer. Very knowledgeable and motivating!',
              },
              {
                name: 'Jessica W.',
                rating: 5,
                date: '2024-12-10',
                comment: 'Great attention to form and technique. Highly recommended.',
              },
              {
                name: 'Marcus C.',
                rating: 4,
                date: '2024-12-05',
                comment: 'Good training sessions. Helped me achieve my fitness goals.',
              },
            ].map((review, index) => (
              <div key={index} className="p-4 bg-background-tertiary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-medium text-sm">
                      {review.name[0]}
                    </div>
                    <span className="font-medium text-text-primary">{review.name}</span>
                  </div>
                  <span className="text-sm text-text-secondary">{formatDate(review.date)}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-text-secondary">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
};
