/**
 * @requires Components
 */
const { errorToJson } = require('./error');
const { formats } = require('./formats');

console.log('logger.formats--->', formats);
console.log('logger.errorToJson--->', errorToJson);

/**
 * @enum Step Categories
 */
const StepCat = {
    block: 'step',
    ifBlock: 'if',
    elseIfBlock: 'elseif',
    elseBlock: 'else',
}

/**
 * @constant config
 */
const USE_EMOTICONS = true;

/**
 * @class LoggerBrowser
 */
class LoggerBrowser {
    constructor(app) {
        this.app = app;
        this.formats = formats();
    }

    /**
     * log the namespace
     * @param {string} namespace - class or file or namespace
     */
    namespace(namespace) {
        console.log(`namespace: ${namespace}`);
    }

    /**
     * log the method
     * @param {string} method - method name
     */
    method(method) {
        console.log(
            `%c[${this.app.namespace}.${method.name}]%c  📦${method.description}`,
            this.formats.method(method.color),
            this.formats.method(method.color),
        );
    }

    /**
     * Log Step
     * @param {StepModel} step - step model
     */
    step(step) {
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c   •🦄 ${step.description}`,
            this.formats.method(step.methodColor),
            this.formats.step(step.methodColor)
        );
    }

    /**
     * log data
     * @param {string} key - key of the data
     * @param {any} val - data value
     * @param {'success' | 'failed'} optionalFlag 
     */
    data(key, val, optionalFlag) {
        let tag = USE_EMOTICONS ? '🗂' : '@data';
        if (optionalFlag === 'success') {
            tag = USE_EMOTICONS ? '✅' : '@success';
        }
        else if (optionalFlag === 'failed') {
            tag = USE_EMOTICONS ? '❌' : '@failed';
        }

        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ${key}`,
            this.formats.method(step.methodColor),
            this.formats.clear(),
            {
                [key]: val
            }
        );
    }

    /**
     * @function logMongo
     * @param {string} description - print description
     * @param {any?} debugData - optional debug data
     */
    mongo(description, debugData) {
        const tag = USE_EMOTICONS ? '🌳' : '@mongo';
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ${description}`,
            this.formats.method(step.methodColor),
            this.formats.clear(),
            debugData
        );
    }

    dispatch(key, val) {
        const tag = USE_EMOTICONS ? '⚡️' : '@dispatch';
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ${key}`,
            this.formats.method(step.methodColor),
            this.formats.clear(),
            {
                [key]: val
            }
        );
    }

    fetch(key, val) {
        const tag = USE_EMOTICONS ? '☁️' : '@fetch';
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ${key}`,
            this.formats.method(step.methodColor),
            this.formats.clear(),
            {
                [key]: val
            }
        );
    }

    fireEvent(key, val, channel) {
        const tag = USE_EMOTICONS ? '💥' : '@event';
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ${key}`,
            this.formats.method(step.methodColor),
            this.formats.clear(),
            {
                [key]: val,
                channel
            }
        );
    }

    /**
     * log error 
     * @param {ErrorJson} errorJson - error as json model
     * @param {string} description - description
     */
    error(errorJson, description) {
        const tag = USE_EMOTICONS ? '💩' : '@error';
        const step = this.app.last.step;

        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ${description}`,
            this.formats.method(step.methodColor),
            this.formats.error(),
            {
                error: errorJson
            }
        );
    }

    /**
     * log throws 
     * @param {ErrorJson} errorJson - error as json model
     * @param {string} description - description
     */
    throws(errorJson, description) {
        const tag = USE_EMOTICONS ? '💣' : '@throws';
        const step = this.app.last.step;

        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[${tag}] ---> ${description}`,
            this.formats.method(step.methodColor),
            this.formats.error(),
        );
    }

    /**
     * log goTo
     * @param {string?} gotoNamespace - namespace for the class or file to goto   
     * @param {string} gotoMethod - method name
     * @param {boolean?} isReturn - optional is returned or not
     */
    goTo(gotoNamespace, gotoMethod, isReturn) {
        const tag = USE_EMOTICONS ? '👉' : '@goto';
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •[@goto] ${isReturn ? '👈...' : '👉...'} ${gotoNamespace}.${gotoMethod}`,
            this.formats.method(step.methodColor),
            this.formats.goTo()
        );
    }

    /**
     * Log Check
     * @param {string} checkDesc - checkDesc
     * @param {any?} debugData? - optional debug data
     */
    check(checkDesc, debugData) {
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c   •🖐[@check] ${checkDesc}`,
            this.formats.method(step.methodColor),
            this.formats.check(),
            debugData,
        );
    }

    /**
     * 
     * @param {string} statement - the if statement description
     * @param {any?} val - optional value to print
     * @param {StepCat} ifType - 'if' | 'elseif' | 'else'
     */
    if(statement, val, ifType) {
        if (!ifType) ifType = StepCat.ifBlock;

        const tag = USE_EMOTICONS ? '🔷' : '';
        const step = this.app.last.step;
        console.log(
            `%c[${this.app.namespace}.${step.methodName}]%c      •${tag} [@${ifType}] ${statement}`,
            this.formats.method(step.methodColor),
            this.formats.if(),
            val
        );
    }
}

function loggerBrowser(app) {
    return new LoggerBrowser(app);
}

module.exports = {
    loggerBrowser,
};