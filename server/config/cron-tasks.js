'use strict';

module.exports = {
  registerCronTasks: ({ strapi }) => {
    // create cron check
    /**
     * Add to ./config/server.js
     * module.exports = ({ env }) => ({
     * // ...
     * cron: {
     * enabled: true,
     * },
     * // ...
     * });
     */
    strapi.cron.add({
      '0 1 * * *': async ({ strapi }) => {
        let instances = [];
        await strapi
          .plugin('nova-publisher')
          .service('publisher')
          .getInstances()
          .then((res) => {
            instances = res;
            instances.map((instance) => {
              if (instance.enabled === 'true' && instance.cron === 'true') {
                console.log(`Build lanched by CRON on ${instance.name} ⌛`);
                try {
                  strapi
                    .plugin('nova-publisher')
                    .service('publisher')
                    .publish(instance.id)
                    .then((res) => {
                      console.log(res);
                      console.log('CRON TASK RUNNED 🚀');
                    });
                } catch (error) {
                  console.log(error);
                }
              }
            });
          });
      },
    });
  },
};
