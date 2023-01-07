const { pluginId } = require('./pluginId');

/**
 * A helper function to obtain a plugin service
 *
 * @return service
 */
const getPluginService = (strapi, name) => strapi.plugin(pluginId).service(name);

module.exports = {
	getPluginService,
};
