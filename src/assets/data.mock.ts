// --- MOCK DATA --- //
type IJourney = any;
type ITopic = any;

const topics: ITopic[] = [
  {
    id: 'compatibilidade-de-tipos-aHUAsas',
    name: 'Compatibilidade de tipos',
    description: 'como o typescript lida com a compatibilidade de tipos',
    activities: [
      {
        id: 'string-e-number-asdhuas',
        name: 'String e number',
        description: 'como o typescript lida com a compatibilidade de tipos',
        source: 'exercises/SAMPLE.md',
      },
      {
        id: 'string-e-boolean-xmlzks',
        name: 'String e boolean',
        description: 'como o typescript lida com a compatibilidade de tipos',
        source: 'exercises/SAMPLE.md',
      },
    ],
  },
  {
    id: 'tipos-primitivos-xjlas',
    name: 'Tipos primitivos',
    description: 'como o typescript lida com tipos primitivos',
    activities: [
      {
        id: 'string-e-number-wiosj2',
        name: 'String e number',
        description: 'como o typescript lida com tipos primitivos',
        source: 'exercises/SAMPLE.md',
      },
      {
        id: 'string-e-boolean-xlskdm',
        name: 'String e boolean',
        description: 'como o typescript lida com tipos primitivos',
        source: 'exercises/SAMPLE.md',
      },
    ],
  },
  {
    id: 'tipos-literais-xjlas',
    name: 'Tipos literais',
    description: 'como o typescript lida com tipos literais',
    activities: [
      {
        id: 'string-e-number-wiosj3',
        name: 'String e number',
        description: 'como o typescript lida com tipos literais',
        source: 'exercises/SAMPLE.md',
      },
      {
        id: 'string-e-boolean-xlsBdm',
        name: 'String e boolean',
        description: 'como o typescript lida com tipos literais',
        source: 'exercises/SAMPLE.md',
      },
    ],
  },
  {
    id: 'tipos-nulos-xjlas',
    name: 'Tipos nulos',
    description: 'como o typescript lida com tipos nulos',
    activities: [
      {
        id: 'string-e-number-wiosj4',
        name: 'String e number',
        description: 'como o typescript lida com tipos nulos',
        source: 'exercises/SAMPLE.md',
      },
      {
        id: 'string-e-boolean-xlsVdm',
        name: 'String e boolean',
        description: 'como o typescript lida com tipos nulos',
        source: 'exercises/SAMPLE.md',
      },
    ],
  },
  {
    id: 'tipos-objetos-xjlas',
    name: 'Tipos objetos',
    description: 'como o typescript lida com tipos objetos',
    activities: [
      {
        id: 'string-e-number-wioBDS',
        name: 'String e number',
        description: 'como o typescript lida com tipos objetos',
        source: 'exercises/SAMPLE.md',
      },
      {
        id: 'string-e-boolean-xlsdBC',
        name: 'String e boolean',
        description: 'como o typescript lida com tipos objetos',
        source: 'exercises/SAMPLE.md',
      },
    ],
  },
  {
    id: 'tipos-arrays-xjlas',
    name: 'Tipos arrays',
    description: 'como o typescript lida com tipos arrays',
    activities: [
      {
        id: 'string-e-number-wiosj2',
        name: 'String e number',
        description: 'como o typescript lida com tipos arrays',
        source: 'exercises/SAMPLE.md',
      },
      {
        id: 'string-e-boolean-2asad',
        name: 'String e boolean',
        description: 'como o typescript lida com tipos arrays',
        source: 'exercises/SAMPLE.md',
      },
    ],
  },
];

const journey1: IJourney = {
  id: 'typescript-iniciante-tipos-asduiD1',
  name: 'Typescript iniciante - tipos',
  shortDescription: 'Aprenda a trabalhar com tipos',
  longDescription:
    'Jornada de aprendizado de typescript iniciante - com foco nas caracteristicas fundamentais para trabalhar com tipos',
  topics: topics,
};

const journey2: IJourney = {
  id: 'typescript-iniciante-tipos-asduiD2',
  name: 'Typescript Intermed - tipos',
  shortDescription: 'Aprenda a trabalhar com tipos',
  longDescription:
    'Jornada de aprendizado de typescript iniciante - com foco nas caracteristicas fundamentais para trabalhar com tipos',
  topics: topics,
  progress: 35,
};

const journey3: IJourney = {
  id: 'typescript-iniciante-tipos-asduiD3',
  name: 'Typescript Avancado - tipos',
  shortDescription: 'Aprenda a trabalhar com tipos',
  longDescription:
    'Jornada de aprendizado de typescript iniciante - com foco nas caracteristicas fundamentais para trabalhar com tipos',
  topics: topics,
  progress: 55,
};

const journeys: IJourney[] = [journey1, journey2, journey3];

export default journeys;
