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
  shortDescription: 'Forecasting network KPIs for proactive performance monitoring',
  description: 'Designed and deployed a machine learning–based time-series forecasting system to predict key network performance indicators, enabling early detection of anomalies and capacity planning.',
  details: [
    'Built a Gradient Boosting regression pipeline for multivariate time-series forecasting',
    'Engineered lag-based and rolling statistical features to capture temporal trends',
    'Predicted KPI values for distributed network tower nodes',
    'Optimized preprocessing and feature selection for real-time inference use cases',
    'Designed the system with scalability for large-scale network monitoring'
  ],
  technologies: ['Python', 'Scikit-learn', 'Pandas', 'Gradient Boosting'],
  color: 'red',
  date: 'Jul 2025 – Present',
  status: 'In Progress'


  },
  {
  id: 'motogp',
  title: 'MotoGP Lap Time Prediction',
  icon: <Timer />,
  shortDescription: 'Predictive race analytics using machine learning',
  description: 'Developed a high-performance machine learning model to predict MotoGP lap times by analyzing race, track, and environmental data, enabling deeper performance insights.',
  details: [
    'Implemented CatBoost regression for handling heterogeneous race data',
    'Analyzed rider performance across track conditions and environmental variables',
    'Designed a robust preprocessing pipeline for missing and noisy data',
    'Trained models using 5-fold cross-validation with 3000+ iterations',
    'Achieved a final RMSE of 0.0786, indicating high predictive accuracy'
  ],
  technologies: ['CatBoost', 'Scikit-learn', 'Pandas', 'Python'],
  color: 'blue',
  date: 'Jul 2025',
  status: 'Completed'
}

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
              characterType="builder"
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
