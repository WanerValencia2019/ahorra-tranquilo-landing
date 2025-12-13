import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Calculator, PiggyBank, TrendingUp, Sparkles } from 'lucide-react';

interface ToolsProps {
  className?: string;
}

const Tools: React.FC<ToolsProps> = ({ className = '' }) => {
  // Calculadora de Ahorro
  const [savingsGoal, setSavingsGoal] = useState<string>('5000000');
  const [months, setMonths] = useState<string>('12');
  const [monthlyRequired, setMonthlyRequired] = useState<number>(0);
  
  // Calculadora de Presupuesto 50/30/20
  const [monthlyIncome, setMonthlyIncome] = useState<string>('2500000');
  const [needs, setNeeds] = useState<number>(0);
  const [wants, setWants] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  const calculateSavings = () => {
    const goal = parseFloat(savingsGoal) || 0;
    const monthsNum = parseFloat(months) || 0;
    
    if (monthsNum > 0) {
      const required = goal / monthsNum;
      setMonthlyRequired(required);
    }
  };

  const calculate503020 = () => {
    const income = parseFloat(monthlyIncome) || 0;
    setNeeds(income * 0.5);
    setWants(income * 0.3);
    setSavings(income * 0.2);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="tools" className={`py-8 md:py-8 bg-gradient-to-b from-background to-accent/20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 gap-1">
            <Calculator className="size-3" />
            Calculadoras
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Herramientas Financieras Gratis
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Planifica tus finanzas con nuestras calculadoras interactivas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculadora de Meta de Ahorro */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <PiggyBank className="size-6 text-primary" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Calculadora de Ahorro
                <Sparkles className="size-4 text-warning animate-pulse" />
              </CardTitle>
              <CardDescription>¿Cuánto necesitas ahorrar mensualmente para alcanzar tu meta?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input: Meta de Ahorro */}
              <div className="space-y-2">
                <Label htmlFor="savings-goal">Meta de Ahorro (COP)</Label>
                <Input
                  id="savings-goal"
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  placeholder="5000000"
                  className="text-lg"
                />
              </div>

              {/* Input: Tiempo en Meses */}
              <div className="space-y-2">
                <Label htmlFor="months">¿En cuántos meses quieres lograrlo?</Label>
                <Input
                  id="months"
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  placeholder="12"
                  className="text-lg"
                />
              </div>

              {/* Calculate Button */}
              <Button onClick={calculateSavings} className="w-full" size="lg">
                Calcular Aporte Mensual
              </Button>

              {/* Result */}
              {monthlyRequired > 0 && (
                <div className="mt-6 p-6 rounded-lg bg-primary/10 border-2 border-primary/20 animate-fade-in-up">
                  <p className="text-sm text-muted-foreground mb-2">Necesitas ahorrar mensualmente:</p>
                  <p className="text-4xl font-bold text-primary mb-1">{formatCurrency(monthlyRequired)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Durante {months} {parseInt(months) === 1 ? 'mes' : 'meses'} para alcanzar {formatCurrency(parseFloat(savingsGoal))}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Calculadora 50/30/20 */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-success/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <TrendingUp className="size-6 text-success" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Regla 50/30/20
                <Sparkles className="size-4 text-warning animate-pulse" />
              </CardTitle>
              <CardDescription>Distribuye tus ingresos de forma inteligente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input: Ingreso Mensual */}
              <div className="space-y-2">
                <Label htmlFor="monthly-income">Ingreso Mensual (COP)</Label>
                <Input
                  id="monthly-income"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="2500000"
                  className="text-lg"
                />
              </div>

              {/* Calculate Button */}
              <Button onClick={calculate503020} variant="default" className="w-full" size="lg">
                Calcular Distribución
              </Button>

              {/* Results */}
              {needs > 0 && (
                <div className="space-y-3 animate-fade-in-up">
                  {/* Necesidades 50% */}
                  <div className="p-4 rounded-lg bg-info/10 border border-info/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Necesidades</span>
                      <span className="text-xs text-muted-foreground">50%</span>
                    </div>
                    <p className="text-2xl font-bold text-info">{formatCurrency(needs)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Vivienda, comida, transporte</p>
                  </div>

                  {/* Deseos 30% */}
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Deseos</span>
                      <span className="text-xs text-muted-foreground">30%</span>
                    </div>
                    <p className="text-2xl font-bold text-warning">{formatCurrency(wants)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Entretenimiento, salidas, hobbies</p>
                  </div>

                  {/* Ahorros 20% */}
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">Ahorros e Inversión</span>
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                    <p className="text-2xl font-bold text-success">{formatCurrency(savings)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Fondo de emergencia, inversiones</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA to App */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Te gustaron las calculadoras? En la app tienes muchas más herramientas 🎉
          </p>
          <Button size="lg" className="gap-2">
            Probar en Modo Demo
            <Sparkles className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Tools;
