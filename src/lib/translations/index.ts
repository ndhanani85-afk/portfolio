import { SupportedLanguage } from "@/context/LanguageContext";

export interface TranslationDictionary {
  header: {
    home: Record<SupportedLanguage, string>;
    services: Record<SupportedLanguage, string>;
    allServices: Record<SupportedLanguage, string>;
    parentingCoaching: Record<SupportedLanguage, string>;
    relationshipRepair: Record<SupportedLanguage, string>;
    counsellingLifeCoaching: Record<SupportedLanguage, string>;
    about: Record<SupportedLanguage, string>;
    aboutMe: Record<SupportedLanguage, string>;
    speaking: Record<SupportedLanguage, string>;
    resources: Record<SupportedLanguage, string>;
    faq: Record<SupportedLanguage, string>;
    reviews: Record<SupportedLanguage, string>;
    bookSession: Record<SupportedLanguage, string>;
    subTitle: Record<SupportedLanguage, string>;
  };
  hero: {
    tagPill: Record<SupportedLanguage, string>;
    headlinePart1: Record<SupportedLanguage, string>;
    headlinePart2: Record<SupportedLanguage, string>;
    subheadline: Record<SupportedLanguage, string>;
    bookSessionBtn: Record<SupportedLanguage, string>;
    takeStressCheckBtn: Record<SupportedLanguage, string>;
    familiesGuided: Record<SupportedLanguage, string>;
    clientRating: Record<SupportedLanguage, string>;
    confidential: Record<SupportedLanguage, string>;
    trustedBy: Record<SupportedLanguage, string>;
    safeSpaceTitle: Record<SupportedLanguage, string>;
    safeSpaceDesc: Record<SupportedLanguage, string>;
    workedWith: Record<SupportedLanguage, string>;
  };
  problemHook: {
    badge: Record<SupportedLanguage, string>;
    headlinePart1: Record<SupportedLanguage, string>;
    headlinePart2: Record<SupportedLanguage, string>;
    intro: Record<SupportedLanguage, string>;
    couples: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      subtitle: Record<SupportedLanguage, string>;
      realityCheck: Record<SupportedLanguage, string>;
      point1: Record<SupportedLanguage, string>;
      point2: Record<SupportedLanguage, string>;
      point3: Record<SupportedLanguage, string>;
      solutionLabel: Record<SupportedLanguage, string>;
      solution: Record<SupportedLanguage, string>;
      button: Record<SupportedLanguage, string>;
    };
    family: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      subtitle: Record<SupportedLanguage, string>;
      realityCheck: Record<SupportedLanguage, string>;
      point1: Record<SupportedLanguage, string>;
      point2: Record<SupportedLanguage, string>;
      point3: Record<SupportedLanguage, string>;
      solutionLabel: Record<SupportedLanguage, string>;
      solution: Record<SupportedLanguage, string>;
      button: Record<SupportedLanguage, string>;
    };
    burnout: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      subtitle: Record<SupportedLanguage, string>;
      realityCheck: Record<SupportedLanguage, string>;
      point1: Record<SupportedLanguage, string>;
      point2: Record<SupportedLanguage, string>;
      point3: Record<SupportedLanguage, string>;
      solutionLabel: Record<SupportedLanguage, string>;
      solution: Record<SupportedLanguage, string>;
      button: Record<SupportedLanguage, string>;
    };
    reassurance: {
      confidentialCare: Record<SupportedLanguage, string>;
      directCalendar: Record<SupportedLanguage, string>;
      evidenceBased: Record<SupportedLanguage, string>;
      dedicatedSessions: Record<SupportedLanguage, string>;
    };
  };
  emotionalConnector: {
    quote: Record<SupportedLanguage, string>;
    subquote: Record<SupportedLanguage, string>;
    philosophyBtn: Record<SupportedLanguage, string>;
  };
  concernCardsSection: {
    badge: Record<SupportedLanguage, string>;
    heading: Record<SupportedLanguage, string>;
    subheading: Record<SupportedLanguage, string>;
    exploreBtn: Record<SupportedLanguage, string>;
    card1: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      description: Record<SupportedLanguage, string>;
    };
    card2: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      description: Record<SupportedLanguage, string>;
    };
    card3: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      description: Record<SupportedLanguage, string>;
    };
    card4: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      description: Record<SupportedLanguage, string>;
    };
    card5: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      description: Record<SupportedLanguage, string>;
    };
    card6: {
      tag: Record<SupportedLanguage, string>;
      title: Record<SupportedLanguage, string>;
      description: Record<SupportedLanguage, string>;
    };
  };
  bookingModal: {
    title: Record<SupportedLanguage, string>;
    confirmedTitle: Record<SupportedLanguage, string>;
    sub: Record<SupportedLanguage, string>;
    step1: Record<SupportedLanguage, string>;
    step2: Record<SupportedLanguage, string>;
    step3: Record<SupportedLanguage, string>;
    btnContinue: Record<SupportedLanguage, string>;
    btnBack: Record<SupportedLanguage, string>;
    btnConfirm: Record<SupportedLanguage, string>;
    btnConfirming: Record<SupportedLanguage, string>;
    namePlaceholder: Record<SupportedLanguage, string>;
    phonePlaceholder: Record<SupportedLanguage, string>;
    emailPlaceholder: Record<SupportedLanguage, string>;
    notesPlaceholder: Record<SupportedLanguage, string>;
    changeSlot: Record<SupportedLanguage, string>;
    addToGoogleCal: Record<SupportedLanguage, string>;
    reminderQueued: Record<SupportedLanguage, string>;
    doneBtn: Record<SupportedLanguage, string>;
    serviceCouplesTitle: Record<SupportedLanguage, string>;
    serviceCouplesSub: Record<SupportedLanguage, string>;
    serviceFamilyTitle: Record<SupportedLanguage, string>;
    serviceFamilySub: Record<SupportedLanguage, string>;
    serviceMentorTitle: Record<SupportedLanguage, string>;
    serviceMentorSub: Record<SupportedLanguage, string>;
  };
  footer: {
    tagline: Record<SupportedLanguage, string>;
    confidentialCare: Record<SupportedLanguage, string>;
    quickNav: Record<SupportedLanguage, string>;
    practiceFocus: Record<SupportedLanguage, string>;
    languagesSpoken: Record<SupportedLanguage, string>;
    languagesList: Record<SupportedLanguage, string>;
    directContact: Record<SupportedLanguage, string>;
    allRightsReserved: Record<SupportedLanguage, string>;
    developedBy: Record<SupportedLanguage, string>;
    serviceFocus1: Record<SupportedLanguage, string>;
    serviceFocus2: Record<SupportedLanguage, string>;
    serviceFocus3: Record<SupportedLanguage, string>;
    serviceFocus4: Record<SupportedLanguage, string>;
    serviceFocus5: Record<SupportedLanguage, string>;
  };
  welcomeModal: {
    title: Record<SupportedLanguage, string>;
    subtitle: Record<SupportedLanguage, string>;
    changeAnytime: Record<SupportedLanguage, string>;
    continueIn: Record<SupportedLanguage, string>;
    selectBtn: Record<SupportedLanguage, string>;
  };
}

export const translations: TranslationDictionary = {
  header: {
    home: { en: "Home", hi: "होम", gu: "હોમ" },
    services: { en: "Services", hi: "सेवाएं", gu: "સેવાઓ" },
    allServices: {
      en: "Overview — All Services",
      hi: "सभी सेवाओं का विवरण",
      gu: "બધી સેવાઓનું વિહંગાવલોકન",
    },
    parentingCoaching: {
      en: "Parenting Coaching",
      hi: "पेरेंटिंग कोचिंग व मार्गदर्शन",
      gu: "પેરેન્ટિંગ કોચિંગ અને માર્ગદર્શન",
    },
    relationshipRepair: {
      en: "Relationship Repair",
      hi: "रिलेशनशिप व दांपत्य सुधार",
      gu: "સંબંધ સુધારણા અને દાંપત્ય જીવન",
    },
    counsellingLifeCoaching: {
      en: "Counselling & Life Coaching",
      hi: "काउंसलिंग और लाइफ कोचिंग",
      gu: "કાઉન્સેલિંગ અને લાઈફ કોચિંગ",
    },
    about: { en: "About", hi: "परिचय", gu: "પરિચય" },
    aboutMe: { en: "About Me", hi: "मेरे बारे में", gu: "મારા વિશે" },
    speaking: { en: "Speaking", hi: "की-नोट स्पीकिंग", gu: "કીનોટ સ્પીકિંગ" },
    resources: { en: "Resources", hi: "लेख व साधन", gu: "લેખો અને માર્ગદર્શિકા" },
    faq: { en: "FAQ", hi: "सवाल-जवाब", gu: "પ્રશ્નોત્તરી (FAQ)" },
    reviews: { en: "Reviews", hi: "समीक्षाएं", gu: "પ્રતિસાદ (Reviews)" },
    bookSession: {
      en: "Book a Session",
      hi: "परामर्श सत्र बुक करें",
      gu: "સેશન બુક કરો",
    },
    subTitle: {
      en: "Counselor & Life Coach",
      hi: "काउंसलर एवं लाइफ कोच",
      gu: "કાઉન્સેલર અને લાઈફ કોચ",
    },
  },
  hero: {
    tagPill: {
      en: "Family Counselor & Life Coach",
      hi: "पारिवारिक परामर्शदाता एवं लाइफ कोच",
      gu: "ફેમિલી કાઉન્સેલર અને લાઈફ કોચ",
    },
    headlinePart1: {
      en: "Guiding families through stress,",
      hi: "तनाव के दौर में परिवारों का मार्गदर्शन,",
      gu: "તણાવના સમયમાં પરિવારોનું સચોટ માર્ગદર્શન,",
    },
    headlinePart2: {
      en: "back to calm.",
      hi: "पुनः शांति और सुकून की ओर।",
      gu: "ફરીથી માનસિક શાંતિ તરફ.",
    },
    subheadline: {
      en: "Helping families, couples & professionals overcome stress, strengthen relationships, and create a happier, balanced life.",
      hi: "परिवारों, दंपतियों और प्रोफेशनल्स को तनाव मुक्त होने, रिश्तों में मधुरता लाने और एक खुशहाल, संतुलित जीवन जीने में सक्षम बनाना।",
      gu: "પરિવારો, દંપતીઓ અને પ્રોફેશનલ્સને તણાવ મુક્ત થવા, સંબંધો મજબૂત કરવા અને સુખી, સંતુલિત જીવન જીવવામાં સહાયક.",
    },
    bookSessionBtn: {
      en: "Book a Session",
      hi: "काउंसलिंग सत्र बुक करें",
      gu: "કાઉન્સેલિંગ સેશન બુક કરો",
    },
    takeStressCheckBtn: {
      en: "Take 2-Min Stress Check",
      hi: "2-मिनट तनाव परीक्षण करें",
      gu: "૨-મિનિટ સ્ટ્રેસ ચેક કરો",
    },
    familiesGuided: {
      en: "Families Guided",
      hi: "संतुष्ट परिवार",
      gu: "માર્ગદર્શન મેળવેલ પરિવારો",
    },
    clientRating: {
      en: "Client Rating",
      hi: "क्लाइंट रेटिंग",
      gu: "ક્લાયન્ટ રેટિંગ",
    },
    confidential: {
      en: "Confidential",
      hi: "गोपनीय एवं सुरक्षित",
      gu: "સંપૂર્ણ ગુપ્ત અને વિશ્વસનીય",
    },
    trustedBy: {
      en: "Trusted by families & professionals across India",
      hi: "संपूर्ण भारत के परिवारों और प्रोफेशनल्स का अटूट विश्वास",
      gu: "સમગ્ર ભારતના પરિવારો અને પ્રોફેશનલ્સનો અતૂટ વિશ્વાસ",
    },
    safeSpaceTitle: {
      en: "A Safe & Confidential Space",
      hi: "सुरक्षित एवं गोपनीय वातावरण",
      gu: "સુરક્ષિત અને અત્યંત ગુપ્ત વાતાવરણ",
    },
    safeSpaceDesc: {
      en: "One-on-one care tailored to your unique journey.",
      hi: "आपकी व्यक्तिगत परिस्थितियों के अनुरूप समर्पित व्यक्तिगत मार्गदर्शन।",
      gu: "તમારી વિશિષ્ટ પરિસ્થિતિઓને અનુરૂપ વ્યક્તિગત માર્ગદર્શન.",
    },
    workedWith: {
      en: "WORKED WITH INDIVIDUALS & LEADERS FROM",
      hi: "इन प्रतिष्ठित संस्थानों के व्यक्तियों और प्रोफेशनल्स के साथ कार्य किया",
      gu: "આ પ્રતિષ્ઠિત સંસ્થાઓના વ્યક્તિઓ અને અગ્રણીઓ સાથે કાર્ય કરવાનો અનુભવ",
    },
  },
  problemHook: {
    badge: {
      en: "Real Struggles • Evidence-Based Breakthroughs",
      hi: "वास्तविक समस्याएं • मनोवैज्ञानिक समाधान",
      gu: "વાસ્તવિક મુશ્કેલીઓ • વૈજ્ઞાનિક અને અસરકારક ઉકેલ",
    },
    headlinePart1: {
      en: "Are You Carrying This Silently",
      hi: "क्या आप अकेले ही घुट रहे हैं",
      gu: "શું તમે મનોમન આ ભાર વેઠી રહ્યા છો",
    },
    headlinePart2: {
      en: "Behind Closed Doors?",
      hi: "बंद दरवाजों के पीछे?",
      gu: "બંધ બારણાં પાછળ?",
    },
    intro: {
      en: "Most relationship breakdowns and family burnout aren’t caused by lack of love. They happen when couples and parents get trapped in exhausting, repetitive loops without practical support. Identify your situation below to break the pattern.",
      hi: "अधिकांश रिश्तों में खटास और पारिवारिक तनाव प्यार की कमी से नहीं, बल्कि सही संवाद के अभाव और बार-बार दोहराए जाने वाले झगड़ों से पैदा होते हैं। नीचे अपनी स्थिति पहचानें और इस चक्रव्यूह से बाहर निकलें।",
      gu: "સંબંધોમાં તિરાડ કે પારિવારિક તણાવ પ્રેમની કમીથી નહીં, પરંતુ સતત ચાલતી એકસરખી તકરાર અને સાચા માર્ગદર્શનના અભાવે સર્જાય છે. તમારી સ્થિતિ ઓળખો અને આ નકારાત્મક ચક્રમાંથી બહાર આવો.",
    },
    couples: {
      tag: {
        en: "Couples Focus",
        hi: "दांपत्य परामर्श",
        gu: "દંપતી સંબંધ સુધારણા",
      },
      title: {
        en: "The Loop of Constant Friction",
        hi: "लगातार तनाव और अनबन का चक्र",
        gu: "સતત અણબનાવ અને ઘર્ષણનું ચક્ર",
      },
      subtitle: {
        en: "When every conversation feels like walking on eggshells.",
        hi: "जब हर बातचीत डर, तनाव और बहस में बदल जाती हो।",
        gu: "જ્યારે દરેક વાતચીતમાં ડર અને વિવાદનું વાતાવરણ ઊભું થાય.",
      },
      realityCheck: {
        en: "Does this feel like your reality?",
        hi: "क्या यह आपकी रोजमर्रा की हकीकत है?",
        gu: "શું આ તમારી વાસ્તવિકતા છે?",
      },
      point1: {
        en: "You have the exact same argument every week — just dressed in different words.",
        hi: "हर हफ्ते वही पुराने मुद्दे, वही बहस — बस शब्द अलग होते हैं।",
        gu: "દર અઠવાડિયે એ જ જૂની વાતો પર વિવાદ — માત્ર શબ્દો જ બદલાય છે.",
      },
      point2: {
        en: "Between career demands and raising kids after marriage, you have quietly drifted apart into emotionally exhausted partners.",
        hi: "शादी के बाद बच्चों और करियर की जिम्मेदारियों में आप दोनों के बीच भावनात्मक दूरी आ गई है और सिर्फ थकान बची है।",
        gu: "લગ્ન પછી બાળકો અને કરિયરની દોડધામમાં પતિ-પત્ની વચ્ચે ભાવનાત્મક અંતર વધી ગયું છે અને માત્ર માનસિક થાક રહી ગયો છે.",
      },
      point3: {
        en: "One person criticizes or demands; the other shuts down and retreats into days of cold silence.",
        hi: "एक ताने मारता है या शिकायत करता है, तो दूसरा खामोश होकर कई दिनों की चुप्पी साध लेता है।",
        gu: "એક વ્યક્તિ ફરિયાદ કે ગુસ્સો કરે છે, તો બીજી વ્યક્તિ ચૂપ થઈને દિવસો સુધી બોલવાનું બંધ કરી દે છે.",
      },
      solutionLabel: {
        en: "✓ The Therapeutic Solution:",
        hi: "✓ व्यावहारिक समाधान:",
        gu: "✓ વ્યવહારુ ઉકેલ:",
      },
      solution: {
        en: "We disarm reactive triggers, dismantle defensiveness, and install proven communication frameworks that bring emotional safety and genuine intimacy back.",
        hi: "हम आपसी नाराजगी और संवादहीनता को दूर कर ऐसे वैज्ञानिक तरीके सिखाते हैं, जिससे रिश्ते में दोबारा भावनात्मक सुरक्षा, अपनापन और गहरा प्यार लौट सके।",
        gu: "અમે પરસ્પરની ગેરસમજ અને કડવાશ દૂર કરી એવી સંવાદ શૈલી વિકસાવીએ છીએ, જેથી દાંપત્યજીવનમાં ફરીથી પ્રેમ, હૂંફ અને વિશ્વાસ સ્થપાય.",
      },
      button: {
        en: "Book Couple Counseling",
        hi: "दांपत्य काउंसलिंग सत्र बुक करें",
        gu: "દંપતી કાઉન્સેલિંગ સેશન બુક કરો",
      },
    },
    family: {
      tag: {
        en: "Family Focus",
        hi: "पारिवारिक एवं पेरेंटिंग",
        gu: "પરિવાર અને પેરેન્ટિંગ",
      },
      title: {
        en: "Parenting on the Brink",
        hi: "पेरेंटिंग में बढ़ता गुस्सा व असहायता",
        gu: "પેરેન્ટિંગમાં અસહાયતા અને તણાવ",
      },
      subtitle: {
        en: "When you love your kids deeply, but dread the daily battlegrounds.",
        hi: "बच्चों से असीम प्रेम है, फिर भी रोज़ के हंगामे से मन घबराता है।",
        gu: "બાળકો માટે અપાર વહાલ છે, છતાં રોજની માથાકૂટથી થાકી જવાય છે.",
      },
      realityCheck: {
        en: "Does this feel like your reality?",
        hi: "क्या यह आपकी रोजमर्रा की हकीकत है?",
        gu: "શું આ તમારી વાસ્તવિકતા છે?",
      },
      point1: {
        en: "Mornings, homework, and bedtimes are battlegrounds of screaming, tears, and screen refusal.",
        hi: "सुबह उठने, होमवर्क और स्क्रीन टाइम को लेकर रोज़ चीखना-चिल्लाना और रोना-धोना।",
        gu: "સવારે ઉઠવું, અભ્યાસ અને મોબાઈલ સ્ક્રીનને લઈને ઘરમાં રોજનો કકળાટ અને અશાંતિ.",
      },
      point2: {
        en: "Your teen is withdrawing into secrecy, anxiety, or explosive resistance to guidance.",
        hi: "किशोर (टीनएज) बच्चे का चुपचाप अलग-थलग रहना, चिड़चिड़ापन या मार्गदर्शन पर भड़क जाना।",
        gu: "ટીનેજર બાળકનું પરિવારથી દૂર રહેવું, સતત ગુસ્સો કે વાતચીત કરવાનો સ્પષ્ટ ઇનકાર.",
      },
      point3: {
        en: "Parents disagree on discipline styles, leading to double exhaustion and mutual blame.",
        hi: "पालन-पोषण के तरीकों पर माता-पिता के अलग विचार, जिससे तनाव और आपसी आरोप-प्रत्यारोप बढ़ते हैं।",
        gu: "ઉછેરની પદ્ધતિ બાબતે માતા-પિતા વચ્ચે મતભેદ, જેથી બંને પક્ષે માનસિક થાક વધે છે.",
      },
      solutionLabel: {
        en: "✓ The Therapeutic Solution:",
        hi: "✓ व्यावहारिक समाधान:",
        gu: "✓ વ્યવહારુ ઉકેલ:",
      },
      solution: {
        en: "Replace shouting and punishment with calm, authoritative boundaries that children respect. Install predictable routines that bring calm back to your home.",
        hi: "चीखने और सजा देने के बजाय ऐसे शांत व प्रभावी नियम बनाएं जिनका बच्चे सम्मान करें, ताकि घर में शांति और समझदारी का माहौल बने।",
        gu: "રાડારાડ અને સજા કરવાને બદલે એવી મક્કમ છતાં પ્રેમાળ સીમાઓ નક્કી કરો જેનું બાળકો માન રાખે, અને ઘરમાં શાંતિ પાછી આવે.",
      },
      button: {
        en: "Book Family Counseling",
        hi: "पारिवारिक काउंसलिंग बुक करें",
        gu: "ફેમિલી કાઉન્સેલિંગ સેશન બુક કરો",
      },
    },
    burnout: {
      tag: {
        en: "Personal Mentorship",
        hi: "व्यक्तिगत मार्गदर्शन",
        gu: "વ્યક્તિગત માર્ગદર્શન",
      },
      title: {
        en: "High-Functioning Burnout",
        hi: "सफलता के बावजूद अंदर से खालीपन",
        gu: "સફળતા છતાં અંદરથી થાક અને અશાંતિ",
      },
      subtitle: {
        en: "When you look successful on the outside, but feel empty inside.",
        hi: "दुनिया की नज़र में सब ठीक है, पर भीतर भारी बोझ और थकान है।",
        gu: "બહારથી બધું સારું દેખાય છે, પણ અંદરથી ભારેપણું અને અજંપો છે.",
      },
      realityCheck: {
        en: "Does this feel like your reality?",
        hi: "क्या यह आपकी रोजमर्रा की हकीकत है?",
        gu: "શું આ તમારી વાસ્તવિકતા છે?",
      },
      point1: {
        en: "Severe executive decision fatigue, racing thoughts, and waking up exhausted.",
        hi: "फैसले लेने की अत्यधिक थकान, मन में विचारों की बेचैनी और सुबह उठते ही भारीपन।",
        gu: "નિર્ણયો લેવાનો અતિશય માનસિક થાક, અવિરત દોડતા વિચારો અને સવારે પણ તાજગીનો અભાવ.",
      },
      point2: {
        en: "Quietly carrying heavy expectations for family & business with zero confidential space to vent.",
        hi: "परिवार और व्यापार की ज़िम्मेदारियों का अकेला बोझ, और दिल की बात साझा करने के लिए कोई सुरक्षित जगह न होना।",
        gu: "પરિવાર અને વ્યવસાયની જવાબદારીઓનો એકલા બોજ, પણ મનની વાત નિખાલસપણે કહેવાની કોઈ જગ્યા ન મળવી.",
      },
      point3: {
        en: "Standing at a critical personal, career, or relationship crossroads without clear direction.",
        hi: "करियर या व्यक्तिगत जीवन के किसी महत्वपूर्ण मोड़ पर असमंजस और दिशाहीन महसूस करना।",
        gu: "જીવન કે કારકિર્દીના મહત્વના વળાંક પર યોગ્ય માર્ગદર્શન કે દિશાની કમી અનુભવવી.",
      },
      solutionLabel: {
        en: "✓ The Therapeutic Solution:",
        hi: "✓ व्यावहारिक समाधान:",
        gu: "✓ વ્યવહારુ ઉકેલ:",
      },
      solution: {
        en: "Regain emotional regulation, establish unapologetic boundaries, and construct a personalized daily roadmap that preserves your energy, health, and peace.",
        hi: "भावनात्मक संतुलन दोबारा पाएं, स्पष्ट व्यक्तिगत सीमाएं बनाएं और एक ऐसी दिनचर्या तैयार करें जिससे आपकी ऊर्जा और मानसिक सुकून बना रहे।",
        gu: "ભાવનાત્મક સંતુલન પુનઃ પ્રાપ્ત કરો, મજબૂત સીમાઓ બાંધો અને ઊર્જા તથા શાંતિ જાળવી રાખતો સ્પષ્ટ રોડમેપ તૈયાર કરો.",
      },
      button: {
        en: "Book 1-on-1 Mentorship",
        hi: "व्यक्तिगत मेंटरशिप बुक करें",
        gu: "૧-ઓન-૧ મેન્ટરશિપ સેશન બુક કરો",
      },
    },
    reassurance: {
      confidentialCare: {
        en: "100% Confidential Care",
        hi: "100% गोपनीय व सुरक्षित",
        gu: "૧૦૦% સંપૂર્ણ ખાનગી અને સુરક્ષિત",
      },
      directCalendar: {
        en: "Direct Calendar Booking",
        hi: "सीधे कैलेंडर से बुकिंग",
        gu: "કેલેન્ડર દ્વારા સીધું બુકિંગ",
      },
      evidenceBased: {
        en: "Evidence-Based Frameworks",
        hi: "वैज्ञानिक व सिद्ध पद्धतियां",
        gu: "પ્રમાણિત અને વૈજ્ઞાનિક પદ્ધતિઓ",
      },
      dedicatedSessions: {
        en: "50-Minute Dedicated Sessions",
        hi: "50-मिनट का समर्पित सत्र",
        gu: "૫૦-મિનિટનું સમર્પિત સેશન",
      },
    },
  },
  emotionalConnector: {
    quote: {
      en: "\"You don't need to be fixed. You need to be heard, understood, and equipped.\"",
      hi: "\"आपको सुधार की नहीं, बल्कि एक संवेदनशील सुनने वाले, गहरी समझ और सही दिशा की आवश्यकता है।\"",
      gu: "\"તમારે કોઈ ખામી સુધારવાની જરૂર નથી, પણ કોઈ ધ્યાનથી સાંભળે, સમજે અને સાચી દિશા આપે તેની જરૂર છે.\"",
    },
    subquote: {
      en: "Relational friction, parenting stress, and emotional anxiety often arise not from lack of love, but from carrying heavy responsibilities without structural support. You don't have to navigate family conflict or personal burnout alone.",
      hi: "रिश्तों में तनाव, पेरेंटिंग की चिंता और अकेलापन प्यार की कमी से नहीं, बल्कि बिना सहारे के भारी जिम्मेदारियां उठाने से होता है। आपको यह सब अकेले सहने की जरूरत नहीं है।",
      gu: "સંબંધોમાં તણાવ, પેરેન્ટિંગની ચિંતા અને માનસિક થાક પ્રેમની કમીથી નહીં, પણ કોઈ સહકાર વિના ભારે જવાબદારીઓ ઉપાડવાથી થાય છે. તમારે આ મુશ્કેલીઓ એકલા વેઠવાની જરૂર નથી.",
    },
    philosophyBtn: {
      en: "Read My Counseling Philosophy",
      hi: "मेरी परामर्श पद्धति जानें",
      gu: "મારી કાઉન્સેલિંગ પદ્ધતિ વિશે જાણો",
    },
  },
  concernCardsSection: {
    badge: {
      en: "Areas of Focus",
      hi: "मुख्य परामर्श क्षेत्र",
      gu: "મુખ્ય કાઉન્સેલિંગ ક્ષેત્રો",
    },
    heading: {
      en: "What situation are you bringing to session?",
      hi: "आप किस समस्या या परिस्थिति का समाधान चाहते हैं?",
      gu: "તમે કઈ સમસ્યા કે પરિસ્થિતિનું સમાધાન મેળવવા માંગો છો?",
    },
    subheading: {
      en: "Counseling tailored to specific, real-world friction points in family, relationship, and career life.",
      hi: "परिवार, दांपत्य जीवन और करियर के वास्तविक तनावों के लिए व्यक्तिगत व सटीक समाधान।",
      gu: "પરિવાર, દાંપત્યજીવન અને કારકિર્દીના વાસ્તવિક તણાવ માટે વ્યક્તિગત અને સચોટ માર્ગદર્શન.",
    },
    exploreBtn: {
      en: "Explore Support Plan",
      hi: "सहायता योजना देखें",
      gu: "સહાયક માર્ગદર્શન જુઓ",
    },
    card1: {
      tag: { en: "Family & Parenting", hi: "परिवार और परवरिश", gu: "પરિવાર અને ઉછેર" },
      title: { en: "Parenting Overwhelm", hi: "पेरेंटिंग में तनाव और गुस्सा", gu: "પેરેન્ટિંગમાં તણાવ અને થાક" },
      description: {
        en: "Constantly walking on eggshells with children's behavior, school stress, or daily household friction.",
        hi: "बच्चों की जिद, पढ़ाई की चिंता और रोज़मर्रा के घरेलू झगड़ों से लगातार मानसिक तनाव में रहना।",
        gu: "બાળકોની જિદ્દ, અભ્યાસની ચિંતા અને ઘરમાં રોજિંદા કકળાટથી સતત માનસિક થાક અનુભવવો.",
      },
    },
    card2: {
      tag: { en: "Couples Support", hi: "दांपत्य संबंध", gu: "દાંપત્ય સંબંધ સુધારણા" },
      title: { en: "Kids After Marriage", hi: "शादी के बाद बच्चे और दांपत्य संबंध", gu: "લગ્ન પછી બાળકો અને સંબંધો" },
      description: {
        en: "Feeling distant from your partner, trapped in repetitive arguments, or lacking emotional intimacy while raising children after marriage.",
        hi: "शादी के बाद बच्चों की जिम्मेदारियों के बीच जीवनसाथी से बढ़ती दूरी, बार-बार की बहस और दांपत्य में आत्मीयता की कमी।",
        gu: "લગ્ન પછી બાળકોની જવાબદારીઓ વચ્ચે જીવનસાથી સાથે વધતું અંતર, વારંવાર એક જ તકરાર અને દાંપત્યમાં સ્નેહની કમી.",
      },
    },
    card3: {
      tag: { en: "Work & Leadership", hi: "कार्यक्षेत्र व नेतृत्व", gu: "કારકિર્દી અને નેતૃત્વ" },
      title: { en: "Corporate Burnout & Stress", hi: "कार्यस्थल का तनाव और मानसिक थकान", gu: "કારકિર્દીનો તણાવ અને માનસિક થાક" },
      description: {
        en: "Managing executive pressure, high-stakes decision fatigue, and chronic mental exhaustion.",
        hi: "कार्यस्थल का भारी दबाव, बड़े फैसले लेने की मानसिक थकान और लगातार खालीपन महसूस होना।",
        gu: "કામકાજનું સતત દબાણ, મહત્વના નિર્ણયો લેવાનો થાક અને અવિરત માનસિક બેચેની.",
      },
    },
    card4: {
      tag: { en: "Communication", hi: "आपसी बातचीत", gu: "પરસ્પર સંવાદ" },
      title: { en: "Communication Breakdowns", hi: "संवाद की कमी और कड़वाहट", gu: "વાતચીતનો અભાવ અને કડવાશ" },
      description: {
        en: "Struggling to express emotional needs without triggering defensive or explosive reactions.",
        hi: "अपनी भावनाएं साझा करने पर सामने वाले का भड़क जाना या बातचीत बंद होकर चुप्पी छा जाना।",
        gu: "મનની વાત કે લાગણીઓ વ્યક્ત કરવા જતાં સામી વ્યક્તિનો ગુસ્સો કે અબોલા સર્જાવવા.",
      },
    },
    card5: {
      tag: { en: "Teen Guidance", hi: "टीनएज परवरिश", gu: "ટીનેજ ઉછેર" },
      title: { en: "Teen Conflict & Guidance", hi: "किशोर बच्चों (टीनएज) का मार्गदर्शन", gu: "ટીનેજર બાળકો સાથે સંવાદ અને માર્ગદર્શન" },
      description: {
        en: "Navigating teenage independence, academic pressure, mood shifts, and parent-child distance.",
        hi: "टीनएज बच्चों की ज़िद, पढ़ाई की चिंता, मिजाज़ में बदलाव और माता-पिता से बढ़ती दूरी संभालना।",
        gu: "કિશોર બાળકોની જિદ્દ, મૂડ સ્વિંગ્સ, અભ્યાસની ચિંતા અને માતા-પિતા સાથે વધતી દૂરીનું નિરાકરણ.",
      },
    },
    card6: {
      tag: { en: "Personal Growth", hi: "व्यक्तिगत विकास", gu: "વ્યક્તિગત વિકાસ" },
      title: { en: "Career & Life Transitions", hi: "करियर और जीवन के अहम मोड़ पर स्पष्टता", gu: "કારકિર્દી અને જીવનના મહત્વના વળાંક પર સ્પષ્ટતા" },
      description: {
        en: "Uncertainty around major career transitions, identity shifts, and personal direction.",
        hi: "करियर में बड़े बदलाव, दिशाहीन महसूस होना या जीवन के किसी अहम फैसले में उलझन।",
        gu: "કરિયરમાં મોટા બદલાવ, ભવિષ્યની અનિશ્ચિતતા અથવા યોગ્ય દિશા પસંદ કરવામાં અસમંજસ.",
      },
    },
  },
  bookingModal: {
    title: {
      en: "Book Confidential Counseling",
      hi: "गोपनीय काउंसलिंग सत्र बुक करें",
      gu: "ગોપનીય કાઉન્સેલિંગ સેશન બુક કરો",
    },
    confirmedTitle: {
      en: "Session Reserved Successfully!",
      hi: "सत्र सफलतापूर्वक बुक हो गया!",
      gu: "સેશન સફળતાપૂર્વક બુક થઈ ગયું!",
    },
    sub: {
      en: "Directly with Nikunj Dhanani • 100% Private",
      hi: "सीधे निकुंज धानाणी के साथ • 100% निजी व सुरक्षित",
      gu: "સીધા નિકુંજ ધાનાણી સાથે • ૧૦૦% ખાનગી",
    },
    step1: {
      en: "1. Select Focus Area",
      hi: "1. परामर्श का विषय चुनें",
      gu: "૧. માર્ગદર્શનનું ક્ષેત્ર પસંદ કરો",
    },
    step2: {
      en: "2. Choose Preferred Date & Time",
      hi: "2. अपनी सुविधानुसार तारीख और समय चुनें",
      gu: "૨. તમારી અનુકૂળ તારીખ અને સમય પસંદ કરો",
    },
    step3: {
      en: "3. Your Confidential Details",
      hi: "3. आपकी गोपनीय जानकारी",
      gu: "૩. તમારી ખાનગી વિગતો",
    },
    btnContinue: {
      en: "Continue to Contact Details",
      hi: "संपर्क जानकारी भरें",
      gu: "સંપર્ક વિગતો માટે આગળ વધો",
    },
    btnBack: {
      en: "Back",
      hi: "पीछे जाएं",
      gu: "પાછા જાઓ",
    },
    btnConfirm: {
      en: "Confirm & Schedule Session",
      hi: "सत्र निश्चित और बुक करें",
      gu: "સેશન બુકિંગ કન્ફર્મ કરો",
    },
    btnConfirming: {
      en: "Confirming Session...",
      hi: "सत्र बुक हो रहा है...",
      gu: "બુકિંગ થઈ રહ્યું છે...",
    },
    namePlaceholder: {
      en: "Your Full Name *",
      hi: "आपका पूरा नाम *",
      gu: "તમારું પૂરું નામ *",
    },
    phonePlaceholder: {
      en: "WhatsApp Mobile Number *",
      hi: "व्हाट्सएप मोबाइल नंबर *",
      gu: "વોટ્સએપ મોબાઈલ નંબર *",
    },
    emailPlaceholder: {
      en: "Email Address *",
      hi: "ईमेल आईडी *",
      gu: "ઈમેલ એડ્રેસ *",
    },
    notesPlaceholder: {
      en: "Briefly describe what you're hoping to work through (Optional & 100% Confidential)...",
      hi: "संक्षेप में बताएं कि आप किस समस्या पर चर्चा करना चाहते हैं (ऐच्छिक और 100% गोपनीय)...",
      gu: "તમે કઈ સમસ્યા અંગે માર્ગદર્શન મેળવવા માંગો છો તે ટૂંકમાં જણાવો (મરજિયાત અને ૧૦૦% ગુપ્ત)...",
    },
    changeSlot: {
      en: "Change Slot",
      hi: "समय बदलें",
      gu: "સમય બદલો",
    },
    addToGoogleCal: {
      en: "Add to your Google Calendar",
      hi: "अपने गूगल कैलेंडर में जोड़ें",
      gu: "તમારા ગૂગલ કેલેન્ડરમાં ઉમેરો",
    },
    reminderQueued: {
      en: "A WhatsApp and email reminder with your private session link has also been queued.",
      hi: "आपके निजी सत्र लिंक के साथ व्हाट्सएप और ईमेल रिमाइंडर भी भेज दिया गया है।",
      gu: "તમારા ખાનગી સેશન લિંક સાથેનો વોટ્સએપ અને ઈમેલ રિમાઇન્ડર પણ મોકલી દેવામાં આવ્યો છે.",
    },
    doneBtn: {
      en: "Done",
      hi: "संपन्न",
      gu: "પૂર્ણ",
    },
    serviceCouplesTitle: {
      en: "Couples Relationship Repair",
      hi: "दांपत्य व वैवाहिक सुधार",
      gu: "દંપતી સંબંધ સુધારણા",
    },
    serviceCouplesSub: {
      en: "Break circular arguments, rebuild warmth & trust",
      hi: "झगड़े रोकें, रिश्ते में विश्वास और गर्माहट लौटाएं",
      gu: "તકરાર અટકાવો, પ્રેમ અને વિશ્વાસ પુનઃસ્થાપિત કરો",
    },
    serviceFamilyTitle: {
      en: "Parenting & Family Coaching",
      hi: "पेरेंटिंग व पारिवारिक मार्गदर्शन",
      gu: "પેરેન્ટિંગ અને ફેમિલી ગાઈડન્સ",
    },
    serviceFamilySub: {
      en: "End daily screen battles, manage teen/child triggers",
      hi: "स्क्रीन की लत और बच्चों के चिड़चिड़ेपन से राहत",
      gu: "સ્ક્રીનિંગ અને બાળકના ગુસ્સાને પ્રેમથી સંભાળો",
    },
    serviceMentorTitle: {
      en: "Individual Counseling & Mentorship",
      hi: "व्यक्तिगत काउंसलिंग व मेंटरशिप",
      gu: "વ્યક્તિગત કાઉન્સેલિંગ અને મેન્ટરશિપ",
    },
    serviceMentorSub: {
      en: "Overcome burnout, regain emotional clarity & resilience",
      hi: "बर्नआउट दूर करें, मानसिक शांति और स्पष्टता पाएं",
      gu: "માનસિક થાક દૂર કરો, ઊર્જા અને સ્પષ્ટતા મેળવો",
    },
  },
  footer: {
    tagline: {
      en: "Guiding families through stress back to calm. Evidence-based personal counseling, parenting coaching, and corporate keynote speaker based in Mumbai & Surat.",
      hi: "तनाव से शांति की ओर परिवारों का मार्गदर्शन। मुंबई और सूरत स्थित व्यक्तिगत काउंसलिंग, पेरेंटिंग कोचिंग और कॉर्पोरेट स्पीकर।",
      gu: "તણાવમાંથી માનસિક શાંતિ તરફ પરિવારોનું માર્ગદર્શન. મુંબઈ અને સુરતમાં વ્યક્તિગત કાઉન્સેલિંગ, પેરેન્ટિંગ કોચિંગ અને કીનોટ સ્પીકર.",
    },
    confidentialCare: {
      en: "100% Confidential & Private Care",
      hi: "100% गोपनीय और सुरक्षित परामर्श",
      gu: "૧૦૦% ગુપ્ત અને સુરક્ષિત માર્ગદર્શન",
    },
    quickNav: {
      en: "Quick Navigation",
      hi: "त्वरित नेविगेशन",
      gu: "ઝડપી નેવિગેશન",
    },
    practiceFocus: {
      en: "Practice Focus",
      hi: "मुख्य विशेषज्ञता",
      gu: "મુખ્ય વિશેષતાઓ",
    },
    languagesSpoken: {
      en: "Languages Spoken",
      hi: "बातचीत की भाषाएं",
      gu: "પરામર્શની ભાષાઓ",
    },
    languagesList: {
      en: "English, Hindi, Gujarati",
      hi: "अंग्रेजी, हिंदी, गुजराती",
      gu: "અંગ્રેજી, હિન્દી, ગુજરાતી",
    },
    directContact: {
      en: "Direct Contact",
      hi: "सीधा संपर्क",
      gu: "સીધો સંપર્ક",
    },
    allRightsReserved: {
      en: "Nikunj Dhanani Counseling. All rights reserved.",
      hi: "निकुंज धानाणी काउंसलिंग। सर्वाधिकार सुरक्षित।",
      gu: "નિકુંજ ધાનાણી કાઉન્સેલિંગ. સર્વ હક સુરક્ષિત.",
    },
    developedBy: {
      en: "Developed & Managed by",
      hi: "डेवलप्ड एवं मैनेज्ड बाय",
      gu: "ડેવલપ્ડ અને મેનેજ્ડ બાય",
    },
    serviceFocus1: {
      en: "Parenting Stress & Child Dynamics",
      hi: "पेरेंटिंग तनाव और बाल मनोविज्ञान",
      gu: "પેરેન્ટિંગ તણાવ અને બાળ મનોવિજ્ઞાન",
    },
    serviceFocus2: {
      en: "Couples Relationship Repair",
      hi: "दांपत्य संबंध सुधारणा",
      gu: "દંપતી સંબંધ સુધારણા",
    },
    serviceFocus3: {
      en: "Executive & Corporate Burnout",
      hi: "एग्जीक्यूटिव और कॉर्पोरेट बर्नआउट",
      gu: "એક્ઝિક્યુટિવ અને કોર્પોરેટ બર્નઆઉટ",
    },
    serviceFocus4: {
      en: "Teen Emotional Guidance",
      hi: "किशोर (टीनएज) भावनात्मक मार्गदर्शन",
      gu: "ટીનેજ ભાવનાત્મક માર્ગદર્શન",
    },
    serviceFocus5: {
      en: "Life Direction & Self-Improvement",
      hi: "जीवन की दिशा एवं आत्म-सुधार",
      gu: "જીવનની દિશા અને સ્વ-વિકાસ",
    },
  },
  welcomeModal: {
    title: {
      en: "Welcome • स्वागत है • સ્વાગત છે",
      hi: "स्वागत है • Welcome • સ્વાગત છે",
      gu: "સ્વાગત છે • Welcome • स्वागत है",
    },
    subtitle: {
      en: "Choose your preferred language to explore counseling services:",
      hi: "परामर्श सेवाओं के लिए अपनी पसंदीदा भाषा चुनें:",
      gu: "કાઉન્સેલિંગ સેવાઓ માટે તમારી અનુકૂળ ભાષા પસંદ કરો:",
    },
    changeAnytime: {
      en: "You can change this anytime using the 🌐 selector in the top menu.",
      hi: "आप इसे ऊपर मेनू में मौजूद 🌐 विकल्प से कभी भी बदल सकते हैं।",
      gu: "તમે ઉપરના મેનુમાં 🌐 બટનથી આ ગમે ત્યારે બદલી શકો છો.",
    },
    continueIn: {
      en: "Continue in",
      hi: "चुनें",
      gu: "પસંદ કરો",
    },
    selectBtn: {
      en: "Select →",
      hi: "चुनें →",
      gu: "પસંદ કરો →",
    },
  },
};
