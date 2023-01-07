const pluginPermissions = {
  // Roles
  access: [
    { action: 'plugin::strapi-plugin-generic-publisher.access', subject: null },
  ],
  publish: [
    {
      action: 'plugin::strapi-plugin-generic-publisher.publish',
      subject: null,
    },
  ],
};

export default pluginPermissions;
