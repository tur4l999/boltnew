export type AzRule = { id: string; title: string; content: string };

export type PenaltySubsection = {
  id: string;
  title: string;
  content?: string;
  videoSrc?: string;
  videoSources?: string[];
};

export type PenaltySection = {
  id: string;
  title: string;
  description?: string;
  subsections?: PenaltySubsection[];
  content?: string;
  videoSrc?: string;
  videoSources?: string[];
};

export const PENALTY_SECTIONS: PenaltySection[] = [
  {
    id: 'traffic_violations',
    title: 'Yol hərəkəti qaydalarının pozulması',
    description: 'Yol hərəkəti qaydalarının pozulmasına görə tətbiq olunan cərimələr',
    subsections: [
      {
        id: 'speed_violations',
        title: 'Sürət həddinin pozulması',
        content: 'Müəyyən edilmiş sürət həddini aşmağa görə:\n• 10-20 km/saat - 40 manat\n• 21-40 km/saat - 100 manat\n• 40+ km/saat - 200 manat və hüquqların məhdudlaşdırılması\n\nSürət həddinin pozulması ən çox rast gəlinən pozuntulardan biridir. Təhlükəsizlik üçün həmişə sürət həddini gözləyin.',
        videoSources: [
          '/video 6.mp4',
          '/Maddə 49 NV-nin yerləşməsi 0002.mp4',
          '/video 6.mp4',
          '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
        ]
      },
      {
        id: 'traffic_lights',
        title: 'İşıqfor siqnallarının pozulması',
        content: 'İşıqfor pozuntuları:\n• Qırmızı işıqfor siqnalının pozulması - 100 manat\n• Təkrar pozuntu halında - 200 manat və hüquqların müvəqqəti məhdudlaşdırılması\n• Sarı işıq zamanı keçmə - 40 manat\n\nİşıqfor siqnalları yol təhlükəsizliyinin əsasıdır.',
        videoSrc: '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
      },
      {
        id: 'wrong_parking',
        title: 'Qadağan edilmiş yerlərdə dayanma',
        content: 'Dayanma qadağası olan yerlərdə avtomobilin saxlanması:\n• Adi hallar - 20 manat\n• Əlil yerləri - 100 manat\n• İctimai nəqliyyat dayanacaqları - 50 manat\n• Piyada keçidi yaxınlığında - 40 manat\n• İkinci sırada dayanma - 30 manat',
        videoSrc: '/video 6.mp4'
      },
      {
        id: 'overtaking_violations',
        title: 'Ötmə qaydalarının pozulması',
        content: 'Ötmə pozuntuları:\n• Qadağan edilmiş yerlərdə ötmə - 150 manat\n• Qarşıdan gələnə mane olmaq - 200 manat\n• Sağdan ötmə - 100 manat\n\nÖtmə zamanı həmişə təhlükəsizlik qaydalarını gözləyin.',
        videoSources: [
          '/video 6.mp4',
          '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
        ]
      }
    ]
  },
  {
    id: 'document_violations',
    title: 'Sənədlərlə bağlı pozuntular',
    description: 'Sürücülük vəsiqəsi və digər sənədlərlə əlaqədar pozuntular',
    subsections: [
      {
        id: 'no_license',
        title: 'Sürücülük vəsiqəsinin olmaması',
        content: 'Sürücülük vəsiqəsi olmadan avtomobil idarə etmək:\n• Birinci dəfə - 200 manat cərimə və nəqliyyat vasitəsinin saxlanması\n• Təkrar hal - 300 manat və daha uzun müddətə saxlama\n\nSürücülük vəsiqəsi həmişə yanınızda olmalıdır.',
        videoSrc: '/video 6.mp4'
      },
      {
        id: 'expired_documents',
        title: 'Vaxtı keçmiş sənədlər',
        content: 'Vaxtı keçmiş sənədlərlə idarə etmə:\n• Vaxtı keçmiş sürücülük vəsiqəsi - 100 manat\n• Vaxtı keçmiş sığorta - 80 manat\n• Vaxtı keçmiş texniki baxış - 60 manat\n\nSənədlərinizin vaxtını vaxtında yeniləyin.',
        videoSrc: '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
      },
      {
        id: 'fake_documents',
        title: 'Saxta sənədlər',
        content: 'Saxta və ya dəyişdirilmiş sənədlərdən istifadə:\n• Saxta sürücülük vəsiqəsi - 500 manat və cinayət işi\n• Dəyişdirilmiş sənədlər - 300 manat\n\nSaxta sənədlər ciddi hüquqi nəticələrə səbəb olur.',
        videoSrc: '/video 6.mp4'
      }
    ]
  },
  {
    id: 'alcohol_violations',
    title: 'Sərxoşluq halında idarəetmə',
    description: 'Spirtli içkilər və ya narkotik maddələrin təsiri altında avtomobil idarə etmə',
    content: 'Sərxoş halda avtomobil idarə etmə:\n• Birinci dəfə - 1000 manat cərimə və 1 il hüquqların məhdudlaşdırılması\n• Təkrar pozuntu - 2000 manat və 3 il hüquqların məhdudlaşdırılması\n• Qəza törətmə halında - cinayət məsuliyyəti\n• Yoxlamadan imtina - 1500 manat\n\nAlkohol və narkotik maddələr yol təhlükəsizliyinin ən böyük düşmənlərindəndir.',
    videoSrc: '/video 6.mp4',
    subsections: [
      {
        id: 'alcohol_testing',
        title: 'Alkohol yoxlamasından imtina',
        content: 'Alkohol yoxlamasından imtina etmə:\n• İlk imtina - 1500 manat və 2 il hüquq məhdudiyyəti\n• Təkrar imtina - 2500 manat və 4 il hüquq məhdudiyyəti\n\nYoxlamadan imtina etmək sərxoşluqla bərabər sayılır.',
        videoSrc: '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
      }
    ]
  },
  {
    id: 'pedestrian_violations',
    title: 'Piyadaların hüquqlarının pozulması',
    description: 'Piyada keçidlərində və digər yerlərdə piyadaların hüquqlarının pozulması',
    subsections: [
      {
        id: 'crosswalk_violations',
        title: 'Piyada keçidində pozuntular',
        content: 'Piyada keçidi pozuntuları:\n• Piyada keçidində piyadaya yol verməmək - 100 manat\n• Piyada keçidində dayanma - 80 manat\n• Piyadanın yaralanması halında - əlavə məsuliyyət və kompensasiya\n\nPiyadalar yolun ən zəif iştirakçılarıdır, onlara hörmət göstərin.',
        videoSrc: '/video 6.mp4'
      },
      {
        id: 'sidewalk_driving',
        title: 'Səkidə hərəkət',
        content: 'Səki və piyada sahələrində hərəkət:\n• Səkidə hərəkət - 50 manat\n• Piyada zonalarında hərəkət - 100 manat\n• Parkda hərəkət - 80 manat\n\nSəkilər və piyada sahələri yalnız piyadalar üçündür.',
        videoSrc: '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
      },
      {
        id: 'school_zone_violations',
        title: 'Məktəb zonalarında pozuntular',
        content: 'Məktəb və uşaq bağçası yaxınlığında pozuntular:\n• Məktəb zonasında sürət aşımı - 150 manat\n• Uşaq keçidi yaxınlığında səhlənkarlıq - 200 manat\n• Məktəb saatlarında dayanma qadağasının pozulması - 100 manat\n\nUşaqların təhlükəsizliyi prioritetdir.',
        videoSources: [
          '/video 6.mp4',
          '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
        ]
      }
    ]
  },
  {
    id: 'technical_violations',
    title: 'Texniki pozuntular',
    description: 'Avtomobilin texniki vəziyyəti ilə bağlı pozuntular',
    subsections: [
      {
        id: 'lights_violations',
        title: 'İşıq cihazları pozuntuları',
        content: 'İşıq cihazlarının nasazlığı:\n• Fara nasazlığı - 40 manat\n• Stop siqnalının işləməməsi - 30 manat\n• Göstərici işıqların nasazlığı - 25 manat\n\nİşıq cihazları təhlükəsizlik üçün vacibdir.',
        videoSrc: '/video 6.mp4'
      },
      {
        id: 'tires_violations',
        title: 'Təkər pozuntuları',
        content: 'Təkərlərlə bağlı pozuntular:\n• Köhnə təkərlərlə hərəkət - 60 manat\n• Fərqli təkər növləri - 40 manat\n• Zəncirlərin düzgün quraşdırılmaması - 30 manat\n\nTəkərlər yolda ilk təmas nöqtəsidir.',
        videoSrc: '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
      }
    ]
  },
  {
    id: 'environmental_violations',
    title: 'Ekoloji pozuntular',
    description: 'Ətraf mühitə zərər verən hərəkətlər',
    content: 'Ekoloji pozuntular:\n• Həddindən artıq tüstü buraxma - 80 manat\n• Səs-küy həddinin aşılması - 60 manat\n• Yolda zibil atma - 40 manat\n• Yanacaq sızması - 100 manat\n\nƏtraf mühiti qoruyaq, gələcək nəsillərimiz üçün.',
    videoSrc: '/video 6.mp4',
    subsections: [
      {
        id: 'noise_violations',
        title: 'Səs-küy pozuntuları',
        content: 'Səs-küy pozuntuları:\n• Gecə saatlarında həddindən artıq səs - 100 manat\n• Yaşayış zonalarında siqnal istifadəsi - 50 manat\n• Modifikasiya edilmiş susturucular - 80 manat\n\nDigər insanların rahatlığını təmin edin.',
        videoSrc: '/Maddə 49 NV-nin yerləşməsi 0002.mp4'
      }
    ]
  }
];

export const AZ_RULES: AzRule[] = [
  { id: 'r1', title: 'Maddə 1. Əsas anlayışlar', content: 'Qanunda istifadə olunan terminlər izah edilir. “Yol”, “sürücü”, “piyada”, “nəqliyyat vasitəsi” kimi anlayışlar dəqiq tərif olunur. Bu terminlər digər maddələrin düzgün anlaşılması üçün baza yaradır.' },
  { id: 'r2', title: 'Maddə 2. Qanunun təyinatı', content: 'Yol hərəkəti sahəsində təhlükəsizlik və nizam-intizamı təmin etmək məqsədi açıqlanır. Qanun, bütün iştirakçılar üçün hüquqi çərçivə və davranış standartları müəyyənləşdirir.' },
  { id: 'r3', title: 'Maddə 3. Yol hərəkəti haqqında qanunvericilik', content: 'Tətbiq olunan normativ sənədlərin iyerarxiyası göstərilir. Standartlar, qaydalar və digər aktlarla qarşılıqlı əlaqə və üstünlük prinsipləri müəyyən edilir.' },
  { id: 'r4', title: 'Maddə 4. Dövlət orqanlarının vəzifələri', content: 'Yol hərəkətinə nəzarət, təşkil və təhlükəsizlik üzrə səlahiyyətlər sadalanır. Maarifləndirmə, statistika aparılması və infrastrukturun saxlanılması da bu səlahiyyətlərə daxildir.' },
  { id: 'r5', title: 'Maddə 5. Hüquqi şəxslərin vəzifələri', content: 'Daşımalarla məşğul olan və ya avtomobil parkı saxlayan təşkilatların öhdəlikləri müəyyən edilir. Texniki baxım, sürücülərin hazırlığı və təhlükəsizlik standartlarına əməl vacibdir.' },
  { id: 'r6', title: 'Maddə 6. Fiziki şəxslərin hüquq və vəzifələri', content: 'Sürücü, sərnişin və piyadaların hüquqları və öhdəlikləri açıqlanır. Hörmət, ehtiyat və təhlükəsizliyin prioritetliyi vurğulanır.' },
  { id: 'r7', title: 'Maddə 6-1. Beynəlxalq daşımalarda vəzifələr', content: 'Beynəlxalq sərnişin və yük daşımalarını təşkil edən və icra edənlər üçün əlavə tələblər göstərilir. Sənədləşmə, marşrut planlaşdırılması və təhlükəsizlik normaları əsasdır.' },
  { id: 'r8', title: 'Maddə 7. Yol hərəkətinin təşkili', content: 'Nişanların, işıqforların və nişanlanma xətlərinin tətbiqi qaydaları izah edilir. Hərəkət axınının fasiləsizliyi və təhlükəsizliyi üçün təşkilati tədbirlər göstərilir.' },
  { id: 'r9', title: 'Maddə 8. Başlanğıc və manevrlər', content: 'Hərəkətə başlama, dönmə, ötmə və zolaq dəyişmə zamanı davranış qaydaları verilir. Sürücü əvvəlcədən siqnal verir və təhlükəsizliyi təmin edir.' },
  { id: 'r10', title: 'Maddə 9. Dayanma və durma', content: 'Dayanma/durma yerləri və qadağaları sadalanır. Görünüşə mane olmamaq və hərəkətə təhlükə yaratmamaq əsas şərtdir.' },
  { id: 'r11', title: 'Maddə 10. Sürət rejimi', content: 'Müxtəlif yol şəraitləri üçün sürət məhdudiyyətləri müəyyən edilir. Havanın, yolun və nəqliyyat axınının vəziyyətinə uyğun sürət seçilməlidir.' },
  { id: 'r12', title: 'Maddə 11. Piyadaların hərəkəti', content: 'Piyadaların keçidlərdən istifadəsi və yolun təhlükəsiz keçilməsi qaydaları verilir. Sürücülərin piyadalara qarşı məsuliyyəti ayrıca vurğulanır.' },
  { id: 'r13', title: 'Maddə 12. Sərnişinlərin daşınması', content: 'Avtomobildə sərnişinlərin oturması, uşaq oturacaqları və təhlükəsizlik kəmərləri ilə bağlı tələblər. Sərnişinlərin düşmə/minmə zamanı təhlükəsizlik qaydaları göstərilir.' },
  { id: 'r14', title: 'Maddə 13. Yük daşınması', content: 'Yükün yerləşdirilməsi, bərkidilməsi və ölçü-kütlə məhdudiyyətləri izah olunur. Yük hərəkətə, görünüşə və stabilliyə mane olmamalıdır.' },
  { id: 'r15', title: 'Maddə 14. Xüsusi siqnalların tətbiqi', content: 'Xüsusi təyinatlı nəqliyyat vasitələrinin işıq və səs siqnallarından istifadəsi qaydaları. Digər sürücülərin belə vasitələrə üstünlük vermə öhdəliyi xatırladılır.' },
  { id: 'r16', title: 'Maddə 15. Dəmiryolu keçidləri', content: 'Keçidlərdən istifadə zamanı dayanma, görünüş və siqnalların tələbləri təsvir edilir. Qırmızı işıq və ya baryerlər zamanı keçid qadağandır.' },
  { id: 'r17', title: 'Maddə 16. Avtobus zolaqları və ictimai nəqliyyat', content: 'İctimai nəqliyyat üçün ayrılmış zolaqlardan istifadə qaydaları. Sürücülər bu zolaqlara məhdud hallarda daxil ola bilər.' },
  { id: 'r18', title: 'Maddə 17. Yol nişanları və nişanlanma', content: 'Yol nişanlarının və üfüqi/vertikal nişanlanmanın hüquqi qüvvəsi və üstünlüyü göstərilir. Ziddiyyət olduqda prioritet qaydası açıqlanır.' },
  { id: 'r19', title: 'Maddə 18. İşıqfor və tənzimləyici siqnalları', content: 'İşıqfor işıqlarının mənası və tənzimləyicinin jestlərinə tabe olmaq qaydaları izah olunur. Ziddiyyət olduqda tənzimləyici üstünlük təşkil edir.' },
  { id: 'r20', title: 'Maddə 19. Ötmə və qarşıdan gələn hərəkət', content: 'Ötmənin icazəli olduğu hallar, qadağalar və təhlükəsizlik şərtləri. Qarşıdan gələn nəqliyyatla qarşılaşmada davranış qaydaları qeyd edilir.' },
  { id: 'r21', title: 'Maddə 20. Fövqəladə dayanma və nişanlar', content: 'Qəza dayanacağı və fövqəladə işıq siqnalının tətbiqi qaydaları. Maneə barədə digər sürücülərin vaxtında xəbərdar edilməsi vacibdir.' },
  { id: 'r22', title: 'Maddə 21. Sərxoşluq və tibbi yoxlama', content: 'Spirtli içki və ya narkotik təsiri altında idarənin qadağan edilməsi. Tibbi müayinəyə göndərmə və hüquqi nəticələr izah olunur.' },
  { id: 'r23', title: 'Maddə 22. Velosiped və fərdi mikromobilite', content: 'Velosiped, skuter kimi vasitələrin hərəkət qaydaları və prioritetləri. Yolun kənarı və velosiped zolaqlarından istifadə tələbləri verilir.' },
  { id: 'r24', title: 'Maddə 23. Ekoloji tələblər', content: 'Zərərli tullantıların azaldılması, səs-küy və tüstü normativləri. Texniki baxımın vaxtında aparılması ekoloji təhlükəsizlik üçün vacibdir.' },
  { id: 'r25', title: 'Maddə 24. Qəzalar və hadisələrin rəsmiləşdirilməsi', content: 'Yol-nəqliyyat hadisəsi zamanı tərəflərin davranışı, ilkin yardım və polisin çağırılması qaydaları. Foto/video sənədləşdirmə və protokollaşdırma prinsipləri qeyd olunur.' },
  { id: 'r26', title: 'Maddə 25. Məsuliyyət və cərimələr', content: 'Qaydaların pozulmasına görə inzibati məsuliyyətin əsasları və sanksiyalar xatırladılır. Təhlükəsizliyin təmin olunması üçün profilaktik tədbirlər tövsiyə edilir.' },
];

