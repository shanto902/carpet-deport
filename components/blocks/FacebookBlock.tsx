import FacebookPagePlugin from "@/components/FacebookPagePlugin";
import { TFacebookbBlock } from "@/interfaces";

export default function FacebookBlock({ block }: { block: TFacebookbBlock }) {
  return (
    <main className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6">{block.item.title}</h2>

      <FacebookPagePlugin
        pageUrl="https://www.facebook.com/carpetdepotatlanta"
        width="100%"
        height={900}
      />
    </main>
  );
}
