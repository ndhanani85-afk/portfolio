import React from "react";

interface JsonLdProps {
  schema: Record<string, any> | Array<Record<string, any>>;
  id?: string;
}

export default function JsonLdSchema({ schema, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
