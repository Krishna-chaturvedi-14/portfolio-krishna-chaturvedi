import { motion } from 'framer-motion';
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
    items: ['Python', 'C++', 'HTML', 'CSS', 'JavaScript'],
    color: 'red',
    category: 'Languages',
  },
  {
    id: 'development',
    title: 'Development',
    icon: <Database />,
    shortDescription: 'Full-stack & APIs',
    description: 'Experience building scalable web applications and developing robust APIs.',
    items: ['Next.js', 'Node.js', 'REST APIs', 'Supabase', 'React'],
    color: 'blue',
    category: 'Full-Stack',
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: <Wrench />,
    shortDescription: 'Development workflow',
    description: 'Modern development tools and methodologies for efficient project management and deployment.',
    items: ['Git', 'Vercel', 'Agile', 'Scrum', 'OpenAI API'],
    color: 'yellow',
    category: 'DevOps & APIs',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    icon: <Brain />,
    shortDescription: 'Algorithms & models',
    description: 'Expertise in various machine learning algorithms and techniques for building predictive models.',
    items: ['Regression', 'Classification', 'Clustering', 'Time-Series', 'LLMs'],
    color: 'green',
    category: 'AI/ML',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icon: <BarChart3 />,
    shortDescription: 'Analysis & visualization',
    description: 'Comprehensive data science skills from preprocessing to visualization and insights generation.',
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'CatBoost', 'Matplotlib'],
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-lego-hover transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-background/80 rounded-lg border border-border text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground leading-tight">{skill.title}</h3>
                    <p className="text-xs font-mono text-primary/80 mt-1">{skill.category}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 font-body leading-relaxed h-10">
                  {skill.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-mono rounded-md bg-background/50 text-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-colors cursor-default shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
