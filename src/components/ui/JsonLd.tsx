/**
 * Emits a JSON-LD block. Server-rendered into the static HTML, so crawlers
 * see it without executing any script.
 *
 * The `<` escape prevents a string inside the data from closing the script
 * tag early — the standard XSS hole in hand-rolled JSON-LD. Everything here
 * comes from our own config today, but that will stop being true the moment
 * real review text goes in.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
