import fs from "fs";
import path from "path";

export interface CourseConfig {
  id: string;
  name: string;
  durationMinutes: number;
  totalQuestions: number;
  marksPerCorrectAnswer: number;
  totalMarks: number;
  passingScorePercentage: number;
  minimumPassingMarks: number;
  courseFee: number;
  currency: string;
  category: string;
  disclaimer: string;
}

export const COURSE_CONFIG: CourseConfig = {
  id: "cpd-basic-awareness",
  name: "Child Psychology & Development – Basic Awareness",
  durationMinutes: 10,
  totalQuestions: 10,
  marksPerCorrectAnswer: 1,
  totalMarks: 10,
  passingScorePercentage: 50,
  minimumPassingMarks: 5,
  courseFee: 250,
  currency: "INR",
  category: "Non-Formal Educational Awareness",
  disclaimer:
    "This certificate acknowledges successful completion of a non-formal educational awareness quiz. It does not represent a professional qualification, licence, government-accredited academic credential, or university degree.",
};

export interface QuizQuestionServer {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizQuestionClient {
  id: number;
  question: string;
  options: string[];
}

export const QUESTION_BANK: QuizQuestionServer[] = [
  {
    id: 1,
    question: "A 4-year-old child starts screaming and throwing items in a supermarket aisle because the parent refused to buy candy. What is the most psychologically sound response in that immediate moment?",
    options: [
      "Immediately buy the candy to avoid making a public scene",
      "Stay calm, lower to child's eye level, acknowledge their disappointment ('I know you really want candy, but we are not buying candy today'), and move to a quieter space with gentle boundaries",
      "Shout back at the child and threaten severe punishment at home",
      "Walk away and hide behind a grocery shelf to teach the child a lesson",
    ],
    correctAnswerIndex: 1,
    explanation: "Co-regulation and calm, empathetic boundary-setting teach emotional regulation while reassuring the child of connection.",
  },
  {
    id: 2,
    question: "A 7-year-old child comes home from school in tears, saying: 'My best friend sat with someone else at lunch, nobody likes me!' What is the most constructive initial reaction from a parent?",
    options: [
      "Brush it off immediately: 'Don't overreact, it's just one lunch session.'",
      "Immediately call the school principal to complain about the friend.",
      "Listen warmly without interrupting, validate their hurt feelings ('That must have felt lonely and upsetting'), and invite them to share more before problem-solving.",
      "Tell the child to sever ties and find brand new friends tomorrow.",
    ],
    correctAnswerIndex: 2,
    explanation: "Validating emotional pain before offering solutions creates safety and builds interpersonal resilience in school-age children.",
  },
  {
    id: 3,
    question: "A 5-year-old builds a tall wooden block tower that collapses, and the child kicks the blocks across the room shouting 'I hate this, I can't do anything!' How should an educator or parent intervene?",
    options: [
      "Send the child to a punitive timeout corner for shouting and kicking",
      "Validate the intense frustration ('It really hurts when something you worked so hard on falls down'), take a calm breath together, and support them when they are ready to try again",
      "Rebuild the entire tower for the child so they never experience failure",
      "Tell the child that building blocks is clearly not their strength",
    ],
    correctAnswerIndex: 1,
    explanation: "Empathizing with developmental frustration models self-soothing and helps transform frustration into perseverance.",
  },
  {
    id: 4,
    question: "Two siblings (ages 6 and 8) are pulling and yelling over a single tablet during weekend screen time. What response best fosters lasting conflict resolution skills?",
    options: [
      "Confiscate the device and permanently award it to the younger child",
      "Separate them briefly to calm their nervous systems, hear each child's perspective, and guide them to agree on an equitable turn-taking system or timer",
      "Ignore the yelling entirely so they learn to physically fight for what they want",
      "Tell both children they are bad kids and cancel their dinner",
    ],
    correctAnswerIndex: 1,
    explanation: "Facilitating restorative problem-solving empowers siblings with negotiation tools rather than relying on arbitrary parental fiat.",
  },
  {
    id: 5,
    question: "An 8-year-old child breaks their pencil in tears during math homework and says 'I am too stupid to ever learn fractions!' How can a caregiver best nurture a growth mindset?",
    options: [
      "Tell the child that math isn't important for real life anyway",
      "Reframe the struggle positively: 'Your brain is building strong new pathways right now. You haven't mastered fractions yet, but let's break this down into smaller steps together.'",
      "Complete the remaining homework questions for the child to end their stress",
      "Point out that their older sibling never had any issues with fractions",
    ],
    correctAnswerIndex: 1,
    explanation: "Using the 'power of yet' and scaffolding tasks promotes resilience and shields against internalizing self-limiting beliefs.",
  },
  {
    id: 6,
    question: "A 3-year-old refuses to sleep in their bed, crying that 'shadow monsters are in the closet'. What bedtime response provides optimal psychological security?",
    options: [
      "Take the child's fear seriously, calmly inspect the closet together, offer a soft nightlight or comfort toy, and provide steady reassurance that they are safe",
      "Laugh at the child and tell them that only babies get scared of shadows",
      "Lock the bedroom door from outside so the child learns to cry it out alone",
      "Threaten to take away their daytime toys if they do not sleep immediately",
    ],
    correctAnswerIndex: 0,
    explanation: "Honoring a toddler's vivid imagination with calm comfort and predictability fosters secure attachment and restful sleep.",
  },
  {
    id: 7,
    question: "When a parent announces that 30 minutes of tablet time is finished, a 6-year-old screams and refuses to hand over the device. What proactive strategy best reduces these recurring transitions?",
    options: [
      "Ban all digital devices permanently from the household",
      "Give predictable advance reminders (e.g., '5 minutes left in this level'), set a visible visual countdown timer together, and transition smoothly into an appealing offline activity",
      "Wrestle the tablet out of the child's hands while shouting louder than them",
      "Allow unlimited screen time so the child never gets frustrated",
    ],
    correctAnswerIndex: 1,
    explanation: "Visual timers and transitional rituals respect children's difficulty shifting attention and substantially reduce friction.",
  },
  {
    id: 8,
    question: "A 9-year-old child accidentally knocks over a full glass of milk, spilling it across the dinner table. What parental response develops emotional safety and personal responsibility?",
    options: [
      "Loudly scold the child in front of the family for being clumsy and careless",
      "Remain calm, acknowledge it as an ordinary accident, and invite the child to grab paper towels and help clean the spill together without shame",
      "Give the child the silent treatment for the rest of the evening",
      "Deprive the child of dinner as punishment for spilling",
    ],
    correctAnswerIndex: 1,
    explanation: "Treating mistakes as normal events coupled with collaborative cleanup teaches accountability without eroding self-worth.",
  },
  {
    id: 9,
    question: "A 10-year-old child arrives home from school noticeably quiet, goes straight to their bedroom, and avoids customary conversation. What is the most effective way to maintain connection?",
    options: [
      "Force open the bedroom door and interrogate the child until they speak",
      "Respect their need for immediate decompression, offer a warm snack or quiet joint activity, and gently let them know: 'I'm here whenever you'd like to talk.'",
      "Secretly search their personal belongings and diary for clues",
      "Completely ignore them for days until they decide to initiate conversation",
    ],
    correctAnswerIndex: 1,
    explanation: "Low-pressure presence gives older children space to regulate while signaling unconditional parental availability.",
  },
  {
    id: 10,
    question: "A preschool teacher notices a 4-year-old standing alone by the fence every day during outdoor play, watching other children with hesitation. What is the best pedagogical step?",
    options: [
      "Push the child into the center of a fast-paced tag game against their will",
      "Gently join the child near the perimeter, observe their interests, and gently scaffold parallel or partner play by inviting one gentle peer to join a low-pressure activity",
      "Announce to the entire playground that this child has no friends and needs help",
      "Ignore the situation completely, assuming solitary behavior requires no support",
    ],
    correctAnswerIndex: 1,
    explanation: "Scaffolding small social steps with peer allies allows hesitant or introverted children to build social self-efficacy safely.",
  },
  {
    id: 11,
    question: "A 10-year-old is caught lying about having finished their homework so they could play video games. What is the most constructive response?",
    options: [
      "Call them a chronic liar and take away all privileges for an entire year",
      "Pretend you didn't notice to avoid an unpleasant household confrontation",
      "Address the behavior calmly, explore what made them feel the need to lie (fear or avoidance), uphold the homework boundary, and explain why honesty protects trust",
      "Post about the lie on social media to teach accountability",
    ],
    correctAnswerIndex: 2,
    explanation: "Understanding the motive behind lying helps children choose truthfulness without inducing shame-based defensiveness.",
  },
  {
    id: 12,
    question: "At a daycare, a 2.5-year-old bites another toddler during a dispute over a toy train. What is the caregiver's immediate and primary focus?",
    options: [
      "Bite the toddler back so they understand how pain feels",
      "Ensure the bitten child is comforted and cared for first, then firmly tell the biter with a neutral tone: 'Biting hurts. Teeth are for chewing, not biting,' and teach alternative ways to ask for a toy",
      "Put the biter in an isolated dark room for an hour",
      "Expel the child immediately from the daycare program",
    ],
    correctAnswerIndex: 1,
    explanation: "Immediate empathy for the victim combined with clear, non-shaming coaching on physical boundaries guides toddler impulse control.",
  },
  {
    id: 13,
    question: "A 7-year-old complains of severe stomachaches every Sunday evening before school, but a pediatrician confirms no physical illness. What should parents and educators investigate?",
    options: [
      "Potential emotional stressors at school, such as academic difficulty, bullying, separation anxiety, or sensory overwhelm",
      "Assume the child is purely manipulative and force them to do double household chores",
      "Stop sending the child to school permanently",
      "Give the child adult medication without medical advice",
    ],
    correctAnswerIndex: 0,
    explanation: "Somatic symptoms in young children often signal unvoiced anxiety or school-related social/academic distress.",
  },
  {
    id: 14,
    question: "A 2-year-old toddler enters a phase of saying 'NO!' to almost every parental request (putting on shoes, getting in car). What developmental need does this signify?",
    options: [
      "Innate malicious defiance that must be broken with harsh physical punishment",
      "A sign of severe developmental regression that requires medication",
      "A normal emerging desire for autonomy and independence, best handled by offering two acceptable choices (e.g., 'Do you want red shoes or blue shoes today?')",
      "Lack of cognitive ability in understanding human language",
    ],
    correctAnswerIndex: 2,
    explanation: "Offering controlled choices honors a toddler's healthy drive for autonomy while preserving parental leadership.",
  },
  {
    id: 15,
    question: "A 12-year-old expresses deep insecurity about their appearance after comparing themselves to heavily filtered peers on social media. How should a parent intervene?",
    options: [
      "Dismiss their worries with: 'You're too young to care about how you look.'",
      "Have open discussions about digital curation and photo filters, praise internal values and capabilities, and establish healthy digital limits together",
      "Book cosmetic appointments to fix whatever the child complains about",
      "Confiscate and smash their smartphone in front of them",
    ],
    correctAnswerIndex: 1,
    explanation: "Digital media literacy and emphasizing character over appearance protect adolescent self-esteem against comparison culture.",
  },
  {
    id: 16,
    question: "A 6-year-old is terrified of falling and refuses to try riding a bicycle without training wheels. What approach best builds genuine courage?",
    options: [
      "Push the bicycle down a steep hill so they have no choice but to balance",
      "Break the skill down into safe micro-steps (e.g., balance bike mode without pedals), celebrate small efforts, and provide emotional safety while practicing",
      "Tease the child by pointing out younger neighborhood kids who already ride",
      "Give up and sell the bicycle immediately",
    ],
    correctAnswerIndex: 1,
    explanation: "Gradual exposure and positive reinforcement help children overcome fear by expanding their comfort zone incrementally.",
  },
  {
    id: 17,
    question: "During a family reunion, a hesitant 3-year-old hides behind a parent's legs and refuses to hug visiting relatives. How should the parent respond?",
    options: [
      "Physically force the child to hug everyone to avoid offending adults",
      "Scold the child publicly for being disrespectful and rude",
      "Respect the child's bodily autonomy and comfort level, explain kindly to relatives ('She takes a little time to warm up'), and offer a high-five or wave as a comfortable alternative",
      "Leave the reunion immediately and blame the child",
    ],
    correctAnswerIndex: 2,
    explanation: "Teaching bodily autonomy from an early age helps children understand consent and builds trust with caregivers.",
  },
  {
    id: 18,
    question: "An 8-year-old flips a board game over in anger after losing to their sibling and storms out of the room. How can parents coach healthy sportsmanship?",
    options: [
      "Always let the child win every game in the future to keep the peace",
      "Wait until emotions cool, empathize with how hard losing feels, and practice reframing games around shared fun, learning, and acknowledging opponents gracefully",
      "Ban board games forever in the house",
      "Mock the child for being a sore loser",
    ],
    correctAnswerIndex: 1,
    explanation: "Normalizing the sting of loss during calm moments teaches emotional regulation and healthy peer competition.",
  },
  {
    id: 19,
    question: "A 13-year-old begins communicating with rolling eyes and brief monosyllabic answers ('fine', 'whatever'). What parental approach best keeps communication channels open?",
    options: [
      "Stay steady and calm, avoid escalating minor irritations into power struggles, and consistently initiate low-pressure connection during shared routines like driving or meals",
      "Match their sarcasm and insult them back",
      "Demand 2-hour formal lectures every evening where the child is forced to recite their thoughts",
      "Cut off all communication completely",
    ],
    correctAnswerIndex: 0,
    explanation: "Maintaining non-reactive warmth during adolescent individuation keeps the relational bridge intact.",
  },
  {
    id: 20,
    question: "A 5-year-old asks repeatedly where their late grandfather is and whether he will come back for their birthday. How should caregivers communicate about death with young children?",
    options: [
      "Use vague euphemisms like 'Grandpa is just sleeping for a long time' or 'he went on a long vacation'",
      "Use clear, honest, and age-appropriate language ('Grandpa died, which means his body stopped working and he doesn't feel pain anymore'), reassure the child of their own safety, and invite memories",
      "Tell the child that asking questions about deceased relatives is bad luck",
      "Refuse to answer and change the subject quickly",
    ],
    correctAnswerIndex: 1,
    explanation: "Literal, compassionate clarity prevents confusing sleep or travel with mortality, reducing childhood anxiety.",
  },
  {
    id: 21,
    question: "A 9-year-old is found with stationery items taken from a classmate's desk without permission. What restorative discipline teaches integrity?",
    options: [
      "Brand the child a thief and report them to the police",
      "Quietly return the items yourself so the child never knows you found out",
      "Help the child reflect on how the other child felt when missing their items, accompany them to return the items with a sincere apology, and discuss respect for personal property",
      "Take all of the child's own possessions and throw them in the trash",
    ],
    correctAnswerIndex: 2,
    explanation: "Restorative justice focuses on repairing harm and understanding the impact of actions rather than inflicting punitive shame.",
  },
  {
    id: 22,
    question: "A 6-year-old wakes up at 2 AM screaming from a nightmare after accidentally viewing scary trailers on television. How should the caregiver calm the child?",
    options: [
      "Tell the child to stop acting childish because it was just television",
      "Hold the child close, regulate their breathing through warmth and physical presence, reassure them that they are safe in their bed, and guide their mind to comforting imagery",
      "Force the child to watch the scary trailer again to desensitize them",
      "Turn off all lights and leave them alone in the bedroom",
    ],
    correctAnswerIndex: 1,
    explanation: "Physical grounding and vocal soothing help soothe the activated amygdala after vivid frightening dreams.",
  },
  {
    id: 23,
    question: "An 11-year-old discovers that their close friend group created a messaging chat without including them. How can a parent provide emotional coaching?",
    options: [
      "Call the parents of all group members and threaten legal action",
      "Hold space for their grief and feelings of rejection, remind them that their worth isn't dictated by group chats, and help them cultivate diverse friendships and outside interests",
      "Tell the child that they must have done something wrong to deserve it",
      "Create a fake account to infiltrate the group chat",
    ],
    correctAnswerIndex: 1,
    explanation: "Validating social pain while widening relational circles prevents adolescents from deriving identity from a single peer clique.",
  },
  {
    id: 24,
    question: "A 4-year-old becomes aggressive and begins hitting peers after 2 hours at an overcrowded indoor trampoline park with flashing lights and loud music. What is the most probable trigger?",
    options: [
      "The child was born with an aggressive personality",
      "The child lacks moral values",
      "Sensory overload and nervous system dysregulation, indicating the child needs a quiet retreat, hydration, and gentle transition home",
      "The child was secretly hungry for more candy",
    ],
    correctAnswerIndex: 2,
    explanation: "Young children often communicate neurological sensory exhaustion through tantrums or physical hitting.",
  },
  {
    id: 25,
    question: "A stressed parent loses patience and yells loudly at their 7-year-old over a spilled bowl of cereal. After calming down, what is the best step for emotional repair?",
    options: [
      "Pretend nothing happened and buy the child an expensive toy as compensation",
      "Model accountability by apologizing sincerely ('I was feeling overwhelmed, but yelling at you was not okay. It wasn't your fault, and I love you'), reinforcing emotional repair",
      "Blame the child for provoking the yelling",
      "Demand the child apologize for making the parent yell",
    ],
    correctAnswerIndex: 1,
    explanation: "Rupture and repair is fundamental in healthy parenting; taking ownership shows children that relationships survive mistakes.",
  },
  {
    id: 26,
    question: "An 8-year-old shows extreme perfectionism, erasing and rewriting the same sentence in a notebook until the paper tears and they sob in despair. How can a mentor help?",
    options: [
      "Empathize with their desire to do well, intentionally model that mistakes are essential stepping stones for learning, and establish 'good enough' milestones",
      "Tell them to erase it again until it is 100% flawless",
      "Rip the notebook up and forbid them from ever writing again",
      "Tell them that making mistakes means they are failing",
    ],
    correctAnswerIndex: 0,
    explanation: "Perfectionism is rooted in anxiety; de-escalating expectations and normalizing flaws builds psychological flexibility.",
  },
  {
    id: 27,
    question: "A 10-year-old wants to drop out of swimming classes after the third session because the water feels cold and the drills are tiring. How should parents balance perseverance with autonomy?",
    options: [
      "Force them to swim competitively for the next 10 years regardless of tears",
      "Acknowledge the physical discomfort, agree on a reasonable short-term commitment (e.g., finish the pre-paid introductory month), and reassess together without shaming",
      "Immediately withdraw them the second they express any discomfort",
      "Compare them to Olympic athletes and call them lazy",
    ],
    correctAnswerIndex: 1,
    explanation: "Short-term commitments foster grit while honoring autonomy once the agreed milestone is completed.",
  },
  {
    id: 28,
    question: "Two toddlers (ages 2 and 3) want the same ride-on tricycle on the playground. How should an educator facilitate sharing at this developmental stage?",
    options: [
      "Demand that the child currently riding give it up immediately without notice",
      "Let the toddlers physically wrestle until one gives up",
      "Acknowledge both children's desires, inform the waiting child: 'Sam is riding now, when the bell rings in 2 minutes it will be your turn,' and offer an engaging interim toy",
      "Lock the tricycle in a storage shed so nobody gets to use it",
    ],
    correctAnswerIndex: 2,
    explanation: "Toddlers do not possess innate turn-taking; clear timers and bridge activities teach waiting without resentment.",
  },
  {
    id: 29,
    question: "A 3-year-old experiences acute separation anxiety at morning preschool drop-off, crying and clinging to the parent's coat. What arrival routine supports emotional security?",
    options: [
      "Sneak away quietly while the child is looking away so they don't notice",
      "Establish a warm, predictable goodbye ritual (e.g., a hug, kiss in the palm, and reassuring phrase: 'I always come back for you at lunchtime'), handover to a caring teacher, and depart with confidence",
      "Stay in the classroom the entire day every single day",
      "Scold the child for crying in front of other students",
    ],
    correctAnswerIndex: 1,
    explanation: "Sneaking away destroys trust; predictable, loving departures with dependable reunion cues instill security.",
  },
  {
    id: 30,
    question: "An 11-year-old asks for their own private smartphone, arguing that 'all my classmates have one and I'm the only outsider.' How should parents establish a healthy digital policy?",
    options: [
      "Buy the latest smartphone immediately with zero privacy controls or guidelines",
      "Acknowledge the social pressure empathetically, co-create clear digital boundaries (device curfews, common-room charging, safety discussions), or consider a basic communication tool first",
      "Tell the child they can never use the internet until age 25",
      "Give them an unmonitored smartphone but secretly track their microphone 24/7 without their knowledge",
    ],
    correctAnswerIndex: 1,
    explanation: "Collaborative boundary-setting paired with empathy balances adolescent social needs with developmental safety.",
  },
];

export interface CandidateRegistration {
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  agreedToTerms: boolean;
  registeredAt: string;
  status: "registered" | "paid" | "completed";
  assignedQuestionIds?: number[];
}

export interface PaymentRecord {
  paymentId: string;
  registrationId: string;
  amount: number;
  currency: string;
  status: "verified" | "failed" | "cancelled" | "pending";
  transactionRef: string;
  paymentMode: "sandbox_test";
  paidAt?: string;
  notes?: string;
}

export interface QuizAttempt {
  attemptId: string;
  registrationId: string;
  paymentId: string;
  startedAt: string;
  submittedAt: string;
  durationSeconds: number;
  answers: Record<number, number>; // questionId -> chosenOptionIndex
  scoreMarks: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeExpired: boolean;
  evaluatedAt: string;
  testScenarioLabel?: string;
  assignedQuestionIds?: number[];
}

export interface CertificateRecord {
  certificateId: string;
  attemptId: string;
  registrationId: string;
  candidateName: string;
  courseName: string;
  scoreMarks: number;
  totalMarks: number;
  scorePercentage: number;
  issueDate: string;
  status: "TEST PREVIEW – NOT VALID FOR OFFICIAL USE";
  watermark: "TEST PREVIEW – NOT VALID FOR OFFICIAL USE";
  disclaimer: string;
  isTestPreview: boolean;
  theme: "luxury_black_gold";
  createdAt: string;
}

interface QuizStorageData {
  registrations: CandidateRegistration[];
  payments: PaymentRecord[];
  attempts: QuizAttempt[];
  certificates: CertificateRecord[];
}

let inMemoryData: QuizStorageData = {
  registrations: [],
  payments: [],
  attempts: [],
  certificates: [],
};

const getStorageFilePath = () => {
  return path.join(process.cwd(), "src", "data", "quiz_certification_store.json");
};

const ensureStorageReady = () => {
  try {
    const dirPath = path.join(process.cwd(), "src", "data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = getStorageFilePath();
    if (!fs.existsSync(filePath)) {
      const initial: QuizStorageData = {
        registrations: [],
        payments: [],
        attempts: [],
        certificates: [],
      };
      fs.writeFileSync(filePath, JSON.stringify(initial, null, 2), "utf-8");
      inMemoryData = initial;
    }
  } catch (err) {
    console.log("[QuizStorage] Init warning:", err);
  }
};

export const getQuizData = (): QuizStorageData => {
  try {
    ensureStorageReady();
    const filePath = getStorageFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        inMemoryData = {
          registrations: parsed.registrations || [],
          payments: parsed.payments || [],
          attempts: parsed.attempts || [],
          certificates: parsed.certificates || [],
        };
      }
    }
  } catch (err) {
    console.log("[QuizStorage] Read error fallback to memory:", err);
  }
  return inMemoryData;
};

export const saveQuizData = (data: QuizStorageData) => {
  try {
    inMemoryData = data;
    ensureStorageReady();
    const filePath = getStorageFilePath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.log("[QuizStorage] Save error fallback:", err);
  }
};

// Safe client question bank generator (strips out answer keys)
export const getClientQuestions = (assignedQuestionIds?: number[]): QuizQuestionClient[] => {
  let targetBank: QuizQuestionServer[];
  if (assignedQuestionIds && assignedQuestionIds.length > 0) {
    targetBank = assignedQuestionIds
      .map((id) => QUESTION_BANK.find((q) => q.id === id))
      .filter((q): q is QuizQuestionServer => Boolean(q));
  } else {
    // Default to first 10 for consistency and tests
    targetBank = QUESTION_BANK.slice(0, 10);
  }
  return targetBank.map((q) => ({
    id: q.id,
    question: q.question,
    options: [...q.options],
  }));
};

// Generate 10 randomized situational questions from the 30-question bank (prevents repeating fixed questions)
export const getRandomizedQuestions = (excludeIds: number[] = []): QuizQuestionClient[] => {
  const pool = [...QUESTION_BANK];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const preferred = pool.filter((q) => !excludeIds.includes(q.id));
  const selected = preferred.length >= 10 ? preferred.slice(0, 10) : pool.slice(0, 10);
  return selected.map((q) => ({
    id: q.id,
    question: q.question,
    options: [...q.options],
  }));
};

// Server-side Quiz Evaluation Engine
export const evaluateQuiz = (
  answers: Record<number, number>,
  startedAtStr: string,
  submittedAtStr: string,
  assignedQuestionIds?: number[]
): {
  scoreMarks: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeExpired: boolean;
  breakdown: Array<{
    questionId: number;
    userAnswer: number | null;
    isCorrect: boolean;
  }>;
} => {
  const started = new Date(startedAtStr).getTime();
  const submitted = new Date(submittedAtStr).getTime();
  const durationSeconds = Math.max(0, Math.floor((submitted - started) / 1000));

  // 10 minutes = 600s + 15s grace period for network latency
  const timeLimitSeconds = COURSE_CONFIG.durationMinutes * 60;
  const timeExpired = durationSeconds > timeLimitSeconds + 15;

  let score = 0;
  const breakdown: Array<{
    questionId: number;
    userAnswer: number | null;
    isCorrect: boolean;
  }> = [];

  // Determine which questions to grade
  let targetQuestions: QuizQuestionServer[] = [];
  if (assignedQuestionIds && assignedQuestionIds.length > 0) {
    targetQuestions = assignedQuestionIds
      .map((id) => QUESTION_BANK.find((q) => q.id === id))
      .filter((q): q is QuizQuestionServer => Boolean(q));
  } else {
    const answeredIds = Object.keys(answers).map(Number).filter((n) => !isNaN(n));
    if (answeredIds.length > 0) {
      targetQuestions = answeredIds
        .map((id) => QUESTION_BANK.find((q) => q.id === id))
        .filter((q): q is QuizQuestionServer => Boolean(q));
    }
  }

  // Fallback to first 10 if none matched
  if (targetQuestions.length === 0) {
    targetQuestions = QUESTION_BANK.slice(0, COURSE_CONFIG.totalQuestions);
  }

  targetQuestions.forEach((q) => {
    const userAnswer = typeof answers[q.id] === "number" ? answers[q.id] : null;
    const isCorrect = userAnswer === q.correctAnswerIndex;
    if (isCorrect) {
      score += COURSE_CONFIG.marksPerCorrectAnswer;
    }
    breakdown.push({
      questionId: q.id,
      userAnswer,
      isCorrect,
    });
  });

  const totalMarks = COURSE_CONFIG.totalMarks;
  const percentage = Math.round((score / totalMarks) * 100);
  const passed = score >= COURSE_CONFIG.minimumPassingMarks;

  return {
    scoreMarks: score,
    totalMarks,
    percentage,
    passed,
    timeExpired,
    breakdown,
  };
};

// Test certificate number generator: Format TEST-CPD-XXXX
export const generateTestCertificateNumber = (existingCount: number): string => {
  const nextNum = String(existingCount + 1).padStart(4, "0");
  return `TEST-CPD-${nextNum}`;
};
