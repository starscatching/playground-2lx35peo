const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/puppeteer/chrome/linux-148.0.7778.167/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  });

  const pages = [
    { url: 'http://localhost:3000', file: '/tmp/ss-home.png' },
    { url: 'http://localhost:3000/catalog', file: '/tmp/ss-catalog.png' },
    { url: 'http://localhost:3000/portfolio', file: '/tmp/ss-portfolio.png' },
    { url: 'http://localhost:3000/upload', file: '/tmp/ss-upload.png' },
  ];

  for (const { url, file } of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: file, fullPage: true });
    console.log('✓', file);
    await page.close();
  }

  await browser.close();
})();
