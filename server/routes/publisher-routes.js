"use strict";

/**
 *  router.
 */

module.exports = {
  type: "admin", // other type available: content-api.
  routes: [
    {
      method: "GET",
      path: "/getWelcomeMessage",
      handler: "publisher.getWelcomeMessage",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/instances",
      handler: "publisher.getInstances",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/check",
      handler: "publisher.check",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/publish",
      handler: "publisher.publish",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/createPublisherComponent",
      handler: "publisher.createPublisherComponent",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/fetchPublisherComponent",
      handler: "publisher.fetchPublisherComponent",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
