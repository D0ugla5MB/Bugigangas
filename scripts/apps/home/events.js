import { constants } from "../../utils/index.js";

function updateBackHomeStyle(currentUrl, btn) {
   btn.hidden = currentUrl.includes(constants.ROUTES.hashHome) ? false : true;
}

export default {
    updateBackHomeStyle,
}