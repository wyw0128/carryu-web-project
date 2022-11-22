import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({
  projectId: "s5jcdx1h",
  dataset: "production",
});
export const urlFor = (source) => builder.image(source);
