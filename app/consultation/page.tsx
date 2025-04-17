import JotformEmbed from "@/components/form/JotformEmbed";
import PaddingContainer from "@/components/layout/PaddingContainer";
import React from "react";

const page = () => {
  return (
    <PaddingContainer>
      <JotformEmbed isMain={false} />
    </PaddingContainer>
  );
};

export default page;
