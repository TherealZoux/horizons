import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const quizQuestions = [
  {
    id: "q1",
    question: "After the 30-minute wait, did your skin feel tight, rough, or flaky, especially when you smiled or made facial expressions?",
    options: [
      { value: "yes", label: "Yes, it felt tight or flaky" },
      { value: "no", label: "No, it felt comfortable" }
    ]
  },
  {
    id: "q2",
    question: "Did your face look shiny, or did you notice oiliness, particularly on your forehead, nose, and chin (the T-zone)?",
    options: [
      { value: "yes", label: "Yes, it looked shiny or felt oily" },
      { value: "no", label: "No, it wasn't particularly shiny or oily" }
    ]
  },
  {
    id: "q3",
    question: "Did you notice oiliness specifically in your T-zone (forehead, nose, chin) while your cheeks felt normal or even dry?",
    options: [
      { value: "yes", label: "Yes, my T-zone was oily but cheeks were not" },
      { value: "no", label: "No, that doesn't describe my skin" }
    ]
  },
  {
    id: "q4",
    question: "Did your skin generally feel balanced and comfortable – not too oily, not too dry?",
    options: [
      { value: "yes", label: "Yes, it felt balanced" },
      { value: "no", label: "No, it didn't feel balanced" }
    ]
  },
  {
    id: "q5",
    question: "Thinking about your general experience, does your skin often react easily to new skincare products, showing signs like redness, itching, burning, or rashes?",
    options: [
      { value: "yes", label: "Yes, my skin reacts easily" },
      { value: "no", label: "No, my skin doesn't usually react like that" }
    ]
  }
];

const preparationSteps = [
  "Wash your face gently with your usual cleanser.",
  "Pat it dry carefully using a soft, clean towel. Avoid rubbing.",
  "Wait for 30 minutes. Don't apply any products (like moisturizers or serums) during this time.",
  "After 30 minutes, take a close look at your skin in a mirror under good lighting. Observe how it feels and looks."
];

function Quiz() {
  const [step, setStep] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const determineResult = () => {
    if (answers.q1 === "yes") return "Dry Skin";
    if (answers.q2 === "yes") return "Oily Skin";
    if (answers.q3 === "yes") return "Combination Skin";
    if (answers.q4 === "yes") return "Normal Skin";
    if (answers.q5 === "yes") return "Sensitive Skin";
    return "Normal Skin";
  };

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [quizQuestions[currentQuestion].id]: value }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setResult(determineResult());
      setStep("result");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen quiz-section py-12">
      <div className="max-w-3xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="font-marcellus text-4xl mb-6">Discover Your True Skin Type</h1>
              <p className="text-lg mb-8">
                Just a few questions stand between you and skincare that actually works.
                Let's find the perfect routine for you. No email required.
              </p>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>First, Let's Prep Your Skin</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {preparationSteps.map((stepText, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF1B6D] text-white flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span>{stepText}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Button className="btn-primary" onClick={() => setStep("questions")}>Start the Quiz</Button>
            </motion.div>
          )}

          {step === "questions" && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {quizQuestions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    key={quizQuestions[currentQuestion].id}
                    value={answers[quizQuestions[currentQuestion].id]}
                    onValueChange={handleAnswer}
                    className="space-y-4"
                  >
                    {quizQuestions[currentQuestion].options.map((option) => {
                      const optionId = `${quizQuestions[currentQuestion].id}-${option.value}`;
                      return (
                        <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <RadioGroupItem value={option.value} id={optionId} />
                          <Label htmlFor={optionId} className="flex-1 cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
                        Previous
                      </Button>
                      <Button className="btn-primary" onClick={goToNextQuestion}>
                        {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
                      </Button>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-3xl mb-4">Your Skin Profile: {result}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-6">
                    Based on your answers, we've identified your skin type.
                    Let's explore the perfect skincare routine for you.
                  </p>
                  <div className="space-y-4">
                    <Button className="btn-primary w-full" size="lg">
                      See Your Personalized Routine & Product Matches
                    </Button>
                    <div className="flex justify-center space-x-4 mt-4">
                      <Button variant="outline" onClick={() => setStep("questions")}>Review Answers</Button>
                      <Button variant="outline" onClick={() => {
                        setStep("intro");
                        setCurrentQuestion(0);
                        setAnswers({});
                        setResult(null);
                      }}>
                        Take Test Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Quiz;

