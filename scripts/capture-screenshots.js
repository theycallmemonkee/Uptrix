/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const WEBSITES = [
  { id: "jazzo", name: "Jazzo Store", url: "https://www.jazzo.store/", industry: "Premium Retail" },
  { id: "bigblare", name: "Big Blare Innovations", url: "https://bigblareinnovations.com/", industry: "Tech & Agency" },
  { id: "vastra", name: "Vastra Store", url: "https://vastra-store.com/", industry: "Ethnic Wear & E-Commerce" },
  { id: "vodaiq", name: "Vodaiq", url: "https://www.vodaiq.com/", industry: "SaaS & Analytics" },
  { id: "klevrax", name: "Klevrax", url: "https://www.klevrax.com/", industry: "Design & Creative Studio" },
  { id: "uptrix", name: "Uptrix Technologies", url: "https://uptrixtechnologies.com/", industry: "Enterprise AI Marketing" },
  { id: "ecofitz", name: "Ecofitz", url: "https://ecofitz.com/", industry: "Eco-friendly Products & Retail" },
  { id: "lebodee", name: "Lebodee", url: "https://www.lebodee.com/", industry: "Apparel & Lifestyle" },
  { id: "t-adda", name: "T-Adda", url: "https://t-adda.in/", industry: "Custom Merch & Print" }
];

const OUTPUT_DIR = path.join(__dirname, "../public/portfolio/websites");
const MANIFEST_PATH = path.join(__dirname, "../data/websites-captured.json");

async function capture() {
  console.log("Starting screenshot capture process...");
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  // Ensure data directory exists
  const dataDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const successfulCaptures = [];

  for (const site of WEBSITES) {
    console.log(`\nProcessing: ${site.name} (${site.url})...`);
    let page;
    try {
      page = await browser.newPage();
      
      // Set typical premium desktop view
      await page.setViewport({ width: 1440, height: 900 });
      
      // Navigate and wait for content
      await page.goto(site.url, {
        waitUntil: "networkidle2",
        timeout: 45000 // 45s timeout for heavy sites
      });
      
      // Additional wait for client-side hydration / fade-in animations to complete
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const fileName = `${site.id}.jpg`;
      const filePath = path.join(OUTPUT_DIR, fileName);
      
      // Capture optimized screenshot as JPEG
      await page.screenshot({
        path: filePath,
        type: "jpeg",
        quality: 82 // Optimize size and retain high crispness
      });
      
      console.log(`Successfully captured and saved: ${fileName}`);
      
      // Add to verified manifest
      successfulCaptures.push({
        ...site,
        screenshot: `/portfolio/websites/${fileName}`
      });
    } catch (error) {
      console.error(`Failed to capture ${site.name}:`, error.message);
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  await browser.close();
  
  // Write the success manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(successfulCaptures, null, 2), "utf8");
  console.log(`\nCapture process finished! Manifest saved to ${MANIFEST_PATH}`);
  console.log(`Total successfully captured websites: ${successfulCaptures.length}/${WEBSITES.length}`);
}

capture().catch(err => {
  console.error("Critical error in capture runner:", err);
  process.exit(1);
});
