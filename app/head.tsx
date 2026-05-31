export default function Head() {
  return (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n+new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n+j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n+'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n+})(window,document,'script','dataLayer','GTM-MQVW8VT8');`,
        }}
      />
      {/* End Google Tag Manager */}
    </>
  );
}
