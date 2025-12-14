import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card.tsx';
import { Badge } from './ui/Badge.tsx';
import { Button } from './ui/Button.tsx';
import { Gamepad2, Trophy, RefreshCw, Sparkles, ArrowRight, ArrowLeft, Zap, Clock, TrendingUp, Info } from 'lucide-react';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  emoji: string;
  category?: string;
}

interface MiniGameProps {
  className?: string;
}

const MiniGame: React.FC<MiniGameProps> = ({ className = '' }) => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const allTransactions: Transaction[] = [
    { id: 1, name: 'Salario', amount: 3000000, emoji: '💰', category: 'Ingreso Laboral' },
    { id: 2, name: 'Compras supermercado', amount: -250000, emoji: '🛒', category: 'Alimentación' },
    { id: 3, name: 'Netflix', amount: -45000, emoji: '🎬', category: 'Entretenimiento' },
    { id: 4, name: 'Restaurante', amount: -120000, emoji: '🍽️', category: 'Alimentación' },
    { id: 5, name: 'Gasolina', amount: -150000, emoji: '⛽', category: 'Transporte' },
    { id: 6, name: 'Freelance', amount: 500000, emoji: '💻', category: 'Ingreso Extra' },
    { id: 7, name: 'Gimnasio', amount: -85000, emoji: '💪', category: 'Salud' },
    { id: 8, name: 'Bonificación', amount: 400000, emoji: '🎁', category: 'Ingreso Extra' },
    { id: 9, name: 'Uber', amount: -35000, emoji: '🚗', category: 'Transporte' },
    { id: 10, name: 'Spotify', amount: -20000, emoji: '🎵', category: 'Entretenimiento' },
    { id: 11, name: 'Venta online', amount: 180000, emoji: '📦', category: 'Ingreso Extra' },
    { id: 12, name: 'Farmacia', amount: -65000, emoji: '💊', category: 'Salud' },
  ];

  const [remainingTransactions, setRemainingTransactions] = useState([...allTransactions]);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Timer
  useEffect(() => {
    if (gameStarted && !isGameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      setIsGameOver(true);
    }
  }, [timeLeft, gameStarted, isGameOver]);

  // Seleccionar transacción aleatoria
  const selectRandomTransaction = () => {
    if (remainingTransactions.length === 0) {
      setIsGameOver(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingTransactions.length);
    setCurrentTransaction(remainingTransactions[randomIndex]);
  };

  const handleAnswer = (isIncome: boolean) => {
    if (!currentTransaction) return;

    const isCorrect =
      (isIncome && currentTransaction.amount > 0) ||
      (!isIncome && currentTransaction.amount < 0);

    if (isCorrect) {
      const points = 10 + (streak * 2); // Bonus por racha
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
      setBestStreak((prev) => Math.max(prev, streak + 1));
      setFeedback(`¡Correcto! +${points} 🎉`);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setStreak(0);
      setFeedback('¡Ups! Racha perdida 😅');
    }

    setRemainingTransactions((prev) => prev.filter((t) => t.id !== currentTransaction.id));
    setTotalAnswered((prev) => prev + 1);
    
    setTimeout(() => {
      setFeedback('');
      selectRandomTransaction();
    }, 1000);
  };

  // Touch handlers para swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setSwipeDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;
    
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'left' : 'right');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    if (!swipeDirection) {
      setTouchStart(null);
      return;
    }
    
    // Izquierda = Gasto, Derecha = Ingreso
    handleAnswer(swipeDirection === 'right');
    setTouchStart(null);
    setSwipeDirection(null);
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setRemainingTransactions([...allTransactions]);
    setTimeLeft(60);
    setIsGameOver(false);
    setFeedback('');
    setTotalAnswered(0);
    setGameStarted(true);
    selectRandomTransaction();
  };

  const startGame = () => {
    resetGame();
  };

  return (
    <section id="mini-game" className={`py-8 md:py-12 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!gameStarted ? (
          // Start Screen
          <Card className="max-w-3xl mx-auto border-2">
            <CardHeader className="text-center space-y-3 pb-3 px-4 md:px-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center mx-auto">
                <Gamepad2 className="size-10 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-4xl mb-2">Clasifica y Gana 🎯</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Diferencia entre Ingresos y Gastos - La base de la gestión financiera
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
              {/* Instrucciones */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-success/20">
                      <ArrowRight className="size-5 text-success" />
                    </div>
                    <h4 className="font-bold text-success">Ingreso →</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isMobile ? 'Desliza a la derecha' : 'Presiona el botón verde'} para transacciones que SUMAN dinero
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-destructive/20">
                      <ArrowLeft className="size-5 text-destructive" />
                    </div>
                    <h4 className="font-bold text-destructive">Gasto ←</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isMobile ? 'Desliza a la izquierda' : 'Presiona el botón rojo'} para transacciones que RESTAN dinero
                  </p>
                </div>
              </div>

              {/* Reglas */}
              <div className="p-4 rounded-xl bg-card border">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Info className="size-4 text-primary" />
                  Cómo Jugar
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Zap className="size-4 text-warning mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Racha:</strong> Mantén respuestas correctas para multiplicar tus puntos (x2, x3...)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="size-4 text-info mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Tiempo:</strong> Tienes 60 segundos para clasificar el máximo de transacciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Trophy className="size-4 text-warning mt-0.5 flex-shrink-0" />
                    <span><strong className="text-foreground">Puntos:</strong> +10 puntos base + bonus por racha. -5 por error</span>
                  </li>
                </ul>
              </div>

              <Button onClick={startGame} size="lg" className="w-full gap-2 text-lg h-14">
                <Sparkles className="size-5" />
                Comenzar Juego
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Game Screen
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Score Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <Card className="border-2 border-primary/50">
                <CardContent className="p-2 md:p-4 text-center">
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">Puntuación</p>
                  <p className="text-xl md:text-3xl font-bold text-primary">{score}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-warning/50">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Racha</p>
                  <p className="text-2xl md:text-3xl font-bold text-warning flex items-center justify-center gap-1">
                    <Zap className="size-5" />
                    {streak}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-info/50">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Tiempo</p>
                  <p className={`text-2xl md:text-3xl font-bold ${timeLeft < 10 ? 'text-destructive' : 'text-info'}`}>
                    {timeLeft}s
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Progreso</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {totalAnswered}/{allTransactions.length}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="text-center animate-bounce">
                <Badge
                  className={`text-lg py-2 px-6 ${
                    feedback.includes('Correcto')
                      ? 'bg-success text-white'
                      : 'bg-destructive text-white'
                  }`}
                >
                  {feedback}
                </Badge>
              </div>
            )}

            {/* Game Over Screen */}
            {isGameOver ? (
              <Card className="border-2 border-warning/50">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                  <Trophy className="size-16 md:size-20 text-warning mx-auto" />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">¡Juego Terminado!</h3>
                    <p className="text-muted-foreground">
                      {score > 100 ? '¡Excelente trabajo!' : score > 50 ? '¡Bien hecho!' : '¡Sigue practicando!'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <p className="text-sm text-muted-foreground mb-1">Puntuación Final</p>
                      <p className="text-3xl font-bold text-primary">{score}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
                      <p className="text-sm text-muted-foreground mb-1">Mejor Racha</p>
                      <p className="text-3xl font-bold text-warning">{bestStreak}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={resetGame} size="lg" className="gap-2">
                      <RefreshCw className="size-4" />
                      Jugar de Nuevo
                    </Button>
                    <Button onClick={() => setGameStarted(false)} variant="outline" size="lg">
                      Ver Instrucciones
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : currentTransaction && (
              // Current Transaction Card
              <Card
                className={`border-4 transition-all duration-300 ${
                  swipeDirection === 'right'
                    ? 'border-success/50 translate-x-2'
                    : swipeDirection === 'left'
                    ? 'border-destructive/50 -translate-x-2'
                    : 'border-border'
                }`}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? handleTouchEnd : undefined}
              >
                <CardContent className="p-4 md:p-12">
                  <div className="text-center space-y-3 md:space-y-6">
                    {/* Emoji y Categoría */}
                    <div>
                      <div className="text-5xl md:text-8xl mb-2 md:mb-4">{currentTransaction.emoji}</div>
                      <Badge variant="outline" className="mb-2">
                        {currentTransaction.category}
                      </Badge>
                    </div>

                    {/* Nombre */}
                    <h3 className="text-xl md:text-3xl font-bold text-foreground">
                      {currentTransaction.name}
                    </h3>

                    {/* Monto */}
                    <p className="text-2xl md:text-4xl font-extrabold text-primary">
                      {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      }).format(Math.abs(currentTransaction.amount))}
                    </p>

                    {/* Instrucción mobile */}
                    {isMobile && (
                      <p className="text-sm text-muted-foreground animate-pulse">
                        Desliza → Ingreso | Desliza ← Gasto
                      </p>
                    )}

                    {/* Botones (Desktop y Mobile) */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto pt-2 md:pt-4">
                      <Button
                        onClick={() => handleAnswer(false)}
                        variant="outline"
                        size="lg"
                        className="h-12 md:h-20 text-base md:text-lg border-2 border-destructive/50 hover:bg-destructive hover:text-white group">
                        <ArrowLeft className="size-6 mr-2 group-hover:animate-pulse" />
                        Gasto
                      </Button>
                      <Button
                        onClick={() => handleAnswer(true)}
                        size="lg"
                        className="h-12 md:h-20 text-base md:text-lg bg-success hover:bg-success/90 group">
                        Ingreso
                        <ArrowRight className="size-6 ml-2 group-hover:animate-pulse" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instrucción para resetear */}
            {!isGameOver && (
              <div className="text-center">
                <Button onClick={resetGame} variant="ghost" size="sm" className="gap-2">
                  <RefreshCw className="size-3" />
                  Reiniciar Juego
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MiniGame;
