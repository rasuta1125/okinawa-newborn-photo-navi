import { HeroSection } from "@/components/HeroSection";
import { SearchWidget } from "@/components/SearchWidget";
import { FeaturedPhotographers } from "@/components/FeaturedPhotographers";
import { generatePageMetadata, PAGE_METADATA } from "@/lib/metadata";

// Force dynamic rendering to avoid build-time Firebase initialization
export const dynamic = 'force-dynamic';

export const metadata = generatePageMetadata(PAGE_METADATA.home);

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchWidget />
      <FeaturedPhotographers />
    </>
  );
}
