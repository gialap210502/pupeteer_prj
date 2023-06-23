const { done, resolve } = require('express-hbs/lib/resolver');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
describe('Testing login page', () => {
    let page;
    let browser;
    before(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
    })// Func called before all test

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("https://app.gcalls.co/")
    })

    it("1/should redirect to the login page", async function () {

        const title = await page.title();

        expect(title).to.equal("Gcalls - Đăng nhập")
    });
    it("2/should redirect to https://auth.gcalls.co/auth/~, if input callcenter successfully", async function () {

        const callCenter = "gcallsintern";

        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        await page.waitForNavigation();
        const title = await page.title();

        expect(title).to.equal("Sign in to " + callCenter)
    });
    it("3/should display error,  if not input callcenter", async function () {
        await page.click("button[type='submit']");

        await page.waitForFunction(
            () => document.querySelector('#tenantError').textContent !== ''
        );
        const errorMessage = await page.$eval('#tenantError', element => element.textContent);
        expect(errorMessage).to.equal('Tên tổng đài không được rỗng');
    });
    it("4/Should display error,  if input callcenter that isn't exist", async function () {
        const callCenter = "gcallsintern13412342134";

        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        await page.waitForFunction(
            () => document.querySelector('#tenantError').textContent !== ''
        );
        const errorMessage = await page.$eval('#tenantError', element => element.textContent);
        expect(errorMessage).to.equal('Không tìm thấy tổng đài');
    });

    it("5/Email does not exist", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "wrong@test.com";
        const password = "Gialap123@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("6/Password is wrong", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@@@@@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("7/Missing all fields", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@@@@@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();


        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("8/Missing email fields", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@@@@@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#password");
        await page.keyboard.type(password);

        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("9/Missing password fields", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@@@@@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);

        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("10/Email without @", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duonggcalls.co";
        const password = "Gialap123@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("11/ Email without Domain", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@";
        const password = "Gialap123@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("12/ Email with invalid Domain", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls";
        const password = "Gialap123@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("13/ Clicking 'Forget password' hyperlink when user is in 'signin' screen", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Click vào thẻ a 
        await page.waitForNavigation();
        await page.click("a[tabindex='5']");


        // check url
        const element = await page.$('#kc-page-title');
        const text = await page.evaluate(element => element.textContent.trim(), element);

        expect(text).to.equal("Forgot Your Password?")

    });
    it("14/ Wrong notification when entered invalid after entering wrong password", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@123";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });
    it("15/ Entering invalid password", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "123";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy span display error của trang
        await page.waitForFunction(
            () => document.querySelector('#input-error').textContent !== ''
        );
        const errorMessage = await page.$eval('#input-error', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Invalid username or password.');

    });

    it("16/Login successfully", async function () {

        //Thông tin đăng nhập
        const callCenter = "gcallsintern";
        const email = "lap.duong@gcalls.co";
        const password = "Gialap123@";

        //Điền tên tổng đài
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");

        //Điền email và pass để đăng nhập
        await page.waitForNavigation();
        await page.focus("#username");
        await page.keyboard.type(email);
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.waitForSelector('#kc-login');
        await page.click('#kc-login');

        // Lấy title của trang
        await page.waitForNavigation();
        const title = await page.title();

        expect(title).to.equal("Gcalls - Trang chủ")

    });

    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })

})