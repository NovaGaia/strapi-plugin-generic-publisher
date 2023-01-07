const pluginPermissions = {
  // Roles
  access: [{ action: 'plugin::nova-publisher.access', subject: null }],
  publish: [
    {
      action: 'plugin::nova-publisher.publish',
      subject: null,
    },
  ],
};

export default pluginPermissions;
