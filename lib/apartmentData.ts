// Shared apartment data — used by both the korterid listing page and
// the FinancingSection calculator.

export interface ApartmentInfo {
  id: string;
  number: string;       // "Korter 1"
  title: string;
  area: string;         // display string "113 m²"
  floor: string;
  rooms: string;
  price: number;        // EUR, numeric
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
}

export const apartments: ApartmentInfo[] = [
  {
    id: "apt-1",
    number: "Korter 1",
    title: "Hoovikorter — Avar neljatoaline",
    area: "113 m²",
    floor: "1. korrus",
    rooms: "4 tuba",
    price: 475_000,
    description:
      "Esimese korruse suurim korter avaneb privaatsele hoovialale. Kolm eraldatud magamistuba, avar köök-elutuba (35,7 m²) ja kaks garderoobikapp annavad ruumi kõigile igapäevaelu vajadustele. Restaureeritud puitpõrandad ja kõrged laed säilitavad hoone algupärase väärikuse.",
    features: [
      "3 magamistuba",
      "2 garderoob",
      "Köök-elutuba 35,7 m²",
      "Privaatne hoovi vaade",
      "Restaureeritud põrandad",
    ],
    imageSrc: "/images/apartment-interior.jpeg",
    imageAlt: "Korter 1 elutuba",
  },
  {
    id: "apt-2",
    number: "Korter 2",
    title: "Kabinetiga korter — Töö ja kodu ühes",
    area: "99 m²",
    floor: "1. korrus",
    rooms: "3 tuba + kabinet",
    price: 415_000,
    description:
      "Esimese korruse kompaktne ja funktsionaalne korter pakub eraldatud kabinetiga töötamise võimalust kodus. Kaks magamistuba, avar köök-elutuba (32,1 m²) ja garderoob moodustavad hästi läbimõeldud terviku algupärases muinsuskaitsealuses keskkonnas.",
    features: [
      "2 magamistuba",
      "Eraldatud kabinet 9,3 m²",
      "Köök-elutuba 32,1 m²",
      "Garderoob",
      "Restaureeritud põrandad",
    ],
    imageSrc: "/images/apartment-living.jpeg",
    imageAlt: "Korter 2 elutuba",
  },
  {
    id: "apt-3",
    number: "Korter 3",
    title: "Rõduga korter — Roheluse vaade",
    area: "100 m²",
    floor: "2. korrus",
    rooms: "3 tuba",
    price: 445_000,
    description:
      "Teise korruse korter 23 m² rõduga pakub haruldast välitila linnasüdames. Kaks magamistuba, avar köök-elutuba (34,3 m²) ja kaks garderoobikappi on paigutatud sujuvalt. Kõrged laed ning vana ornamenteeritud trepikoda rõhutavad hoone ajaloolist iseloomu.",
    features: [
      "Rõdu 23 m²",
      "2 magamistuba",
      "Köök-elutuba 34,3 m²",
      "2 garderoob",
      "Kõrged laed",
    ],
    imageSrc: "/images/building-exterior.jpeg",
    imageAlt: "Korter 3 rõdu",
  },
  {
    id: "apt-4",
    number: "Korter 4",
    title: "Valgusküllane korter kahe rõduga – privaatne ja avar",
    area: "89 m²",
    floor: "2. korrus",
    rooms: "3 tuba",
    price: 380_000,
    description:
      "See teise korruse korter paistab silma erakordselt heleda ja õhuka atmosfääriga ning kahe rõduga (19,5 m² ja 12,9 m², kokku üle 32 m²), mis pakuvad mõnusat väliruumi ja päikesevalgust. Korteris on kaks mugavat magamistuba ning avar köök-elutuba (33,4 m²), kus on ideaalne kombineerida kokkamist ja ajaveetmist.",
    features: [
      "2 rõdu (kokku 32 m²)",
      "2 magamistuba",
      "Köök-elutuba 33,4 m²",
      "Garderoob",
      "Parkimine hoovis",
    ],
    imageSrc: "/images/building-detail.jpeg",
    imageAlt: "Korter 4 rõdu",
  },
  {
    id: "apt-5",
    number: "Korter 5",
    title: "Eksklusiivne Penthouse – Privaatne terrass ja panoraamvaade",
    area: "117 m²",
    floor: "3. korrus",
    rooms: "4 tuba",
    price: 595_000,
    description:
      "See 117 m² suurune avar korter paistab silma valguse, avaruse ja erakordsete vaadetega. 29,7 m² suurune terrass pakub panoraamvaateid piirkonna puiestee rohelusele. Korteris on kolm eraldatud magamistuba, kaks vannituba ning avar köök-elutuba (38,1 m²) – ideaalne kombinatsioon ruumikusest ja linnakeskkonna mugavusest.",
    features: [
      "Terrass 29,7 m²",
      "3 magamistuba",
      "2 vannituba",
      "Köök-elutuba 38,1 m²",
      "Garderoob",
    ],
    imageSrc: "/images/raua22-render.png",
    imageAlt: "Korter 5 — terrassiga tippkorter",
  },
];

// Convenience lookup: apartment id → price (language-agnostic)
export const apartmentPriceById: Record<string, number> = Object.fromEntries(
  apartments.map((a) => [a.id, a.price])
);
