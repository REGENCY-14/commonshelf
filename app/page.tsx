import { HomeHero } from "@/components/catalog/HomeHero";
import { RecentlyCatalogued } from "@/components/catalog/RecentlyCatalogued";
import { ReaderDelightFeature } from "@/components/catalog/ReaderDelightFeature";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <RecentlyCatalogued />
      <ReaderDelightFeature />
    </>
  );
}
