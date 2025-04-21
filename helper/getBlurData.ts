export const getPlaceholderImage = async (id: string) => {
  const url = `${id}?width=10&height=10&quality=10&format=webp`;

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return `data:image/webp;base64,${base64}`;
  } catch (error) {
    console.error("Error fetching placeholder image:", error);
    return "";
  }
};
