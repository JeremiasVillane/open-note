import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Hack",
  fonts: [
    {
      fontStyle: "normal",
      fontWeight: 400,
      format: "woff",
      src: "/fonts/hack-regular.woff",
    },
  ],
});
