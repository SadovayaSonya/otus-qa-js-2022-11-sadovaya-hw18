import launchBrowser from "../helpers/launchBrowser.js";
import {expect} from '@playwright/test';

let page, browser;

const credential = {
    phone: `${process.env.VK_PHONE}`,
    password: `${process.env.VK_PASSWORD}`,
    id: `${process.env.VK_ID}`
};

const selectorAuthPage = {
    inputPhoneOrNumber: "//input[@name='login']",
    buttonLogin: "//button[@type='submit']",
    buttonLoginWithPassword: "//span[contains(text(), 'Войти при помощи пароля')]/..",
    inputPassword: "//input[@name='password']"
};

const selectorFeedPage = {
    blockPostOfNews: "//div[@id='submit_post_box']",
    arrayReactionsInNewsBlocks: "//div[contains(@class, 'PostButtonReactions--post')]"
};

const selectorProfilePage = {
    nameUser: "//h2[@id='owner_page_name']",
    blockPostOfNews: "//div[@id='post_field']",
    buttonVisibilitySettings: "//div[@id='post_visibility_btn']//span[@role='button']",
    buttonCategorySettings: "//div[@id='post_discover_category_btn']//span[@role='button']",
    dropdownVisibilitySettings: "//div[@id='post_visibility_tt_content']",
    itemDropdownVisibilityOnlyFriends: "//div[@id='friends_only']",
    itemDropdownCategoryIt: "//div[@aria-label='IT']",
    buttonSendPost: "//button[@id='send_post']",
    counterPosts: "//input[@id='page_wall_count_own']"
};

const selectorGroupsPage = {
    inputSearchGroups: "//input[@id='groups_list_search']",
    buttonSearchGroups: "//button[@aria-label='Поиск сообществ']",
    listGroups: "//div[@id='groups_list_search_cont']",
    buttonSubscribeToHabr: "//button[@id='search_sub-20629724']",
    counterGroups: "//a[@href='/groups']//span[@dir]",
    rowOfGroupHabr: "//div[@data-group-id='20629724']"
};

const selectorMessagesPage = {
    buttonCreateNewChat: "//button[@aria-label='Новый чат']",
    inputNameChat: "//input[@id='im_dialogs_creation_name']",
    inputNameOrLastName: "//input[@id='im_dialogs_search']",
    buttonConfirmCreateChat: "//button[contains(@class, 'confirm_creation')]",
    rowOfChatInList: "//span[@role='link']",
    nameChat: "//span[@title]//a"
};

const selectorItemMainMenu = {
    buttonMyPage: "//li[@id='l_pr']//a"
};

describe('ВК. UI-тесты', () => {

    before(async function () {
        [browser, page] = await launchBrowser()
    });
    after(async () => await browser.close());

    it('Авторизация в ВК через номер телефона и пароль', async function () {
        await page.goto('/');
        await page.locator(selectorAuthPage.buttonLogin).waitFor();
        await page.locator(selectorAuthPage.inputPhoneOrNumber).fill(credential.phone);
        await page.locator(selectorAuthPage.buttonLogin).click();
        await page.locator(selectorAuthPage.buttonLoginWithPassword).click();
        await page.locator(selectorAuthPage.buttonLogin).waitFor();
        await page.locator(selectorAuthPage.inputPassword).fill(credential.password);
        await page.locator(selectorAuthPage.buttonLogin).click();
        await page.waitForLoadState('networkidle');
        await expect(page.locator(selectorItemMainMenu.buttonMyPage)).toBeVisible();
        await page.screenshot({path: 'screenshots/Пользователь_авторизован.png', fullPage: true});
    });

    it('Установка лайка посту', async function () {
        await page.goto('/feed');
        await page.locator(selectorFeedPage.blockPostOfNews).waitFor();
        let beforeNumberOfLikes = await page.locator(selectorFeedPage.arrayReactionsInNewsBlocks).first().getAttribute('data-reaction-counts');
        beforeNumberOfLikes = JSON.parse(beforeNumberOfLikes)['0'];
        await page.screenshot({path: `screenshots/До_установки_лайка.png`, fullPage: true});
        await page.locator(selectorFeedPage.arrayReactionsInNewsBlocks).first().click();
        let afterNumberOfLikes = await page.locator(selectorFeedPage.arrayReactionsInNewsBlocks).first().getAttribute('data-reaction-counts');
        afterNumberOfLikes = JSON.parse(afterNumberOfLikes)['0'];
        expect(beforeNumberOfLikes + 1).toBe(afterNumberOfLikes);
        await page.screenshot({path: 'screenshots/После_установки_лайка.png', fullPage: true});
    });

    it('Публикация приватной записи с темой IT на странице', async function () {
        await page.goto(`/${credential.id}`);
        await page.locator(selectorProfilePage.nameUser).waitFor();
        let beforeNumberOfPosts = await page.locator(selectorProfilePage.counterPosts).getAttribute('value');
        beforeNumberOfPosts = Number(beforeNumberOfPosts);
        await page.locator(selectorProfilePage.blockPostOfNews).click();
        await page.locator(selectorProfilePage.blockPostOfNews).fill('Всем привет!');
        await page.locator(selectorProfilePage.buttonVisibilitySettings).click();
        await page.locator(selectorProfilePage.dropdownVisibilitySettings).waitFor();
        await page.locator(selectorProfilePage.itemDropdownVisibilityOnlyFriends).click();
        await page.locator(selectorProfilePage.buttonCategorySettings).click();
        await page.locator(selectorProfilePage.itemDropdownCategoryIt).click();
        await page.locator(selectorProfilePage.buttonSendPost).click();
        await page.waitForTimeout(2000);
        let afterNumberOfPosts = await page.locator(selectorProfilePage.counterPosts).getAttribute('value');
        afterNumberOfPosts = Number(afterNumberOfPosts);
        expect(beforeNumberOfPosts + 1).toBe(afterNumberOfPosts);
        await page.screenshot({path: `screenshots/Запись_опубликована.png`, fullPage: true});
    });

    it('Подписка на официальное сообщество Хабр', async function () {
        await page.goto('/groups');
        await page.screenshot({path: `screenshots/Пользователь_не_состоит_в_сообществах.png`, fullPage: true});
        await page.locator(selectorGroupsPage.inputSearchGroups).fill('Хабр');
        await page.locator(selectorGroupsPage.buttonSearchGroups).click();
        await page.locator(selectorGroupsPage.listGroups).waitFor();
        await page.locator(selectorGroupsPage.buttonSubscribeToHabr).click();
        await page.reload();
        await expect(page.locator(selectorGroupsPage.counterGroups)).toHaveText('1');
        await expect(page.locator(selectorGroupsPage.rowOfGroupHabr)).toBeVisible();
        await page.screenshot({path: `screenshots/Пользователь_состоит_в_сообществе.png`, fullPage: true});
    });

    it('Создание нового чата', async function () {
        await page.goto('/im');
        await page.locator(selectorMessagesPage.buttonCreateNewChat).click();
        await page.locator(selectorMessagesPage.inputNameChat).fill('Тестовый_чат');
        await page.locator(selectorMessagesPage.inputNameOrLastName).fill('Sabrina Franklin');
        await page.locator(selectorMessagesPage.buttonConfirmCreateChat).click();
        await page.waitForTimeout(2000);
        const textOfLinkToOpenChat = await page.locator(selectorMessagesPage.rowOfChatInList).getAttribute('aria-label');
        expect(textOfLinkToOpenChat).toBe('Перейти к чату: Тестовый_чат');
        await expect(page.locator(selectorMessagesPage.nameChat)).toHaveText('Тестовый_чат');
        await page.screenshot({path: `screenshots/Создан_новый_чат.png`, fullPage: true});
    });
});