import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

function fmtPrice(n: number) {
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(n) + " €";
}

const apartmentData: Record<string, {
  number: string;
  title: string;
  area: string;
  floor: string;
  floorEn: string;
  rooms: string;
  roomsEn: string;
  price: number;
  features: string[];
  featuresEn: string[];
}> = {
  "apt-1": {
    number: "1",
    title: "Õuepoolne korter — suuremeelne neljatoaline",
    area: "113 m²",
    floor: "1. korrus",
    floorEn: "Ground floor",
    rooms: "4 tuba",
    roomsEn: "4 rooms",
    price: 475_000,
    features: ["3 magamistuba", "2 garderoobi", "Elutuba-köök 35,7 m²", "Vaade õuele", "Restaureeritud puitpõrandad"],
    featuresEn: ["3 bedrooms", "2 walk-in wardrobes", "Kitchen-living room 35.7 m²", "Private courtyard view", "Restored timber floors"],
  },
  "apt-2": {
    number: "2",
    title: "Kabinetiga korter — kodu ja töö ühes",
    area: "99 m²",
    floor: "1. korrus",
    floorEn: "Ground floor",
    rooms: "3 tuba + kabinet",
    roomsEn: "3 rooms + study",
    price: 415_000,
    features: ["2 magamistuba", "Eraldi kabinet 9,3 m²", "Elutuba-köök 32,1 m²", "Garderoob", "Restaureeritud puitpõrandad"],
    featuresEn: ["2 bedrooms", "Separate study 9.3 m²", "Kitchen-living room 32.1 m²", "Walk-in wardrobe", "Restored timber floors"],
  },
  "apt-3": {
    number: "3",
    title: "Rõdukorter — vaated rohelusele",
    area: "100 m²",
    floor: "2. korrus",
    floorEn: "Second floor",
    rooms: "3 tuba",
    roomsEn: "3 rooms",
    price: 445_000,
    features: ["Rõdu 23 m²", "2 magamistuba", "Elutuba-köök 34,3 m²", "2 garderoobi", "Kõrged laed"],
    featuresEn: ["Balcony 23 m²", "2 bedrooms", "Kitchen-living room 34.3 m²", "2 walk-in wardrobes", "High ceilings"],
  },
  "apt-4": {
    number: "4",
    title: "Kahe rõduga korter — hele ja privaatne",
    area: "89 m²",
    floor: "2. korrus",
    floorEn: "Second floor",
    rooms: "3 tuba",
    roomsEn: "3 rooms",
    price: 380_000,
    features: ["2 rõdu (kokku 32 m²)", "2 magamistuba", "Elutuba-köök 33,4 m²", "Garderoob", "Õueparkla"],
    featuresEn: ["2 balconies (32 m² total)", "2 bedrooms", "Kitchen-living room 33.4 m²", "Walk-in wardrobe", "Courtyard parking"],
  },
  "apt-5": {
    number: "5",
    title: "Perekodu — tipukorrus terrassiga",
    area: "117 m²",
    floor: "3. korrus",
    floorEn: "Third floor",
    rooms: "4 tuba",
    roomsEn: "4 rooms",
    price: 595_000,
    features: ["Terrass 29,7 m²", "3 magamistuba", "2 vannituba", "Elutuba-köök 38,1 m²", "Garderoob"],
    featuresEn: ["Terrace 29.7 m²", "3 bedrooms", "2 bathrooms", "Kitchen-living room 38.1 m²", "Walk-in wardrobe"],
  },
};

function buildSystemPrompt(apartmentId: string, lang: "et" | "en"): string {
  const apt = apartmentData[apartmentId];
  if (!apt) {
    return lang === "et"
      ? "Oled Raua 22 müügikonsultant. Raua 22 on eksklusiivne elumajakompleks Raua asumis, Tallinnas — viis korterit muinsuskaitsealuses hoones. Ole sõbralik, professionaalne ja asjatundlik. Vasta ainult eesti keeles. Vaatamise broneerimiseks suuna info@raua22.ee."
      : "You are a sales consultant for Raua 22, an exclusive residential development in Raua area, Tallinn — five residences in a listed heritage building. Be friendly, professional and knowledgeable. Reply in English only. For viewing requests, direct enquirers to info@raua22.ee.";
  }

  if (lang === "et") {
    return `Oled Raua 22 müügikonsultant. Raua 22 asub Raua asumis, Tallinnas — eksklusiivne muinsuskaitsealune hoone viie kortermajaga. Hoone on restaureeritud kõrgetele elamistandarditele, säilitades samal ajal ajaloolise iseloomu.

Külastaja küsib järgmise korteri kohta:
- Korter: ${apt.number}
- Pealkiri: ${apt.title}
- Pind: ${apt.area}
- Korrus: ${apt.floor}
- Toad: ${apt.rooms}
- Hind: ${fmtPrice(apt.price)}
- Omadused: ${apt.features.join(", ")}

Üldist Raua 22 kohta:
- 5 eksklusiivset korterit, 89–117 m²
- Muinsuskaitsealune hoone 20. sajandi algusest
- Restaureeritud puitpõrandad, kõrged laed (3,0–3,4 m)
- Privaatne õueparkla (7 kohta)
- Asukoht: Raua 22, Tallinn 10124

Ole sõbralik, professionaalne ja asjatundlik. Vasta ainult eesti keeles. Vaatamise broneerimiseks või täpsema info saamiseks suuna info@raua22.ee. Ära väljasta isikuandmeid. Piirdu kinnisvara ja korteri teemadega.`;
  }

  return `You are a sales consultant for Raua 22, an exclusive residential development in Raua area, Tallinn, Estonia. Raua 22 is a nationally listed heritage building from the early twentieth century, carefully restored to contemporary living standards while preserving its historical character.

The visitor is enquiring about the following apartment:
- Apartment: ${apt.number}
- Title: ${apt.title}
- Area: ${apt.area}
- Floor: ${apt.floorEn}
- Rooms: ${apt.roomsEn}
- Price: ${fmtPrice(apt.price)}
- Features: ${apt.featuresEn.join(", ")}

General information about Raua 22:
- 5 exclusive residences, 89–117 m²
- Listed architectural heritage building from the early twentieth century
- Restored original timber floors, high ceilings (3.0–3.4 m)
- Private courtyard parking (7 spaces)
- Address: Raua 22, Tallinn 10124, Estonia

Be friendly, professional and knowledgeable. Reply in English only. For viewing requests or detailed information, direct enquirers to info@raua22.ee. Keep responses focused on the property and apartment.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, apartmentId, lang } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(apartmentId ?? "", lang ?? "en");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: systemPrompt,
      messages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ message: text });
  } catch (err) {
    console.error("[chat/route] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
