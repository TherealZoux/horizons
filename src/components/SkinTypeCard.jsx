
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SkinTypeCard = ({ title, description, image, onClick, isSelected }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card 
        onClick={onClick} 
        className={`skin-card cursor-pointer h-full ${
          isSelected 
            ? "ring-2 ring-primary border-primary" 
            : "hover:border-primary/50"
        }`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md overflow-hidden mb-2">
            {image}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkinTypeCard;
