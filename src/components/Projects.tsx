import { motion } from 'framer-motion';
import { PlayerCard } from './PlayerCard';
import { TrendingUp, Timer } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDescription: string;
  description: string;
  details: string[];
  technologies: string[];
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  date: string;
  status: string;
}

const projects: Project[] = [
  {
    id: 'kpi-forecasting',
    title: 'KPI Time Series Forecasting',
    icon: <TrendingUp />,
    shortDescription: 'Network performance prediction',
    description: 'A sophisticated time-series model using Gradient Boosting Regressor to forecast Key Performance Indicator (KPI) values for network tower nodes. This project enables proactive network management and optimization.',
    details: [
      'Developed a time-series model using Gradient Boosting Regressor',
      'Forecast KPI values for network tower nodes',
      'Applied advanced data preprocessing and feature engineering',
      'Built for real-time network performance monitoring',
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Gradient Boosting'],
    color: 'red',
    date: 'Jul 2025 - Present',
    status: 'In Progress',
  },
  {
    id: 'motogp',
    title: 'MotoGP Lap Time Prediction',
    icon: <Timer />,
    shortDescription: 'Race analytics with CatBoost',
    description: 'A high-performance regression model for MotoGP race analytics that predicts rider lap times based on race, track, environmental, and historical performance data. Achieved exceptional accuracy with an RMSE of 0.0786.',
    details: [
      'Built predictive model using CatBoost Regressor',
      'Analyzed race, track, environmental, and historical data',
      'Designed robust preprocessing pipeline for missing data',
      'Trained with 3000 iterations and 5-fold cross-validation',
      'Achieved final RMSE of 0.0786',
    ],
    technologies: ['CatBoost', 'Scikit-learn', 'Pandas', 'Python'],
    color: 'blue',
    date: 'Jul 2025',
    status: 'Completed',
  },
];

export const Projects = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-md font-mono text-sm font-medium mb-4">
            Projects
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 font-bold">
            Featured Work
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Each project represents a building block of my engineering journey.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <PlayerCard
              key={project.id}
              title={project.title}
              icon={project.icon}
              shortDescription={project.shortDescription}
              metadata={[project.status, project.date.split(' - ')[0]]}
              color={project.color}
              delay={index}
              avatarType="web"
              fullDescription={project.description}
              details={project.details}
              technologies={project.technologies}
              detailMetadata={[
                { label: 'Status', value: project.status },
                { label: 'Timeline', value: project.date },
              ]}
            />
          ))}
        </div>

        {/* Empty state for more projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="inline-block px-6 py-4 bg-muted/50 rounded-lg border border-dashed border-border">
            <p className="font-body text-muted-foreground">
              More projects coming soon...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
