import fs from "fs";
import path from "path";

export interface ReviewRecord {
  _id: string;
  name: string;
  rating: number;
  category: string;
  subType?: string;
  reviewText: string;
  isAIGenerated: boolean;
  source: string;
  createdAt: string;
}

// 30 Diverse, Authentic Seed Reviews for Dynamic AI Shuffling
export const SEED_REVIEWS: Array<{
  category: string;
  subType: string;
  mode: "counseling";
  text: string;
}> = [
  // ── Practice & Counseling Reviews ──
  {
    category: "Parenting Coaching",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Nikunj helped us transform our evening routine with our teenagers from screaming matches into calm, open conversations. His practical frameworks gave our family back peace.",
  },
  {
    category: "Relationship Repair",
    subType: "Couple Therapy",
    mode: "counseling",
    text: "My partner and I were trapped in the same repetitive arguments for months. In just 4 sessions, Nikunj helped us break down defenses, listen without judgment, and rebuild warmth.",
  },
  {
    category: "Corporate Burnout",
    subType: "Executive Coaching",
    mode: "counseling",
    text: "As an executive under relentless deadline pressure, my anxiety was spilling over into every part of my life. Nikunj's evidence-based cognitive tools gave me immediate clarity and sustainable calm.",
  },
  {
    category: "Parenting Coaching",
    subType: "Family Sessions",
    mode: "counseling",
    text: "Deeply grateful for Nikunj's empathetic guidance. He taught us how to handle our 7-year-old's emotional meltdowns with boundary-setting that feels supportive rather than punitive.",
  },
  {
    category: "Life Coaching",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Navigating a high-stakes mid-career transition was overwhelming. Sessions with Nikunj provided structured direction, accountability, and the confidence to take bold, deliberate steps forward.",
  },
  {
    category: "Relationship Repair",
    subType: "Online Video",
    mode: "counseling",
    text: "Online counseling with Nikunj felt completely natural and safe. His communication scripts allowed us to express vulnerable emotions without fear of conflict or defensiveness.",
  },
  {
    category: "Teen Counseling",
    subType: "Family Sessions",
    mode: "counseling",
    text: "Our 15-year-old daughter was completely shut down and distant. Nikunj built a genuine bridge of trust with her that no school counselor had managed to achieve.",
  },
  {
    category: "Emotional Wellness",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Working with Nikunj is unlike generic talk therapy. Every single session ends with actionable coping exercises, somatic breathwork, and clear perspectives that actually work.",
  },
  {
    category: "Communication",
    subType: "Couple Therapy",
    mode: "counseling",
    text: "We learned more about our conflict cycles in two hours with Nikunj than we did reading self-help books for two years. Our daily communication is so much lighter now.",
  },
  {
    category: "Executive Burnout",
    subType: "Executive Coaching",
    mode: "counseling",
    text: "Exceptional coaching. Nikunj helped me establish firm boundaries at work without feeling guilty, preventing severe burnout and significantly boosting my daily focus.",
  },
  {
    category: "Parenting Coaching",
    subType: "Online Video",
    mode: "counseling",
    text: "The guidance on managing screen addiction and sibling rivalry was an absolute game-changer in our home. Truly a master at family dynamics and compassionate parenting.",
  },
  {
    category: "Life Coaching",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Nikunj brings a rare blend of deep philosophical grounding and razor-sharp practical strategy. His sessions helped me conquer chronic procrastination and self-doubt.",
  },
  {
    category: "Relationship Repair",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "I entered counseling feeling emotionally exhausted and hopeless about our marriage. Nikunj held a calm, non-judgmental space that helped us reconnect on our own terms.",
  },
  {
    category: "Emotional Wellness",
    subType: "Online Video",
    mode: "counseling",
    text: "I finally have practical tools to dismantle morning panic and decision fatigue. Nikunj's compassionate demeanor makes every session something I truly look forward to.",
  },
  {
    category: "Teen Counseling",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Nikunj helped our son navigate intense board exam pressure with confidence and healthy study habits. The change in his stress levels has been remarkable.",
  },
  {
    category: "Emotional Wellness",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Nikunj's compassionate approach to grief and personal loss helped me rediscover emotional equilibrium. He walks alongside you with deep humility.",
  },
  {
    category: "Communication",
    subType: "Family Sessions",
    mode: "counseling",
    text: "The communication frameworks we practiced helped resolve years of passive-aggressive tension in our family setting. Invaluable work.",
  },
  {
    category: "Life Coaching",
    subType: "Executive Coaching",
    mode: "counseling",
    text: "I was skeptical about life coaching, but Nikunj's method is grounded in empirical psychology rather than superficial motivation. Truly life-altering.",
  },
  {
    category: "Parenting Coaching",
    subType: "Family Sessions",
    mode: "counseling",
    text: "Our toddler's separation anxiety was causing massive daily stress. Nikunj gave us gentle, progressive routines that worked within two weeks.",
  },
  {
    category: "Corporate Burnout",
    subType: "Executive Coaching",
    mode: "counseling",
    text: "Nikunj is gifted at cutting through emotional noise and getting directly to root patterns without making you feel broken or judged.",
  },
  {
    category: "Relationship Repair",
    subType: "Couple Therapy",
    mode: "counseling",
    text: "The counseling sessions gave us a rock-solid foundation on financial transparency, emotional boundary setting, and mutual respect.",
  },
  {
    category: "Corporate Burnout",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "His mindfulness frameworks helped me handle intense high-stakes corporate crises with calm, rational composure.",
  },
  {
    category: "Life Coaching",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "A truly safe harbor. Nikunj helped me navigate acute impostor syndrome when stepping into a senior leadership role.",
  },
  {
    category: "Relationship Repair",
    subType: "Couple Therapy",
    mode: "counseling",
    text: "We were on the verge of separation when we first called Nikunj. Today our home is filled with laughter and shared understanding again.",
  },
  {
    category: "Emotional Wellness",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Nikunj taught me how to say no without guilt and establish healthy emotional boundaries with demanding family and colleagues.",
  },
  {
    category: "Teen Counseling",
    subType: "Family Sessions",
    mode: "counseling",
    text: "The sessions helped our 17-year-old son open up about career anxiety and peer pressure in ways he never could before.",
  },
  {
    category: "Communication",
    subType: "Couple Therapy",
    mode: "counseling",
    text: "Nikunj provides practical scripts for difficult marital conversations. It eliminates guesswork and avoids defensive escalations.",
  },
  {
    category: "Emotional Wellness",
    subType: "Online Video",
    mode: "counseling",
    text: "Working with Nikunj helped me untangle chronic overthinking and insomnia. His somatic calming techniques are now second nature to me.",
  },
  {
    category: "Life Coaching",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Nikunj is an extraordinary listener. He notices subtle emotional cues and helps you reframe old patterns with warmth and strength.",
  },
  {
    category: "Parenting Coaching",
    subType: "1-on-1 Sessions",
    mode: "counseling",
    text: "Every session with Nikunj paid dividends in peace of mind, family harmony, and emotional resilience for our entire household.",
  },
];

let memoryReviews: ReviewRecord[] = [];

const getFilePath = () => {
  return path.join(process.cwd(), "src", "data", "reviews_store.json");
};

const ensureFileExists = () => {
  try {
    const dirPath = path.join(process.cwd(), "src", "data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      // Initialize with seed reviews
      const initialStore: ReviewRecord[] = SEED_REVIEWS.map((item, idx) => ({
        _id: `seed_rev_${idx + 1}`,
        name: "Client",
        rating: 5,
        category: item.category,
        subType: item.subType,
        reviewText: item.text,
        isAIGenerated: true,
        source: "seed_storage",
        createdAt: new Date(Date.now() - (30 - idx) * 86400000).toISOString(),
      }));
      fs.writeFileSync(filePath, JSON.stringify(initialStore, null, 2), "utf-8");
      memoryReviews = initialStore;
    }
  } catch (err) {
    console.log("[ReviewStore] File system access warning:", err);
  }
};

export const getLocalReviews = (): ReviewRecord[] => {
  try {
    ensureFileExists();
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryReviews = parsed;
      }
    }
  } catch (err) {
    console.log("[ReviewStore] Reading local file fallback:", err);
  }

  if (memoryReviews.length === 0) {
    // Fallback in-memory seeds
    memoryReviews = SEED_REVIEWS.map((item, idx) => ({
      _id: `seed_rev_${idx + 1}`,
      name: "Client",
      rating: 5,
      category: item.category,
      subType: item.subType,
      reviewText: item.text,
      isAIGenerated: true,
      source: "seed_storage",
      createdAt: new Date(Date.now() - (30 - idx) * 86400000).toISOString(),
    }));
  }

  return memoryReviews;
};

export const saveLocalReview = (record: ReviewRecord): ReviewRecord => {
  try {
    memoryReviews = [record, ...getLocalReviews().filter((r) => r._id !== record._id)];
    ensureFileExists();
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(memoryReviews, null, 2), "utf-8");
  } catch (err) {
    console.log("[ReviewStore] Writing local file fallback:", err);
  }
  return record;
};

export const deleteLocalReview = (id: string): boolean => {
  try {
    memoryReviews = getLocalReviews().filter((r) => r._id !== id);
    ensureFileExists();
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(memoryReviews, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.log("[ReviewStore] Delete error:", err);
    return false;
  }
};
