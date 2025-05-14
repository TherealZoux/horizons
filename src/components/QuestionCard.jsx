
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QuestionCard = ({ question, options, value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">{question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
