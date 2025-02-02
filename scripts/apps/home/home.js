import { constants } from '../../utils/index.js';
import { router, events } from '../../core/index.js';
import builderHome from './builder.js';
import buttons from './events.js';

export function addMenuBtnsEvents() {
    const delegator = document.getElementById(constants.DOM.delegator.main);

    if (!delegator) {
        console.error('Menu element not found');
        return;
    }

    events.registerEventListener(
        constants.ROUTES.hash,
        window.eventTracker,
        delegator,
        'click',
        (event) => {
            event.stopPropagation();
            try {
                const button = event.target.closest(constants.DOM.querySelect);
                if (!button || !delegator) {
                    return;
                }

                const hashKey = button.id;

                if (!buttons.BUTTON_MAP[hashKey]) {
                    throw new Error(`No handler found for button: ${hashKey}`);
                }

                return buttons.BUTTON_MAP[hashKey].handler();
            } catch (error) {
                console.error('Button handler error:', error);
                router.changeRoute(constants.ROUTES.hashError);
            }
        },
        {
            useCapture: false,
        }
    );
}
export default { addMenuBtnsEvents, builderHome, buttons };