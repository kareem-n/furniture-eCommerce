// src/client.js
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "p0hcjk9z", // replace with your project ID
  dataset: "production", // replace with your dataset name
  token: "sk3fqXKS1ngiNh7aGCtowD9OjTlYZXhNq58OEAFeAk9EyXKF5xq9MtV02jQomsZYa2HmtOTmnSrWUH085ulERyaRJuIQE9UTN6BjEgXqGGFaluaXsNtUBmlYRzFsfaSGFnpcKcAEQGjXkcgqyc9zPExZdgANzJA7cLo4FMuerPFbtCmAsKWQ", // Ensure this token has "create" permissions

  useCdn: true, // set to false for fresh data
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
