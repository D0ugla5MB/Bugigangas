const debugContext = {
    isEnabled: true,
    marks: new Map()
};

function traceStack(label) {
    if (!debugContext.isEnabled) return;
    console.group(`🔍 Stack: ${label}`);
    console.trace();
    console.groupEnd();
}

function inspectObjects(label, ...objects) {
    if (!debugContext.isEnabled) return;
    console.group(`📦 Inspect: ${label}`);
    objects.forEach((obj, index) => {
        console.log(`Item ${index + 1}:`);
        console.dir(obj, { depth: null, colors: true });
    });
    console.groupEnd();
}

function startMeasure(label) {
    if (!debugContext.isEnabled) return;
    performance.mark(`${label}-start`);
    debugContext.marks.set(label, Date.now());
}

function endMeasure(label) {
    if (!debugContext.isEnabled) return;
    if (!debugContext.marks.has(label)) {
        console.warn(`⚠️ No start mark for: ${label}`);
        return;
    }
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    const duration = Date.now() - debugContext.marks.get(label);
    console.log(`⏱️ ${label}: ${duration}ms`);
    debugContext.marks.delete(label);
}

export const debugUtils = {
    enable: () => {
        console.warn('⚠️ Debug mode enabled! Caution to use it during production environment!');
        debugContext.isEnabled = true
    },
    disable: () => debugContext.isEnabled = false,
    trace: traceStack,
    inspect: inspectObjects,
    start: startMeasure,
    end: endMeasure,
    makeDebug: (target, ...objects) => {
        if (!debugContext.isEnabled) return () => { };
        traceStack(target);
        inspectObjects(target, ...objects);
        startMeasure(target);
        return () => endMeasure(target);
    }
};