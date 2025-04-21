"use client";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { parseStat } from "@/helper/parseStat";
import { TStatisticBlock } from "@/interfaces";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const StatisticBlock = ({ block }: { block: TStatisticBlock }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div ref={ref} className="bg-[#434A54] text-white py-16">
      <PaddingContainer className="mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {block.item.statstics.map((goal, index) => {
            const { number, prefix, suffix } = goal.value
              ? parseStat(goal.value.toString())
              : { number: 0, prefix: "", suffix: "" };

            return (
              <div key={index}>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={number}
                      duration={2}
                      prefix={prefix}
                      suffix={suffix}
                    />
                  ) : (
                    `${prefix}0${suffix}`
                  )}
                </h3>
                <p className="text-sm md:text-base">{goal.label}</p>
              </div>
            );
          })}
        </div>
      </PaddingContainer>
    </motion.div>
  );
};

export default StatisticBlock;
