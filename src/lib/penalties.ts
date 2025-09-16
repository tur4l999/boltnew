import { getVideoSourcesForSubTopic } from './videoLoader';

export interface PenaltySubTopic {
  id: string;
  title: string;
  videoSources: string[];
}

export interface Penalty {
  id: string;
  articleNumber: string;
  title: string;
  content: string;
  amount: string;
  subTopics: PenaltySubTopic[];
}

export const AZ_PENALTIES: Penalty[] = [
  {
    id: 'ixm-327-1',
    articleNumber: 'İXM 327.1',
    title: 'Yol nişanlarının və ya yolların',
    content: 'Yol nişanlarının və ya yolların hərəkət hissəsinin işarələrinin tələblərinə riayət edilməməsinə, yaxud nəqliyyat vasitəsinin yolların hərəkət hissələrində yerləşdirilməsi, yaxud araməsafəsi, yedəyə alma, yük daşıma, sürmə təlimi keçmə, yaşayış zonasında hərəkət etmə, əks istiqamətli hərəkət zolağına çıxmadan ötmə və ya manevr etmə qaydalarının pozulmasına, səkilərlə və "Yol hərəkəti haqqında" Azərbaycan Respublikasının Qanunu ilə nəzərdə tutulmamış hallarda yolun çiyni ilə hərəkət edilməsinə, nəqliyyat vasitələrindən bayıra hər hansı əşyanın atılmasına görə-',
    amount: '40 manat məbləğində cərimə edilir.',
    subTopics: [
      {
        id: 'road-signs-violation',
        title: 'Yol nişanlarının və ya yolların hərəkət hissəsinin işarələrinin tələblərinə riayət edilməməsi',
        videoSources: getVideoSourcesForSubTopic('road-signs-violation')
      },
      {
        id: 'vehicle-placement',
        title: 'NV-nin yolların hərəkət hissələrində yerləşdirilməsi',
        videoSources: getVideoSourcesForSubTopic('vehicle-placement')
      },
      {
        id: 'distance-rules',
        title: 'Araməsafəsi',
        videoSources: getVideoSourcesForSubTopic('distance-rules')
      },
      {
        id: 'towing',
        title: 'Yedəyə alma',
        videoSources: getVideoSourcesForSubTopic('towing')
      },
      {
        id: 'cargo-transport',
        title: 'Yük daşıma',
        videoSources: getVideoSourcesForSubTopic('cargo-transport')
      },
      {
        id: 'driving-training',
        title: 'Sürmə təlimi keçmə qaydalarının pozulması',
        videoSources: getVideoSourcesForSubTopic('driving-training')
      },
      {
        id: 'residential-zone',
        title: 'Yaşayış zonasında hərəkət etmə qaydalarının pozulması',
        videoSources: getVideoSourcesForSubTopic('residential-zone')
      }
    ]
  },
  // Add more penalties here as needed
];

// Helper function to get penalty by ID
export const getPenaltyById = (id: string): Penalty | undefined => {
  return AZ_PENALTIES.find(penalty => penalty.id === id);
};

// Helper function to get sub-topic by ID
export const getSubTopicById = (penaltyId: string, subTopicId: string): PenaltySubTopic | undefined => {
  const penalty = getPenaltyById(penaltyId);
  return penalty?.subTopics.find(subTopic => subTopic.id === subTopicId);
};