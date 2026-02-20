import type { Metadata } from "next";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  locale: string;
}

export function buildMetadata(page: PageMeta): Metadata {
  const url = `https://raua22.ee${page.path}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      locale: page.locale,
      images: [
        {
          url: "/images/building-exterior.jpeg",
          width: 1200,
          height: 630,
          alt: "Raua 22 — Kadriorg, Tallinn",
        },
      ],
    },
  };
}

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Raua 22",
  url: "https://raua22.ee",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Raua 22",
    addressLocality: "Tallinn",
    postalCode: "10124",
    addressCountry: "EE",
  },
  telephone: "+3725XXXXXXX",
  email: "info@raua22.ee",
};

export const jsonLdProperty = {
  "@context": "https://schema.org",
  "@type": "Residence",
  name: "Raua 22 — Kadriorg Korterid",
  description:
    "Viis erakordset korterit ajaloolises muinsuskaitsealuses hoones Kadrioru südames, Tallinnas.",
  url: "https://raua22.ee",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Raua 22",
    addressLocality: "Tallinn",
    postalCode: "10124",
    addressCountry: "EE",
  },
  numberOfRooms: "5",
  floorSize: {
    "@type": "QuantitativeValue",
    unitCode: "MTK",
    minValue: 65,
    maxValue: 145,
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Private Courtyard Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Heritage Building", value: true },
    { "@type": "LocationFeatureSpecification", name: "Kadriorg Park Proximity", value: true },
  ],
};
