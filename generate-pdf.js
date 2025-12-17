const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Load the local HTML file
  const htmlPath = path.join(__dirname, 'cv-print.html');
  console.log('Loading:', htmlPath);
  
  await page.goto(`file://${htmlPath}`, { 
    waitUntil: 'networkidle0',
    timeout: 30000
  });
  
  // Wait for any images to load
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Generating PDF...');
  
  // Generate PDF with proper settings
  await page.pdf({
    path: 'Pavlos_Polydoras_CV.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.4in',
      right: '0.4in',
      bottom: '0.4in',
      left: '0.4in'
    },
    preferCSSPageSize: true
  });
  
  await browser.close();
  
  console.log('✅ PDF generated successfully: Pavlos_Polydoras_CV.pdf');
})();

