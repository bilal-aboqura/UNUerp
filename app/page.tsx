import { HomePage } from "@/components/HomePage";
import { readSiteContent } from "@/lib/site-content";
export default async function Home() {
  const content = await readSiteContent();
  return <HomePage content={content.home.en} siteContent={content.global} media={content.media} />;
}
