'use strict';

const { registerCronTasks } = require('./config/cron-tasks');
// Add permissions
const RBAC_ACTIONS = [
  {
    section: 'plugins',
    displayName: 'Access',
    uid: 'access',
    pluginName: 'nova-publisher',
  },
  {
    section: 'plugins',
    displayName: 'Publish',
    uid: 'publish',
    pluginName: 'nova-publisher',
  },
];
module.exports = async ({ strapi }) => {
  if (!strapi.plugin('users-permissions')) {
    throw new Error(
      'In order to make the navigation plugin work the users-permissions plugin is required'
    );
  }
  // bootstrap phase
  registerCronTasks({ strapi });
  await strapi.admin.services.permission.actionProvider.registerMany(
    RBAC_ACTIONS
  );
};
