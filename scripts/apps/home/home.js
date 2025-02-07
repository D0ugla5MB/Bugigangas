import { constants } from '../../utils/index.js';
import { router, events } from '../../core/index.js';
import builderHome from './builder.js';
import homeEvents from './events.js';

export function addMenuBtnsEvents() {
    const delegator = document.getElementById(constants.DOM.delegator.main);

    if (!delegator) {
        console.error('Menu element not found');
        return;
    }

    homeEvents.registerButtonClickEvents(delegator);
}
export default { addMenuBtnsEvents, builderHome, homeEvents };

