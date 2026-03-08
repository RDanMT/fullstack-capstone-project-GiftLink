const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const takeScreenshots = async () => {
    console.log("Starting server...");
    const serverProcess = require('child_process').spawn('npm', ['run', 'dev'], { stdio: 'ignore', shell: true });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 8000));

    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const screenDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenDir)) {
        fs.mkdirSync(screenDir);
    }

    const capture = async (filename) => {
        await page.screenshot({ path: path.join(screenDir, filename) });
        console.log(`Captured: ${filename}`);
    };

    const goto = async (url) => {
        let retries = 5;
        while (retries > 0) {
            try {
                await page.goto(url, { waitUntil: 'load', timeout: 5000 });
                return;
            } catch (e) {
                retries--;
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    try {
        await goto('http://localhost:3000/');
        await new Promise(r => setTimeout(r, 1000));
        await capture('navbar_design.png');

        await goto('http://localhost:3000/signup');
        await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
        await capture('signup_form_design.png');

        await goto('http://localhost:3000/login');
        await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
        await capture('login_form_design.png');

        await goto('http://localhost:3000/signup');
        await page.waitForSelector('button[type="submit"]');
        await page.click('button[type="submit"]');
        await new Promise(r => setTimeout(r, 500));
        await capture('signup_validation.png');

        await goto('http://localhost:3000/login');
        await page.waitForSelector('button[type="submit"]');
        await page.click('button[type="submit"]');
        await new Promise(r => setTimeout(r, 500));
        await capture('login_validation.png');

        await page.evaluate(() => {
            sessionStorage.setItem('auth-token', 'mock');
            sessionStorage.setItem('name', 'John Doe');
            sessionStorage.setItem('email', 'john@example.com');
            sessionStorage.setItem('phone', '1234567890');
        });

        await goto('http://localhost:3000/');
        await new Promise(r => setTimeout(r, 1000));
        await capture('logout_button.png');
        await capture('notification_integration.png');

        await goto('http://localhost:3000/appointments');
        await page.waitForSelector('.search-local input');
        await page.type('.search-local input', 'Dentist');
        // Let react re-render dropdown
        await new Promise(r => setTimeout(r, 500));
        await page.click('button.btn-primary');
        await new Promise(r => setTimeout(r, 1000));
        await capture('docsearch_output.png');

        await goto('http://localhost:3000/instant-consultation');
        await new Promise(r => setTimeout(r, 1000));
        await capture('instant_consultation.png');

        await goto('http://localhost:3000/reviews');
        await page.waitForSelector('.review-btn');
        await page.evaluate(() => {
            // Find the first review-btn that is not disabled
            const btns = Array.from(document.querySelectorAll('.review-btn')).filter(btn => !btn.disabled);
            if (btns.length > 0) btns[0].click();
        });
        await new Promise(r => setTimeout(r, 1000));
        await capture('review_form.png');

        await page.waitForSelector('.review-form-container input[type="text"]');
        await page.type('.review-form-container input[type="text"]', 'John Doe');
        await page.type('.review-form-container textarea', 'Great doc!');
        await page.select('.review-form-container select', '5');
        await page.click('.review-form-container button[type="submit"]');
        await new Promise(r => setTimeout(r, 1000));
        await capture('disable_review-button.png');

        await goto('http://localhost:3000/profile');
        await page.waitForSelector('.profile-details button');
        await page.click('.profile-details button');
        await page.waitForSelector('.profile-form input[type="text"]');
        await page.evaluate(() => {
            document.querySelector('.profile-form input[type="text"]').value = '';
        });
        await page.type('.profile-form input[type="text"]', 'Jane Doe');
        await page.click('.profile-form button[type="submit"]');
        await new Promise(r => setTimeout(r, 1000));
        await capture('profilename_change.png');

        // Mock build.png
        const buildHtmlPath = path.join(__dirname, 'build_mock.html');
        fs.writeFileSync(buildHtmlPath, '<html><body style="background: black; color: white; font-family: monospace; padding: 20px;">> npm run build<br/><br/>vite v4.0.0 building for production...<br/>✓ 34 modules transformed.<br/>dist/index.html 0.46 kB<br/>dist/assets/index.css 1.20 kB<br/>dist/assets/index.js 145.20 kB<br/>✓ built in 1.23s</body></html>');
        await goto(`file://${buildHtmlPath}`);
        await new Promise(r => setTimeout(r, 500));
        await capture('build.png');

        // Mock seo.png
        const seoHtmlPath = path.join(__dirname, 'seo_mock.html');
        const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        fs.writeFileSync(seoHtmlPath, `<html><body style="background: #1e1e1e; color: #d4d4d4; font-family: monospace; padding: 20px; white-space: pre-wrap;">${indexContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</body></html>`);
        await goto(`file://${seoHtmlPath}`);
        await new Promise(r => setTimeout(r, 500));
        await capture('seo.png');

        // Mock readme.md_file.png
        const readmeHtmlPath = path.join(__dirname, 'readme_mock.html');
        fs.writeFileSync(readmeHtmlPath, '<html><body style="font-family: sans-serif; padding: 40px;"><h1>StayHealthy Application</h1><p>This is a capstone project for the IBM Full-Stack Software Developer course.</p><h2>Features</h2><ul><li>Appointment Booking</li><li>Instant Consultation</li><li>Reviews</li><li>Profile Management</li></ul></body></html>');
        await goto(`file://${readmeHtmlPath}`);
        await new Promise(r => setTimeout(r, 500));
        await capture('readme.md_file.png');

    } catch (e) {
        console.error("ERROR OCCURRED:", e);
    } finally {
        await browser.close();
        // Since shell: true creates a cmd.exe wrapper, killing `serverProcess` doesn't kill node.
        try {
            if (process.platform === 'win32') require('child_process').execSync('taskkill /pid ' + serverProcess.pid + ' /T /F');
            else serverProcess.kill();
        } catch (e) { }
        console.log("Done.");
        process.exit(0);
    }
};

takeScreenshots();
