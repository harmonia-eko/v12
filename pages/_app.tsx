import React from "react";
import '../css/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '../public/icofont/icofont.min.css'

export default function App({ Component, pageProps }) {
  return <Component className="App" {...pageProps} />
}