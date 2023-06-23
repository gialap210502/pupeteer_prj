const { done, resolve } = require('express-hbs/lib/resolver');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
describe('Testing login page', () => {
    let page;
    let browser;
    before(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });
        page = await browser.newPage();
    });// Func called before all test

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto("https://app.gcalls.co/");
        await page.click("a");
        await page.waitForSelector('.swal-overlay.swal-overlay--show-modal')
        await page.click('.swal-button--confirm');

    });
    it("1/Enter callcenter have existed", async function () {
        const email = "gialap851@gmail.com";
        const callCenter = "gcallsintern";;
        
        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.focus("#email")
        await page.keyboard.type(email);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#tenantError').textContent !== ''
        );
        const errorMessage = await page.$eval('#tenantError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Tổng đài đã tồn tạ');
    });
    it("2/Enter missing email", async function () {
        const email = "gialap851@gmail.com";
        const callCenter = "gcallslap";

        await page.setViewport({
            width: 1920,
            height: 1000,
        });

        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#emailError').textContent !== ''
        );
        const errorMessage = await page.$eval('#emailError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Email Admin không được rỗng');
    });
    it("3/Enter email without domain", async function () {
        const email = "gialap851@";
        const callCenter = "gcallsintern";

        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.focus("#email")
        await page.keyboard.type(email);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#emailError').textContent !== ''
        );
        const errorMessage = await page.$eval('#emailError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Email Admin không đúng định dạng');
    });
    it("4/Enter email without local part", async function () {
        const email = "@gmail.com";
        const callCenter = "gcallsintern";

        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.focus("#email")
        await page.keyboard.type(email);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#emailError').textContent !== ''
        );
        const errorMessage = await page.$eval('#emailError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Email Admin không đúng định dạng');
    });
    it("5/Enter email without @", async function () {
        const email = "gialap851gmail.com";
        const callCenter = "gcallsintern";

        await page.focus("#tenant");
        await page.keyboard.type(callCenter);
        await page.focus("#email")
        await page.keyboard.type(email);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#emailError').textContent !== ''
        );
        const errorMessage = await page.$eval('#emailError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Email Admin không đúng định dạng');
    });
    it("6/Click signin hyperlink", async function () {
        const email = "gialap851@gmail.com";
        const callCenter = "gcallsintern";

        await page.click("a[href='/g/']");

        const url = await page.url();
        console.log(url);
        expect(url).to.equal("https://app.gcalls.co/g/")
    });
    it("7/Confirming email", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";

        await page.goto(url);
        const result = await page.url();

        expect(result.trim()).to.equal(url);
    });
    it("8/Sign up unsuccessfully with 33 characters", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const password = "khongnhokhongnhokhongnhokhongnhoo";
        const re_password = "khongnhokhongnhokhongnhokhongnhoo";

        
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.focus("#passwordConfirm")
        await page.keyboard.type(re_password);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#passwordError').textContent !== ''
        );
        const errorMessage = await page.$eval('#passwordError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Mật khẩu không đúng định dạng');
    });
    it("9/Missing all fields", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);

        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#passwordError').textContent !== ''
        );
        const errorMessage = await page.$eval('#passwordError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Mật khẩu không được rỗng');
    });
    it("10/Missing password field", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const re_password = "12345678910";

        await page.focus("#passwordConfirm")
        await page.keyboard.type(re_password);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#passwordError').textContent !== ''
        );
        const errorMessage = await page.$eval('#passwordError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Mật khẩu không được rỗng');
    });
    it("11/Missing confirm password field", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const password = "12345678910";

        
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#passwordConfirmError').textContent !== ''
        );
        const errorMessage = await page.$eval('#passwordConfirmError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Nhập lại mật khẩu không được rỗng');
    });
    it("12/Confirm password does not match the password", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const password = "12345678910";
        const re_password = "123456789112323";

        
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.focus("#passwordConfirm")
        await page.keyboard.type(re_password);
        await page.click("button[type='submit']");
        await page.waitForFunction(
            () => document.querySelector('#passwordConfirmError').textContent !== ''
        );
        const errorMessage = await page.$eval('#passwordConfirmError', element => element.textContent);

        expect(errorMessage.trim()).to.equal('Nhập lại mật khẩu không trùng khớp');
    });
    it("13/Sign up successfully with 8 characters", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const password = "12345678";
        const re_password = "12345678";

        
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.focus("#passwordConfirm")
        await page.keyboard.type(re_password);
        await page.click("button[type='submit']");

        await page.waitForNavigation();
        const urlSignin = await page.url();
        expect(urlSignin).to.equal("https://app.gcalls.co/g/login");
    });
    it("14/Sign up successfully", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const password = "12345678910";
        const re_password = "12345678910";

        
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.focus("#passwordConfirm")
        await page.keyboard.type(re_password);
        await page.click("button[type='submit']");

        await page.waitForNavigation();
        const urlSignin = await page.url();
        expect(urlSignin).to.equal("https://app.gcalls.co/g/login");
    });
    it("15/Sign up successfully with 32 characters", async function () {
        const url = "https://app.gcalls.co/g/confirm/1d318edfc19e7e9832186e64e3e7c13b3fd1bad0b3afad2fd1abe25c6f0f54694c75a615faa4aa8cb92bbdef1183ea99d8413";
        await page.goto(url);
        const password = "12345678901234567890123456789012";
        const re_password = "12345678901234567890123456789012";

        
        await page.focus("#password");
        await page.keyboard.type(password);
        await page.focus("#passwordConfirm")
        await page.keyboard.type(re_password);
        await page.click("button[type='submit']");

        await page.waitForNavigation();
        const urlSignin = await page.url();
        expect(urlSignin).to.equal("https://app.gcalls.co/g/login");
    });
    afterEach(async () => {
        await page.close();
    })

    after(async () => {
        await browser.close();
    })


})