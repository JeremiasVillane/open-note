const styleSheet = {
  p: {
    margin: "6px 12px",
  },
  a: {
    color: "#628bea",
    textDecoration: "none",
  },
  ol: {
    border: "1px solid lightgray",
    borderRadius: "6px",
    margin: "6px 12px",
    display: "flex",
  },
  ul: {
    border: "1px solid lightgray",
    borderRadius: "6px",
    margin: "6px 12px",
    display: "flex",
    listStyleImage: "url('bullet-point.svg')",
  },
  li: {
    alignItems: "center",
  },
  code: {
    fontFamily: "Hack",
    backgroundColor: "#f8f9fa",
    fontSize: "10px",
    borderRadius: "21px",
  },
  [".codeblock"]: {
    fontFamily: "Hack",
    backgroundColor: "#f8f9fa",
    fontSize: "12px",
    padding: "21px 21px 10px",
    margin: "6px 12px",
    lineHeight: "2px",
  },
};

export default styleSheet;
