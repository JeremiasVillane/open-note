import { Document, Page } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import styleSheet from "./style-sheet";

export function HtmlToPdf({ content }: { content: string | null | undefined }) {
  const getContent = content
    ?.replace(/<pre><code>/g, "<pre class='codeblock'>")
    .replace(/<\/code><\/pre>/g, "</pre>");

  return (
    <Document>
      <Page size={"A4"} style={{ marginVertical: "12px" }}>
        <Html style={{ fontSize: 14 }} stylesheet={styleSheet}>
          {getContent ?? ""}
        </Html>
      </Page>
    </Document>
  );
}
