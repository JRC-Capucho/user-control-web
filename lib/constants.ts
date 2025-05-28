export const FOOTER_TEXT =
  "O Farol, software sem fins lucrativos, montado com o objetivo de ajudar quem faz o bem.";

export const LOGO_URL = process.env.APP_URL + "/imgs/logo.png";

export const OPEN_GRAPH = {
  url: LOGO_URL,
  title: "O Farol",
  description: FOOTER_TEXT,
  images: [
    {
      url: LOGO_URL,
      alt: "O Farol logo",
    },
  ],
};
