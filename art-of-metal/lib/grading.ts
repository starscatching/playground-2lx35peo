export interface GradingQuestion {
  id: string;
  category: string;
  question: string;
  options: string[]; // index 0 = best condition, index 3 = worst
}

export const GRADING_QUESTIONS: GradingQuestion[] = [
  {
    id: "circulation",
    category: "Circulation Status",
    question: "Has this coin ever been used as money — passed hand to hand, spent, or circulated?",
    options: [
      "Never circulated — went straight into a collection or holder",
      "Possibly circulated very briefly, but looks nearly untouched",
      "Yes, it circulated — you can see wear from use",
      "Yes, heavily circulated — well worn from years of use",
    ],
  },
  {
    id: "luster",
    category: "Mint Luster",
    question: "How much original mint luster remains on the surfaces?",
    options: [
      "Full, brilliant luster across the whole coin",
      "Most areas still show luster, a little dulling",
      "Luster is faded but still visible in places",
      "No luster remains — surfaces are dull or worn flat",
    ],
  },
  {
    id: "marks",
    category: "Marks & Scratches",
    question: "How many visible marks, nicks, or scratches are on the main surfaces?",
    options: [
      "None visible, even under magnification",
      "A few small, hard-to-notice marks",
      "Several noticeable marks or hairlines",
      "Heavy marks or scratches throughout",
    ],
  },
  {
    id: "strike",
    category: "Strike Quality",
    question: "How sharp are the design details — hair, feathers, lettering?",
    options: [
      "Full, sharp strike everywhere",
      "Mostly sharp with minor softness in one area",
      "Noticeably soft or mushy in places",
      "Very weak or flat strike overall",
    ],
  },
  {
    id: "appeal",
    category: "Eye Appeal",
    question: "How would you describe the coin's overall eye appeal?",
    options: [
      "Exceptional — vibrant color and contrast",
      "Above average, pleasing to look at",
      "Average, acceptable but unremarkable",
      "Poor — dull, spotted, or unattractive",
    ],
  },
  {
    id: "cleaning",
    category: "Cleaning / Alteration",
    question: "Has the coin been cleaned, polished, dipped, or otherwise altered?",
    options: [
      "Definitely not — natural, undisturbed surfaces",
      "Possibly, but I'm not certain",
      "Yes, I can see faint hairlines from cleaning",
      "Yes, obviously polished or altered",
    ],
  },
  {
    id: "rim",
    category: "Rim & Edge",
    question: "What is the condition of the rim and edge?",
    options: [
      "Full, sharp rim all the way around",
      "Minor flatness on the rim in a spot or two",
      "Noticeable rim wear",
      "Rim is worn down into the design",
    ],
  },
  {
    id: "overall",
    category: "Overall Preservation",
    question: "Taking everything together, how would you rate its overall preservation?",
    options: [
      "Virtually as struck",
      "Lightly worn, high detail remains",
      "Moderately worn, major details still clear",
      "Heavily worn, or damaged",
    ],
  },
];

export interface GradeResult {
  grade: string;
  label: string;
  detailsFlag: boolean;
}

export function computeGrade(answers: number[]): GradeResult {
  const score = answers.reduce((sum, a) => sum + (3 - a), 0); // max 24
  const cleaningAnswer = answers[5]; // "cleaning" question index
  const detailsFlag = cleaningAnswer >= 2;

  let grade: string;
  let label: string;
  if (score >= 22) { grade = "MS-65"; label = "Gem Uncirculated"; }
  else if (score >= 18) { grade = "MS-63"; label = "Choice Uncirculated — uncirculated with a few noticeable marks or blemishes."; }
  else if (score >= 14) { grade = "AU-55"; label = "About Uncirculated — trace of wear on the highest points."; }
  else if (score >= 10) { grade = "XF-40"; label = "Extremely Fine — light wear, all major details sharp."; }
  else if (score >= 6) { grade = "VF-25"; label = "Very Fine — moderate wear, design fully visible."; }
  else if (score >= 3) { grade = "F-12"; label = "Fine — heavier wear, major features still clear."; }
  else { grade = "G-4"; label = "Good — heavily worn, outline visible."; }

  return { grade, label, detailsFlag };
}

export const CARD_STYLES = [
  { id: "copper", name: "Copper", desc: "Classic copper warmth. Lincoln & Indian Head.", swatch: "linear-gradient(90deg, #b87333, #6b3a12)" },
  { id: "platinum", name: "Platinum", desc: "Cool steel elegance. Modern bullion series.", swatch: "linear-gradient(90deg, #c8ccd6, #6a7180)" },
  { id: "gold", name: "Gold", desc: "Rich gold luxury. Premium collector aesthetic.", swatch: "linear-gradient(90deg, #f2cc50, #8a7220)" },
  { id: "antique", name: "Antique", desc: "Aged parchment. Pre-1900 numismatic heritage.", swatch: "linear-gradient(90deg, #d8c48a, #6b5a34)" },
  { id: "vibrant", name: "Vibrant", desc: "Bold color. Modern commemoratives.", swatch: "linear-gradient(90deg, #a855f7, #3b82f6)" },
] as const;
