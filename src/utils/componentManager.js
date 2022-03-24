export default class ComponentManager {
    list = new Map();
    static getManager() {
        const g = window || global;
        if (g.$tdp_single_compManager) {
            return g.$tdp_single_compManager;
        } else {
            g.$tdp_single_compManager = new ComponentManager();
            return g.$tdp_single_compManager;
        }
    }
    get = key => {
        return this.list.get(key);
    };

    add = (key, component) => {
        if (!this.list.has(key)) {
            this.list.set(key, component);
        }
    };
}
(window || global).$tdp_ComponentManager = ComponentManager;
