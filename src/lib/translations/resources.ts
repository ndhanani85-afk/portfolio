import { SupportedLanguage } from "@/context/LanguageContext";

export const resourcesTranslations = {
  header: {
    badge: {
      en: "Insights & Guides",
      hi: "उपयोगी साधन एवं मार्गदर्शिका",
      gu: "ઉપયોગી સાધનો અને માર્ગદર્શિકા",
    },
    title: {
      en: "Articles & Guides on Family Calm & Stress Relief",
      hi: "परिवार, दांपत्य शांति एवं तनाव मुक्ति पर मार्गदर्शिका",
      gu: "પરિવાર, દાંપત્ય શાંતિ અને તણાવ મુક્તિ માટે માર્ગદર્શિકા",
    },
    subtitle: {
      en: "Practical, evidence-based insights and downloadable resource booklets created by counselor Nikunj Dhanani.",
      hi: "काउंसलर निकुंज धनानी द्वारा तैयार किए गए व्यावहारिक मार्गदर्शन, वैज्ञानिक दृष्टिकोण और उपयोगी ई-पुस्तिकाएं।",
      gu: "કાઉન્સેલર નિકુંજ ધાનાણી દ્વારા તૈયાર કરાયેલ વ્યાવહારિક માર્ગદર્શન, વૈજ્ઞાનિક દ્રષ્ટિકોણ અને ઉપયોગી ઈ-પુસ્તિકાઓ.",
    },
  },
  guides: {
    badge: {
      en: "Featured E-Books",
      hi: "प्रमुख ई-बुक्स",
      gu: "મુખ્ય ઈ-બુક્સ",
    },
    heading: {
      en: "Downloadable Practice Booklets",
      hi: "उपयोगी परामर्श पुस्तिकाएं",
      gu: "ડાઉનલોડેબલ કાઉન્સેલિંગ પુસ્તિકાઓ",
    },
    requestCopyBtn: {
      en: "Request Copy in Session",
      hi: "सत्र में प्रति प्राप्त करें",
      gu: "સત્રમાં નકલ મેળવો",
    },
    items: [
      {
        title: {
          en: "Parenting Calm Guidebook",
          hi: "पेरेंटिंग शांति मार्गदर्शिका",
          gu: "પેરેન્ટિંગ શાંતિ માર્ગદર્શિકા",
        },
        tag: {
          en: "Parenting",
          hi: "पेरेंटिंग",
          gu: "પેરેન્ટિંગ",
        },
        pages: {
          en: "18 Pages PDF",
          hi: "१८ पृष्ठ पीडीएफ",
          gu: "૧૮ પેજ પીડીએફ",
        },
        image: "/parenting_book.png",
      },
      {
        title: {
          en: "Couples Relationship Guide",
          hi: "दांपत्य संबंध मार्गदर्शिका",
          gu: "દાંપત્ય સંબંધ માર્ગદર્શિકા",
        },
        tag: {
          en: "Relationships",
          hi: "रिलेशनशिप",
          gu: "રિલેશનશિપ",
        },
        pages: {
          en: "24 Pages PDF",
          hi: "२४ पृष्ठ पीडीएफ",
          gu: "૨૪ પેજ પીડીએફ",
        },
        image: "/family_guide.png",
      },
      {
        title: {
          en: "Executive Stress & Resilience Toolkit",
          hi: "तनाव मुक्ति एवं मानसिक संतुलन टूलकिट",
          gu: "તણાવ મુક્તિ અને માનસિક સંતુલન ટૂલકિટ",
        },
        tag: {
          en: "Stress Management",
          hi: "तनाव प्रबंधन",
          gu: "તણાવ નિવારણ",
        },
        pages: {
          en: "15 Pages PDF",
          hi: "१५ पृष्ठ पीडीएफ",
          gu: "૧૫ પેજ પીડીએફ",
        },
        image: "/stress_toolkit.png",
      },
    ],
  },
  filter: {
    categories: {
      all: { en: "All", hi: "सभी", gu: "બધા" },
      parenting: { en: "Parenting", hi: "पेरेंटिंग", gu: "પેરેન્ટિંગ" },
      relationships: { en: "Relationships", hi: "दांपत्य संबंध", gu: "દાંપત્ય સંબંધ" },
      stress: { en: "Stress Management", hi: "तनाव प्रबंधन", gu: "તણાવ નિવારણ" },
    },
    searchPlaceholder: {
      en: "Search articles...",
      hi: "लेख खोजें...",
      gu: "લેખો શોધો...",
    },
  },
  articles: {
    badge: {
      en: "Clinical Insights",
      hi: "परामर्श लेख",
      gu: "કાઉન્સેલિંગ લેખો",
    },
    heading: {
      en: "Short Guides on Relationship & Family Dynamics",
      hi: "संबंधों और पारिवारिक तालमेल पर उपयोगी लेख",
      gu: "સંબંધો અને પારિવારિક સુમેળ પર ઉપયોગી લેખો",
    },
    discussBtn: {
      en: "Discuss This in Session",
      hi: "सत्र में इस पर चर्चा करें",
      gu: "સત્રમાં આ અંગે ચર્ચા કરો",
    },
    items: [
      {
        id: "parenting-triggers",
        categoryKey: "parenting",
        title: {
          en: "5 Hidden Triggers Behind Childhood Behavioral Outbursts",
          hi: "बच्चों के अचानक गुस्से और हठ के ५ छिपे हुए कारण",
          gu: "બાળકોના અચાનક ગુસ્સા અને જીદ પાછળના ૫ છૂપા કારણો",
        },
        readTime: {
          en: "3 min read",
          hi: "३ मिनट वाचन",
          gu: "૩ મિનિટ વાંચન",
        },
        snippet: {
          en: "Childhood tantrums are rarely about refusing discipline. Most emotional outbursts occur when a child experiences sensory overwhelm or feels unable to express fear. Here is how to respond with calm boundaries.",
          hi: "बच्चों का गुस्सा केवल अनुशासनहीनता नहीं होता। अधिकांश बार यह संवेदी तनाव (sensory overwhelm) या अनसुलझे डर का परिणाम होता है। जानिए शांत रहकर सीमाएं कैसे तय करें।",
          gu: "બાળકોની જીદ કે ગુસ્સો માત્ર શિસ્તનો અભાવ નથી હોતો. મોટાભાગે તે વધારે પડતા માનસિક ભાર કે ડરને લીધે થાય છે. જાણો કેવી રીતે શાંત રહીને સચોટ સીમાઓ નક્કી કરવી.",
        },
        fullContent: {
          en: `Childhood tantrums are rarely about refusing discipline. Most emotional outbursts occur when a child experiences sensory overwhelm or feels unable to express fear. When parents respond with shouting or immediate punishment, it heightens the child's neurological threat response.

To break this cycle, use the 3-second pause:
1. Lower your vocal pitch and crouch to eye level.
2. Validate their emotional state ("I see you are feeling frustrated right now").
3. Set the boundary calmly without arguing ("It is okay to feel angry, but it is not okay to hit").

Consistent application of this framework creates emotional safety while holding firm behavioral standards.`,
          hi: `बच्चों का गुस्सा केवल अनुशासनहीनता नहीं होता। अधिकांश भावनात्मक उफान तब आते हैं जब बच्चा संवेदी तनाव महसूस करता है या अपनी बात नहीं समझा पाता। चिल्लाने या दंड देने से बच्चे का डर और बढ़ जाता है।

इस चक्र को तोड़ने के लिए ३-सेकंड का विराम लें:
१. अपनी आवाज धीमी करें और बच्चे की आंखों के स्तर पर झुकें।
२. उनकी भावना को स्वीकारें ("मैं समझ सकता हूँ कि आप परेशान हैं")।
३. बिना बहस किए स्पष्ट सीमा बनाएं ("गुस्सा आना स्वाभाविक है, पर हाथ उठाना गलत है")।

यह दृष्टिकोण भावनात्मक सुरक्षा और स्वस्थ अनुशासन दोनों सुनिश्चित करता है।`,
          gu: `બાળકોનો ગુસ્સો માત્ર શિસ્તનો અભાવ નથી હોતો. મોટાભાગે જ્યારે બાળક વધુ પડતો થાક કે ગભરાટ અનુભવે છે ત્યારે તે જીદ કે ગુસ્સા દ્વારા વ્યક્ત થાય છે. ગુસ્સે થવાથી બાળકમાં ડર વધે છે.

આ સ્થિતિ સંભાળવા ૩-સેકન્ડનો વિરામ લો:
૧. અવાજ ધીમો કરો અને બાળકની નજરના સ્તરે બેસો.
૨. બાળકની લાગણી સમજો ("હું સમજું છું કે તું અત્યારે અકળાયો છે").
૩. દલીલ વિના શાંતિથી મર્યાદા બાંધો ("ગુસ્સો કરવો વાજબી છે, પણ વસ્તુ ફેંકવી યોગ્ય નથી").

આ અભિગમ બાળકને માનસિક સુરક્ષા અને સાચું માર્ગદર્શન આપે છે.`,
        },
      },
      {
        id: "relationship-arguments",
        categoryKey: "relationships",
        title: {
          en: "Why Couples Get Trapped in the Same Argument for Years",
          hi: "दंपती वर्षों तक एक ही विवाद में क्यों उलझे रहते हैं?",
          gu: "દાંપત્ય જીવનમાં વર્ષો સુધી એક જ વાત પર તકરાર કેમ ચાલ્યા કરે છે?",
        },
        readTime: {
          en: "4 min read",
          hi: "४ मिनट वाचन",
          gu: "૪ મિનિટ વાંચન",
        },
        snippet: {
          en: "Circular arguments occur when partners argue over the surface topic (chores, schedules, finances) rather than the underlying emotional need for appreciation and respect.",
          hi: "बार-बार होने वाले झगड़े ऊपरी मुद्दों (काम, दिनचर्या, खर्च) पर नहीं, बल्कि कद्र, सम्मान और भावनात्मक लगाव की अनदेखी के कारण होते हैं।",
          gu: "વારંવાર થતી તકરાર માત્ર રોજિંદા કામ કે ખર્ચના મુદ્દા પર નથી હોતી, પરંતુ પરસ્પર સન્માન અને કદર ન મળવાની ભાવનાને લીધે થાય છે.",
        },
        fullContent: {
          en: `Circular arguments occur when partners argue over the surface topic rather than the underlying emotional need. When one partner feels unappreciated, a simple disagreement about household duties escalates into a debate over commitment.

To interrupt a circular argument:
- Name the pattern out loud: "We are stepping into our usual argument loop."
- Shift from 'You' statements to 'I' statements ("I feel overwhelmed" vs "You never help").
- Agree on a 15-minute cool-down period before continuing sensitive discussions.

Couples counseling provides the neutral structure required to untangle these historical defense patterns.`,
          hi: `बार-बार होने वाले विवाद ऊपरी बातों पर नहीं, बल्कि भावनात्मक जरूरतों पर होते हैं। जब एक साथी खुद को उपेक्षित महसूस करता है, तो छोटी सी बात भी रिश्ते की गंभीरता पर बहस बन जाती है।

इस विवाद चक्र को रोकने के उपाय:
- पैटर्न को पहचानें: "हम फिर उसी पुरानी बहस में उलझ रहे हैं।"
- 'तुम' की जगह 'मुझे' से बात शुरू करें ("मुझे बहुत तनाव महसूस हो रहा है")।
- संवेदनशील चर्चाओं के बीच १५ मिनट का कूल-डाउन समय लें।

काउंसलिंग इन पुराने रक्षात्मक पैटर्न्स को सुलझाने के लिए सुरक्षित वातावरण प्रदान करती है।`,
          gu: `ચક્રીય તકરાર ત્યારે થાય છે જ્યારે દંપતી મૂળ લાગણીને બદલે બહારના મુદ્દાઓ પર લડે છે. જ્યારે એક જીવનસાથી કદરનો અભાવ અનુભવે છે, ત્યારે નાની બાબત પણ મોટા ઝઘડામાં ફેરવાઈ જાય છે.

આ તકરાર અટકાવવા માટે:
- પેટર્નને ઓળખો: "આપણે ફરી એ જ જૂની દલીલ તરફ જઈ રહ્યા છીએ."
- 'તમે' ને બદલે 'મને' શબ્દથી વાત કરો ("મને અત્યારે ખૂબ ભાર લાગે છે").
- ગંભીર ચર્ચા વચ્ચે ૧૫ મિનિટનો વિરામ લો જેથી મન શાંત થાય.

કાઉન્સેલિંગ બંને વચ્ચે આ જૂના વાદવિવાદોને સન્માનપૂર્વક ઉકેલવાનો વ્યવહારુ માર્ગ આપે છે.`,
        },
      },
      {
        id: "executive-burnout",
        categoryKey: "stress",
        title: {
          en: "Overcoming Executive Burnout: The 4 Signs of Decision Fatigue",
          hi: "मानसिक थकान और बर्नआउट: निर्णय लेने की क्षमता घटने के ४ संकेत",
          gu: "માનસિક થાક અને બર્નઆઉટ: નિર્ણયો લેવાની ક્ષમતા ઘટવાના ૪ સંકેતો",
        },
        readTime: {
          en: "3 min read",
          hi: "३ मिनट वाचन",
          gu: "૩ મિનિટ વાંચન",
        },
        snippet: {
          en: "High achievers often mistake chronic exhaustion for lack of willpower. Recognizing decision fatigue early allows corporate leaders to protect their focus and personal well-being.",
          hi: "सफल पेशेवर अक्सर लगातार थकान को इच्छाशक्ति की कमी समझ लेते हैं। निर्णय-थकान को समय पर पहचानना आपके फोकस और मानसिक स्वास्थ्य की रक्षा करता है।",
          gu: "સફળ લોકો અવારનવાર થતા થાકને ઈચ્છાશક્તિનો અભાવ માની લે છે. નિર્ણય-થાકને સમયસર ઓળખવો તમારી એકાગ્રતા અને માનસિક સ્વાસ્થ્ય માટે જરૂરી છે.",
        },
        fullContent: {
          en: `High achievers often mistake chronic exhaustion for lack of willpower. When managers make hundreds of micro-decisions daily without adequate recovery, decision fatigue sets in, leading to irritability, cynicism, and sleep disruption.

Key recovery practices for leaders:
- Micro-breaks: 5 minutes of quiet breathwork between high-stakes meetings.
- Boundary setting: Establishing clear offline hours after 7:00 PM.
- Delegating routine choices: Structuring workflows to minimize low-priority decisions.

Personal coaching helps executives design sustainable mental routines that protect peak performance.`,
          hi: `सफल लोग लगातार मानसिक थकान को लापरवाही मान बैठते हैं। जब आप दिन भर सैकड़ों छोटे-बड़े फैसले लेते हैं, तो दिमाग थक जाता है, जिससे चिड़चिड़ापन और नींद में खलल पड़ता है।

नेताओं और अधिकारियों के लिए जरूरी आदतें:
- माइक्रो-ब्रेक्स: बैठकों के बीच ५ मिनट गहरी सांस लें और आंखें बंद करें।
- स्पष्ट सीमाएं: शाम ७ बजे के बाद काम से पूरी तरह डिस्कनेक्ट हों।
- प्रतिनिधि बनाना: छोटे-मोटे फैसलों को टीम को सौंपें।

पर्सनल लाइफ कोचिंग आपको ऐसी दिनचर्या बनाने में मदद करती है जो उत्पादकता और मानसिक शांति दोनों बनाए रखे।`,
          gu: `જ્યારે વ્યક્તિ દિવસભર અસંખ્ય નાના-મોટા નિર્ણયો લે છે ત્યારે માનસિક થાક ઊભો થાય છે, જે ચિડચિડાપણું અને ઊંઘમાં ખલેલ પહોંચાડે છે.

અધિકારીઓ અને ઉદ્યોગપતિઓ માટે જરૂરી ટેવો:
- માઇક્રો-બ્રેક્સ: મીટિંગ્સ વચ્ચે ૫ મિનિટ ઊંડા શ્વાસ લો અને મનને શાંત કરો.
- સીમાઓ નક્કી કરો: સાંજે ૭ વાગ્યા પછી કામથી સંપૂર્ણ અલિપ્ત રહો.
- કામની સોંપણી: સામાન્ય નિર્ણયો અન્ય સભ્યોને સોંપો.

લાઈફ કોચિંગ તમને આવી ટકાઉ દિનચર્યા બનાવવામાં મદદ કરે છે જે માનસિક શાંતિ જાળવે છે.`,
        },
      },
      {
        id: "teenager-communication",
        categoryKey: "parenting",
        title: {
          en: "Communicating With Teenagers Without Triggering Defensiveness",
          hi: "टीनएजर्स से बिना तनाव और वाद-विवाद के संवाद कैसे करें",
          gu: "ટીનેજર્સ સાથે મતભેદ કે તણાવ વિના સુમેળભર્યો સંવાદ કેવી રીતે કરવો",
        },
        readTime: {
          en: "4 min read",
          hi: "४ मिनट वाचन",
          gu: "૪ મિનિટ વાંચન",
        },
        snippet: {
          en: "Teenagers naturally seek independence. Interrogating them about school or friends often shuts down dialogue. Discover how to ask open-ended questions that invite connection.",
          hi: "किशोरावस्था में बच्चे स्वतंत्रता चाहते हैं। उन पर सवालों की झड़ी लगाने से वे दूरी बना लेते हैं। जानिए कैसे सहजता से संवाद बनाएं ताकि वे अपनी बात खुलकर कहें।",
          gu: "કિશોરાવસ્થામાં બાળકો સ્વતંત્રતા ઝંખે છે. પ્રશ્નોનો મારો કરવાથી તેઓ સંવાદ બંધ કરી દે છે. જાણો કેવી રીતે સહજતાથી વાતચીત કરવી જેથી તેઓ મનની વાત શેર કરે.",
        },
        fullContent: {
          en: `Teenagers naturally seek independence. Interrogating them about school or friends often shuts down dialogue. When parents ask rapid-fire questions, teenagers perceive it as control rather than care.

Try these subtle communication shifts:
- Move from interrogation to curiosity ("How was your day?" -> "What was the most interesting part of your afternoon?").
- Use drive-time conversations: Parallel seating in a car reduces intense eye contact and feels safer for teens.
- Respect privacy while maintaining safety boundaries.`,
          hi: `टीनएजर्स अपनी आज़ादी चाहते हैं। जब माता-पिता लगातार सवाल पूछते हैं, तो बच्चे इसे निगरानी समझते हैं।

संवाद के आसान तरीके:
- पूछताछ की जगह जिज्ञासा दिखाएं ("दिन कैसा था?" की जगह "आज सबसे दिलचस्प क्या हुआ?").
- गाड़ी चलाते समय बात करें: सीधी आंखों में आंखें न होने से बच्चे अधिक सहज महसूस करते हैं।
- प्राइवेसी का सम्मान करते हुए सुरक्षा की सीमाएं बनाए रखें।`,
          gu: `ટીનેજર્સ પોતાની સ્વાયત્તતા શોધે છે. પ્રશ્નો પૂછવાને બદલે પ્રેમથી તેમની વાત જાણો:
- તપાસ કરવાને બદલે જિજ્ઞાસા દર્શાવો ("દિવસ કેવો રહ્યો?" ને બદલે "આજે સૌથી રસપ્રદ શું બન્યું?").
- કારમાં મુસાફરી વખતે વાતો કરો: સીધી નજર ન હોવાથી બાળકો વધુ ખુલીને વાત કરે છે.
- તેમની ખાનગી બાબતોનું સન્માન કરો પણ સુરક્ષાનું ધ્યાન રાખો.`,
        },
      },
      {
        id: "rebuilding-trust",
        categoryKey: "relationships",
        title: {
          en: "Rebuilding Trust & Warmth After Emotional Distance",
          hi: "भावनात्मक दूरी के बाद दांपत्य में पुनः विश्वास और आत्मीयता लाना",
          gu: "ભાવનાત્મક અંતર પછી સંબંધમાં પુનઃ સ્નેહ અને વિશ્વાસ સ્થાપિત કરવો",
        },
        readTime: {
          en: "3 min read",
          hi: "३ मिनट वाचन",
          gu: "૩ મિનિટ વાંચન",
        },
        snippet: {
          en: "Emotional distance rarely happens overnight. Rebuilding warmth requires daily micro-connections and consistent honesty.",
          hi: "दांपत्य में दूरी अचानक नहीं आती, धीरे-धीरे बढ़ती है। रिश्ते में दोबारा मिठास लाने के लिए रोज छोटे-छोटे प्रयास और पारदर्शी ईमानदारी की जरूरत होती है।",
          gu: "સંબંધોમાં અંતર એક દિવસમાં નથી આવતું. ફરી સ્નેહ કેળવવા માટે દૈનિક નાના-નાના પ્રયાસો અને પારદર્શિતાની જરૂર પડે છે.",
        },
        fullContent: {
          en: `Emotional distance rarely happens overnight. It builds gradually through unaddressed misunderstandings and busy schedules.

To rebuild warmth:
- Practice 5-minute daily check-ins focused solely on each other's emotional well-being.
- Express explicit gratitude for small everyday efforts.
- Schedule dedicated 1-on-1 time without screens or family discussions.`,
          hi: `रिश्ते में दूरियां अनसुलझी गलतफहमियों और व्यस्त दिनचर्या के कारण धीरे-धीरे बढ़ती हैं।

स्नेह वापस लाने के उपाय:
- रोज़ ५ मिनट केवल एक-दूसरे के मन की बात सुनने के लिए निकालें।
- एक-दूसरे के छोटे प्रयासों के प्रति आभार व्यक्त करें।
- बिना मोबाइल या पारिवारिक जिम्मेदारियों के केवल दोनों के लिए समय निकालें।`,
          gu: `સંબંધોમાં ગેરસમજ અને વ્યસ્તતાને લીધે અંતર ધીમે ધીમે વધે છે.

નજીકી પાછી લાવવા માટે:
- દરરોજ ૫ મિનિટ માત્ર એકબીજાના મનની સ્થિતિ જાણવા ફાળવો.
- નાના-નાના કાર્યો માટે હૃદયપૂર્વક આભાર માનો.
- ફોન કે પરિવારની ચર્ચા વિના બંને વચ્ચે ક્વોલિટી ટાઈમ વિતાવો.`,
        },
      },
      {
        id: "emotional-resilience",
        categoryKey: "stress",
        title: {
          en: "Designing a Personal Mental Wellness Toolkit for Busy Professionals",
          hi: "व्यस्त जीवनशैली में मानसिक संतुलन और आत्म-देखभाल की दिनचर्या",
          gu: "વ્યસ્ત જીવનશૈલીમાં માનસિક સમતુલા અને આંતરિક શાંતિની દિનચર્યા",
        },
        readTime: {
          en: "3 min read",
          hi: "३ मिनट वाचन",
          gu: "૩ મિનિટ વાંચન",
        },
        snippet: {
          en: "Mental resilience is built through intentional daily habits, not sudden breakthroughs. Learn how to structure your personal wellness routine.",
          hi: "मानसिक शक्ति अचानक नहीं, रोज़ की सही आदतों से विकसित होती है। जानिए अपनी व्यस्त दिनचर्या में मानसिक शांति का संतुलन कैसे बनाएं।",
          gu: "માનસિક મનોબળ અચાનક નહીં, પરંતુ દૈનિક સારી ટેવોથી ઘડાય છે. જાણો વ્યસ્ત દિનચર્યામાં માનસિક શાંતિની વ્યવસ્થા કેવી રીતે ગોઠવવી.",
        },
        fullContent: {
          en: `Mental resilience is built through intentional daily habits. Busy professionals require practical, low-friction strategies that fit into demanding work schedules.

Essential toolkit components:
- Morning grounding: 10 minutes without checking emails upon waking.
- Physical movement: Mid-day walking breaks to regulate nervous system arousal.
- Evening reflection: Writing down 3 wins or clear priorities for the next day.`,
          hi: `मानसिक मजबूती रोज़ की छोटी और सही आदतों से बनती है। व्यस्त पेशेवरों के लिए आसान और व्यावहारिक तरीके जरूरी हैं।

ज़रूरी आदतें:
- सुबह का समय: सोकर उठने के बाद १० मिनट मोबाइल या ईमेल न देखें।
- हल्की चहलकदमी: दिन के बीच में थोड़ी सैर करें जिससे तनाव कम हो।
- शाम का मनन: दिन के ३ अच्छे पलों या अगले दिन की प्राथमिकताओं को नोट करें।`,
          gu: `માનસિક મનોબળ રોજની સાચી ટેવોથી બને છે. વ્યસ્ત લોકો માટે સરળ અને વ્યવહારુ પદ્ધતિઓ જરૂરી છે:
- સવારની શાંતિ: જાગ્યા પછી ૧૦ મિનિટ મોબાઈલ કે ઈમેલથી દૂર રહો.
- હળવો વૉક: દિવસ દરમિયાન થોડો સમય ચાલો જેથી તણાવ દૂર થાય.
- સાંજનું ચિંતન: દિવસની ૩ સારી બાબતો યાદ કરો અને આવતીકાલની પ્રાથમિકતાઓ નક્કી કરો.`,
        },
      },
    ],
  },
};
