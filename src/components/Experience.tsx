import { motion } from 'framer-motion';
import { PlayerCard } from './PlayerCard';
import { Building2, Users, Camera, Award } from 'lucide-react';

interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  icon: React.ReactNode;
  shortDescription: string;
  description: string;
  details: string[];
  technologies?: string[];
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  date: string;
  location: string;
  type: 'work' | 'organization' | 'achievement';
}

const experiences: ExperienceItem[] = [
  {
    id: 'jio',
    title: 'Machine Learning Intern',
    organization: 'Jio Platforms Limited',
    icon: <Building2 />,
    shortDescription: 'ML models for telecom',
    description: 'Built and fine-tuned machine learning models on time series data to forecast future fuel consumption and network load across telecom infrastructure.',
    details: [
      'Built ML models for time series forecasting',
      'Engineered predictive features including lag values and 3-day rolling statistics',
      'Implemented recursive prediction mechanism for future forecasts',
      'Evaluated model performance using MAE, RMSE, and R² metrics',
    ],
    technologies: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    color: 'blue',
    date: 'May 2025 - Aug 2025',
    location: 'Mumbai',
    type: 'work',
  },
  {
    id: 'ieee',
    title: 'Head of Media & Coverage',
    organization: 'IEEE SB MUJ',
    icon: <Users />,
    shortDescription: 'Leading the media team',
    description: 'Headed the media team of IEEE Student Branch at Manipal University Jaipur, responsible for content creation and social media management.',
    details: [
      'Headed the media team of IEEE SB MUJ',
      'Shot and edited engaging content for IEEE MUJ Instagram page',
      'Managed social media presence and engagement',
      'Coordinated with event teams for coverage',
    ],
    color: 'yellow',
    date: 'May 2024 - May 2025',
    location: 'Jaipur',
    type: 'organization',
  },
  {
    id: 'aperture',
    title: 'Junior Committee Member',
    organization: 'Aperture MUJ',
    icon: <Camera />,
    shortDescription: 'Photography club contribution',
    description: 'Active member of the photography club, contributing to events and creative projects at Manipal University Jaipur.',
    details: [
      'Contributed to photography club activities',
      'Participated in event coverage',
      'Collaborated on creative projects',
    ],
    color: 'green',
    date: 'Jan 2024 - Jan 2025',
    location: 'Jaipur',
    type: 'organization',
  },
  {
    id: 'courses',
    title: 'Certifications',
    organization: 'Professional Development',
    icon: <Award />,
    shortDescription: 'Continuous learning',
    description: 'Committed to continuous learning through professional certifications and courses in data structures, algorithms, and cloud technologies.',
    details: [
      'Data Structures and Algorithms',
      'Microsoft Azure AI Fundamentals',
    ],
    color: 'orange',
    date: 'Ongoing',
    location: 'Online',
    type: 'achievement',
  },
];

export const Experience = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-success/10 text-success rounded-md font-mono text-sm font-medium mb-4">
            Experience & Achievements
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 font-bold">
            Professional Journey
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Each role is a building block in my professional foundation.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {experiences.map((item, index) => (
            <PlayerCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              shortDescription={item.shortDescription}
              metadata={[item.organization, item.date.split(' - ')[0]]}
              color={item.color}
              delay={index}
              avatarType="control"
              fullDescription={item.description}
              details={item.details}
              technologies={item.technologies}
              detailMetadata={[
                { label: 'Organization', value: item.organization },
                { label: 'Duration', value: item.date },
                { label: 'Location', value: item.location },
              ]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
