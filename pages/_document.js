import Document, { Html, Head, Main, NextScript } from "next/document";
import Scrollbars from "react-custom-scrollbars";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-slate-50">
          <Main />
          <NextScript />
        </body>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Html>
    );
  }
}

export default MyDocument;
