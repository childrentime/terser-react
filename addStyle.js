export const STYLE_MAP = {};

export const getStyle = id => STYLE_MAP[id];

// Enables critical path CSS rendering
// https://github.com/kriasoft/isomorphic-style-loader
export default cssSets => (...styles) => styles.forEach(style => {
    if (!style._getContent || !style._getCss) {
        return;
    }
    const moduleId = 's' + style._getContent()[0][0] + '-0';

    console.log('moduleId',moduleId);
    if (!STYLE_MAP.hasOwnProperty(moduleId)) {
        STYLE_MAP[moduleId] = {
            id: moduleId,
            content: style._getCss()
        };
    }
    cssSets[moduleId] = 1;
});
