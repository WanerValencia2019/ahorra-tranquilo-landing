import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Rocket, Target, TrendingUp, Zap, Clock, Trophy, RefreshCw, Sparkles, Info, Award, Coins, ShoppingBag, Coffee, Package, CreditCard, DollarSign } from 'lucide-react';

interface SavingEvent {
  id: number;
  type: 'save' | 'spend';
  name: string;
  amount: number;
  emoji: string;
  description: string;
}

interface SavingGoal {
  name: string;
  amount: number;
  emoji: string;
  description: string;
}

interface GameBadge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
}

interface SavingRaceGameProps {
  className?: string;
}

const SavingRaceGame: React.FC<SavingRaceGameProps> = ({ className = '' }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingGoal | null>(null);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [currentEvent, setCurrentEvent] = useState<SavingEvent | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isGameOver, setIsGameOver] = useState(false);
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [eventsProcessed, setEventsProcessed] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [badges, setBadges] = useState<GameBadge[]>([
    { id: 'first_save', name: 'Primer Ahorro', description: 'Guardaste tu primera cantidad', emoji: '🌱', earned: false },
    { id: 'resist_temptation', name: 'Resistencia', description: 'Evitaste 3 gastos seguidos', emoji: '🛡️', earned: false },
    { id: 'halfway', name: 'A Mitad de Camino', description: 'Alcanzaste el 50% de tu meta', emoji: '⭐', earned: false },
    { id: 'interest_master', name: 'Maestro del Interés', description: 'Ganaste $50,000 en intereses', emoji: '📈', earned: false },
    { id: 'goal_reached', name: 'Meta Cumplida', description: 'Alcanzaste tu objetivo', emoji: '🏆', earned: false },
  ]);
  const [consecutiveSaves, setConsecutiveSaves] = useState(0);

  const savingGoals: SavingGoal[] = [
    {
      name: 'Vacaciones',
      amount: 2000000,
      emoji: '🏖️',
      description: 'Un merecido descanso en la playa',
    },
    {
      name: 'Moto Nueva',
      amount: 5000000,
      emoji: '🏍️',
      description: 'Tu medio de transporte ideal',
    },
    {
      name: 'Fondo de Emergencias',
      amount: 3000000,
      emoji: '🆘',
      description: 'Seguridad financiera para imprevistos',
    },
    {
      name: 'Curso Profesional',
      amount: 1500000,
      emoji: '📚',
      description: 'Invierte en tu educación',
    },
  ];

  const savingEvents: SavingEvent[] = [
    // Eventos de Ahorro (Save)
    { id: 1, type: 'save', name: 'Vender objeto sin usar', amount: 150000, emoji: '📦', description: 'Ese objeto guardado puede ser dinero' },
    { id: 2, type: 'save', name: 'Cashback de compras', amount: 25000, emoji: '💳', description: 'Tus compras te regresan dinero' },
    { id: 3, type: 'save', name: 'Bonificación laboral', amount: 200000, emoji: '💰', description: 'Tu esfuerzo tiene recompensa' },
    { id: 4, type: 'save', name: 'Ahorrar el cambio', amount: 15000, emoji: '🪙', description: 'Las monedas suman más de lo que crees' },
    { id: 5, type: 'save', name: 'Cancelar suscripción', amount: 45000, emoji: '📱', description: 'Ese servicio que no usas' },
    { id: 6, type: 'save', name: 'Trabajo extra', amount: 180000, emoji: '💻', description: 'Un freelance que suma' },
    { id: 7, type: 'save', name: 'Regalo en efectivo', amount: 100000, emoji: '🎁', description: 'Ahorra en vez de gastar' },
    { id: 8, type: 'save', name: 'Cocinar en casa', amount: 80000, emoji: '🍳', description: 'Ahorro vs. restaurantes' },
    { id: 9, type: 'save', name: 'Caminar/Bici', amount: 50000, emoji: '🚶', description: 'Ahorro en transporte' },
    { id: 10, type: 'save', name: 'Plan celular más económico', amount: 35000, emoji: '📞', description: 'Reduce gastos fijos' },
    
    // Eventos de Gasto (Spend)
    { id: 11, type: 'spend', name: 'Café diario premium', amount: 120000, emoji: '☕', description: 'El café de $4,000 diario' },
    { id: 12, type: 'spend', name: 'Compra impulsiva', amount: 200000, emoji: '🛍️', description: 'Esa oferta "imperdible"' },
    { id: 13, type: 'spend', name: 'Delivery constante', amount: 180000, emoji: '🍕', description: 'Conveniencia vs. ahorro' },
    { id: 14, type: 'spend', name: 'Suscripción no usada', amount: 60000, emoji: '📺', description: 'Pagas pero no ves' },
    { id: 15, type: 'spend', name: 'Taxi innecesario', amount: 90000, emoji: '🚕', description: 'Podías ir en bus' },
    { id: 16, type: 'spend', name: 'Ropa sin necesidad', amount: 250000, emoji: '👕', description: 'Ya tienes suficiente' },
    { id: 17, type: 'spend', name: 'Snacks procesados', amount: 70000, emoji: '🍫', description: 'Gastos hormiga' },
    { id: 18, type: 'spend', name: 'Salidas nocturnas', amount: 150000, emoji: '🍻', description: 'Diversión costosa' },
    { id: 19, type: 'spend', name: 'Gadget innecesario', amount: 300000, emoji: '📱', description: 'Tecnología por emoción' },
    { id: 20, type: 'spend', name: 'Juego/App de pago', amount: 45000, emoji: '🎮', description: 'Entretenimiento digital' },
  ];

  const [remainingEvents, setRemainingEvents] = useState([...savingEvents]);

  // Timer
  useEffect(() => {
    if (gameStarted && !isGameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
  }, [timeLeft, gameStarted, isGameOver]);

  // Interés Compuesto (cada 5 segundos)
  useEffect(() => {
    if (gameStarted && !isGameOver && currentSavings > 0) {
      const interestInterval = setInterval(() => {
        const interest = Math.floor(currentSavings * 0.005); // 0.5% cada 5 segundos
        if (interest > 0) {
          setCurrentSavings((prev) => prev + interest);
          setInterestEarned((prev) => prev + interest);
          showFeedback(`+${formatCurrency(interest)} interés 💹`, 'success');
        }
      }, 5000);
      return () => clearInterval(interestInterval);
    }
  }, [gameStarted, isGameOver, currentSavings]);

  // Verificar meta alcanzada
  useEffect(() => {
    if (selectedGoal && currentSavings >= selectedGoal.amount && !isGameOver) {
      earnBadge('goal_reached');
      endGame(true);
    }
  }, [currentSavings, selectedGoal, isGameOver]);

  // Verificar 50% de la meta
  useEffect(() => {
    if (selectedGoal && currentSavings >= selectedGoal.amount * 0.5) {
      earnBadge('halfway');
    }
  }, [currentSavings, selectedGoal]);

  // Verificar interés acumulado
  useEffect(() => {
    if (interestEarned >= 50000) {
      earnBadge('interest_master');
    }
  }, [interestEarned]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const selectRandomEvent = () => {
    if (remainingEvents.length === 0) {
      setRemainingEvents([...savingEvents]);
    }
    const availableEvents = remainingEvents.length > 0 ? remainingEvents : savingEvents;
    const randomIndex = Math.floor(Math.random() * availableEvents.length);
    setCurrentEvent(availableEvents[randomIndex]);
  };

  const showFeedback = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setFeedback(message);
    setTimeout(() => setFeedback(''), 2000);
  };

  const earnBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((badge) =>
        badge.id === badgeId && !badge.earned ? { ...badge, earned: true } : badge
      )
    );
  };

  const handleDecision = (decision: 'save' | 'skip') => {
    if (!currentEvent) return;

    setEventsProcessed((prev) => prev + 1);

    if (currentEvent.type === 'save' && decision === 'save') {
      // Usuario decide ahorrar (evento positivo)
      setCurrentSavings((prev) => prev + currentEvent.amount);
      setTotalSaved((prev) => prev + currentEvent.amount);
      setConsecutiveSaves((prev) => prev + 1);
      showFeedback(`¡Ahorraste ${formatCurrency(currentEvent.amount)}! 💚`, 'success');
      
      if (currentSavings === 0) earnBadge('first_save');
    } else if (currentEvent.type === 'spend' && decision === 'skip') {
      // Usuario evita un gasto
      setConsecutiveSaves((prev) => prev + 1);
      showFeedback(`¡Evitaste gastar ${formatCurrency(currentEvent.amount)}! 🛡️`, 'success');
      
      if (consecutiveSaves + 1 >= 3) earnBadge('resist_temptation');
    } else if (currentEvent.type === 'spend' && decision === 'save') {
      // Usuario cae en la tentación de gastar
      const loss = Math.min(currentEvent.amount, currentSavings);
      setCurrentSavings((prev) => Math.max(0, prev - loss));
      setTotalSpent((prev) => prev + loss);
      setConsecutiveSaves(0);
      showFeedback(`Gastaste ${formatCurrency(loss)} 😔`, 'error');
    } else if (currentEvent.type === 'save' && decision === 'skip') {
      // Usuario pierde oportunidad de ahorrar
      setConsecutiveSaves(0);
      showFeedback('Oportunidad perdida ⏭️', 'info');
    }

    // Remover evento usado
    setRemainingEvents((prev) => prev.filter((e) => e.id !== currentEvent.id));
    
    // Siguiente evento
    setTimeout(() => {
      setFeedback('');
      selectRandomEvent();
    }, 1000);
  };

  const endGame = (goalReached: boolean = false) => {
    setIsGameOver(true);
    if (goalReached) {
      showFeedback('🎉 ¡Meta Alcanzada! 🎉', 'success');
    }
  };

  const startGame = (goal: SavingGoal) => {
    setSelectedGoal(goal);
    setCurrentSavings(50000); // Monto inicial
    setGameStarted(true);
    setIsGameOver(false);
    setTimeLeft(90);
    setTotalSaved(0);
    setTotalSpent(0);
    setEventsProcessed(0);
    setInterestEarned(0);
    setConsecutiveSaves(0);
    setRemainingEvents([...savingEvents]);
    setBadges((prev) => prev.map((b) => ({ ...b, earned: false })));
    selectRandomEvent();
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedGoal(null);
    setCurrentEvent(null);
    setFeedback('');
  };

  const progressPercentage = selectedGoal
    ? Math.min((currentSavings / selectedGoal.amount) * 100, 100)
    : 0;

  return (
    <section id="saving-race-game" className={`py-8 md:py-12 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!gameStarted ? (
          // Goal Selection Screen
          <Card className="max-w-4xl mx-auto border-2">
            <CardHeader className="text-center space-y-3 pb-3 px-4 md:px-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-success to-info flex items-center justify-center mx-auto">
                <Rocket className="size-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-4xl mb-2">La Carrera del Ahorro 🚀</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Alcanza tu meta de ahorro tomando decisiones inteligentes
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
              {/* Instrucciones */}
              <div className="p-4 rounded-xl bg-card border space-y-3">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Info className="size-4 text-primary" />
                  Cómo Jugar
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-success/20 flex-shrink-0">
                      <DollarSign className="size-4 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Oportunidades de Ahorro</p>
                      <p className="text-xs text-muted-foreground">
                        Toca "Ahorrar" en eventos positivos para sumar dinero a tu meta
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-destructive/20 flex-shrink-0">
                      <ShoppingBag className="size-4 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Tentaciones de Gasto</p>
                      <p className="text-xs text-muted-foreground">
                        Toca "Evitar" para resistir gastos innecesarios y proteger tu ahorro
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-info/20 flex-shrink-0">
                      <TrendingUp className="size-4 text-info" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Interés Compuesto</p>
                      <p className="text-xs text-muted-foreground">
                        Tu dinero ahorrado genera intereses automáticamente cada 5 segundos (0.5%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-warning/20 flex-shrink-0">
                      <Trophy className="size-4 text-warning" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Logros & Badges</p>
                      <p className="text-xs text-muted-foreground">
                        Desbloquea 5 logros especiales completando diferentes hitos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goal Selection */}
              <div className="space-y-3">
                <h4 className="font-bold text-center">Elige tu Meta de Ahorro</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {savingGoals.map((goal) => (
                    <Card
                      key={goal.name}
                      className="border-2 hover:border-primary/50 transition-all cursor-pointer group"
                      onClick={() => startGame(goal)}
                    >
                      <CardContent className="p-6 text-center space-y-3">
                        <div className="text-5xl">{goal.emoji}</div>
                        <h5 className="font-bold text-lg">{goal.name}</h5>
                        <p className="text-2xl font-extrabold text-primary">
                          {formatCurrency(goal.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        <Button className="w-full gap-2 group-hover:scale-105 transition-transform">
                          <Target className="size-4" />
                          Comenzar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Game Screen
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress Bar */}
            <Card className="border-2 border-primary/50">
              <CardContent className="p-3 md:p-6">
                <div className="space-y-4">
                  {/* Meta Info */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="text-3xl md:text-4xl">{selectedGoal?.emoji}</div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg">{selectedGoal?.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Meta: {formatCurrency(selectedGoal?.amount || 0)}
                        </p>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-2xl md:text-3xl font-extrabold text-primary">
                        {formatCurrency(currentSavings)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {progressPercentage.toFixed(1)}% completado
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar Visual */}
                  <div className="relative h-6 md:h-8 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-success via-info to-primary transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      {progressPercentage > 10 && (
                        <Rocket className="size-5 text-white animate-pulse" />
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mix-blend-difference">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <Card className="border-2 border-info/50">
                <CardContent className="p-2 md:p-4 text-center">
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Tiempo</p>
                  <p className={`text-lg md:text-2xl font-bold ${timeLeft < 15 ? 'text-destructive' : 'text-info'}`}>
                    {timeLeft}s
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-success/50">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Intereses</p>
                  <p className="text-lg font-bold text-success">{formatCurrency(interestEarned)}</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Ahorrado</p>
                  <p className="text-lg font-bold text-success">{formatCurrency(totalSaved)}</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Gastado</p>
                  <p className="text-lg font-bold text-destructive">{formatCurrency(totalSpent)}</p>
                </CardContent>
              </Card>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="text-center animate-bounce">
                <Badge className="text-base py-2 px-6 bg-primary text-white">
                  {feedback}
                </Badge>
              </div>
            )}

            {/* Game Over Screen */}
            {isGameOver ? (
              <Card className="border-2 border-warning/50">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                  <div className="text-6xl md:text-7xl">
                    {currentSavings >= (selectedGoal?.amount || 0) ? '🏆' : '⏰'}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {currentSavings >= (selectedGoal?.amount || 0)
                        ? '¡Meta Alcanzada!'
                        : '¡Tiempo Agotado!'}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentSavings >= (selectedGoal?.amount || 0)
                        ? `¡Felicidades! Ahorraste ${formatCurrency(currentSavings)}`
                        : `Alcanzaste ${progressPercentage.toFixed(1)}% de tu meta`}
                    </p>
                  </div>

                  {/* Final Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <p className="text-xs text-muted-foreground mb-1">Total Ahorrado</p>
                      <p className="text-xl font-bold text-primary">{formatCurrency(currentSavings)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                      <p className="text-xs text-muted-foreground mb-1">Por Ahorro</p>
                      <p className="text-xl font-bold text-success">{formatCurrency(totalSaved)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-info/10 border border-info/30">
                      <p className="text-xs text-muted-foreground mb-1">Por Intereses</p>
                      <p className="text-xl font-bold text-info">{formatCurrency(interestEarned)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
                      <p className="text-xs text-muted-foreground mb-1">Decisiones</p>
                      <p className="text-xl font-bold text-warning">{eventsProcessed}</p>
                    </div>
                  </div>

                  {/* Badges Earned */}
                  <div className="space-y-3">
                    <h4 className="font-bold flex items-center justify-center gap-2">
                      <Award className="size-5 text-warning" />
                      Logros Desbloqueados ({badges.filter((b) => b.earned).length}/5)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            badge.earned
                              ? 'border-warning/50 bg-warning/10'
                              : 'border-slate-300/50 bg-slate-100/50 dark:border-slate-700/50 dark:bg-slate-800/50 opacity-50'
                          }`}
                        >
                          <div className="text-3xl mb-2">{badge.emoji}</div>
                          <p className="text-xs font-bold">{badge.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => startGame(selectedGoal!)} size="lg" className="gap-2">
                      <RefreshCw className="size-4" />
                      Jugar de Nuevo
                    </Button>
                    <Button onClick={resetGame} variant="outline" size="lg">
                      Cambiar Meta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : currentEvent && (
              // Current Event Card
              <Card className="border-4 border-border">
                <CardContent className="p-4 md:p-12">
                  <div className="text-center space-y-3 md:space-y-6">
                    {/* Event Type Badge */}
                    <Badge
                      className={`text-xs md:text-sm py-1 px-3 md:px-4 ${
                        currentEvent.type === 'save'
                          ? 'bg-success text-white'
                          : 'bg-destructive text-white'
                      }`}
                    >
                      {currentEvent.type === 'save' ? 'Oportunidad de Ahorro' : 'Tentación de Gasto'}
                    </Badge>

                    {/* Emoji */}
                    <div className="text-5xl md:text-8xl">{currentEvent.emoji}</div>

                    {/* Event Name */}
                    <h3 className="text-xl md:text-3xl font-bold text-foreground">
                      {currentEvent.name}
                    </h3>

                    {/* Amount */}
                    <p className="text-2xl md:text-4xl font-extrabold text-primary">
                      {formatCurrency(currentEvent.amount)}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {currentEvent.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto pt-2 md:pt-4">
                      <Button
                        onClick={() => handleDecision('skip')}
                        variant="outline"
                        size="lg"
                        className={`h-12 md:h-20 text-base md:text-lg border-2 group ${
                          currentEvent.type === 'save'
                            ? 'border-slate-300 hover:bg-slate-100'
                            : 'border-success/50 hover:bg-success hover:text-white'
                        }`}
                      >
                        {currentEvent.type === 'save' ? (
                          <>
                            <span className="group-hover:animate-pulse">Omitir</span>
                          </>
                        ) : (
                          <>
                            <span className="group-hover:animate-pulse">Evitar</span>
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDecision('save')}
                        size="lg"
                        className={`h-12 md:h-20 text-base md:text-lg group ${
                          currentEvent.type === 'save'
                            ? 'bg-success hover:bg-success/90'
                            : 'bg-destructive hover:bg-destructive/90'
                        }`}
                      >
                        {currentEvent.type === 'save' ? (
                          <>
                            <Coins className="size-6 mr-2 group-hover:animate-pulse" />
                            Ahorrar
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="size-6 mr-2 group-hover:animate-pulse" />
                            Gastar
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Hint for consecutive saves */}
                    {consecutiveSaves >= 2 && (
                      <p className="text-sm text-warning animate-pulse">
                        🔥 ¡Racha de {consecutiveSaves} decisiones inteligentes!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavingRaceGame;
