import PowrSocialFeed from "@/components/PowrSocialFeed";

import { TFacebookbBlock } from "@/interfaces";
import HeaderText from "../common/Header";

export default function FacebookBlock({ block }: { block: TFacebookbBlock }) {
  return (
    <main className="max-w-7xl mx-auto py-10">
      <HeaderText>{block.item.header}</HeaderText>
      <PowrSocialFeed />
    </main>
  );
}
