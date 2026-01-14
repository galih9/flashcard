export type Word = {
  russian: string[];
  transliteration: string[];
  meaning: string[];
};

interface Letter {
  russian: string;
  reading: string;
  writing: string;
}

export const letter: Letter[] = [
  { russian: "А а", reading: "A", writing: "a" },
  { russian: "Б б", reading: "Be", writing: "b" },
  { russian: "В в", reading: "Ve", writing: "v" },
  { russian: "Г г", reading: "Ge", writing: "g" },
  { russian: "Д д", reading: "De", writing: "d" },
  { russian: "Е е", reading: "Ye", writing: "ye" },
  { russian: "Ё ё", reading: "Yo", writing: "yo" },
  { russian: "Ж ж", reading: "Zhe", writing: "zh" },
  { russian: "З з", reading: "Ze", writing: "z" },
  { russian: "И и", reading: "I", writing: "i" },
  { russian: "Й й", reading: "I kratkoye", writing: "y" },
  { russian: "К к", reading: "Ka", writing: "k" },
  { russian: "Л л", reading: "El", writing: "l" },
  { russian: "М м", reading: "Em", writing: "m" },
  { russian: "Н н", reading: "En", writing: "n" },
  { russian: "О о", reading: "O", writing: "o" },
  { russian: "П п", reading: "Pe", writing: "p" },
  { russian: "Р р", reading: "Er", writing: "r" },
  { russian: "С с", reading: "Es", writing: "s" },
  { russian: "Т т", reading: "Te", writing: "t" },
  { russian: "У у", reading: "U", writing: "u" },
  { russian: "Ф ф", reading: "Ef", writing: "f" },
  { russian: "Х х", reading: "Kha", writing: "kh" },
  { russian: "Ц ц", reading: "Tse", writing: "ts" },
  { russian: "Ч ч", reading: "Che", writing: "ch" },
  { russian: "Ш ш", reading: "Sha", writing: "sh" },
  { russian: "Щ щ", reading: "Shcha", writing: "shch" },
  { russian: "Ъ ъ", reading: "Tverdiy znak", writing: "''" },
  { russian: "Ы ы", reading: "Yery", writing: "y" },
  { russian: "Ь ь", reading: "Myagkiy znak", writing: "'" },
  { russian: "Э э", reading: "E", writing: "e" },
  { russian: "Ю ю", reading: "Yu", writing: "yu" },
  { russian: "Я я", reading: "Ya", writing: "ya" },
];

export const words: Word[][] = [
  [
    { russian: ["и"], transliteration: ["i"], meaning: ["and", "though"] },
    { russian: ["в"], transliteration: ["v"], meaning: ["in", "at"] },
    { russian: ["не"], transliteration: ["nye", "ne"], meaning: ["not"] },
    { russian: ["он"], transliteration: ["on"], meaning: ["he"] },
    {
      russian: ["на"],
      transliteration: ["na"],
      meaning: ["on", "it", "at", "to"],
    },
    { russian: ["я"], transliteration: ["ya"], meaning: ["I"] },
    {
      russian: ["что"],
      transliteration: ["chto"],
      meaning: ["what", "that", "why"],
    },
    { russian: ["тот"], transliteration: ["tot"], meaning: ["that"] },
    { russian: ["быть"], transliteration: ["byt'"], meaning: ["to be"] },
    {
      russian: ["с"],
      transliteration: ["s"],
      meaning: ["with", "and", "from", "of"],
    },
    {
      russian: ["а"],
      transliteration: ["a"],
      meaning: ["while", "and", "but"],
    },
    {
      russian: ["весь"],
      transliteration: ["vyes'", "ves'"],
      meaning: ["all", "everything"],
    },
    {
      russian: ["это"],
      transliteration: ["eto", "eta"],
      meaning: ["that", "this", "it"],
    },
    {
      russian: ["как"],
      transliteration: ["kak"],
      meaning: ["how", "what", "as", "like"],
    },
    { russian: ["она"], transliteration: ["ona", "ana"], meaning: ["she"] },
  ],
];
