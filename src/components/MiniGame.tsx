import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Gamepad2, Trophy, RefreshCw, Sparkles, ArrowDown } from 'lucide-react';

interface Transaction {
  id: number;
  name: string;
  amount: number;
  emoji: string;
}

interface MiniGameProps {
  className?: string;
}

const MiniGame: React.FC<MiniGameProps> = ({ className = '' }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Transaction | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const transactions: Transaction[] = [
    { id: 1, name: 'Salario', amount: 3000000, emoji: '💰' },
    { id: 2, name: 'Compras supermercado', amount: -250000, emoji: '🛒' },
    { id: 3, name: 'Netflix', amount: -45000, emoji: '🎬' },
    { id: 4, name: 'Restaurante', amount: -120000, emoji: '🍽️' },
    { id: 5, name: 'Gasolina', amount: -150000, emoji: '⛽' },
    { id: 6, name: 'Freelance', amount: 500000, emoji: '💻' },
  ];

  const [availableTransactions, setAvailableTransactions] = useState(transactions);
  const [incomeList, setIncomeList] = useState<Transaction[]>([]);
  const [expenseList, setExpenseList] = useState<Transaction[]>([]);

  const handleDragStart = (transaction: Transaction) => {
    setDraggedItem(transaction);
  };

  const handleDrop = (category: 'income' | 'expense') => {
    if (!draggedItem) return;

    const isCorrect =
      (category === 'income' && draggedItem.amount > 0) ||
      (category === 'expense' && draggedItem.amount < 0);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setFeedback('¡Correcto! 🎉');
      
      if (category === 'income') {
        setIncomeList((prev) => [...prev, draggedItem]);
      } else {
        setExpenseList((prev) => [...prev, draggedItem]);
      }

      setAvailableTransactions((prev) => prev.filter((t) => t.id !== draggedItem.id));
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setFeedback('¡Ups! Intenta de nuevo 😅');
    }

    setTimeout(() => setFeedback(''), 2000);
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setAvailableTransactions(transactions);
    setIncomeList([]);
    setExpenseList([]);
    setFeedback('');
    setGameStarted(true);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <section id="mini-game" className={`py-8 md:py-8 bg-gradient-to-b from-accent/30 to-background ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 gap-1">
            <Gamepad2 className="size-3" />
            Mini Juego
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Aprende Jugando 🎮
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Arrastra cada transacción a la categoría correcta: ¿Ingreso o Gasto?
          </p>
        </div>

        {!gameStarted ? (
          // Start Screen
          <Card className="max-w-2xl mx-auto text-center p-12">
            <div className="mb-8">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Gamepad2 className="size-12 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">¿Listo para el desafío?</h3>
              <p className="text-muted-foreground mb-6">
                Clasifica correctamente todas las transacciones y mejora tu comprensión financiera
              </p>
            </div>
            <Button onClick={startGame} size="lg" className="gap-2">
              Comenzar Juego
              <Sparkles className="size-4" />
            </Button>
          </Card>
        ) : (
          // Game Screen
          <div className="max-w-5xl mx-auto">
            {/* Score Bar */}
            <div className="flex justify-between items-center mb-8 p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Puntuación</p>
                  <p className="text-2xl font-bold text-primary">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nivel</p>
                  <p className="text-2xl font-bold text-foreground">{level}</p>
                </div>
              </div>
              <Button onClick={resetGame} variant="outline" size="sm" className="gap-2">
                <RefreshCw className="size-4" />
                Reiniciar
              </Button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="text-center mb-6">
                <Badge
                  className={`text-lg py-2 px-4 ${
                    feedback.includes('Correcto')
                      ? 'bg-success text-success-foreground'
                      : 'bg-destructive text-destructive-foreground'
                  }`}
                >
                  {feedback}
                </Badge>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {/* Available Transactions */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Transacciones</CardTitle>
                  <CardDescription>Arrastra cada una a su categoría</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {availableTransactions.length > 0 ? (
                    availableTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        draggable
                        onDragStart={() => handleDragStart(transaction)}
                        className="p-3 rounded-lg border-2 border-dashed border-border bg-card hover:bg-accent cursor-grab active:cursor-grabbing transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{transaction.emoji}</span>
                            <span className="text-sm font-medium">{transaction.name}</span>
                          </div>
                          <ArrowDown className="size-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="size-12 text-warning mx-auto mb-4" />
                      <p className="font-semibold text-foreground mb-2">¡Completado!</p>
                      <p className="text-sm text-muted-foreground">Puntuación final: {score}</p>
                      <Button onClick={resetGame} className="mt-4" size="sm">
                        Jugar de nuevo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Income Drop Zone */}
              <Card
                onDrop={() => handleDrop('income')}
                onDragOver={handleDragOver}
                className="md:col-span-1 border-2 border-dashed border-success/50 hover:border-success hover:bg-success/5 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-success flex items-center gap-2">
                    💰 Ingresos
                    <Badge variant="outline" className="ml-auto">
                      {incomeList.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Dinero que recibes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {incomeList.length > 0 ? (
                    incomeList.map((transaction) => (
                      <div key={transaction.id} className="p-3 rounded-lg bg-success/10 border border-success/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{transaction.emoji}</span>
                            <span className="text-sm font-medium">{transaction.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-success">
                            +{new Intl.NumberFormat('es-CO').format(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">Arrastra los ingresos aquí</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Expense Drop Zone */}
              <Card
                onDrop={() => handleDrop('expense')}
                onDragOver={handleDragOver}
                className="md:col-span-1 border-2 border-dashed border-destructive/50 hover:border-destructive hover:bg-destructive/5 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-destructive flex items-center gap-2">
                    💸 Gastos
                    <Badge variant="outline" className="ml-auto">
                      {expenseList.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>Dinero que gastas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {expenseList.length > 0 ? (
                    expenseList.map((transaction) => (
                      <div key={transaction.id} className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{transaction.emoji}</span>
                            <span className="text-sm font-medium">{transaction.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-destructive">
                            {new Intl.NumberFormat('es-CO').format(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">Arrastra los gastos aquí</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MiniGame;
