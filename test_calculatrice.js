const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let options = new chrome.Options();
    options.addArguments(
        "--headless",            // pas d'interface graphique
        "--no-sandbox",          // contourne certaines restrictions Docker
        "--disable-dev-shm-usage" // évite les crashes liés à /dev/shm
    );


(async function testCalculatrice() {
// Ici on crée directement le service
//// let service = new chrome.ServiceBuilder("/usr/bin/chromedriver");

let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    ///.setChromeService(service)   // ✅ au lieu de setDefaultService
    .build();

    try {
        // Accéder au site
        await driver.get('http://localhost:8080/index.html');
        // --- Test 1 : Vérifier l'Addition ---
        await driver.findElement(By.id('number1')).sendKeys('12'); 
        await driver.findElement(By.id('number2')).sendKeys('2'); 
        await driver.findElement(By.id('operation')).sendKeys('Addition');
        await driver.findElement(By.id('calculate')).click();
        // Afficher les résultats
        let resultadd = await driver.findElement(By.id('result')).getText();
        console.log(resultadd);
        await sleep(1000);


        // --- Test 2 : Division par Zéro ---
        await driver.findElement(By.id('number1')).clear(); 
        await driver.findElement(By.id('number2')).clear(); 
        await driver.findElement(By.id('number1')).sendKeys('20'); 
        await driver.findElement(By.id('number2')).sendKeys('0'); 
        await driver.findElement(By.id('operation')).sendKeys('Division');
        await driver.findElement(By.id('calculate')).click();
        // Afficher les résultats
        let resultzero = await driver.findElement(By.id('result')).getText();
        console.log(resultzero);
        await sleep(1000);

        // --- Test 3 : Entrée Non Valide ---
        await driver.findElement(By.id('number1')).sendKeys('e'); 
        await driver.findElement(By.id('number2')).sendKeys('e'); 
        await driver.findElement(By.id('operation')).sendKeys('Division');
        await driver.findElement(By.id('calculate')).click();
        // Afficher les résultats
        let erreur = await driver.findElement(By.id('result')).getText();
        console.log(erreur);
        await sleep(1000);

        // --- Test 4 : Vérifier la Soustraction --- // NE PAS OUBLIER DE CLEAR !!!!! SINON CA S'AJOUTE AUTOMATIQUEMENT
        await driver.findElement(By.id('number1')).clear(); 
        await driver.findElement(By.id('number2')).clear(); 
        await driver.findElement(By.id('number1')).sendKeys('10'); 
        await driver.findElement(By.id('number2')).sendKeys('8'); 
        await driver.findElement(By.id('operation')).sendKeys('Soustraction');
        await driver.findElement(By.id('calculate')).click();
        // Afficher les résultats
        let resultsub = await driver.findElement(By.id('result')).getText();
        console.log(resultsub);
        await sleep(1000);

    } finally {
        // Fermer le navigateur
        await driver.quit();
        await sleep(5000);
    }
})();

