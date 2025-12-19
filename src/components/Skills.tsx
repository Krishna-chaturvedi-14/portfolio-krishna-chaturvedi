import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayerCard } from './PlayerCard';
import { DetailModal } from './DetailModal';
import { Code, Database, Wrench, Brain, BarChart3, Sparkles } from 'lucide-react';

interface Skill {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDescription: string;
  description: string;
  items: string[];
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
  category: string;
}

const skills: Skill[] = [
  {
    id: 'programming',
    title: 'Programming',
    icon: <Code />,
    shortDescription: 'Core languages I code in',
    description: 'Strong foundation in programming languages essential for data science and machine learning development.',
    items: ['Python', 'C', 'HTML', 'CSS'],
    color: 'red',
    category: 'Languages',
  },
  {
    id: 'database',
    title: 'Database',
    icon: <Database />,
    shortDescription: 'Data storage & queries',
    description: 'Experience with relational databases and SQL for efficient data management and retrieval.',
    items: ['MySQL', 'SQL Queries', 'Data Modeling'],
    color: 'blue',
    category: 'Backend',
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: <Wrench />,
    shortDescription: 'Development workflow',
    description: 'Modern development tools and methodologies for efficient project management and deployment.',
    items: ['Git', 'Vercel', 'Agile', 'Scrum'],
    color: 'yellow',
    category: 'DevOps',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: <Brain />,
    shortDescription: 'Algorithms & models',
    description: 'Expertise in various machine learning algorithms and techniques for building predictive models.',
    items: ['Regression', 'Classification', 'Clustering', 'Time-Series', 'Feature Engineering'],
    color: 'green',
    category: 'AI/ML',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icon: <BarChart3 />,
    shortDescription: 'Analysis & visualization',
    description: 'Comprehensive data science skills from preprocessing to visualization and insights generation.',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Data Cleaning', 'EDA'],
    color: 'orange',
    category: 'Analytics',
  },
  {
    id: 'ai-tools',
    title: 'AI Tools',
    icon: <Sparkles />,
    shortDescription: 'Modern AI assistants',
    description: 'Leveraging cutting-edge AI tools to enhance productivity and code quality.',
    items: ['Cursor', 'Claude Code', 'GitHub Copilot'],
    color: 'blue',
    category: 'Productivity',
  },
];

export const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

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
            Skills
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 font-bold">
            Tech Stack
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Hover over each block to preview. Click "View Details" for more info.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {skills.map((skill, index) => (
            <PlayerCard
              key={skill.id}
              title={skill.title}
              icon={skill.icon}
              shortDescription={skill.shortDescription}
              metadata={[skill.category, `${skill.items.length} items`]}
              color={skill.color}
              onViewDetails={() => setSelectedSkill(skill)}
              delay={index}
            />
          ))}
        </div>

        {/* Detail Modal */}
        <DetailModal
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          title={selectedSkill?.title || ''}
          icon={selectedSkill?.icon}
          description={selectedSkill?.description || ''}
          technologies={selectedSkill?.items || []}
          color={selectedSkill?.color || 'red'}
          metadata={[
            { label: 'Category', value: selectedSkill?.category || '' },
          ]}
        />
      </div>
    </div>
  );
};