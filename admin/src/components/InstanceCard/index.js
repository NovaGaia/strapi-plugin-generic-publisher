import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Box, Button, Flex, Link, Typography } from '@strapi/design-system';
import { CheckPermissions, useNotification } from '@strapi/helper-plugin';
import React, { useCallback, useEffect, useState } from 'react';

import Write from '@strapi/icons/Write';
import _ from 'lodash';
import permissions from '../../permissions';
import publisher from '../../api/publisher';

export const InstanceCard = ({ datas }) => {
  const { name, icon, cron, id, web_url } = datas;
  const toggleNotification = useNotification();
  const [isPublishing, setIsPublishing] = useState(false);
  const [value, setValue] = useState('never runned');

  const formatDate = (value) => {
    if (!!!_.isDate(value)) {
      return value;
    }
    value
      ? `${new Date(value).toLocaleDateString()} à ${new Date(value).toLocaleTimeString()}`
      : null;
  };

  const now = () => {
    const options = {
      timeZone: 'Europe/Paris',
      timeZoneName: 'short',
      hour12: false,
    };
    return new Date().toLocaleString('fr-FR', options);
  };

  useEffect(() => {
    checkLastBuild(id);
  }, []);

  const checkLastBuild = async () => {
    publisher.check(id).then((res) => {
      if (res.data === undefined) {
        setValue('Never runned');
      } else {
        setValue(res.data.status);
      }
    });
  };

  const handleSubmit = useCallback(async () => {
    setIsPublishing(true);
    setValue(`Build started at ${now()}`);
    const res = await publisher.publish(id);
    checkLastBuild(id);
    setIsPublishing(false);
    if (res.data.response) {
      toggleNotification({
        type: 'success',
        message: 'Publication achevée.',
      });
    } else {
      toggleNotification({
        type: 'warning',
        message: res.data.error,
      });
    }
  }, [setIsPublishing, checkLastBuild]);

  return (
    <Box background="neutral0" hasRadius={true} shadow="filterShadow" width="100%">
      <Flex padding={4} direction="column" alignItems="start" gap={4}>
        {web_url ? (
          <Link href={web_url} target="_blank">
            <Typography variant="alpha">
              Instance : {name} {icon}
            </Typography>
          </Link>
        ) : (
          <Typography variant="alpha">
            Instance : {name} {icon}
          </Typography>
        )}
        <Typography>Publication automatique activée : {cron === true ? '✅' : '🚫'}</Typography>
        <Typography>
          {_.isDate(value) ? (
            <>
              Derniere mise à jour le <b>{formatDate(value)}</b>
            </>
          ) : (
            <>
              Status : <b>{value}</b>
            </>
          )}
        </Typography>
        <CheckPermissions permissions={permissions.publish}>
          <Button
            size="S"
            endIcon={<Write />}
            onClick={handleSubmit}
            disabled={isPublishing}
            loading={isPublishing}
          >
            Publier
          </Button>
        </CheckPermissions>
      </Flex>
    </Box>
  );
};
