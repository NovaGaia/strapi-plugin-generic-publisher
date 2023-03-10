/*
 *
 * HomePage
 *
 */

import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import {
  Box,
  Checkbox,
  Divider,
  EmptyStateLayout,
  Flex,
  Icon,
  Stack,
  Typography,
} from "@strapi/design-system";
import {
  LoadingIndicatorPage,
  useAutoReloadOverlayBlocker,
} from "@strapi/helper-plugin";
import React, { memo, useEffect, useRef, useState } from "react";

import { Illo } from "../../components/Illo";
import { InstanceCard } from "../../components/InstanceCard";
import publisher from "../../api/publisher";

const HomePage = () => {
  const waitMessage = "loading...";
  const [welcomeMessage, setWelcomeMessage] = useState(waitMessage);
  const [instances, setInstances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldEffect, setShouldEffect] = useState(false);
  const publisherComponent = useRef({});

  const { lockAppWithAutoreload, unlockAppWithAutoreload } =
    useAutoReloadOverlayBlocker();

  useEffect(() => {
    publisher.getWelcomeMessage().then((res) => {
      setWelcomeMessage(res.data);
    });
  }, [setWelcomeMessage]);

  useEffect(() => {
    publisher.getInstances().then((res) => {
      setInstances(res.data);
      setIsLoading(false);
    });
  }, [setInstances]);

  // Fetching the Publisher component
  useEffect(async () => {
    publisher.fetchPublisherComponent().then((res) => {
      publisherComponent.current = res.data;
      if (!publisherComponent.current) {
        try {
          lockAppWithAutoreload();
          publisher.createPublisherComponent();
        } catch (error) {
          console.log(error);
        } finally {
          unlockAppWithAutoreload();
          setShouldEffect(true);
        }
      }
    });

    setIsLoading(false);
  }, [shouldEffect]);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <BaseHeaderLayout
        title="Nova Publisher"
        subtitle={`Publier vos articles, pages... ${welcomeMessage}`}
        as="h2"
      />
      <ContentLayout>
        {instances.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="Vous n'avez aucune instance de configur??e."
          />
        ) : (
          <Flex gap={8} direction="column">
            {instances.map((instance) => {
              if (instance.enabled === "true") {
                return <InstanceCard datas={instance} />;
              }
            })}
          </Flex>
        )}
      </ContentLayout>
    </>
  );
};

export default memo(HomePage);
