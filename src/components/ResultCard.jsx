
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResultCard = ({ skinType, characteristics, recommendations, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="glass-card overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-blue-400 to-purple-500"></div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold">Your Skin Analysis Results</CardTitle>
          <CardDescription className="text-lg">
            Based on your answers, your skin type is:
          </CardDescription>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-2"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-primary">{skinType}</h2>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2">Characteristics:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {characteristics.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2">Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-4 text-center"
          >
            <Button onClick={onReset} size="lg">
              Take the Test Again
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
