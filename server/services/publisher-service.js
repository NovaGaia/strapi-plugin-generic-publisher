'use strict';

const axios = require('axios').default;
const { pluginId } = require('../utils/pluginId');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const publisherContent = require('../components/publisher.json');

const now = (pluginConfig) => {
  const options = {
    timeZone: 'Europe/London',
    timeZoneName: 'short',
    hour12: false,
  };
  return new Date().toLocaleString(
    pluginConfig.dateConfiguration?.dateLocaleString || 'en-GB',
    pluginConfig.dateConfiguration?.options || options
  );
};

const checkPluginConfig = (instances, id) => {
  if (instances == null) {
    console.error('Publisher instances error');
    return false;
  }
  if (!instances[id]) {
    console.error('Publisher instances id error');
    return false;
  }
  if (!instances[id].name) {
    console.error('Publisher instance name undefined');
    return false;
  }
  if (!instances[id].enabled) {
    console.error('Publisher instance enabled undefined');
    return false;
  }
  if (!instances[id].url) {
    console.error('Publisher instance url undefined');
    return false;
  }
  return true;
};

module.exports = ({ strapi }) => {
  const pluginConfig = strapi.config.get(`plugin.${pluginId}`) || {};
  return {
    async getWelcomeMessage() {
      return `Welcome to ${pluginId} 🚀`;
    },

    async getInstances() {
      const { instances } = pluginConfig;
      // return instances;
      return (instances || []).map((instance, id) => ({
        id,
        ...instance,
      }));
    },

    async check(ctx) {
      const { id } = ctx.request.body;
      const { instances } = pluginConfig;
      try {
        if (checkPluginConfig(instances, id)) {
          const { stdout, stderr } = await exec(`cat ./public/status-${instances[id].name}.txt`);
          if (stdout) {
            const responseObj = {
              status: stdout,
              name: instances[id].name,
            };
            return responseObj;
          }
          // on passe dans catch et pas ici, mais on le laisse au cas ou...
          if (stderr) {
            console.error('stderr:', stderr);
            return { response: false, error: stderr };
          }
        } else {
          console.error('Plugin Nova Publisher configuration error');
        }
      } catch (error) {
        console.error(error);
        return { response: false, error: error.message };
      }
    },

    async publish(id) {
      try {
        const { instances } = pluginConfig;
        if (checkPluginConfig(instances, id)) {
          exec(
            `echo Build started at ${now(pluginConfig)} > ./public/status-${instances[id].name}.txt`
          );
          const config = {
            method: instances[id].method || 'post',
            url: instances[id].url,
          };
          if (instances[id].header) {
            config.headers = instances[id].header;
          }
          const response = await axios(config);
          if (response.data.error === undefined) {
            exec(
              `echo Last build with success at ${now(pluginConfig)} > ./public/status-${
                instances[id].name
              }.txt`
            );
            return { response: true };
          } else {
            exec(
              `echo Last build in error at ${now(pluginConfig)} > ./public/status-${
                instances[id].name
              }.txt`
            );
            console.error(response.data.error);
            return { response: false, error: response.data.error };
          }
        }
      } catch (error) {
        console.error(error);
        exec(
          `echo Last build in error at ${now(pluginConfig)} > ./public/status-${
            instances[id].name
          }.txt`
        );
        return { response: false, error: error.message };
      }
    },

    async createPublisherComponent() {
      try {
        const publisherComponent = await this.fetchPublisherComponent();
        const { addPublishComponent } = pluginConfig;
        if (!publisherComponent && addPublishComponent) {
          if (publisherContent) {
            try {
              const res = await strapi
                .plugin('content-type-builder')
                .services.components.createComponent({
                  component: {
                    category: 'shared',
                    displayName: publisherContent.info.displayName,
                    icon: publisherContent.info.icon,
                    attributes: publisherContent.attributes,
                  },
                });
              return res;
            } catch (error) {
              console.log(error);
            }
          } else {
            return null;
          }
        }
      } catch (error) {
        console.error(error);
        return { response: false, error: error.message };
      }
    },

    async fetchPublisherComponent() {
      try {
        const publisherComponent = strapi.components['shared.publish-panel'];
        return publisherComponent
          ? {
              attributes: publisherComponent.attributes,
              category: publisherComponent.category,
            }
          : null;
      } catch (error) {
        console.error(error);
        return { response: false, error: error.message };
      }
    },
  };
};
