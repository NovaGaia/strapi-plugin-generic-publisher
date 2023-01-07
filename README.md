# Strapi plugin Nova Publisher

A quick description of `nova-publisher` made by [NovaGaïa](https://novagaia.fr/).

> View on [Strapi Marketplace](https://market.strapi.io/plugins/@novagaia-nova-publisher)

This plugin does several things:

1. Flexible publishing, a URL, in POST or GET, with or without headers ;
2. Allows you to publish to multiple instances (Prod, Preview, etc.);
3. Adds a publishing component to override Strapi's state management, useful with CRON in particular (no obligation to use);
4. Activate a cron that will update the active instances that need to be rebuilt every day at 1am (no obligation to use).

## 1. Installation

## a. How to Install

Copy the following code and run from your terminal

```
npm i nova-publisher
```

or

```
yarn add nova-publisher
```

### b. Configuration

#### I. plugins.js

The configuration is done in the environment variables and in the plugin configuration.

> Here there are two instances configured, but you can add more or put only one.

```js
// ./config/plugins.js
// if change, run `npm run build --clean`

module.exports = ({ env }) => ({
  // ...
  'nova-publisher': {
    enabled: true,
    config: {
      dateConfiguration: {
        dateLocaleString: 'fr-FR', // sample
        options: {
          // sample
          timeZone: 'Europe/Paris',
          timeZoneName: 'short',
          hour12: false,
        },
      },
      addPublishComponent: false,
      instances: [
        {
          name: env('INSTANCE_0_NAME'),
          icon: '🚀', // sample
          enabled: env('INSTANCE_0_ENABLED'),
          cron: env('INSTANCE_0_USE_CRON'),
          url: env('INSTANCE_0_URL'),
          method: 'post',
          headers: {
            // sample
            Authorization: `Beaver ${env('INSTANCE_0_BEAVER')}`,
          },
        },
        {
          name: env('INSTANCE_1_NAME'),
          icon: '👁️', // sample
          enabled: env('INSTANCE_1_ENABLED'),
          cron: env('INSTANCE_1_USE_CRON'),
          url: env('INSTANCE_1_URL'),
          method: 'post',
          headers: {
            // sample
            Authorization: `Beaver ${env('INSTANCE_1_BEAVER')}`,
          },
        },
      ],
    },
  },
  // ...
});
```

| Variable                             | Description                                                       | Type    | Default value                                                         |
| ------------------------------------ | ----------------------------------------------------------------- | ------- | --------------------------------------------------------------------- |
| `dateConfiguration`                  | Configuration of the date format in the messages, see (1).        | Object  | (See below)                                                           |
| `dateConfiguration.dateLocaleString` | Date local to use, see (1)                                        | String  | `en-EN`                                                               |
| `dateConfiguration.options`          | Date formatting options, see (1)                                  | Object  | `{ timeZone: 'Europe/London', timeZoneName: 'short', hour12: false }` |
| `addPublishComponent`                | Adds the helper component to manage more finely the publications. | Boolean | `false`                                                               |
| `instances`                          | Configuration of the instances where to launch the publication.   | Object  | (See below)                                                           |
| `instances.name` \*                  | Name of the intance.                                              | String  | Mandatory                                                             |
| `instances.icon` \*                  | Emoji.                                                            | String  | Mandatory                                                             |
| `instances.enabled` \*               | Enables or disables the display of the instance.                  | Boolean | Mandatory                                                             |
| `instances.url` \*                   | Target url.                                                       | String  | Mandatory                                                             |
| `instances.method`                   | `POST` ou `GET`.                                                  | String  | `POST`                                                                |
| `instances.headers`                  | Headers to send, see (2).                                         | Object  | -                                                                     |

\* **Mandatory field**

> (1) Pour `dateConfiguration`, see [Date.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
>
> (2) pour `instances.headers`, see [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

#### II. server.js

Enabled internal Strapi CRON

```js
// ./config/server.js
module.exports = ({ env }) => ({
  // ...
  cron: {
    enabled: true,
  },
  // ...
});
```

## 2. Utilisation

![preview](./docs/cap1.png)

> **Warning**
> Before any use, the `Publication Status' displays a generic message.

> **Note**
> The `Publication Status' message is not stored in the database (in case it is copied to other instances), but in a file under `./public/status-${instances[id].name}.txt`.

If several instances are configured, the block is repeated.

Auto-publish enabled`indicates whether CRON is enabled for this instance, see`instances.enabled`.

### Publish

Click on `Publish` to initiate the action.

- The button is disabled while waiting (if you refresh the page, the button will be enabled again).
- The `Publish Status` displays Build started at `<date>`.
- When the action returns, the button is reactivated.

### Return management

When the action returns, the `Publish Status` will be updated with a success or error message and the time.

- Release in progress: Build started at `<date>`.
- Success: Last build with success at `<date>`.
- Error: Last build in error at `<date>`.

In case of an error, a `Toast` is displayed with the error message returned by the remote server, which you can find in the Strapi server logs.
