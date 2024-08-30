"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Delete, Percent } from "lucide-react";
import { motion } from "framer-motion";

export default function Component() {
  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [operation, setOperation] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [isNewCalculation, setIsNewCalculation] = useState(true);

  const handleNumberClick = (num: string) => {
    if (isNewCalculation || display === "0" || operation) {
      setDisplay(num);
      setCurrentValue(num);
      setIsNewCalculation(false);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (currentValue) {
      setOperation(op);
      setPreviousValue(currentValue);
      setCurrentValue("");
    }
  };

  const handleEqualsClick = () => {
    if (currentValue && previousValue && operation) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(currentValue);
      let result = 0;

      switch (operation) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          if (current === 0) {
            setDisplay("Error");
            setIsNewCalculation(true);
            return;
          }
          result = prev / current;
          break;
        case "%":
          result = (prev * current) / 100;
          break;
      }

      setDisplay(result.toString());
      setCurrentValue(result.toString());
      setPreviousValue("");
      setOperation("");
      setIsNewCalculation(true);
    }
  };

  const handleClearClick = () => {
    setDisplay("0");
    setCurrentValue("");
    setPreviousValue("");
    setOperation("");
    setIsNewCalculation(true);
  };

  const handleBackspace = () => {
    if (currentValue.length > 1) {
      const newValue = currentValue.slice(0, -1);
      setCurrentValue(newValue);
      setDisplay(newValue);
    } else {
      setCurrentValue("0");
      setDisplay("0");
    }
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes(".")) {
      const newValue = currentValue ? currentValue + "." : "0.";
      setCurrentValue(newValue);
      setDisplay(newValue);
    }
  };

  const handlePercentageClick = () => {
    if (currentValue) {
      const result = parseFloat(currentValue) / 100;
      setCurrentValue(result.toString());
      setDisplay(result.toString());
    }
  };

  const handleToggleSign = () => {
    if (currentValue) {
      const newValue = parseFloat(currentValue) * -1;
      setCurrentValue(newValue.toString());
      setDisplay(newValue.toString());
    }
  };
  const variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-6">
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <h1 className="text-4xl font-bold text-white mb-6">Calculator</h1>
        <Card className="w-full max-w-sm mx-auto">
          <CardContent className="pt-4">
            <Input
              className="text-right text-2xl mb-4"
              value={display}
              readOnly
            />
            <div className="grid grid-cols-4 gap-2">
              <Button onClick={handleClearClick} variant="destructive">
                C
              </Button>
              <Button onClick={handleToggleSign} variant="secondary">
                +/-
              </Button>
              <Button onClick={handlePercentageClick} variant="secondary">
                <Percent className="h-4 w-4" />
              </Button>
              <Button onClick={handleBackspace} variant="secondary">
                <Delete className="h-4 w-4" />
              </Button>

              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                <Button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  variant="outline"
                >
                  {num}
                </Button>
              ))}
              <Button
                onClick={() => handleOperationClick("+")}
                variant="secondary"
              >
                +
              </Button>
              <Button
                onClick={() => handleOperationClick("-")}
                variant="secondary"
              >
                -
              </Button>
              <Button
                onClick={() => handleOperationClick("*")}
                variant="secondary"
              >
                ×
              </Button>
              <Button
                onClick={() => handleOperationClick("/")}
                variant="secondary"
              >
                ÷
              </Button>

              <Button
                onClick={() => handleNumberClick("0")}
                variant="outline"
                className="col-span-2"
              >
                0
              </Button>
              <Button onClick={handleDecimalClick} variant="outline">
                .
              </Button>
              <Button onClick={handleEqualsClick} variant="default">
                =
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
