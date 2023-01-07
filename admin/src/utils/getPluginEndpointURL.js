// fix error of undefined pluginId value...
// import { pluginId } from "../pluginId";
import pluginPkg from "../../../package.json";

const pluginId = pluginPkg.strapi.name;

/**
 * Auto prefix URLs with the plugin id
 *
 * @param {String} endpoint plugin specific endpoint
 * @returns {String} plugin id prefixed endpoint
 */
export const getPluginEndpointURL = (endpoint) => `/${pluginId}/${endpoint}`;
