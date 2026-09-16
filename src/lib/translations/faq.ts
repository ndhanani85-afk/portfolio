import { SupportedLanguage } from "@/context/LanguageContext";

export const faqPageTranslations = {
  header: {
    badge: {
      en: "Common Questions",
      hi: "महत्वपूर्ण प्रश्न",
      gu: "સામાન્ય પ્રશ્નોત્તરી",
    },
    title: {
      en: "Frequently Asked Questions",
      hi: "अक्सर पूछे जाने वाले सवाल",
      gu: "વારંવાર પૂછાતા સવાલો (FAQ)",
    },
    subtitle: {
      en: "Clear, transparent answers about sessions, confidentiality, format, and booking.",
      hi: "सत्र, गोपनीयता, शुल्क और बुकिंग प्रक्रिया से संबंधित पारदर्शी व स्पष्ट उत्तर।",
      gu: "કાઉન્સેલિંગ સત્ર, ગોપનીયતા, ફી અને બુકિંગ પ્રક્રિયા વિશેના સ્પષ્ટ અને સરળ જવાબો.",
    },
    searchPlaceholder: {
      en: "Search questions by topic (e.g. online, fees, privacy, couples)...",
      hi: "विषय के अनुसार खोजें (उदा. ऑनलाइन, फीस, गोपनीयता, दांपत्य)...",
      gu: "પ્રશ્નો શોધો (દા.ત. ઓનલાઈન, ફી, ગોપનીયતા, દંપતી)...",
    },
    noResults: {
      en: "No questions found matching your search.",
      hi: "आपकी खोज से मेल खाता कोई प्रश्न नहीं मिला।",
      gu: "તમારી શોધ મુજબ કોઈ પ્રશ્ન મળ્યો નથી.",
    },
    clearSearch: {
      en: "Clear Search",
      hi: "खोज हटाएं",
      gu: "શોધ દૂર કરો",
    },
  },
  categories: {
    all: { en: "All", hi: "सभी", gu: "બધા" },
    general: { en: "General", hi: "सामान्य", gu: "સામાન્ય" },
    formatLogistics: { en: "Format & Logistics", hi: "सत्र का स्वरूप", gu: "સત્રનું સ્વરૂપ" },
    confidentialityEthics: { en: "Confidentiality & Ethics", hi: "गोपनीयता एवं नैतिकता", gu: "ગોપનીયતા અને નૈતિકતા" },
    paymentsPricing: { en: "Payments & Pricing", hi: "शुल्क एवं भुगतान", gu: "ફી અને ચૂકવણી" },
  },
  items: [
    {
      category: "Format & Logistics",
      question: {
        en: "What is the format of counseling sessions? Are they online or in-person?",
        hi: "काउंसलिंग सत्रों का स्वरूप क्या है? क्या ये ऑनलाइन होते हैं या व्यक्तिगत रूप से?",
        gu: "કાઉન્સેલિંગ સત્રોનું સ્વરૂપ કેવું હોય છે? શું તે ઓનલાઈન છે કે રૂબરૂ?",
      },
      answer: {
        en: "Sessions are available both in-person at my practice and online nationwide via secure video calls (Zoom/Google Meet). Both formats offer the exact same level of privacy, structure, and 1-on-1 dedicated care.",
        hi: "सत्र मेरे क्लीनिक में व्यक्तिगत रूप से और पूरे भारत में सुरक्षित वीडियो कॉल (ज़ूम/गूगल मीट) के माध्यम से ऑनलाइन दोनों तरह से उपलब्ध हैं। दोनों ही माध्यमों में समान स्तर की गोपनीयता और व्यक्तिगत ध्यान दिया जाता है।",
        gu: "સત્રો મુંબઈમાં રૂબરૂ અને સમગ્ર ભારતમાં સુરક્ષિત વિડિયો કૉલ (Zoom/Google Meet) દ્વારા ઓનલાઈન એમ બંને રીતે ઉપલબ્ધ છે. બંને માધ્યમોમાં સમાન સ્તરની અંગત કાળજી અને ગોપનીયતા જળવાય છે.",
      },
    },
    {
      category: "General",
      question: {
        en: "What languages are counseling sessions conducted in?",
        hi: "काउंसलिंग सत्र किन भाषाओं में आयोजित किए जाते हैं?",
        gu: "કાઉન્સેલિંગ સત્રો કઈ ભાષાઓમાં લેવામાં આવે છે?",
      },
      answer: {
        en: "I conduct sessions fluently in English, Hindi, and Gujarati based on your personal comfort and family preference.",
        hi: "मैं आपकी व्यक्तिगत सुविधा और परिवार की पसंद के आधार पर अंग्रेजी, हिंदी और गुजराती में धाराप्रवाह सत्र संचालित करता हूँ।",
        gu: "તમારી અંગત અનુકૂળતા અને પરિવારની પસંદગી મુજબ હું અંગ્રેજી, હિન્દી અને ગુજરાતી ત્રણેય ભાષાઓમાં સરળતાથી સત્રો લઉં છું.",
      },
    },
    {
      category: "Confidentiality & Ethics",
      question: {
        en: "How is client confidentiality protected?",
        hi: "क्लाइंट की गोपनीयता की सुरक्षा कैसे की जाती है?",
        gu: "ક્લાયન્ટની ગોપનીયતાની સુરક્ષા કેવી રીતે કરવામાં આવે છે?",
      },
      answer: {
        en: "Every session is strictly confidential. No details, notes, or identities are shared with third parties, employers, or family members without your explicit written consent.",
        hi: "प्रत्येक सत्र पूर्णतः गोपनीय होता है। आपकी लिखित सहमति के बिना परिवार, नियोक्ता या किसी भी तीसरे पक्ष के साथ कोई भी जानकारी या पहचान साझा नहीं की जाती।",
        gu: "દરેક સત્ર સંપૂર્ણપણે ખાનગી અને ગોપનીય હોય છે. તમારી સ્પષ્ટ લેખિત મંજૂરી વિના પરિવાર, નોકરીદાતા કે અન્ય કોઈ વ્યક્તિ સાથે કોઈપણ વિગત શેર કરવામાં આવતી નથી.",
      },
    },
    {
      category: "General",
      question: {
        en: "What can I expect during my very first session?",
        hi: "अपने पहले सत्र के दौरान मैं क्या अपेक्षा कर सकता हूँ?",
        gu: "મારા પ્રથમ સત્ર દરમિયાન મને શું અનુભવ થશે?",
      },
      answer: {
        en: "Session 1 is an intake & goal-definition session. I will listen to your current situation, map primary stress points or relational triggers, and co-create an initial 4-session action plan.",
        hi: "पहला सत्र स्थिति समझने और लक्ष्य तय करने का होता है। मैं आपकी वर्तमान स्थिति को ध्यान से सुनूंगा, तनाव के मुख्य कारणों की पहचान करूँगा और समाधान की रूपरेखा तैयार करूँगा।",
        gu: "પ્રથમ સત્ર તમારી સ્થિતિ સમજવા અને લક્ષ્યો નક્કી કરવાનું હોય છે. હું તમારી સમસ્યાઓ શાંતિથી સાંભળીશ, મુખ્ય કારણો ઓળખીશ અને વ્યવહારુ ઉકેલ માટેનું માળખું ઘડીશ.",
      },
    },
    {
      category: "Payments & Pricing",
      question: {
        en: "What is the duration and fee structure for a session?",
        hi: "सत्र की समयाવधि और शुल्क संरचना क्या है?",
        gu: "સત્રનો સમયગાળો અને ફીનું માળખું શું છે?",
      },
      answer: {
        en: "Individual and parenting sessions are 60 minutes long. Joint couples relationship sessions run 60–75 minutes. Clear, transparent fee details are confirmed prior to your session booking.",
        hi: "व्यक्तिगत और पेरेंटिंग सत्र ६० मिनट के होते हैं। दांपत्य (कपल्स) सत्र ६૦-७५ मिनट तक चलते हैं। बुकिंग से पूर्व स्पष्ट और पारदर्शी शुल्क की पुष्टि की जाती है।",
        gu: "વ્યક્તિગત અને પેરેન્ટિંગ સત્રો ૬૦ મિનિટના હોય છે. દંપતી (કપલ્સ) સત્રો ૬૦-૭૫ મિનિટ ચાલે છે. સત્ર બુક કરાવતા પહેલાં ફીની સંપૂર્ણ પારદર્શક માહિતી આપવામાં આવે છે.",
      },
    },
    {
      category: "Format & Logistics",
      question: {
        en: "How does the booking and time slot scheduling process work?",
        hi: "बुकिंग और समय चुनने की प्रक्रिया कैसे काम करती है?",
        gu: "બુકિંગ અને સમય પસંદ કરવાની પ્રક્રિયા કેવી રીતે થાય છે?",
      },
      answer: {
        en: "You can select your preferred date, time slot, and session type using our online calendar on the Contact page. You will receive an instant confirmation email and WhatsApp reminder with session link/location details.",
        hi: "आप हमारे संपर्क पेज पर ऑनलाइन कैलेंडर का उपयोग करके अपनी पसंदीदा तारीख, समय और सत्र का प्रकार चुन सकते हैं। आपको ईमेल और व्हाट्सएप पर तुरंत पुष्टि प्राप्त होगी।",
        gu: "તમે અમારા સંપર્ક પેજ પર ઓનલાઈન કેલેન્ડર દ્વારા તમારી અનુકૂળ તારીખ, સમય અને સત્રનો પ્રકાર પસંદ કરી શકો છો. તમને તરત જ ઈમેલ અને વોટ્સએપ પર પુષ્ટિ સંદેશ મળી જશે.",
      },
    },
    {
      category: "Payments & Pricing",
      question: {
        en: "What is the cancellation and rescheduling policy?",
        hi: "सत्र रद्द करने या समय बदलने (रीशेड्यूल) की क्या नीति है?",
        gu: "સત્ર રદ કરવા અથવા સમય બદલવા (રીશેડ્યુલ) અંગેના નિયમો શું છે?",
      },
      answer: {
        en: "We request at least 24 hours' notice for rescheduling or canceling a session so that the slot can be made available to other clients in need.",
        hi: "हम सत्र का समय बदलने या रद्द करने के लिए कम से कम २४ घंटे पहले सूचना देने का अनुरोध करते हैं ताकि वह समय किसी अन्य जरूरतमंद क्लाइंट को दिया जा सके।",
        gu: "અમે સત્રનો સમય બદલવા અથવા રદ કરવા માટે ઓછામાં ઓછી ૨૪ કલાક અગાઉ જાણ કરવાની વિનંતી કરીએ છીએ, જેથી એ સમય અન્ય જરૂરિયાતમંદ ક્લાયન્ટને ફાળવી શકાય.",
      },
    },
    {
      category: "Confidentiality & Ethics",
      question: {
        en: "What should I do if I or a family member am in an immediate crisis?",
        hi: "यदि मैं या मेरा कोई पारिवारिक सदस्य आपातकालीन संकट में हो तो क्या करें?",
        gu: "જો હું અથવા પરિવારના કોઈ સભ્ય તાત્કાલિક ગંભીર સંકટમાં હોય તો શું કરવું?",
      },
      answer: {
        en: "My counseling practice provides scheduled therapy and coaching. If you are experiencing a mental health emergency or immediate danger, please reach out to national emergency helplines immediately (Tele-MANAS: 14416 | Vandrevala Foundation: +91 9999 666 555).",
        hi: "मेरी परामर्श सेवा पूर्व-निर्धारित सत्रों पर आधारित है। यदि आप किसी आपातकालीन मानसिक संकट में हैं, तो कृपया तुरंत राष्ट्रीय हेल्पलाइन (Tele-MANAS: 14416 | Vandrevala Foundation: +91 9999 666 555) पर संपर्क करें।",
        gu: "મારી કાઉન્સેલિંગ સેવા પૂર્વ-નિર્ધારિત સત્રો માટે છે. જો તમે કોઈ ગંભીર માનસિક સંકટ કે કટોકટીમાં હોવ, તો કૃપા કરીને તરત જ રાષ્ટ્રીય હેલ્પલાઇન (Tele-MANAS: 14416 | Vandrevala Foundation: +91 9999 666 555) નો સંપર્ક કરો.",
      },
    },
    {
      category: "Format & Logistics",
      question: {
        en: "Can I switch between online and in-person sessions?",
        hi: "क्या मैं ऑनलाइन और व्यक्तिगत सत्रों के बीच बदलाव कर सकता हूँ?",
        gu: "શું હું ઓનલાઈન અને રૂબરૂ સત્રો વચ્ચે અદલાબદલી કરી શકું છું?",
      },
      answer: {
        en: "Yes, clients frequently mix online and in-person sessions based on travel schedules or work commitments.",
        hi: "हाँ, क्लाइंट अक्सर अपनी यात्रा या काम की व्यस्तता के अनुसार ऑनलाइन और व्यक्तिगत सत्रों में सुविधानुसार बदलाव करते हैं।",
        gu: "હા, ક્લાયન્ટ્સ તેમની મુસાફરી અથવા ઓફિસના કામકાજ મુજબ ઓનલાઈન અને રૂબરૂ સત્રો બંનેનો લાભ લઈ શકે છે.",
      },
    },
    {
      category: "General",
      question: {
        en: "Is counseling suitable for executive burnout or work stress?",
        hi: "क्या काउंसलिंग ऑफिस के तनाव और बर्नआउट के लिए उपयुक्त है?",
        gu: "શું કાઉન્સેલિંગ ઓફિસના તણાવ અને બર્નઆઉટ માટે ઉપયોગી છે?",
      },
      answer: {
        en: "Absolutely. Executive stress, decision fatigue, and career burnout are primary core specialties of my 1-on-1 counseling practice.",
        hi: "बिल्कुल। कार्यस्थल का तनाव, निर्णय लेने की थकावट और करियर बर्नआउट मेरी व्यक्तिगत परामर्श सेवा के मुख्य विशेषज्ञता क्षेत्र हैं।",
        gu: "ચોક્કસપણે. ઓફિસનો માનસિક તણાવ, નિર્ણયો લેવાનો થાક અને કરિયર બર્નઆઉટ મારા વ્યક્તિગત કાઉન્સેલિંગની મુખ્ય વિશેષતા છે.",
      },
    },
    {
      category: "Confidentiality & Ethics",
      question: {
        en: "Are session notes kept securely?",
        hi: "क्या सत्र के नोट्स सुरक्षित रखे जाते हैं?",
        gu: "શું સત્રની નોંધ સંપૂર્ણ સુરક્ષિત રાખવામાં આવે છે?",
      },
      answer: {
        en: "Yes, all clinical notes are encrypted, password-protected, and strictly accessible only by me.",
        hi: "हाँ, सभी नोट्स एन्क्रिप्टेड और पासवर्ड-सुरक्षित होते हैं, जिन्हें केवल मेरे द्वारा ही देखा जा सकता है।",
        gu: "હા, તમામ નોંધ એન્ક્રિપ્ટેડ અને પાસવર્ડ-સુરક્ષિત રાખવામાં આવે છે, જે ફક્ત મારી જ પહોંચમાં હોય છે.",
      },
    },
    {
      category: "Payments & Pricing",
      question: {
        en: "Are receipts or invoices provided for corporate reimbursement?",
        hi: "क्या कंपनी प्रतिपूर्ति (रीइंबर्समेंट) के लिए रसीद या इनवॉइस उपलब्ध कराया जाता है?",
        gu: "શું કંપની તરફથી ખર્ચ મેળવવા (રીઈમ્બર્સમેન્ટ) માટે રસીદ કે ઇનવોઇસ આપવામાં આવે છે?",
      },
      answer: {
        en: "Yes, official invoices detailing professional wellness consulting are provided upon request.",
        hi: "हाँ, अनुरोध करने पर व्यावसायिक वेलनेस कंसल्टिंग का आधिकारिक इनवॉइस प्रदान किया जाता है।",
        gu: "હા, વિનંતી કરવા પર વ્યાવસાયિક વેલનેસ કન્સલ્ટિંગનું સત્તાવાર ઇનવોઇસ આપવામાં આવે છે.",
      },
    },
  ],
  footerHelp: {
    question: {
      en: "Have a question that isn't answered here?",
      hi: "क्या आपका कोई ऐसा प्रश्न है जिसका उत्तर यहाँ नहीं मिला?",
      gu: "શું તમારો કોઈ એવો પ્રશ્ન છે જેનો જવાબ અહીં નથી મળ્યો?",
    },
    subtitle: {
      en: "Feel free to reach out directly. I'm happy to help you find the right path forward.",
      hi: "बेझिझक सीधे संपर्क करें। सही दिशा चुनने में मुझे आपकी मदद करने में खुशी होगी।",
      gu: "નિઃસંકોચ સીધો સંપર્ક કરો. યોગ્ય માર્ગ પસંદ કરવામાં આપને મદદ કરતા મને આનંદ થશે.",
    },
    contactBtn: {
      en: "Contact Directly",
      hi: "સીધો સંપર્ક કરો",
      gu: "સીધો સંપર્ક કરો",
    },
    whatsappBtn: {
      en: "WhatsApp Question",
      hi: "व्हाट्सएप पर पूछें",
      gu: "વોટ્સએપ પર પૂછો",
    },
  },
};
