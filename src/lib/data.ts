import type { Grade } from './types';

export const AppData: Grade[] = [
  {
    id: '8',
    name: 'ધોરણ ૮',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: સંમેય સંખ્યાઓ',
            content: 'આ પ્રકરણમાં સંમેય સંખ્યાઓના ગુણધર્મો અને સંખ્યા રેખા પર તેમના નિરૂપણનો અભ્યાસ કરીશું.',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [],
          },
        ],
      },
      {
        id: 'science',
        name: 'વિજ્ઞાન',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: પાક ઉત્પાદન અને વ્યવસ્થાપન',
            content: 'આ પ્રકરણમાં આપણે ખેતીની પદ્ધતિઓ, પાક ઉત્પાદન અને તેના વ્યવસ્થાપન વિશે શીખીશું.',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [],
          },
        ],
      },
    ],
  },
  {
    id: '9',
    name: 'ધોરણ ૯',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: સંખ્યા પદ્ધતિ',
            content:
              'આ પ્રકરણમાં આપણે વાસ્તવિક સંખ્યાઓ, તેમના દશાંશ નિરૂપણ અને સંખ્યા રેખા પર તેમના સ્થાન વિશે ઊંડાણમાં શીખીશું. આપણે સંમેય અને અસંમેય સંખ્યાઓ વચ્ચેનો તફાવત પણ સમજીશું.',
            videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL3-fG_I9I5Q-3kZzXzR5E-8e4Q3X-yT3p',
            imageUrl: 'placeholder-math',
            imageHint: 'numbers abstract',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [
              {
                question: 'નીચેનામાંથી કઈ સંખ્યા અસંમેય છે?',
                options: ['√4', '0.333...', 'π', '2/3'],
                correctAnswerIndex: 2,
              },
              {
                question: '36/100 નું દશાંશ સ્વરૂપ શું છે?',
                options: ['3.6', '0.36', '0.036', '36.0'],
                correctAnswerIndex: 1,
              },
              {
                question: '√9 એ કેવી સંખ્યા છે?',
                options: ['સંમેય', 'અસંમેય', 'અપૂર્ણાંક', 'ઋણ'],
                correctAnswerIndex: 0,
              },
            ],
          },
          {
            id: 'chapter-2',
            name: 'પ્રકરણ ૨: બહુપદીઓ',
            content: 'આ પ્રકરણ બહુપદીઓ, તેમના પ્રકારો, શૂન્યો અને બહુપદીઓના ભાગાકાર વિશે વિસ્તૃત માહિતી આપે છે.',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [],
          },
        ],
      },
      {
        id: 'science',
        name: 'વિજ્ઞાન',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: આપણી આસપાસમાં દ્રવ્ય',
            content:
              'આ પ્રકરણ દ્રવ્યના ભૌતિક સ્વરૂપ, તેની અવસ્થાઓ (ઘન, પ્રવાહી, વાયુ) અને અવસ્થામાં થતા ફેરફારોનું વર્ણન કરે છે.',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [],
          },
        ],
      },
    ],
  },
  {
    id: '10',
    name: 'ધોરણ ૧૦',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: વાસ્તવિક સંખ્યાઓ',
            content: 'આ પ્રકરણમાં યુક્લિડનું ભાગાકારનું પૂર્વપ્રમેય અને અંકગણિતનું મૂળભૂત પ્રમેય જેવા મહત્વના સિદ્ધાંતોનો અભ્યાસ કરીશું.',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [],
          },
        ],
      },
      {
        id: 'science',
        name: 'વિજ્ઞાન',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: રાસાયણિક પ્રક્રિયાઓ અને સમીકરણો',
            content:
              'આ પ્રકરણમાં આપણે રાસાયણિક સમીકરણો કેવી રીતે લખવા અને સંતુલિત કરવા, તેમજ વિવિધ પ્રકારની રાસાયણિક પ્રક્રિયાઓ જેવી કે સંયોગીકરણ, વિઘટન, વિસ્થાપન અને રેડોક્ષ પ્રક્રિયાઓનો અભ્યાસ કરીશું.',
            textbookUrl: 'https://www.selfstudys.com/',
            quiz: [
              {
                question: 'જ્યારે લેડ નાઇટ્રેટને ગરમ કરવામાં આવે છે, ત્યારે કયો વાયુ ઉત્પન્ન થાય છે?',
                options: ['O₂', 'NO₂', 'H₂', 'CO₂'],
                correctAnswerIndex: 1,
              },
              {
                question: 'પાણીના વિદ્યુતવિભાજન દરમિયાન કયો વાયુ એનોડ પર એકત્રિત થાય છે?',
                options: ['હાઈડ્રોજન', 'ઓક્સિજન', 'નાઇટ્રોજન', 'કાર્બન ડાયોક્સાઇડ'],
                correctAnswerIndex: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '11',
    name: 'ધોરણ ૧૧',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          { id: 'chapter-1', name: 'પ્રકરણ ૧: ગણ', content: 'ગણ અને તેના પ્રકારો વિશેની સમજ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [
            
              {
                question: "Value of the Pie",
                options: ["3", "2", "3.14", "4.14"],
                correctAnswerIndex: 2,
              }
            
          ] },
          { id: 'chapter-2', name: 'પ્રકરણ ૨: સંબંધ અને વિધેય', content: 'સંબંધો અને વિધેયોની સંકલ્પના.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-3', name: 'પ્રકરણ ૩: ત્રિકોણમિતીય વિધેયો', content: 'ત્રિકોણમિતીય વિધેયો અને તેમના ગુણધર્મો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-4', name: 'પ્રકરણ ૪: ગણિતીય અનુમાનનો સિદ્ધાંત', content: 'ગણિતીય અનુમાનના સિદ્ધાંતની સમજ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-5', name: 'પ્રકરણ ૫: સંકર સંખ્યાઓ અને દ્વિઘાત સમીકરણો', content: 'સંકર સંખ્યાઓ અને તેમના ગુણધર્મો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-6', name: 'પ્રકરણ ૬: સુરેખ અસમતાઓ', content: 'સુરેખ અસમતાઓના ઉકેલ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          
        ],
        
      },
      {
        id: 'chemistry',
        name: 'રસાયણ વિજ્ઞાન',
        chapters: [
          { id: 'chapter-1', name: 'પ્રકરણ ૧: રસાયણ વિજ્ઞાનની કેટલીક પાયાની સંકલ્પનાઓ', content: 'દ્રવ્યનું સ્વરૂપ અને રાસાયણિક સંયોગીકરણના નિયમો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-2', name: 'પ્રકરણ ૨: પરમાણુનું બંધારણ', content: 'પરમાણુના બંધારણ અને ક્વોન્ટમ સિદ્ધાંત.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-3', name: 'પ્રકરણ ૩: તત્ત્વોનું વર્ગીકરણ અને ગુણધર્મોમાં આવર્તિતા', content: 'આવર્ત કોષ્ટક અને તત્ત્વોના ગુણધર્મો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-4', name: 'પ્રકરણ ૪: રાસાયણિક બંધન અને આણ્વીય રચના', content: 'રાસાયણિક બંધનના પ્રકારો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-5', name: 'પ્રકરણ ૫: દ્રવ્યની અવસ્થાઓ', content: 'દ્રવ્યની ઘન, પ્રવાહી અને વાયુ અવસ્થાઓ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-6', name: 'પ્રકરણ ૬: ઉષ્માગતિશાસ્ત્ર', content: 'ઉષ્માગતિશાસ્ત્રના નિયમો અને પ્રણાલીઓ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
        ],
      },
      {
        id: 'physics',
        name: 'ભૌતિક વિજ્ઞાન',
        chapters: [
          { id: 'chapter-1', name: 'પ્રકરણ ૧: ભૌતિક જગત', content: 'ભૌતિક વિજ્ઞાનનો પરિચય અને કાર્યક્ષેત્ર.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-2', name: 'પ્રકરણ ૨: એકમ અને માપન', content: 'એકમ પદ્ધતિઓ અને માપનના સિદ્ધાંતો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-3', name: 'પ્રકરણ ૩: સુરેખ પથ પર ગતિ', content: 'સુરેખ પથ પર ગતિનું વર્ણન.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-4', name: 'પ્રકરણ ૪: સમતલમાં ગતિ', content: 'સમતલમાં ગતિ અને પ્રક્ષિપ્ત ગતિ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-5', name: 'પ્રકરણ ૫: ગતિના નિયમો', content: 'ન્યૂટનના ગતિના નિયમો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-6', name: 'પ્રકરણ ૬: કાર્ય, ઊર્જા અને પાવર', content: 'કાર્ય, ઊર્જા અને પાવરની સંકલ્પના.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
        ],
      },
    ],
  },
  {
    id: '12',
    name: 'ધોરણ ૧૨',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          { id: 'chapter-1', name: 'પ્રકરણ ૧: સંબંધ અને વિધેય', content: 'સંબંધો અને વિધેયોના પ્રકારો અને સંયોજન.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-2', name: 'પ્રકરણ ૨: પ્રતિલોમ ત્રિકોણમિતીય વિધેયો', content: 'પ્રતિલોમ ત્રિકોણમિતીય વિધેયો અને તેમના ગુણધર્મો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-3', name: 'પ્રકરણ ૩: શ્રેણિક', content: 'શ્રેણિકના પ્રકારો અને તેમના પરની ક્રિયાઓ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-4', 'name': 'પ્રકરણ ૪: નિશ્ચાયક', content: 'નિશ્ચાયક અને તેના ગુણધર્મો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-5', name: 'પ્રકરણ ૫: સાતત્ય અને વિકલનીયતા', content: 'વિધેયોનું સાતત્ય અને વિકલનીયતા.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-6', name: 'પ્રકરણ ૬: વિકલિતના ઉપયોગો', content: 'વિકલનના ભૌમિતિક અને ભૌતિક અર્થઘટન.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
        ],
      },
      {
        id: 'chemistry',
        name: 'રસાયણ વિજ્ઞાન',
        chapters: [
          { id: 'chapter-1', name: 'પ્રકરણ ૧: ઘન અવસ્થા', content: 'ઘન પદાર્થોનું વર્ગીકરણ અને બંધારણ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-2', name: 'પ્રકરણ ૨: દ્રાવણો', content: 'દ્રાવણોના પ્રકારો અને સાંદ્રતા.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-3', name: 'પ્રકરણ ૩: વિદ્યુત રસાયણવિજ્ઞાન', content: 'વિદ્યુત રાસાયણિક કોષ અને પ્રક્રિયાઓ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-4', name: 'પ્રકરણ ૪: રાસાયણિક ગતિકી', content: 'રાસાયણિક પ્રક્રિયાઓનો વેગ અને તેને અસર કરતા પરિબળો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-5', name: 'પ્રકરણ ૫: પૃષ્ઠ રસાયણવિજ્ઞાન', content: 'અધિશોષણ, ઉત્પ્રેરણા અને કલિલ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-6', name: 'પ્રકરણ ૬: તત્ત્વોના અલગીકરણ માટેના સામાન્ય સિદ્ધાંતો અને પ્રક્રમો', content: 'ખનીજોમાંથી ધાતુઓના નિષ્કર્ષણના સિદ્ધાંતો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
        ],
      },
      {
        id: 'physics',
        name: 'ભૌતિક વિજ્ઞાન',
        chapters: [
          { id: 'chapter-1', name: 'પ્રકરણ ૧: વિદ્યુતભારો અને ક્ષેત્રો', content: 'કુલંબનો નિયમ, વિદ્યુતક્ષેત્ર અને ડાઇપોલ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-2', name: 'પ્રકરણ ૨: સ્થિતવિદ્યુત સ્થિતિમાન અને કેપેસિટન્સ', content: 'વિદ્યુતસ્થિતિમાન અને કેપેસિટર્સ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-3', name: 'પ્રકરણ ૩: પ્રવાહ વિદ્યુત', content: 'ઓહ્મનો નિયમ, વિદ્યુતપ્રવાહ અને પરિપથો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-4', name: 'પ્રકરણ ૪: ગતિમાન વિદ્યુતભારો અને ચુંબકત્વ', content: 'ચુંબકીય ક્ષેત્ર અને બળો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-5', name: 'પ્રકરણ ૫: ચુંબકત્વ અને દ્રવ્ય', content: 'ચુંબકીય પદાર્થો અને તેમના ગુણધર્મો.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
          { id: 'chapter-6', name: 'પ્રકરણ ૬: વિદ્યુતચુંબકીય પ્રેરણ', content: 'ફેરેડેના નિયમો અને પ્રેરિત પ્રવાહ.', textbookUrl: 'https://www.selfstudys.com/', quiz: [] },
        ],
      },
    ],
  },
];

    
    
