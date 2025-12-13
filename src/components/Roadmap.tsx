import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Rocket, CheckCircle2, Clock, Lightbulb, ThumbsUp, Sparkles } from 'lucide-react';

interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: string;
  votes: number;
  quarter: string;
  icon: string;
}

interface RoadmapProps {
  className?: string;
}

const Roadmap: React.FC<RoadmapProps> = ({ className = '' }) => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([
    {
      id: 1,
      title: 'Modo Oscuro',
      description: 'Tema oscuro para reducir la fatiga visual',
      status: 'completed',
      category: 'UI/UX',
      votes: 342,
      quarter: 'Q1 2025',
      icon: '🌙',
    },
    {
      id: 2,
      title: 'Exportar a Excel',
      description: 'Descarga tus reportes en formato Excel',
      status: 'completed',
      category: 'Reportes',
      votes: 287,
      quarter: 'Q4 2025',
      icon: '📊',
    },
    {
      id: 3,
      title: 'Alertas Inteligentes',
      description: 'Notificaciones personalizadas de gastos',
      status: 'planned',
      category: 'Features',
      votes: 412,
      quarter: 'Q1 2026',
      icon: '🔔',
    },
    {
      id: 4,
      title: 'Modo Familiar',
      description: 'Gestión financiera compartida',
      status: 'planned',
      category: 'Features',
      votes: 456,
      quarter: 'Q1 2026',
      icon: '👨‍👩‍👧‍👦',
    },
    {
      id: 5,
      title: 'Inversiones Tracking',
      description: 'Seguimiento de portafolio de inversiones',
      status: 'planned',
      category: 'Features',
      votes: 389,
      quarter: 'Q2 2026',
      icon: '📈',
    },
    {
      id: 6,
      title: 'Asistente AI',
      description: 'Consejos financieros con inteligencia artificial',
      status: 'planned',
      category: 'AI',
      votes: 671,
      quarter: 'Q2 2026',
      icon: '🤖',
    },
    {
      id: 7,
      title: 'App Móvil',
      description: 'Aplicación nativa para iOS y Android',
      status: 'planned',
      category: 'Platform',
      votes: 892,
      quarter: 'Q1 2027',
      icon: '📱',
    },
    {
      id: 8,
      title: 'Conexión Bancaria',
      description: 'Sincroniza automáticamente con tu banco',
      status: 'planned',
      category: 'Integración',
      votes: 524,
      quarter: 'Q2 2027',
      icon: '🏦',
    },
  ]);

  const [votedItems, setVotedItems] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all');

  const handleVote = (itemId: number) => {
    if (votedItems.has(itemId)) {
      // Remove vote
      setVotedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      setRoadmapItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, votes: item.votes - 1 } : item))
      );
    } else {
      // Add vote
      setVotedItems((prev) => new Set(prev).add(itemId));
      setRoadmapItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, votes: item.votes + 1 } : item))
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle2 className="size-3 mr-1" />
            Completado
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-info/10 text-info border-info/20">
            <Clock className="size-3 mr-1" />
            En Desarrollo
          </Badge>
        );
      case 'planned':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            <Lightbulb className="size-3 mr-1" />
            Planeado
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredItems = roadmapItems.filter((item) => filter === 'all' || item.status === filter);
  const sortedItems = [...filteredItems];

  return (
    <section id="roadmap" className={`py-8 md:py-8 bg-background ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 gap-1">
            <Rocket className="size-3" />
            Roadmap
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Futuro de Ahorra Tranquilo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Vota por las funciones que más te interesan y ayúdanos a priorizarlas
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
            >
              Todas
            </Button>
            <Button
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
            >
              Completadas
            </Button>
            <Button
              onClick={() => setFilter('in-progress')}
              variant={filter === 'in-progress' ? 'default' : 'outline'}
              size="sm"
            >
              En Desarrollo
            </Button>
            <Button
              onClick={() => setFilter('planned')}
              variant={filter === 'planned' ? 'default' : 'outline'}
              size="sm"
            >
              Planeadas
            </Button>
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sortedItems.map((item, index) => (
            <Card
              key={item.id}
              className={`group hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-${(index % 3) * 100}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{item.icon}</div>
                  {getStatusBadge(item.status)}
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.quarter}</span>
                  </div>
                </div>

                {/* Vote Button */}
                <Button
                  onClick={() => handleVote(item.id)}
                  variant={votedItems.has(item.id) ? 'default' : 'outline'}
                  size="sm"
                  className="w-full mt-4 gap-2"
                >
                  <ThumbsUp className={`size-4 ${votedItems.has(item.id) ? 'fill-current' : ''}`} />
                  {item.votes} votos
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <Sparkles className="size-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">¿Tienes una idea?</h3>
          <p className="text-muted-foreground mb-4">
            Queremos escucharte. Envíanos tus sugerencias y ayúdanos a crear la mejor app financiera
          </p>
          <a href="/contacto">
          <Button size="lg" className="gap-2" >
            Sugerir una función
            <Lightbulb className="size-4" />
          </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
