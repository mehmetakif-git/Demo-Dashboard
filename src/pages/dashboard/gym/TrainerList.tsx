import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Star,
  Users,
  Calendar,
  DollarSign,
  Eye,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { PageHeader, Card, StatsCard, Button } from '@/components/common';
import {
  trainers,
  formatCurrency,
  type Trainer,
} from '@/data/gym/gymData';
import { ROUTES } from '@/utils/constants';
import { profileImages } from '@/utils/profileImages';
import { useTranslation } from 'react-i18next';

export const TrainerList = () => {
  const { t } = useTranslation('gym');
  const navigate = useNavigate();

  const totalTrainers = trainers.length;
  const totalClients = trainers.reduce((sum, tr) => sum + tr.activeClients, 0);
  const avgRating = (trainers.reduce((sum, tr) => sum + tr.rating, 0) / trainers.length).toFixed(1);

  const stats = [
    { title: t('trainerList.totalTrainers'), value: totalTrainers.toString(), icon: Users, iconColor: '#547792' },
    { title: t('trainerList.activeClients'), value: totalClients.toString(), icon: Users, iconColor: '#10b981' },
    { title: t('trainerList.averageRating'), value: avgRating, icon: Star, iconColor: '#f59e0b' },
  ];

  const handleViewTrainer = (trainerId: string) => {
    navigate(ROUTES.gym.trainerDetail.replace(':id', trainerId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title={t('trainerList.title')}
        subtitle={t('trainerList.subtitle')}
        actions={
          <Button onClick={() => console.log('Add trainer')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('trainerList.addTrainer')}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Trainer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <TrainerCard
            key={trainer.id}
            trainer={trainer}
            onView={() => handleViewTrainer(trainer.id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface TrainerCardProps {
  trainer: Trainer;
  onView: () => void;
}

const TrainerCard = ({ trainer, onView }: TrainerCardProps) => {
  const { t } = useTranslation('gym');
  const isAvailableToday = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availability = trainer.availability[today as keyof typeof trainer.availability];
    return availability && availability.length > 0;
  };

  return (
    <Card className="p-6 hover:border-accent-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white text-xl font-bold overflow-hidden">
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
            <h3 className="font-semibold text-text-primary text-lg">{trainer.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-text-primary font-medium">{trainer.rating}</span>
              <span className="text-text-secondary text-sm">({trainer.reviewCount} {t('trainerList.reviews')})</span>
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAvailableToday()
              ? 'bg-green-500/10 text-green-400'
              : 'bg-gray-500/10 text-gray-400'
          }`}
        >
          {isAvailableToday() ? t('trainerList.available') : t('trainerList.notAvailable')}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap gap-1">
          {trainer.specializations.slice(0, 3).map((spec, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full text-xs bg-accent-primary/10 text-accent-primary"
            >
              {spec}
            </span>
          ))}
          {trainer.specializations.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.05] text-text-secondary">
              +{trainer.specializations.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-text-secondary">
            <DollarSign className="h-4 w-4" />
            <span>{formatCurrency(trainer.hourlyRate)}/hr</span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Users className="h-4 w-4" />
            <span>{trainer.activeClients} {t('trainerList.clients')}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-text-secondary">
          <Clock className="h-4 w-4" />
          <span>{t('trainerList.yearsExperience', { count: trainer.experience })}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-white/[0.08]">
        <Button variant="ghost" size="sm" className="flex-1" onClick={onView}>
          <Eye className="h-4 w-4 mr-1" />
          {t('trainerList.view')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={() => console.log('Schedule', trainer.id)}
        >
          <Calendar className="h-4 w-4 mr-1" />
          {t('trainerList.schedule')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log('Message', trainer.id)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
