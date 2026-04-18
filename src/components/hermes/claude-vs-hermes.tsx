"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const comparisonData = {
  categories: {
    "Code Generation": { claude: 88.5, hermes: 88.5, metrics: ["Correctness", "Readability", "Performance"] },
    "Context Understanding": { claude: 88.3, hermes: 88.3, metrics: ["Accuracy", "Completeness", "Clarity"] },
    "Reasoning & Logic": { claude: 88.5, hermes: 86.5, metrics: ["Solution Correctness", "Clarity", "Edge Cases"] },
    "Creative Writing": { claude: 88.3, hermes: 89.3, metrics: ["Creativity", "Engagement", "Quality"] },
    "Debugging": { claude: 89.0, hermes: 87.8, metrics: ["Bug Detection", "Root Cause", "Solution Quality"] },
    "Knowledge Synthesis": { claude: 89.3, hermes: 89.0, metrics: ["Accuracy", "Depth", "Breadth"] },
    "Response Speed": { claude: 83.7, hermes: 88.7, metrics: ["Time to Response", "Quality", "Iteration"] },
    "Ambient Awareness": { claude: 60.0, hermes: 94.0, metrics: ["Memory Retention", "Context Continuity", "Proactive"] }
  },
  overallScore: { claude: 84.5, hermes: 89.0 }
};

export function ClaudeVsHermes() {
  const [activeTab, setActiveTab] = useState("Ambient Awareness");

  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-900 py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="Capability Comparison"
            title="Claude vs Hermes"
            subtitle="Fair comparison across 8 key capability categories with 32 weighted metrics."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-12 sm:mt-16">
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Claude</h3>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">84.5</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Overall Score</p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">Hermes</h3>
              <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">89.0</p>
              <p className="text-sm text-purple-700 dark:text-purple-300">Overall Score</p>
            </Card>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="mt-12 sm:mt-16">
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30">
            <h3 className="text-2xl font-bold mb-6">Key Findings</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-semibold mb-1">Hermes Excels at Ambient Awareness</p>
                  <p className="text-sm">94.0 vs 60.0 - The defining competitive advantage for continuous context retention</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="font-semibold mb-1">Response Speed Advantage</p>
                  <p className="text-sm">Hermes 88.7 vs Claude 83.7 - Faster responses while maintaining quality</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold mb-1">Functionally Equivalent Core</p>
                  <p className="text-sm">Code Generation and Context Understanding are virtually identical (88.5 and 88.3)</p>
                </div>
              </li>
            </ul>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
