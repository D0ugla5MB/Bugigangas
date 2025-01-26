import { constants } from "../../utils/index.js";

export function HOME_BUTTONS(btns_where, apps_urls) {
    try {
        if (!btns_where) {
            console.error(`Invalid elements collection: ${btns_where}; expected a collection of buttons`);
        }
        if (!apps_urls) {
            console.error(`Invalid apps urls: ${apps_urls}; expected an array of urls`);
        }

        const btns = [];
        const hashes = [];
        
        for (const btn in btns_where) {
            btns.push(btns_where[btn]);
        }

        for (const hash in apps_urls) {
            hashes.push(apps_urls[hash]);
        }

        return { btns, hashes };
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}